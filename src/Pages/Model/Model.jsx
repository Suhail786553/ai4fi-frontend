import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import Select from "react-select";
import "modern-normalize";
import "./Model.css";
import ModelConfigForm from "../../Components/ModelConfigFrom/ModelConfigForm";
// import { saveAs } from "file-saver";

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
  const [loadingCountdowns, setLoadingCountdowns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks if modal is open
  const [zoomedImage, setZoomedImage] = useState(null); // Stores the image to zoom

  // const [modelCount, setModelCount] = useState(1); // To track the number of models for "Custom Seed"

  const generateImage = async () => {
    setLoading(true);
    const placeholders = Array(model).fill(null); // Placeholder array for images
    const countdowns = Array(model).fill(0); // Initialize countdowns
    setGeneratedImages(placeholders); // Initialize placeholders
    setLoadingCountdowns(countdowns); // Initialize countdowns

    try {
      const images = []; // Array to store generated image URLs

      for (let i = 0; i < model; i++) {
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

        console.log(`Payload for model ${i + 1}:`, payload);

        // Simulated timer for professional countdown feel
        const simulatedDuration = 5; // Total visible countdown time in seconds
        const updateFrequency = 50; // Update every 50ms for smooth animation
        let simulatedProgress = 0; // Start at 0%

        const timerInterval = setInterval(() => {
          simulatedProgress += (100 / (simulatedDuration * 1000)) * updateFrequency;
          setLoadingCountdowns((prevCountdowns) => {
            const updatedCountdowns = [...prevCountdowns];
            updatedCountdowns[i] = Math.min(simulatedProgress, 200); // Cap at 100%
            return updatedCountdowns;
          });

          if (simulatedProgress >= 500) clearInterval(timerInterval);
        }, updateFrequency);

        // Perform the fetch request
        const baseURL =
          window.location.hostname === "localhost"
            ? "http://localhost:5000/proxy/generate-model"
            : "https://ai4fi-backend.onrender.com/proxy/generate-model";
        const response = await fetch(baseURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          clearInterval(timerInterval); // Stop the timer on error
          throw new Error(`Failed to generate the model for iteration ${i + 1}. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Response Data for model ${i + 1}:`, data);

        // Stop the countdown and finalize progress
        clearInterval(timerInterval);
        setLoadingCountdowns((prevCountdowns) => {
          const updatedCountdowns = [...prevCountdowns];
          updatedCountdowns[i] = 100; // Ensure it finishes at 100%
          return updatedCountdowns;
        });

        // Update generated image array
        if (data.image_urls && data.image_urls[0]) {
          images[i] = data.image_urls[0];
        }

        setGeneratedImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[i] = data.image_urls[0];
          return updatedImages;
        });
      }
    } catch (error) {
      console.error("Error during generation:", error);
      alert(`Error generating the models: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl); // Fetch the image
      const blob = await response.blob(); // Convert response to a Blob
      const blobUrl = URL.createObjectURL(blob); // Create a URL for the Blob

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl; // Set the Blob URL
      link.download = "example-image.jpg"; // Specify the file name
      document.body.appendChild(link); // Append link to the body
      link.click(); // Trigger download
      document.body.removeChild(link); // Remove link after download

      // Release the Blob URL to free memory
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-black text-white'>
      <aside
        className={`${
          isSidebarOpen ? "w-full md:w-1/5" : "w-0"
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
            generateImage={generateImage}
            loading={loading}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className='relative flex flex-col items-center justify-center lg:px-24 py-4 min-h-screen'>
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
          <h1 className='text-4xl py-2 font-bold text-white mb-4 '>AI4FI - Fashion Model Generation ✨</h1>
          <p className='text-3xl font-bold text-gray-200 mb-4'>Create Photorealistic Fashion Model Images with Custom Attributes 🔮</p>
          <hr className='border-gray-600 my-4' />
          <p className='text-xl text-gray-400'>Powered by ApricityTS💡AI-Driven Fashion Modeling ✨</p>
        </div>

        {/* Image Gallery */}
        {Array.isArray(generatedImages) && (
          <div className='flex-grow w-full flex justify-center bg-black overflow-hidden'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full'>
              {generatedImages.map((image, index) => (
                <div key={index} className='relative group w-full h-78 lg:h-96 flex-shrink-0' id={`image-${index}`}>
                  {/* Black Placeholder with Countdown */}
                  {!image && (
                    <div className='w-full h-full bg-black rounded-lg flex items-center justify-center'>
                      <p className='text-white text-lg font-bold'>{loadingCountdowns[index]}s</p>
                    </div>
                  )}

                  {/* Render Actual Image */}
                  {image && (
                    <img
                      src={image}
                      alt={`Generated Model ${index + 1}`}
                      className='w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out'
                    />
                  )}

                  {/* Hover Options */}
                  {image && (
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                      <div className='flex space-x-4'>
                        {/* Download Button */}
                        <span className='text-white hover:text-gray-400 flex flex-col items-center' onClick={() => handleDownload(image)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 16v-8m0 8l-4-4m4 4l4-4m-7 12h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                            />
                          </svg>
                          <span className='text-sm'>Download</span>
                        </span>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            const updatedImages = [...generatedImages];
                            updatedImages.splice(index, 1); // Remove the image from the array
                            setGeneratedImages(updatedImages); // Update state
                          }}
                          className='text-white hover:text-gray-400 flex flex-col items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                          </svg>
                          <span className='text-sm'>Delete</span>
                        </button>
                        {/* share button */}
                        <button
                          onClick={() =>
                            navigator
                              .share({
                                title: "Generated Image",
                                text: "Check out this image!",
                                url: image,
                              })
                              .catch((err) => console.error("Share failed:", err))
                          }
                          className='text-white hover:text-gray-400 flex flex-col items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.25 15.682l5.444-3.262M14.25 8.318l5.444 3.262m-9.638 6.08A6.004 6.004 0 1114.25 3a6.004 6.004 0 010 12.053z'
                            />
                          </svg>
                          <span className='text-sm'>Share</span>
                        </button>
                        {/* zoom button */}
                        <button
                          onClick={() => {
                            setZoomedImage(image); // Set the image to zoom
                            setIsModalOpen(true); // Open the modal
                          }}
                          className='text-white hover:text-gray-400 flex flex-col items-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12h3m-3 0a3 3 0 01-3-3m3 3a3 3 0 013 3m-3-3V9m0 3V6m-3 6H9m0 0a3 3 0 013 3m0-3a3 3 0 00-3-3m0 3H6'
                            />
                          </svg>
                          <span className='text-sm'>Zoom</span>
                        </button>
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
              ))}
            </div>
          </div>
        )}
        {generatedImages && generatedImages.length > 0 && (
          <div className='flex justify-center mt-8 animate-bounce'>
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
