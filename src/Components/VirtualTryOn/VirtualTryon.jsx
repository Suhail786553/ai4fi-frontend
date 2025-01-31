import React, { useState } from "react";
import { Upload, Shirt as Tshirt, Image as ImageIcon, RefreshCw, X } from "lucide-react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { AnimatedBeamCard } from "./AnimatedComponet";

function VirtualTryon() {
  const [modelImages, setModelImages] = useState([]);
  const [garmentImage, setGarmentImage] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [resultImage, setResultImage] = useState([]);
  const [category, setCategory] = useState("tops");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e, type) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Math.random().toString(36).substring(7),
          url: e.target?.result,
          type,
          file: file,
        };

        if (type === "model") {
          setModelImages((prev) => [...prev, newImage]);
        } else {
          setGarmentImage(newImage);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id, type) => {
    if (type === "model") {
      setModelImages((prev) => prev.filter((img) => img.id !== id));
      if (selectedModel?.id === id) {
        setSelectedModel(null);
      }
    } else {
      setGarmentImage(null);
    }
  };

  // Handle generating try-on results
  const tryOn = async () => {
    if (modelImages.length === 0 || garmentImage === null) {
      alert("Please upload 1 model and garments image");
      return;
    }
    try {
      setIsGenerating(true);
      const formData = new FormData();

      // Append model images as files
      modelImages.forEach((file) => {
        formData.append("model_image", file.file); // 'model_image' key matches backend
      });

      // Append garment image as file
      formData.append("garment_image", garmentImage.file);

      // Append other fields
      formData.append("category", category);

      // POST request with axios, Content-Type will be set automatically
      const response = await axios.post("http://localhost:5000/proxy/virtual-try-on", formData);
      console.log("data", response.data.output_urls);
      setResultImage(response.data.output_urls); // Update results
      setIsGenerating(false);
    } catch (error) {
      setIsGenerating(false);
      console.error("Error generating try-on:", error.response?.data || error.message);
      alert(`Failed to generate try-on: ${error.response?.data?.detail || "Unknown error"}`);
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1, // 200kb
      maxWidthOrHeight: 500, // Resize image for smaller dimensions
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  console.log(resultImage);

  return (
    <div className='h-screen bg-gray-800 overflow-hidden'>
      {/* Header */}
      <header className='bg-gray-900 text-white py-4 px-6 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Tshirt className='h-6 w-6' />
          <h1 className='text-xl font-bold'>AI4FI TryOn Room</h1>
        </div>
        <button className=' justify-center gap-2 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform'>
          Go back
        </button>
      </header>

      <div className='w-full h-[calc(100vh_-_72px)] overflow-hidden'>
        <div className='flex h-full lg:grid-cols-2 gap-2'>
          {/* Model Images Upload */}
          <div className='basis-4/12 p-4 h-full'>
            <div>
              <div className='bg-gray-900 p-4 rounded-lg shadow-sm'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-md font-semibold text-gray-100'>Upload Model Photos</h2>
                  <span className='text-white'>{modelImages.length > 0 && modelImages.length}</span>
                </div>
                <div className='border-2 border-dashed border-gray-500 rounded-lg p-4'>
                  <label className='flex gap-2 items-center justify-center cursor-pointer'>
                    <Upload className='w-6 h-6 text-gray-400' />
                    <span className='mt-2 text-sm text-gray-500'>Upload multiple model photos</span>
                    <input type='file' multiple accept='image/*' className='hidden' onChange={(e) => handleImageUpload(e, "model")} />
                  </label>
                </div>

                {/* Model Preview Grid */}
                {/* <div className='grid grid-cols-3 gap-4 mt-4'>
                {modelImages.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-lg overflow-hidden cursor-pointer ${
                      selectedModel?.id === img.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedModel(img)}>
                    <img src={img.url} alt='Model' className='w-full h-32 object-cover' />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id, "model");
                      }}
                      className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'>
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div> */}
              </div>

              <div className='py-3 mb-3'>
                <label className='block text-sm font-medium mb-2 text-gray-100'>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full border text-gray-100 bg-gray-900 rounded-lg px-4 py-2'>
                  <option value='tops'>Tops</option>
                  <option value='bottoms'>Bottoms</option>
                  <option value='one-pieces'>One-Pieces</option>
                </select>
              </div>
            </div>
            <div>
              {/* Garment Upload */}
              <div className='bg-gray-900 p-6 rounded-lg shadow-sm pb-10'>
                <h2 className='text-lg font-semibold mb-4 text-gray-100'>Upload Garment</h2>
                <div className='border-2 border-dashed border-gray-500 rounded-lg p-4'>
                  <label className='flex justify-center gap-2 items-center cursor-pointer'>
                    <ImageIcon className='w-6 h-6 text-gray-400' />
                    <span className='mt-2 text-sm text-gray-500'>Upload garment photo</span>
                    <input type='file' accept='image/*' className='hidden' onChange={(e) => handleImageUpload(e, "garment")} />
                  </label>
                </div>

                {/* Garment Preview */}
                {garmentImage && (
                  <div className='relative mt-4'>
                    <img src={garmentImage.url} alt='Garment' className='w-full h-36 object-contain rounded-lg' />
                    <button
                      onClick={() => removeImage(garmentImage.id, "garment")}
                      className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'>
                      <X className='w-4 h-4' />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={tryOn}
                className=' mt-6 w-full cursor-pointer justify-center gap-2 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform'>
                {isGenerating ? (
                  <div className='flex items-center gap-2 justify-center'>
                    <RefreshCw className='h-5 w-5 animate-spin' />
                    <span>Generating...</span>
                  </div>
                ) : (
                  "Try on Garments"
                )}
              </button>
            </div>
          </div>
          <div className='bg-gray-900 p-6 shadow-sm w-full  basis-8/8  h-[calc(100vh_-_72px)] overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4 text-gray-100'>Try-On Result</h2>
            <div className=' rounded-lg pb-10 flex w-full flex-col'>
              {modelImages.length > 0 ? (
                modelImages.map((model, i) => {
                  return (
                    <AnimatedBeamCard
                      key={i}
                      id={i}
                      isGenerating={isGenerating}
                      model={model}
                      garmentImage={garmentImage}
                      resultImage={resultImage}
                    />
                  );
                })
              ) : (
                <div className='text-gray-400 text-center'>
                  <ImageIcon className='w-16 h-16 mx-auto mb-4' />
                  <p>Select a model and garment, then click "Try On Garment" to see the result</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualTryon;
