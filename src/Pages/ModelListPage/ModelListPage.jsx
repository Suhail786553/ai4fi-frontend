// import { useState } from "react";
// import { ArrowLeft, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const modelImages = [
//   {
//     id: 1,
//     url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
//     name: "Model 1",
//   },
//   {
//     id: 2,
//     url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
//     name: "Model 2",
//   },
//   {
//     id: 3,
//     url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
//     name: "Model 3",
//   },
//   {
//     id: 4,
//     url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
//     name: "Model 4",
//   },
//   {
//     id: 5,
//     url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=400&fit=crop",
//     name: "Model 5",
//   },
//   {
//     id: 6,
//     url: "https://images.unsplash.com/photo-1492288991661-058aa541ff43?w=400&h=400&fit=crop",
//     name: "Model 6",
//   },
// ];

// const ModelListPage = () => {
//   const navigate = useNavigate();
//   const [selectedModels, setSelectedModels] = useState([]);

//   const toggleModelSelection = (model) => {
//     if (selectedModels.includes(model)) {
//       let updateModel = selectedModels.filter((m) => m.id !== model.id);
//       setSelectedModels(updateModel);
//     } else {
//       setSelectedModels((prv) => [...prv, model]);
//     }
//   };

//   const handleContinue = () => {
//     if (selectedModels) {
//       console.log("Selected models:", selectedModels);
//       // Handle the selected models here
//     }
//   };

//   return (
//     <div className='min-h-screen bg-gray-900 p-6'>
//       <div className='max-w-6xl mx-auto'>
//         <div className='flex items-center justify-between mb-8'>
//           <button onClick={() => navigate("/choose-option")} className='flex items-center text-white hover:text-gray-300 transition-colors'>
//             <ArrowLeft className='w-5 h-5 mr-2' />
//             Back
//           </button>
//           <h1 className='text-3xl font-bold text-white'>Select Model Images</h1>
//           <div className='w-20'></div>
//         </div>

//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24'>
//           {modelImages.map((model) => (
//             <div key={model.id} className='relative cursor-pointer group' onClick={() => toggleModelSelection(model)}>
//               <div className='relative aspect-square overflow-hidden rounded-xl'>
//                 <img
//                   src={model.url}
//                   alt={model.name}
//                   className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
//                 />
//                 <div
//                   className={`absolute inset-0 bg-black/40 transition-opacity ${
//                     selectedModels.includes(model) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//                   }`}>
//                   <div className='absolute top-4 right-4'>
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         selectedModels.includes(model) ? "bg-blue-500" : "bg-white"
//                       }`}>
//                       <Check className={`w-5 h-5 ${selectedModels.includes(model) ? "text-white" : "text-gray-900"}`} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <h3 className='mt-2 text-lg font-medium text-white'>{model.name}</h3>
//             </div>
//           ))}
//         </div>

//         <div className='fixed bottom-0 left-0 right-0 bg-gray-800 p-4'>
//           <div className='max-w-6xl h-10 mx-auto flex items-center justify-between'>
//             {selectedModels.length ? <p className='text-white'>Selected: {selectedModels.length}</p> : <div></div>}
//             {selectedModels.length && (
//               <button
//                 onClick={handleContinue}
//                 className=' flex justify-center gap-2 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform'>
//                 Continue
//               </button>
//             )}

//             {/* <button
//               onClick={handleContinue}
//               disabled={selectedModels}
//               className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                 selectedModels ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-700 text-gray-400 cursor-not-allowed"
//               }`}>
//               Continue
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelListPage;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Check ,Trash2} from "react-feather"; // Import icons
import {auth} from '../Firebase/firebaseConfig';

const ModelListPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [activeTab, setActiveTab] = useState("existingModels"); // Default to show Existing Models
  const navigate = useNavigate();
  const predefinedOwnModels = [
    {
      _id: "static1",
      imageUrl: "/images/model-gallery/getimg_ai_img-k4e9aHlFuXN1Iany4WWtE.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static2",
      imageUrl: "/images/model-gallery/getimg_ai_img-5V5fKiMdAjG2zwwmUFXPO.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static3",
      imageUrl: "/images/model-gallery/getimg_ai_img-WiyEuLrwnxiDvnry8GgOR.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static4",
      imageUrl: "/images/model-gallery/getimg_ai_img-n5ffv69x7Iq7d3S1j4EWQ.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static5",
      imageUrl: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static6",
      imageUrl: "/images/model-gallery/getimg_ai_img-2LuGKyxjYnuXThjWTabZ5.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static7",
      imageUrl: "/images/model-gallery/getimg_ai_img-Tf8TWE96xIpkSfnPxd2ob.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static8",
      imageUrl: "/images/model-gallery/getimg_ai_img-u2kY801mtzd3vbPxvcigU.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static9",
      imageUrl: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static10",
      imageUrl: "/images/model-gallery/getimg_ai_img-7BxvLDHU6Gw1fjusT2qYh.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static11",
      imageUrl: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", // Static image URLs
      isOwn: true,
    },
    {
      _id: "static12",
      imageUrl: "/images/model-gallery/img-u2D6ZV51wIFe7hljWA5qN.jpeg", // Static image URLs
      isOwn: true,
    },
  ];
  useEffect(() => {
    // Wait for authentication state to update before fetching models
    const API_BASE_URL = window.location.hostname === "localhost"
        ? "http://localhost:5000/api"
        : "https://ai4fi-backend.onrender.com/api";
  
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        axios
          .get(`${API_BASE_URL}/get-models?userId=${user.uid}`)
          .then((response) => {
            setModels(response.data); // ✅ Store the fetched models
          })
          .catch((error) => {
            console.error("Error fetching models:", error);
          });
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const toggleModelSelection = (model) => {
    if (selectedModels.includes(model)) {
      setSelectedModels((prev) => prev.filter((m) => m._id !== model._id)); // Remove from selection
    } else {
      setSelectedModels((prev) => [...prev, model]); // Add to selection
    }
  };

  const handleContinue = () => {
    console.log("Selected models:", selectedModels);
    // Redirect user to virtual try-on page with selected models
    navigate("/virtualtryon", { state: { selectedModels } });
  };
  const API_BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://ai4fi-backend.onrender.com/api";
  const handleDeleteModel = async (modelId) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-model/${modelId}`);
      setModels((prev) => prev.filter((model) => model._id !== modelId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting model:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate("/choose-option")} className="flex items-center text-white hover:text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Select Model Images</h1>
          <div className="w-20"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8">
          <button
            className={`text-lg font-medium ${activeTab === "existingModels" ? "text-blue-500" : "text-white"}`}
            onClick={() => setActiveTab("existingModels")}
          >
            Generated Models
          </button>
          <button
            className={`text-lg font-medium ${activeTab === "ownModels" ? "text-blue-500" : "text-white"}`}
            onClick={() => setActiveTab("ownModels")}
          >
           Custom Models
          </button>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-24">
          {models
            .filter((model) => {
              const isOwn = model.isOwn === undefined ? false : model.isOwn;
              return activeTab === "ownModels" ? isOwn : !isOwn;
            })
            .map((model) => (
              <div key={model._id} className="relative cursor-pointer group" onClick={() => toggleModelSelection(model)}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={Array.isArray(model.imageUrl) ? model.imageUrl[0] : model.imageUrl}
                    alt={`Model ${model._id}`}
                    className="w-auto h-auto max-w-full max-h-[500px] mx-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${
                      selectedModels.includes(model) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedModels.includes(model) ? "bg-blue-500" : "bg-white"
                        }`}
                      >
                        <Check className={`w-5 h-5 ${selectedModels.includes(model) ? "text-white" : "text-gray-900"}`} />
                      </div>

                       {/* Trash Icon for Deleting Existing Models */}
                       {activeTab === "existingModels" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent selection on delete click
                            handleDeleteModel(model._id);
                          }}
                          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"style={{"marginTop":"4px"}}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* Display predefined models when Own Models tab is selected */}
          {activeTab === "ownModels" &&
            predefinedOwnModels.map((model) => (
              <div key={model._id} className="relative cursor-pointer group" onClick={() => toggleModelSelection(model)}>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={model.imageUrl}
                    alt={`Model ${model._id}`}
                    className="w-auto h-auto max-w-full max-h-[500px] mx-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${
                      selectedModels.includes(model) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedModels.includes(model) ? "bg-blue-500" : "bg-white"
                        }`}
                      >
                        <Check className={`w-5 h-5 ${selectedModels.includes(model) ? "text-white" : "text-gray-900"}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
          <div className="max-w-6xl h-10 mx-auto flex items-center justify-between">
            {selectedModels.length ? <p className="text-white">Selected: {selectedModels.length}</p> : <div></div>}
            {selectedModels.length > 0 && (
              <button
                onClick={handleContinue}
                className="flex justify-center gap-2 items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-800 hover:to-indigo-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelListPage;

