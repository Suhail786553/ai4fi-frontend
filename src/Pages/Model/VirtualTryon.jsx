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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 text-center text-xl font-bold">
        AI4FI TryOn Room
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white p-4 flex flex-col">
          {/* Upload Model Images */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Upload Model Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBrowseModelImages}
              className="w-full text-sm bg-gray-800 text-gray-200 py-2 px-4 rounded"
            />
          </div>
          {/* Upload Garment Image */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Upload Garment Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBrowseGarmentImage}
              className="w-full text-sm bg-gray-800 text-gray-200 py-2 px-4 rounded"
            />
          </div>
          {/* TryOn Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              TryOn Type
            </label>
            <select
              value={tryOnType}
              onChange={(e) => setTryOnType(e.target.value)}
              className="w-full bg-gray-800 text-gray-200 py-2 px-4 rounded"
            >
              <option value="default">Default</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          {/* Generate TryOn Button */}
          <button
            onClick={handleGenerateTryOn}
            className="w-full bg-indigo-600 py-2 px-4 rounded text-center text-white hover:bg-indigo-700"
          >
            Generate TryOn
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 grid grid-cols-3 gap-4 p-6">
          {/* Model Images */}
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-blue-100 h-28 flex items-center justify-center rounded-lg shadow">
                {modelImages[index] ? (
                  <img
                    src={URL.createObjectURL(modelImages[index])}
                    alt={`Model ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-sm text-gray-500">
                    Model Image {index + 1}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Garment Image */}
          <div className="flex flex-col items-center justify-center bg-green-100 rounded-lg shadow">
            {garmentImage ? (
              <img
                src={URL.createObjectURL(garmentImage)}
                alt="Garment"
                className="w-40 h-40 object-cover rounded-lg"
              />
            ) : (
              <span className="text-sm text-gray-500">No Garment Selected</span>
            )}
          </div>

          {/* TryOn Results */}
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-blue-100 h-28 flex items-center justify-center rounded-lg shadow">
                {tryOnResults[index] ? (
                  <img
                    src={tryOnResults[index]}
                    alt={`Result ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-sm text-gray-500">
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
