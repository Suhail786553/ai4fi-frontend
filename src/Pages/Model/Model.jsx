import { useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Select from "react-select";
import "modern-normalize";
// import './Model.css'

const ModelGeneratorUI = () => {
  const [age, setAge] = useState(25);
  const [model, setModel] = useState(4);
  const [gender, setGender] = useState("Male");
  const [hairColor, setHairColor] = useState("Black");
  const [eyeColor, setEyeColor] = useState("Black");
  const [skinColor, setSkinColor] = useState("Very Light (Fair) Skin");
  const [shotType, setShotType] = useState("Full Body");
  const [dress, setDress] = useState("");
  const [background, setBackground] = useState("Soft Beige Gradient");
  const [setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [dnaNumber, setDnaNumber] = useState(0); // Initial DNA Number


  const postOptions = [
    { value: "Post 1", label: "Post 1" },
    { value: "Post 2", label: "Post 2" },
    { value: "Post 3", label: "Post 3" },
    { value: "Post 4", label: "Post 4" },
  ];

  const generateImage = async () => {
    setLoading(true);
    try {
      // Simulate API Call
      setTimeout(() => {
        setGeneratedImage("https://via.placeholder.com/400");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "w-full md:w-1/5" : "w-0"
          } bg-gray-900 transition-all duration-300 overflow-hidden`}
      >
        <div className="h-screen overflow-y-auto">
          <div className="p-5 space-y-6">
            <h2 className="text-3xl font-bold text-white-600 font-sans">Model Inputs🛠️</h2>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block font-serif">Gender👩‍🦰</label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  {gender === "Male" ? (
                    <FaMale className="text-white-600" />
                  ) : (
                    <FaFemale className="text-white-600" />
                  )}
                </div>
              </div>
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

            {/* Age */}
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
                  className={`p-3 rounded flex items-center ${shotType === "Full Body" ? "border-white-500" : "border-gray-700"
                    }`}
                  onClick={() => setShotType("Full Body")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Full Body" ? "border-white bg-white" : "border-gray-500"
                      }`}
                  ></span>
                  Full Body
                </button>
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Half Body" ? "border-white-500" : "border-gray-700"
                    }`}
                  onClick={() => setShotType("Half Body")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Half Body" ? "border-white bg-white" : "border-gray-500"
                      }`}
                  ></span>
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

            {/* pose */}
            <div className="space-y-2">
              <label className="block font-serif">Pose🤸</label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
              >
                <option>Classic Standing Pose</option>
                <option>Hands on Hips</option>
                <option>Walking Pose</option>
                <option>Crossed Arms</option>
                <option>Side Profile</option>
                <option>Over the Shoulder</option>
                <option>Lean Against Wall</option>
                <option>Hands in Pockest</option>
              </select>
            </div>
            {/* Background */}
            <div className="space-y-2">
              <label className="block font-serif">Background 🖼️ </label>
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
            <div className="space-y-2">
              <label className="block font-serif">Custom Background🖼️</label>
              <input
                type="text"
                value={dress}
                onChange={(e) => setDress(e.target.value)}
                placeholder="e.g., Sunset beach"
                className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-4">
              <label className="block font-serif font-medium">Choose Seed Type ✨</label>
              <div className="flex flex-col space-y-2">
                {/* Full Body Button */}
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Full Body" ? "border-white-500" : "border-gray-700"
                    }`}
                  onClick={() => setShotType("Full Body")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Full Body" ? "border-white bg-white" : "border-gray-500"
                      }`}
                  ></span>
                  Auto Generate
                </button>

                {/* Half Body Button */}
                <button
                  className={`p-3 rounded flex items-center ${shotType === "Half Body" ? "border-white-500" : "border-gray-700"
                    }`}
                  onClick={() => setShotType("Half Body")}
                >
                  <span
                    className={`w-5 h-5 flex-shrink-0 mr-3 rounded-full border-2 ${shotType === "Half Body" ? "border-white bg-white" : "border-gray-500"
                      }`}
                  ></span>
                  Custom Seed
                </button>
              </div>

              {/* Model DNA Number Section */}
              {shotType === "Half Body" && (
                <div className="mt-4 space-y-2">
                  <label className="block font-serif font-medium">Model DNA Number</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={dnaNumber}
                      onChange={(e) => setDnaNumber(Number(e.target.value))}
                      className="w-full p-3 rounded bg-black text-white focus:ring-2 focus:ring-white"
                      min="0"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block font-serif font-medium">Model DNA Number:1233214321</label>
            </div>
            {/* numbers of model generate */}
            <div className="space-y-2">
              <label className="block font-serif font-medium">Number of Models (Max4)</label>
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
            {/* select post */}
            <div className="space-y-2">
              <label className="block font-serif text-white">Select Post(s)</label>
              <Select
                options={postOptions}
                isMulti
                value={selectedPosts}
                onChange={(selected) => setSelectedPosts(selected)}
                className="w-full rounded text-white"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "black", // Matches the slider background
                    border: "none", // Removed border
                    borderRadius: "0.375rem", // Rounded edges
                    color: "white", // Text color
                    padding: "0.375rem", // Align with slider spacing
                    boxShadow: "none", // Remove focus shadow
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "black", // Dropdown background
                    borderRadius: "0.375rem", // Match rounded edges
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "grey" : "black", // Grey hover effect
                    color: "white", // White text color
                    cursor: "pointer", // Pointer on hover
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "black", // Background for selected options
                    borderRadius: "0.375rem", // Match rounded edges
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "white", // Text color inside tags
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "white", // Text color for remove button
                    ":hover": {
                      backgroundColor: "grey", // Grey background on hover
                      color: "black", // Black text on hover
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "white", // White placeholder color
                  }),
                }}
                placeholder="Choose Post(s) ✨"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateImage}
              className="bg-black border-2 hover:bg-black text-white w-full py-3 rounded shadow-lg transition duration-300 font-sans"
            >
              {loading ? "Generating...✨" : "Generate Image ✨"}
            </button>
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
      </main>
    </div>
  );
};

export default ModelGeneratorUI;