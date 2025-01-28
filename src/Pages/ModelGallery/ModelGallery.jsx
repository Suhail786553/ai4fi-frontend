import { useState } from "react";

const ImageGrid = () => {
  const [activeCategory, setActiveCategory] = useState("formal");

  // Categorized images
  const categories = {
    formal: [
      { src: "/images/model-gallery/getimg_ai_img-k4e9aHlFuXN1Iany4WWtE.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-5V5fKiMdAjG2zwwmUFXPO.jpeg", alt: "Formal Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-WiyEuLrwnxiDvnry8GgOR.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-n5ffv69x7Iq7d3S1j4EWQ.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-VYX8rkxiDNldP7JlsjbAP.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-3dgtBl3g8uCQAqPRgeqD8.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-YBnuCV3rTPdjEg1cDJLsU.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-tXykuPsdhs1QFtDuxFJl9.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-0XRRVC9pKYP8T0lY5Dxrl.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-iPWj0LsdnouE6F38sJwyS.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-IXUgq8oTciYDVF4hbUqyV.jpeg", alt: "Formal Image 1" },
      { src: "/images/model-gallery/", alt: "Formal Image 1" },
      { src: "/images/model-gallery/", alt: "Formal Image 1" },
      { src: "/images/model-gallery/", alt: "Formal Image 1" },
      { src: "/images/model-gallery/", alt: "Formal Image 1" },
    ],
    casual: [
      { src: "/images/model-gallery/getimg_ai_img-4BOumNv2sxEm2z8ePMFNb.jpeg", alt: "Casual Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", alt: "Casual Image 2" },
    ],
    lingerie: [
      { src: "/images/model-gallery/getimg_ai_img-7BxvLDHU6Gw1fjusT2qYh.jpeg", alt: "Lingerie Image 1" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
      { src: "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", alt: "Lingerie Image 2" },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 min-h-screen p-10" style={{ marginTop: "-64px" }}>
    {/* Fixed Buttons */}
    <div className="fixed left-10 z-50 flex space-x-4" style={{ top: "90px" }}>
  {Object.keys(categories).map((category) => (
    <button
      key={category}
      className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform shadow-md ${
        activeCategory === category
          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white scale-105 shadow-lg"
          : "bg-white text-black hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-500 hover:text-white"
      }`}
      onClick={() => setActiveCategory(category)}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </button>
  ))}
</div>

  
    {/* Image Grid */}
    <div className="pt-24">
      {Object.entries(categories).map(([category, images]) => (
        <section
          key={category}
          className={`transition-all duration-300 ${activeCategory === category ? "block" : "hidden"} min-h-screen`}
        >
          {/* Image Grid */}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 items-start">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative bg-gray-800 rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transform transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
  
  );
};

export default ImageGrid;

