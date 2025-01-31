import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

const TryOnRoom = () => {
  const [modelImage, setModelImage] = useState([]); // Array for model images
  const [garmentImage, setGarmentImage] = useState(null); // Single file for garment image
  const [tryOnResults, setTryOnResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("tops");

  const handleBrowseModelImages = async (e) => {
    const files = Array.from(e.target.files);
    const compressedFiles = await Promise.all(files.map((file) => compressImage(file)));
    setModelImage(compressedFiles);
  };

  // Handle selecting and compressing garment image
  const handleBrowseGarmentImage = async (e) => {
    const file = e.target.files[0];
    const compressedFile = await compressImage(file);
    setGarmentImage(compressedFile);
  };

  // Handle generating try-on results
  const handleGenerateTryOn = async () => {
    if (!modelImage.length || !garmentImage) {
      alert("Please upload both model and garment images.");
      return;
    }

    console.log("Model Images:", modelImage);
    console.log("Garment Image:", garmentImage);

    try {
      const formData = new FormData();

      // Append model images as files
      modelImage.forEach((file) => {
        formData.append("model_image", file); // 'model_image' key matches backend
      });

      // Append garment image as file
      formData.append("garment_image", garmentImage);

      // Append other fields
      formData.append("category", selectedCategory);

      // POST request with axios, Content-Type will be set automatically
      const response = await axios.post("http://localhost:5000/proxy/virtual-try-on", formData);

      setTryOnResults(response.data.results); // Update results
    } catch (error) {
      console.error("Error generating try-on:", error.response?.data || error.message);
      alert(`Failed to generate try-on: ${error.response?.data?.detail || "Unknown error"}`);
    }
  };

  // Compress image utility
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // 200kb
      maxWidthOrHeight: 500, // Resize image for smaller dimensions
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  // Convert to base64 utility
  // const convertToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 content
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col'>
      {/* Header */}
      <header className='bg-indigo-700 text-white py-4 px-6 flex items-center justify-between shadow-md'>
        <h1 className='text-2xl font-bold'>AI4FI TryOn Room</h1>
        <button
          onClick={() => (window.location.href = "/")}
          className='bg-white text-indigo-700 px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105'>
          Back to Home
        </button>
      </header>

      <div className='flex flex-1 flex-col lg:flex-row'>
        {/* Sidebar */}
        <aside className='lg:w-1/4 bg-white shadow-lg p-6 space-y-6 flex-shrink-0 rounded-lg'>
          {/* Upload Model Images */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Upload Model Images</label>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleBrowseModelImages}
              className='w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
          {/* Upload Garment Image */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Upload Garment Image</label>
            <input
              type='file'
              accept='image/*'
              onChange={handleBrowseGarmentImage}
              className='w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
          </div>
          {/* TryOn Type */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'>
              <option value='default'>tops</option>
              <option value='advanced'>bottoms</option>
              <option value='advanced'>one-pieces</option>
            </select>
          </div>
          {/* Generate TryOn Button */}
          <button
            onClick={handleGenerateTryOn}
            className='w-full bg-indigo-600 py-2 px-4 rounded-lg text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform duration-300 hover:scale-105'>
            Generate TryOn
          </button>
        </aside>

        {/* Main Content */}
        <main className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
          {/* Model Images */}
          <div className='col-span-1 space-y-4'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='bg-gray-200 h-32 flex items-center justify-center rounded-lg shadow-md overflow-hidden'>
                {modelImage[index] ? (
                  <img src={URL.createObjectURL(modelImage[index])} alt={`Model ${index + 1}`} className='w-full h-full object-cover' />
                ) : (
                  <span className='text-gray-500 text-sm'>Model Image {index + 1}</span>
                )}
              </div>
            ))}
          </div>

          {/* Garment Image */}
          <div className='col-span-1 flex items-center justify-center bg-gray-100 rounded-lg shadow-md'>
            {garmentImage ? (
              <img src={URL.createObjectURL(garmentImage)} alt='Garment' className='w-40 h-40 object-cover rounded-lg' />
            ) : (
              <span className='text-gray-500 text-sm'>No Garment Selected</span>
            )}
          </div>

          {/* TryOn Results */}
          <div className='col-span-1 space-y-4'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='bg-gray-200 h-32 flex items-center justify-center rounded-lg shadow-md overflow-hidden'>
                {tryOnResults[index] ? (
                  <img src={tryOnResults[index]} alt={`Result ${index + 1}`} className='w-full h-full object-cover' />
                ) : (
                  <span className='text-gray-500 text-sm'>Result {index + 1}</span>
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
