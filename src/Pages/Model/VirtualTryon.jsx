import  { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        AI4FI TryOn Room
      </h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start">
          {/* Browse Models */}
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Model Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBrowseModelImages}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
          </div>
          {/* Browse Garment */}
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Garment Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBrowseGarmentImage}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
          </div>
          {/* TryOn Type */}
          <div className="mb-6 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              TryOn Type
            </label>
            <select
              value={tryOnType}
              onChange={(e) => setTryOnType(e.target.value)}
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="default">Default</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          {/* Generate TryOn */}
          <button
            onClick={handleGenerateTryOn}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Generate TryOn
          </button>
        </div>

        {/* Center Garment and Results */}
        <div className="col-span-2 flex flex-col items-center space-y-6">
          {/* Garment Image */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Garment Image
            </h2>
            {garmentImage ? (
              <img
                src={URL.createObjectURL(garmentImage)}
                alt="Garment"
                className="w-52 h-52 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-52 h-52 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No Garment Selected
              </div>
            )}
          </div>
          {/* Results */}
          <div className="grid grid-cols-2 gap-4">
            {tryOnResults.length > 0 ? (
              tryOnResults.map((result, index) => (
                <img
                  key={index}
                  src={result}
                  alt={`Result ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md"
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No Results Generated
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar for Model Images */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Uploaded Model Images
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {modelImages.length > 0 ? (
              modelImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Model ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No Models Uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnRoom;
