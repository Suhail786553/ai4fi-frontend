import { useState } from "react";
import axios from "axios";

const TryOnRoom = () => {
  const [modelImages, setModelImages] = useState([]);
  const [garmentImage, setGarmentImage] = useState(null);
  const [tryOnResults, setTryOnResults] = useState([]);
  const [tryOnType, setTryOnType] = useState("default");

  // Handlers
  const handleBrowseModelImages = (e) => {
    const files = Array.from(e.target.files);
    setModelImages(files);
  };

  const handleBrowseGarmentImage = (e) => {
    const file = e.target.files[0];
    setGarmentImage(file);
  };

  const handleGenerateTryOn = async () => {
    if (!garmentImage || modelImages.length === 0) {
      alert("Please upload both model images and a garment image.");
      return;
    }

    const formData = new FormData();
    formData.append("garmentImage", garmentImage);
    modelImages.forEach((image, index) => {
      formData.append(`modelImage${index + 1}`, image);
    });
    formData.append("tryOnType", tryOnType);

    try {
      const response = await axios.post(
        "https://your-backend-api-url/virtual-tryon", // Replace with your API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTryOnResults(response.data.results);
    } catch (error) {
      console.error("Error generating try-on:", error);
      alert("Failed to generate try-on.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-bold">AI4FI TryOn Room</h1>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-white text-indigo-700 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105"
        >
          Back to Home
        </button>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-1/4 bg-white shadow-lg p-6 space-y-6 flex-shrink-0 rounded-lg">
          {/* Upload Model Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Model Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBrowseModelImages}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Upload Garment Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Garment Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBrowseGarmentImage}
              className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* TryOn Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              TryOn Type
            </label>
            <select
              value={tryOnType}
              onChange={(e) => setTryOnType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Default</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          {/* Generate TryOn Button */}
          <button
            onClick={handleGenerateTryOn}
            className="w-full bg-indigo-600 py-2 px-4 rounded-lg text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105"
          >
            Generate TryOn
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {/* Model Images */}
          <div className="col-span-1 space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 h-32 flex items-center justify-center rounded-lg shadow-md overflow-hidden"
              >
                {modelImages[index] ? (
                  <img
                    src={URL.createObjectURL(modelImages[index])}
                    alt={`Model ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Model Image {index + 1}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Garment Image */}
          <div className="col-span-1 flex items-center justify-center bg-gray-100 rounded-lg shadow-md">
            {garmentImage ? (
              <img
                src={URL.createObjectURL(garmentImage)}
                alt="Garment"
                className="w-40 h-40 object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Garment Selected</span>
            )}
          </div>

          {/* TryOn Results */}
          <div className="col-span-1 space-y-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 h-32 flex items-center justify-center rounded-lg shadow-md overflow-hidden"
              >
                {tryOnResults[index] ? (
                  <img
                    src={tryOnResults[index]}
                    alt={`Result ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Result {index + 1}
                  </span>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TryOnRoom;
