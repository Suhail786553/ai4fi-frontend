import { useState } from "react";
// import { FaMale, FaFemale } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Select from "react-select";
import "modern-normalize";
import { saveAs } from "file-saver";

const ModelGeneratorUI = (image, index) => {
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


  const poses = [
    { value: "Classic Standing Pose", label: "Classic Standing Pose" },
    { value: "Hands on Hips", label: "Hands on Hips" },
    { value: "Walking Pose", label: "Walking Pose" },
    { value: "Crossed Arms", label: "Crossed Arms" },
    { value: "Side Profile", label: "Side Profile" },
    { value: "Over the Shoulder", label: "Over the Shoulder" },
    { value: "Lean Against Wall", label: "Lean Against Wall" },
    { value: "Hands in Pockets", label: "Hands in Pockets" },
  ];


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
  
          if (simulatedProgress >= 200) clearInterval(timerInterval);
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
          throw new Error(
            `Failed to generate the model for iteration ${i + 1}. Status: ${response.status}`
          );
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
  
  // image download
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      if (!image) {
        console.error("Image URL is missing!");
        return;
      }

      // Fetch the image as a blob
      const response = await fetch(image, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();

      // Save the image using FileSaver.js
      saveAs(blob, `Generated_Model_${index + 1}.jpg`);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      {/* <aside
        className={`${isSidebarOpen ? "w-full md:w-1/5" : "w-0"} bg-gray-900 transition-all duration-300 overflow-hidden`}
      > */}
      <aside
        className={`${isSidebarOpen ? "w-full md:w-1/5" : "w-0"
          } bg-gray-900 transition-all duration-300 overflow-hidden md:sticky md:top-0 h-auto md:h-screen`}
        style={{
          minWidth: isSidebarOpen ? (window.innerWidth >= 768 ? "19rem" : "100%") : "0",
          maxWidth: isSidebarOpen ? (window.innerWidth >= 768 ? "19rem" : "100%") : "0",
        }}
      >
        <div className="h-screen overflow-y-auto">
          <div className="p-5 space-y-6">
            <h2 className="text-3xl font-bold text-white-600 font-sans">Model Inputs🛠️</h2>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block font-serif">Gender👩‍🦰</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <style>{`
  /* Custom Scrollbar Styles */
::-webkit-scrollbar {
  width: 4px; /* Thin scrollbar width */
}

::-webkit-scrollbar-track {
  background: linear-gradient(180deg, #2a2a2a, #1a1a1a); /* Gradient track */
  border-radius: 10px; /* Rounded track edges */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ffffff, #b3b3b3); /* Gradient thumb */
  border-radius: 10px; /* Rounded thumb edges */
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #f5f5f5, #d9d9d9); /* Hover effect for thumb */
}

/* Firefox-specific styles */
* {
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color:grey #2a2a2a; /* Thumb and track colors */
}

`}</style>

            {/* Additional inputs for country, hair type, etc. */}
            <div className="space-y-2">
              <label className="block font-serif">Country🌍</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Africa">Africa</option>
                <option value="Russia">Russia</option>

              </select>
            </div>

            {/* Add remaining inputs for hair type, pose, etc. */}
            <div className="space-y-2">
              <label className="block font-serif">Age 🎂</label>
              <input
                type="range"
                min="16"
                max="50"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white-400">{age}</span>
            </div>

            {/* Hair Color */}
            <div className="space-y-2">
              <label className="block font-serif">Hair Color 🌸</label>
              <select
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option>Black</option>
                <option>Brown</option>
                <option>Blonde</option>
                <option>Red</option>
              </select>
            </div>

            {/* Hair Type */}
            <div className="space-y-2">
              <label className="block font-serif">Hair Type 💇‍♀️</label>
              <select
                value={hairType}
                onChange={(e) => setHairType(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option>Straight</option>
                <option>Curly</option>
                <option>Wavy</option>
              </select>
            </div>

            {/* Eye Color */}
            <div className="space-y-2">
              <label className="block font-serif">Eye Color👁️</label>
              <select
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option>Black</option>
                <option>Brown</option>
                <option>Blue</option>
                <option>Green</option>
              </select>
            </div>

            {/* Skin Color */}
            <div className="space-y-2">
              <label className="block font-serif">Skin Color👩‍🦳</label>
              <select
                value={skinColor}
                onChange={(e) => setSkinColor(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option value="Very Light (Fair) Skin">Very Light (Fair) Skin</option>
                <option value="Light (Medium Fair) Skin">Light (Medium Fair) Skin</option>
                <option value="Medium (Olive or Tan) Skin">Medium (Olive or Tan) Skin</option>
                <option value="Dark Brown (Brown) Skin">Dark Brown (Brown) Skin</option>
                <option value="Deep Dark (Black) Skin">Deep Dark (Black) Skin</option>

              </select>
            </div>

            {/* Shot Type */}
            <div className="space-y-4">
              <label className="block font-serif font-medium">Shot Type 📷</label>
              <div className="flex flex-col space-y-0">
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Full Body" ? "border-white-500" : "border-gray-700"}`}
                  onClick={() => setShotType("Full Body")}
                >
                  <span className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Full Body" ? "border-white bg-white" : "border-gray-500"}`}></span>
                  Full Body
                </button>
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Half Body" ? "border-white-500" : "border-gray-700"}`}
                  onClick={() => setShotType("Half Body")}
                >
                  <span className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Half Body" ? "border-white bg-white" : "border-gray-500"}`}></span>
                  Half Body
                </button>
              </div>
            </div>

            {/* Dress */}
            <div className="space-y-2">
              <label className="block font-serif">Dress Description 👗</label>
              <input
                type="text"
                value={dress}
                onChange={(e) => setDress(e.target.value)}
                placeholder="e.g., Tyron-style dress"
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-purple-500"
                style={{ height: "46px" }} 
              />
            </div>

            {/* Pose */}
            <div className="space-y-2">
              <label className="block font-serif">Pose🤸</label>
              <select
                value={pose}
                onChange={(e) => setPose(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option>Classic Standing Pose</option>
                <option>Hands on Hips</option>
                <option>Walking Pose</option>
                <option>Crossed Arms</option>
                <option>Side Profile</option>
                <option>Over the Shoulder</option>
                <option>Lean Against Wall</option>
                <option>Hands in Pockets</option>
              </select>
            </div>

            {/* Background */}
            <div className="space-y-2">
              <label className="block font-serif">Background 🖼️</label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                style={{ height: "46px" }} 
              >
                <option value="Auto">Auto</option>
                <option value="Plain White Studio">Plain White Studio</option>
                <option value="Soft Beige Gradient">Soft Beige Gradient</option>
                <option value="Textured Concrete Wall">Textured Concrete Wall</option>
                <option value="Exposed Brick Wall">Exposed Brick Wall</option>
                <option value="Wooden Floor with Neutral Wall">Wooden Floor with Neutral Wall</option>
                <option value="Large Window with Natural Light">Large Window with Natural Light</option>
                <option value="Minimalist Interior Design">Minimalist Interior Design</option>
                <option value="Garden Patio">Garden Patio</option>
                <option value="City Rooftop Skyline">City Rooftop Skyline</option>
                <option value="Luxury Dressing Room">Luxury Dressing Room</option>
                <option value="Vintage Library">Vintage Library</option>
                <option value="Boutique Storefront">Boutique Storefront</option>
                <option value="Cafe Interior">Cafe Interior</option>
                <option value="Beachfront Deck">Beachfront Deck</option>
                <option value="Floral Meadow">Floral Meadow</option>
                <option value="Open Field with Tall Grass">Open Field with Tall Grass</option>
                <option value="Industrial Warehouse">Industrial Warehouse</option>
                <option value="Urban Street Scene">Urban Street Scene</option>
                <option value="Luxury Hotel Suite">Luxury Hotel Suite</option>
                <option value="Paved Courtyard">Paved Courtyard</option>
                <option value="Artistic Studio with Props">Artistic Studio with Props</option>
                <option value="Pastel Color Backdrops">Pastel Color Backdrops</option>
                <option value="Neon Cityscape at Night">Neon Cityscape at Night</option>
                <option value="Desert Landscape">Desert Landscape</option>
                <option value="Tropical Forest">Tropical Forest</option>
                <option value="Modern Loft Interior">Modern Loft Interior</option>
                <option value="Renaissance Art Museum">Renaissance Art Museum</option>
                <option value="Snow-Covered Mountains">Snow-Covered Mountains</option>
                <option value="Glass Atrium with Plants">Glass Atrium with Plants</option>
                <option value="Contemporary Office Space">Contemporary Office Space</option>
              </select>
            </div>
            {/* custom background */}
            {/* <div className="space-y-2">
              <label className="block font-serif"> Custom Background 🖼️</label>
              <input
                type="text"
                value={backgrounds}
                onChange={(e) => setBackgrounds(e.target.value)}
                placeholder="e.g., Plain White Studio"
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-purple-500"
              />
            </div> */}
            {/* Seed */}
            {/* <div className="space-y-2">
              <label className="block font-serif">Model Seed 🔮</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
              />
            </div> */}

            {/* Auto Seed */}
            <div className="space-y-4">
              <label className="block font-serif font-medium">Choose Seed Type ✨</label>
              <div className="flex flex-col space-y-2">
                {/* Full Body Button */}
                <button
                  className={`p-3 rounded flex items-center ${seedType === "Auto Generate" ? "border-white-500" : "border-gray-700"}`}
                  onClick={() => setSeedType("Auto Generate")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${seedType === "Auto Generate" ? "border-white bg-white" : "border-gray-500"}`}
                  ></span>
                  Auto Generate
                </button>

                {/* Half Body Button */}
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Custom Seed" ? "border-white-500" : "border-gray-700"}`}
                  onClick={() => setSeedType("Custom Seed")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${seedType === "Custom Seed" ? "border-white bg-white" : "border-gray-500"}`}
                  ></span>
                  Custom Seed
                </button>
              </div>

              {/* Model DNA Number Section - Only appears if 'Custom Seed' is selected */}

              {seedType === "Custom Seed" && (
                <div className="mt-4 space-y-2">
                  <label className="block font-serif font-medium">Model DNA Number (Seed)</label>
                  <input
                    type="number"
                    value={dnaNumber}
                    onChange={(e) => setDnaNumber(Number(e.target.value))}
                    className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                    min="0"
                  />
                </div>
              )}

              {/* Display the Model DNA Number if Half Body is selected */}
              {seedType === "Custom Seed" && (
                <div className="mt-4 space-y-2">
                  <label className="block font-serif font-medium">Model DNA Number (Seed)</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">{dnaNumber}</span>
                  </div>
                </div>
              )}
            </div>



            {/* Number of Models */}
            <div className="space-y-2">
              <label className="block font-serif">Number of Models (Max 4)</label>
              <input
                type="range"
                min="1"
                max="4"
                value={model}
                onChange={(e) => setModel(Number(e.target.value))}
                className="w-full accent-white"
                style={{ height: "46px" }} 
              />
              <span className="text-white-400">{model}</span>
            </div>

            {/* Select Post */}
            <div className="space-y-2">
  <label className="block font-serif">Select Pose(s) For Each Model 🔥</label>
  <Select
    isMulti
    value={selectedPosts}
    onChange={setSelectedPosts}
    options={poses}
    className="text-black"
    styles={{
      control: (provided, state) => ({
        ...provided,
        backgroundColor: 'black',
        color: 'white',
        height: '46px', // Fix height to 46px
        border: state.isFocused ? '2px solid white' : 'none', // White border when focused
        boxShadow: state.isFocused ? '0 0 4px white' : 'none', // Optional: subtle glow effect
        ':hover': {
          border: state.isFocused ? '2px solid white' : 'none', // Maintain hover consistency
        },
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'gray' : 'black', // Change background when selected
        color: 'white', // Text color
        ':hover': {
          backgroundColor: 'gray', // Change hover color
        },
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: 'gray', // Background for selected items
        color: 'white',
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: 'white', // Text color for selected items
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: 'white', // Remove icon color
        ':hover': {
          backgroundColor: 'transparent', // No background on hover
          color: 'red', // Optional: Change color on hover for remove icon
        },
      }),
    }}
  />
</div>




            {/* Generate Button */}
            <div>
              <button
                onClick={generateImage}
                className="bg-black border-2 hover:bg-black text-white w-full py-3 rounded shadow-lg transition duration-300 font-sans"
              >
                {loading ? "Generating...✨" : "Generate Image ✨"}
              </button>

              {/* Display the generated image if available */}
            </div>

          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center lg:px-24 py-10 min-h-screen">
        {/* Sidebar Toggle Button */}
        <button
          className="absolute left-4 top-4 bg-white text-black p-2 rounded-full shadow-lg z-150 sm:block hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <AiOutlineArrowLeft size={20} />
          ) : (
            <AiOutlineArrowRight size={20} />
          )}
        </button>
        {/* Back to Home Button */}
        <div className="absolute top-4 right-4">
          <a href="/">
            <button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-110"
            >
              Back to Home 🏠
            </button>
          </a>
        </div>

        {/* Content */}
        <div className="text-center w-full py-8">
          <h1 className="text-4xl py-2 font-bold text-white mb-4 font-serif">
            AI4FI - Fashion Model Generation ✨
          </h1>
          <p className="text-3xl font-bold text-gray-200 mb-4">
            Create Photorealistic Fashion Model Images with Custom Attributes 🔮
          </p>
          <hr className="border-gray-600 my-4" />
          <p className="text-xl text-gray-400">
            Powered by ApricityTS💡AI-Driven Fashion Modeling ✨
          </p>
        </div>

        {/* Image Gallery */}
        {Array.isArray(generatedImages) && (
          <div className="flex-grow w-full flex justify-center bg-black overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">
              {generatedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group w-full h-78 lg:h-96 flex-shrink-0"
                  id={`image-${index}`}
                >
                  {/* Black Placeholder with Countdown */}
                  {!image && (
                    <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                      <p className="text-white text-lg font-bold">
                        {loadingCountdowns[index]}s
                      </p>
                    </div>
                  )}

                  {/* Render Actual Image */}
                  {image && (
                    <img
                      src={image}
                      alt={`Generated Model ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out"
                    />
                  )}

                  {/* Hover Options */}
                  {image && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <div className="flex space-x-4">
                        {/* Download Button */}
                        <a
                          href={image}
                          className="text-white hover:text-gray-400 flex flex-col items-center"
                          onClick={handleDownload}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 16v-8m0 8l-4-4m4 4l4-4m-7 12h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm">Download</span>
                        </a>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            const updatedImages = [...generatedImages];
                            updatedImages.splice(index, 1); // Remove the image from the array
                            setGeneratedImages(updatedImages); // Update state
                          }}
                          className="text-white hover:text-gray-400 flex flex-col items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          <span className="text-sm">Delete</span>
                        </button>
                        {/* share button */}
                        <button
                          onClick={() =>
                            navigator.share({
                              title: "Generated Image",
                              text: "Check out this image!",
                              url: image,
                            }).catch((err) => console.error("Share failed:", err))
                          }
                          className="text-white hover:text-gray-400 flex flex-col items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.25 15.682l5.444-3.262M14.25 8.318l5.444 3.262m-9.638 6.08A6.004 6.004 0 1114.25 3a6.004 6.004 0 010 12.053z"
                            />
                          </svg>
                          <span className="text-sm">Share</span>
                        </button>
                        {/* zoom button */}
                        <button
                          onClick={() => {
                            setZoomedImage(image); // Set the image to zoom
                            setIsModalOpen(true); // Open the modal
                          }}
                          className="text-white hover:text-gray-400 flex flex-col items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12h3m-3 0a3 3 0 01-3-3m3 3a3 3 0 013 3m-3-3V9m0 3V6m-3 6H9m0 0a3 3 0 013 3m0-3a3 3 0 00-3-3m0 3H6"
                            />
                          </svg>
                          <span className="text-sm">Zoom</span>
                        </button>
                        {isModalOpen && (
                          <div
                            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                            onClick={() => setIsModalOpen(false)} // Close modal on background click
                          >
                            <div className="relative">
                              <img
                                src={zoomedImage}
                                alt="Zoomed"
                                className="max-w-full max-h-screen"
                              />
                              <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
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
          <div className="flex justify-center mt-8 animate-bounce">
            <a href="/virtualtryon">
              <button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-110"
              >
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