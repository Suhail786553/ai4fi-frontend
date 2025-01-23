// import React from "react";
const UseCases = () => {
  const useCases = [
    {
      title: "Revolutionizing Fashion Imagery",
      description:
        "AI4FI transforms how fashion retailers showcase their products by eliminating the need for traditional photoshoots. With AI-generated models and digital clothing overlays, retailers can create high-quality visuals faster and more cost-effectively.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
    },
    {
      title: "For Online Retailers",
      description:
        "AI4FI provides a seamless shopping experience by offering hyper-realistic visuals of your clothing on diverse models. Showcase your inventory faster, reduce return rates, and enhance customer engagement.",
      image: "https://www.specialityfoodmagazine.com/assets/images/other/online_marketplaces.jpg",
    },
    {
      title: "For Designers and Boutique Stores",
      description:
        "Expand your reach with affordable, scalable imagery. Launch new designs without delays or the cost of traditional photoshoots, and customize models to represent your brand’s identity.",
      image: "https://static1.gensler.com/uploads/image/10463/filename/RDI_awards_back-40_2000x_1422489269.jpg",
    },
    {
      title: "For Large E-Commerce Platforms",
      description:
        "Scale effortlessly with AI-powered visualization. Manage extensive inventories with consistent, realistic imagery that supports diverse body types, ethnicities, and styles, boosting customer satisfaction.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093",
    },
    {
      title: "Supporting Sustainability",
      description:
        "AI4FI contributes to eco-friendly practices by eliminating physical photoshoots, reducing waste, and minimizing the carbon footprint associated with traditional fashion photography.",
      image: "https://fundsforngosmedia.s3.amazonaws.com/wp-content/uploads/2016/07/28052125/Sustainability-Environmental-C-87504893.jpg",
    },
    {
      title: "Enhancing Customer Confidence",
      description:
        "Increase buyer trust with detailed, realistic visuals that showcase fit, texture, and design, helping customers make confident purchase decisions.",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    },
    {
      title: "Rapid Turnaround for New Collections",
      description:
        "Speed up your time-to-market by generating visuals for entire collections within hours, allowing you to stay ahead of trends and consumer demands.",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    },
    {
      title: "Personalization for Diverse Audiences",
      description:
        "Customize models to cater to various demographics and styles, enabling a personalized shopping experience that resonates with global audiences.",
      image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b",
    },
  ];

  return (
    <section className="bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6 py-16">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-gray-800 tracking-wide">
          Discover How AI is Transforming Fashion
        </h2>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-500 hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <img
                  src={`${useCase.image}?w=800&h=600&fit=crop`}
                  alt={useCase.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30 group-hover:opacity-40 transition duration-300"></div>
              </div>
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
