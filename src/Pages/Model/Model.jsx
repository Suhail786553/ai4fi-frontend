import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import Select from "react-select";
import "modern-normalize";
import "./Model.css";
import ModelConfigForm from "../../Components/ModelConfigFrom/ModelConfigForm";
import { DownloadIcon, Share2, Trash, ZoomIn } from "lucide-react";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import { auth } from '../Firebase/firebaseConfig';
// import firebase from "firebase/app";
// import  "firebase/auth";
// import { getAuth } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';

// import { saveAs } from "file-saver";

function calculateSecondsDifference(time1, time2) {
  const differenceInMilliseconds = time2 - time1;
  return differenceInMilliseconds / 1000;
}

const ModelGeneratorUI = () => {
  const [age, setAge] = useState(25);
  // const [numImages] = useState(1);
  const [gender, setGender] = useState("Male");
  const [hairColor, setHairColor] = useState("Black");
  const [hairType, setHairType] = useState("Straight");
  const [eyeColor, setEyeColor] = useState("Black");
  const [skinColor, setSkinColor] = useState("Very Light (Fair) Skin");
  const [dress, setDress] = useState("");
  const [background, setBackground] = useState("Auto");
  // const [backgrounds, setBackgrounds] = useState([]);
  const [pose, setPose] = useState("Classic Standing Pose");
  const [seed] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [autoSeed] = useState(true);
  const [country, setCountry] = useState("India");
  // const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [model, setModel] = useState(1); // Number of images, default 1
  const [shotType, setShotType] = useState("Full Body"); // Default is "Full Body"
  const [seedType, setSeedType] = useState("Auto Generate");
  const [dnaNumber, setDnaNumber] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  // const [, setLoadingCountdowns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks if modal is open
  const [zoomedImage, setZoomedImage] = useState(null); // Stores the image to zoom
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  // const [images, setImages] = useState([]);

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl); // Fetch the image
      const blob = await response.blob(); // Convert response to a Blob
      const blobUrl = URL.createObjectURL(blob); // Create a URL for the Blob

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl; // Set the Blob URL
      link.download = "model-image.jpg"; // Specify the file name
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger download
      document.body.removeChild(link); // Remove link after download

      // Release the Blob URL to free memory
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const generateImages = async () => {
    setLoading(true);
    const placeholders = Array(model).fill(null);
    setGeneratedImages(placeholders); // Initialize placeholders

    const baseURL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000/proxy/generate-model"
        : "https://ai4fi-backend.onrender.com/proxy/generate-model";

    // Get the current user from Firebase Auth
    const user = auth.currentUser; // Using getAuth to get the current user
    if (!user) {
      alert("Please log in to generate and save models!");
      setLoading(false);
      return;
    }

    placeholders.map(async (nul, i) => {
      const payload = {
        gender,
        country,
        age: Number(age),
        hair_color: hairColor,
        hair_type: hairType,
        eye_color: eyeColor,
        skin_color: skinColor,
        shot_type: shotType,
        dress: dress || "",
        background,
        pose,
        seed: autoSeed ? null : seed,
        auto_seed: autoSeed,
        num_images: 1,
      };

      console.log("Sending payload:", payload); // Debugging

      try {
        setStartTime((prv) => ({ ...prv, [`image_${i + 1}`]: Date.now() }));
        const response = await axios.post(baseURL, payload);
        const data = response.data;

        if (data.image_urls && data.image_urls[0]) {
          setGeneratedImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[i] = data.image_urls[0];
            return updatedImages;
          });
        }

        // Save Model to MongoDB
        const API_BASE_URL =
          window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://ai4fi-backend.onrender.com"; // Replace with actual backend URL

        const saveResponse = await axios.post(`${API_BASE_URL}/api/save-model`, {
          userId: user.uid,
          modelConfig: payload,
          imageUrl:data.image_urls,
        });


        if (saveResponse.status === 201) {
          console.log("Model saved successfully!");
        } else {
          console.error("Error saving model:", saveResponse.data);
        }
      } catch (error) {
        console.error(`Error generating image ${i + 1}:`, error);
        alert(`Error generating the models: ${error.message}`);
      } finally {
        setEndTime((prv) => ({ ...prv, [`image_${i + 1}`]: Date.now() }));
      }
    });

    setLoading(false);
  };


  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-black text-white'>
      <aside
        className={`${isSidebarOpen ? "w-full md:w-1/5" : "w-0"
          } bg-gray-900 transition-all duration-300 overflow-hidden md:sticky md:top-0 h-auto md:h-screen`}
        style={{
          minWidth: isSidebarOpen ? (window.innerWidth >= 768 ? "22rem" : "100%") : "0",
          maxWidth: isSidebarOpen ? (window.innerWidth >= 768 ? "22rem" : "100%") : "0",
        }}>
        <div className='h-screen overflow-y-auto sider_scroll'>
          <ModelConfigForm
            setGender={setGender}
            setHairColor={setHairColor}
            setHairType={setHairType}
            setEyeColor={setEyeColor}
            setSkinColor={setSkinColor}
            setDress={setDress}
            setBackground={setBackground}
            setPose={setPose}
            setSelectedPosts={setSelectedPosts}
            setCountry={setCountry}
            setShotType={setShotType}
            setSeedType={setSeedType}
            setDnaNumber={setDnaNumber}
            setModel={setModel}
            model={model}
            setAge={setAge}
            age={age}
            gender={gender}
            hairColor={hairColor}
            hairType={hairType}
            eyeColor={eyeColor}
            skinColor={skinColor}
            dress={dress}
            pose={pose}
            seed={seed}
            selectedPosts={selectedPosts}
            autoSeed={autoSeed}
            country={country}
            shotType={shotType}
            seedType={seedType}
            dnaNumber={dnaNumber}
            background={background}
            generateImage={() => generateImages()}
            loading={loading}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className='relative flex flex-col items-center w-full justify-center lg:px-12 py-4 min-h-screen'>
        {/* Sidebar Toggle Button */}
        <button
          className='absolute left-4 top-4 bg-white text-black p-2 rounded-full shadow-lg z-150 sm:block hidden'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <AiOutlineArrowLeft size={20} /> : <AiOutlineArrowRight size={20} />}
        </button>
        {/* Back to Home Button */}
        <div className='absolute top-4 right-4'>
          <a href='/'>
            <button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-110'>
              Back to Home 🏠
            </button>
          </a>
        </div>

        {/* Content */}
        <div className='text-center w-full py-8'>
          <h1 className='text-2xl py-2 font-bold text-white mb-4 '>AI4FI - Fashion Model Generation ✨</h1>
          <p className='text-xl font-bold text-gray-200 mb-4'>Create Photorealistic Fashion Model Images with Custom Attributes 🔮</p>
          <hr className='border-gray-600 my-2' />
          <p className='text-lg text-gray-400'>Powered by ApricityTS💡AI-Driven Fashion Modeling ✨</p>
        </div>

        {/* Image Gallery */}
        {Array.isArray(generatedImages) && (
          <div className='flex-grow w-full flex justify-center bg-black overflow-hidden'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full'>
              {generatedImages.map((image, index) => (
                // eslint-disable-next-line react/jsx-key
                <div>
                  {startTime && endTime && startTime[`image_${index + 1}`] && endTime[`image_${index + 1}`] && (
                    <p className='text-sm mb-2 '>
                      {calculateSecondsDifference(startTime[`image_${index + 1}`], endTime[`image_${index + 1}`])?.toFixed(2)}{" "}
                      <span className='ml-[2px]'>sec</span>
                    </p>
                  )}

                  <div key={index} className='relative  group w-full h-78 lg:h-96 flex-shrink-0' id={`image-${index}`}>
                    {/* Black Placeholder with Countdown */}
                    {!image && startTime && <Spinner startTime={startTime[`image_${index + 1}`]} />}

                    {image && (
                      <img
                        src={image}
                        alt={`Generated Model ${index + 1}`}
                        className='w-full h-full object-contain rounded-lg shadow-md transition-all duration-300 ease-in-out'
                      />
                    )}

                    {/* Hover Options */}
                    {image && (
                      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                        <div className='flex space-x-4'>
                          {/* Download Button */}

                          <DownloadIcon className='h-6 w-6 cursor-pointer' onClick={() => handleDownload(image)} />

                          <Trash
                            className='h-6 w-6 cursor-pointer hove:text-red-600'
                            onClick={() => {
                              const updatedImages = [...generatedImages];
                              updatedImages.splice(index, 1); // Remove the image from the array
                              setGeneratedImages(updatedImages); // Update state
                            }}
                          />

                          <Share2
                            className='h-6 w-6 cursor-pointer'
                            onClick={() =>
                              navigator
                                .share({
                                  title: "Generated Image",
                                  text: "Check out this image!",
                                  url: image,
                                })
                                .catch((err) => console.error("Share failed:", err))
                            }
                          />

                          <ZoomIn
                            className='h-6 w-6 cursor-pointer'
                            onClick={() => {
                              setZoomedImage(image); // Set the image to zoom
                              setIsModalOpen(true); // Open the modal
                            }}
                          />

                          {isModalOpen && (
                            <div
                              className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
                              onClick={() => setIsModalOpen(false)} // Close modal on background click
                            >
                              <div className='relative'>
                                <img src={zoomedImage} alt='Zoomed' className='max-w-full max-h-screen' />
                                <button
                                  onClick={() => setIsModalOpen(false)}
                                  className='absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {generatedImages && generatedImages.length > 0 && (
          <div className='flex justify-center mt-4 animate-bounce'>
            <a href='/virtualtryon'>
              <button className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-110'>
                Virtual Try On ✨
              </button>
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModelGeneratorUI;
