import { useState } from "react";
// import { FaMale, FaFemale } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Select from "react-select";
import "modern-normalize";

const ModelGeneratorUI = () => {
  const [age, setAge] = useState(25);
  const [numImages] = useState(1);
  const [gender, setGender] = useState("Male");
  const [hairColor, setHairColor] = useState("Black");
  const [hairType, setHairType] = useState("Straight");
  const [eyeColor, setEyeColor] = useState("Black");
  const [skinColor, setSkinColor] = useState("Very Light (Fair) Skin");
  // const [shotType, setShotType] = useState("Full Body");
  const [dress, setDress] = useState("");
  const [background, setBackground] = useState("Soft Beige Gradient");
  const [pose, setPose] = useState("Classic Standing Pose");
  const [seed, setSeed] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [autoSeed] = useState(true);
  const [country, setCountry] = useState("India");
  const [generatedImage,setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [model, setModel] = useState(1); // Number of images, default 1
  const [shotType, setShotType] = useState("Full Body"); // Default is "Full Body"
  const [dnaNumber, setDnaNumber] = useState("");
  // const [modelCount, setModelCount] = useState(1); // To track the number of models for "Custom Seed"


  const postOptions = [
    { value: "Post 1", label: "Post 1" },
    { value: "Post 2", label: "Post 2" },
    { value: "Post 3", label: "Post 3" },
    { value: "Post 4", label: "Post 4" },
  ];

  const generateImage = async () => {
    setLoading(true);
    try {
      const payload = {
        gender,
        country,
        age: Number(age), // Ensure numerical values are sent as numbers
        hair_color: hairColor,
        hair_type: hairType,
        eye_color: eyeColor,
        skin_color: skinColor,
        shot_type: shotType,
        dress: dress || "", // Fallback to empty string if not set
        background,
        pose,
        seed: autoSeed ? null : seed, // Send null if autoSeed is true
        auto_seed: autoSeed,
        num_images: Number(numImages), // Ensure numerical values are numbers
      };
  
      console.log("Payload:", payload); // Debugging step
  
      const response = await fetch("http://localhost:5000/proxy/generate-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate the model. Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response Data:", data); // Debugging step
      setGeneratedImage(data.image_urls[0]); // Adjust according to actual API response structure
    } catch (error) {
      console.error("Error during generation:", error);
      alert("Error generating the model. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-full md:w-1/5" : "w-0"} bg-gray-900 transition-all duration-300 overflow-hidden`}
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
              <label className="block font-serif">Country 🌍</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g., India"
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-purple-500"
              />
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
              >
                <option>Black</option>
                <option>Brown</option>
                <option>Blonde</option>
              </select>
            </div>

            {/* Hair Type */}
            <div className="space-y-2">
              <label className="block font-serif">Hair Type 💇‍♀️</label>
              <select
                value={hairType}
                onChange={(e) => setHairType(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
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
              >
                <option>Black</option>
                <option>Brown</option>
                <option>Blue</option>
              </select>
            </div>

            {/* Skin Color */}
            <div className="space-y-2">
              <label className="block font-serif">Skin Color👩‍🦳</label>
              <select
                value={skinColor}
                onChange={(e) => setSkinColor(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
              >
                <option>Very Light (Fair) Skin</option>
                <option>Light Skin</option>
                <option>Medium Skin</option>
                <option>Dark Skin</option>
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
              />
            </div>

            {/* Pose */}
            <div className="space-y-2">
              <label className="block font-serif">Pose🤸</label>
              <select
                value={pose}
                onChange={(e) => setPose(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
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
              >
                <option>Soft Beige Gradient</option>
                <option>Nature Scene</option>
                <option>Solid Blue</option>
              </select>
            </div>

            {/* Seed */}
            <div className="space-y-2">
              <label className="block font-serif">Model Seed 🔮</label>
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Auto Seed */}
            <div className="space-y-4">
  <label className="block font-serif font-medium">Choose Seed Type ✨</label>
  <div className="flex flex-col space-y-2">
    {/* Full Body Button */}
    <button
      className={`p-3 rounded flex items-center ${shotType === "Full Body" ? "border-white-500" : "border-gray-700"}`}
      onClick={() => setShotType("Full Body")}
    >
      <span
        className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Full Body" ? "border-white bg-white" : "border-gray-500"}`}
      ></span>
      Auto Generate
    </button>

    {/* Half Body Button */}
    <button
      className={`p-3 rounded flex items-center ${shotType === "Half Body" ? "border-white-500" : "border-gray-700"}`}
      onClick={() => setShotType("Half Body")}
    >
      <span
        className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Half Body" ? "border-white bg-white" : "border-gray-500"}`}
      ></span>
      Custom Seed
    </button>
  </div>

  {/* Model DNA Number Section - Only appears if 'Custom Seed' is selected */}
  {shotType === "Half Body" && (
    <div className="mt-4 space-y-2">
      <label className="block font-serif font-medium">Model DNA Number</label>
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
  {shotType === "Half Body" && (
    <div className="mt-4 space-y-2">
      <label className="block font-serif font-medium">Model DNA Number</label>
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
                onChange={(e) => setModel(e.target.value)}
                className="w-full accent-white"
              />
              <span className="text-white-400">{model}</span>
            </div>

            {/* Select Post */}
            <div className="space-y-2">
  <label className="block font-serif">Select Post 🔥</label>
  <Select
    isMulti
    value={selectedPosts}
    onChange={setSelectedPosts}
    options={postOptions}
    className="text-black"
    styles={{
      control: (provided) => ({
        ...provided,
        backgroundColor: 'black',
        color: 'white',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'gray' : 'black', // Change background when selected
        color: 'white',
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
 
  <div className="flex justify-center items-center h-screen bg-gray-900">
      {generatedImage && (
        <div className="relative group w-80 h-80 md:w-96 md:h-96">
          {/* Image */}
          <img
            src={generatedImage}
            alt="Generated Model"
            className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out"
          />

          {/* Hover Options */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <div className="flex space-x-6">
              {/* Download Button */}
              <a
                href={generatedImage}
                download
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
                    d="M12 16v-8m0 8l-4-4m4 4l4-4m-7 12h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">Download</span>
              </a>

              {/* Delete Button */}
              <button
                onClick={() => setGeneratedImage(null)}
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

              {/* Share Button */}
              <button
                onClick={() => console.log('Share functionality')}
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
            </div>
          </div>
        </div>
      )}
    </div>

</div>

          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col items-center justify-start px-6 py-10">
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

        {/* Content */}
        <div className="text-center w-full py-12">
          <h1 className="text-4xl py-2 font-bold text-white mb-4 font-serif">
            AI4FI - Fashion Model Generation ✨

          </h1>
          <p className="text-3xl font-bold text-gray-200 mb-4">
            Create Photorealistic Fashion Model Images with Custom Attributes 🔮
          </p>
          <hr className="border-gray-600 my-4" />
          <p className="text-xl text-gray-400">
            Powered by ApricityTS💡AI-Driven Fashion Modeling  ✨
          </p>
        </div>
        {/* Display the generated image */}
  {generatedImage && (
    <div className="mt-6">
      <img
        src={generatedImage}
        alt="Generated Model"
        className="w-3/4 mx-auto rounded shadow-lg"
      />
    </div>
  )}
      </main>
    </div>
  );
};

export default ModelGeneratorUI;
