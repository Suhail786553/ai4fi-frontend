"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import './Home.css';
import topimg from './top image.png';
import trdan from './trdan.jpeg'
import ai from './ai.jpeg';

const HeroSection = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  // State to track if sections are in view
  const [isInView1, setIsInView1] = useState(false);
  const [isInView2, setIsInView2] = useState(false);

  // Set up the Intersection Observer API
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // When the section comes into view, set state to true
          if (entry.target === ref1.current) {
            setIsInView1(true);
          } else if (entry.target === ref2.current) {
            setIsInView2(true);
          }
        }
      });
    }, {
      threshold: 0.5, // Trigger when 50% of the section is in the viewport
    });

    // Observe both sections
    if (ref1.current) observer.observe(ref1.current);
    if (ref2.current) observer.observe(ref2.current);

    // Cleanup observer
    return () => {
      if (ref1.current) observer.unobserve(ref1.current);
      if (ref2.current) observer.unobserve(ref2.current);
    };
  }, []);

  useEffect(() => {
    // When ref1 comes into view, add animation classes
    if (isInView1) {
      ref1.current?.classList.add('animate-fade-in', 'animate-fade-in-delay');
    }
    // When ref2 comes into view, add animation classes
    if (isInView2) {
      ref2.current?.classList.add('animate-fade-in', 'animate-fade-in-delay');
    }
  }, [isInView1, isInView2]);

  const faqs = [
    { question: "Can I get more credits?", answer: "Yes, you can purchase additional credits anytime." },
    { question: "Can I change my plan later?", answer: "Absolutely! You can upgrade or downgrade your plan anytime." },
    { question: "What if I decide to cancel?", answer: "You can cancel your subscription without any extra charges." },
    { question: "What about the returns and refunds?", answer: "Refund policies are available on specific conditions." },
    { question: "Will my unused credits roll over to the next month?", answer: "No, unused credits do not roll over." },
    { question: "How do you use my photos?", answer: "Your photos are used to personalize your experience." },
    { question: "Is the payment service secure?", answer: "Yes, we use secure and encrypted payment services." },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };



  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });

  };

  return (
    <>
      {/* Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        className=" relative overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 lg:p-20 bg-gradient-to-br from-white to-gray-100"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #5A00FF 0%, transparent 30%)`,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />

        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Revolutionize Your Fashion Business
            with AI Powered Visual Try-On
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-black-600 text-lg leading-relaxed"
          >
            Say goodbye to costly photoshoots. Create
            stunning, customizable <br></br>AI models and showcase your
            garments
          </motion.p>
          <a href="/model"><motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#5A00FF] hover:bg-[#4a00e6] transition-transform duration-300 text-white font-semibold py-3 px-6 rounded-md shadow-lg"
          >
            Get Started for Free
          </motion.button></a>
          {/* <p className="text-gray-500 text-sm">No credit card required.</p> */}

          {/* User Ratings */}
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-6">
            <div className="flex -space-x-2">
              {["45", "47", "48", "49"].map((id, index) => (
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  key={index}
                  src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"
                    }/${id}.jpg`}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 font-medium">
                Loved by <span className="font-bold">153,000+</span> users
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center relative z-10"
        >
          <img
            src={topimg}
            alt="AI Outfit"
            className="w-full max-w-sm lg:max-w-md rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </section>
      {/* section1 */}
      <section
  ref={ref2}
  className="relative bg-white py-16 px-6 lg:px-24 overflow-hidden"
>
  {/* Background Gradient Accent */}
  <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full filter blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full filter blur-3xl animate-pulse"></div>

  {/* Container */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
    {/* Left Section: Content */}
    <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight animate-fade-in">
        The Challenges of Traditional Fashion Photography
      </h1>
      <p className="text-lg text-gray-700 animate-fade-in-delay">
        Expensive model hiring and photoshoots. Time-consuming processes for
        selecting models, locations, and photographers. Limited flexibility for
        customization and quick updates
      </p>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Expensive costs for hiring models, photographers, and renting locations.</p>
        </li>
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Time-consuming processes for organizing shoots and selecting the right team.</p>
        </li>
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Limited flexibility for making quick updates or tailoring visuals to new ideas.</p>
        </li>
      </ul>
    </div>

    {/* Right Section: Visual Comparison */}
    <div className="grid grid-cols-2 gap-6">
      {/* Before Image */}
      <div className="relative group">
        <span className="absolute top-4 left-4 bg-gray-900 text-white text-sm px-3 py-1 rounded-full shadow-lg">
          Traditional
        </span>
        <img
          src={trdan}
          className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-auto lg:h-[63vh] object-cover"
        />
      </div>
      {/* After Image */}
      <div className="relative group">
        <span className="absolute top-4 left-4 bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-lg">
          AI-Generated
        </span>
        <img
          src={ai}
          alt="AI-Generated Photoshoot"
          className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-auto lg:h-[63vh] object-cover"
        />
      </div>
    </div>
  </div>
</section>

      {/* section2 */}
      <section
  ref={ref2}
  className="relative bg-gradient-to-br from-blue-100 via-teal-50 to-blue-200 py-16 px-6 lg:px-24 overflow-hidden"
>
  {/* Background Gradient Accent */}
  <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>

  {/* Container */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
    {/* Left Section: Images */}
    <div className="grid grid-cols-2 gap-6">
      {/* Before Image */}
      <div className="relative group">
        <span className="absolute top-4 left-4 bg-gray-900 text-white text-sm px-3 py-1 rounded-full shadow-lg">
          Traditional
        </span>
        <img
          src="https://img.freepik.com/premium-photo/gorgeous-young-woman-wearing-traditional-clothing-created-with-generative-ai_762026-35299.jpg?w=2000"
          alt="Traditional Photoshoot"
          className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover w-full"
          style={{ height: "50vh" }}
        />
      </div>
      {/* After Image */}
      <div className="relative group">
        <span className="absolute top-4 left-4 bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-lg">
          AI-Generated
        </span>
        <img
          src="https://i.pinimg.com/originals/84/ec/8e/84ec8eaef3f8a2f47329dd0684374ac3.jpg"
          alt="AI-Generated Photoshoot"
          className="rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover w-full"
          style={{ height: "50vh" }}
        />
      </div>
    </div>

    {/* Right Section: Content */}
    <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight animate-fade-in">
        AI Visual Try-On: Your Game-Changing Fashion Solution
      </h1>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start">
          <span className="text-purple-700 text-xl font-bold mr-3">•</span>
          <p> Instantly create realistic fashion models of any nationality and background.</p>
        </li>
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Seamlessly apply your garments to AI-generated models for a perfect fit.</p>
        </li>
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Customize models to fit your brand’s unique aesthetic.</p>
        </li>
        <li className="flex items-start">
          <span className="text-purple-600 text-xl font-bold mr-3">•</span>
          <p>Deliver high-quality, eCommerce-ready photos in minutes.</p>
        </li>
      </ul>
      <div className="flex justify-center lg:justify-start items-center w-full mt-6">
        <button className="bg-purple-600 text-white w-full sm:w-3/4 md:w-2/4 py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-700">
          Explore Our Technology
        </button>
      </div>
    </div>
  </div>
</section>



      {/* section 3 */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

        {/* Why Choose Us Section */}
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-center mb-12 text-gray-900">
            Why Choose <span className="text-purple-600">Us?</span>
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Realistic Model Generation",
                desc: "Create lifelike models that resonate with your audience.",
                icon: "🖼️",
              },
              {
                title: "Easy Customization",
                desc: "Adjust every detail, from skin tone to poses and backgrounds.",
                icon: "🎨",
              },
              {
                title: "Cost Efficiency",
                desc: "Save up to 80% on traditional photoshoot expenses.",
                icon: "💰",
              },
              {
                title: "Quick Turnaround",
                desc: "Get professional images in hours, not weeks.",
                icon: "⏱️",
              },
              {
                title: "Ecommerce Optimization",
                desc: "Tailored outputs perfect for online platforms.",
                icon: "🛍️",
              },
              {
                title: "Trusted Results",
                desc: "Deliver high-quality outputs trusted by industry professionals.",
                icon: "🌟",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-xl shadow-lg p-6 transform hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon */}
                <div className="text-purple-600 text-4xl mb-4">{item.icon}</div>

                {/* Title */}
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* section4 */}
      <section ref={ref1} className="bg-gradient-to-b from-white to-gray-50 py-16 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          {/* Heading */}
          <h2 className="text-3xl lg:text-5xl font-extrabold text-center mb-12 text-gray-900 animate-fade-in">
            Simplified Workflow, <span className="text-purple-600">Exceptional Results</span>
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                step: "Step 1",
                title: "Upload Your Garment Designs",
                desc: "Easily upload your unique garment designs for the process to begin.",
                img: "f368124b-401c-4047-3f48-965d5f1b0300",
              },
              {
                step: "Step 2",
                title: "Customize Model & Select Background",
                desc: "Choose your AI model, customize details, and select a background that matches your brand.",
                img: "e50431f0-8bb9-4bc0-a79d-092082226d00",
              },
              {
                step: "Step 3",
                title: "Generate & Download",
                desc: "Generate stunning, high-quality images and download them for immediate use on your eCommerce platforms.",
                img: "24baab0e-c60a-40b9-eb07-bcf7af6d4e00",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-xl shadow-lg p-6 transform hover:shadow-2xl transition-all duration-300"
              >
                {/* Image and Step Badge */}
                <div className="relative">
                  <img
                    src={`https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/${item.img}/public`}
                    alt={item.title}
                    className="rounded-lg mx-auto w-full max-w-[240px] transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-2 left-2 bg-purple-600 text-white font-semibold text-xs uppercase py-1 px-3 rounded-tr-lg rounded-bl-lg shadow-md">
                    {item.step}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mt-6 group-hover:text-purple-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* features */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-16">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-center mb-12 text-white">
            Features of <span className="text-purple-400">AI4FI</span>
          </h2>

          {/* Auto-Scrolling Row */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll">
              {[
                "https://wallpapercave.com/wp/wp4244900.jpg",
                "https://freepngimg.com/thumb/girl/23358-6-woman-model-photos.png",
                "https://i.dailymail.co.uk/1s/2019/10/14/15/19548030-7559529-image-a-80_1571064618303.jpg",
                "https://jooinn.com/images/model-photoshoot-15.jpg",
                "https://www.hdwallpapers.in/download/closeup_photo_of_beautiful_face_of_girl_model_hd_girls-HD.jpg",
                "https://c.stocksy.com/a/wyk500/z9/1372242.jpg",
                "https://get.wallhere.com/photo/women-model-FTV-Girls-Magazine-1271195.jpg",
                "https://wallpapersmug.com/download/1440x2880/aaa678/beautiful-girl-model-juicy-lips-brunette.jpg",
                "https://cdn.pixabay.com/photo/2023/02/01/13/52/ai-generated-7760505_1280.jpg",
                "https://img.freepik.com/free-photo/young-woman-with-long-straight-hair-studio-portrait-attractive-brunette-girl-fashion-model-wears-black-shirt-anf-jeans-sexy-female-model_186202-7462.jpg",
              ].map((imageUrl, index) => (
                <div
                  key={index}
                  className="min-w-[240px] h-[320px] bg-cover bg-center rounded-lg shadow-lg"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Script for Auto Scroll */}
          <style>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-240px * 5)); /* Scroll 5 items */
        }
      }
      .animate-scroll {
        animation: scroll 20s linear infinite;
      }
    `}</style>
        </div>
      </section>
      {/* section 5 */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          {/* Heading */}
          <h2 className="text-3xl lg:text-5xl font-extrabold text-center mb-12 text-gray-900 animate-fade-in">
            Trusted by <span className="text-purple-600">Fashion Innovators Worldwide</span>
          </h2>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                img: "https://via.placeholder.com/150", // Replace with actual client photo URLs
                quote:
                  "This AI solution has transformed how we present our collections online. It’s fast, cost-effective, and delivers amazing quality!",
                name: "Alex Johnson",
                position: "Creative Director at FashionHub",
              },
              {
                img: "https://via.placeholder.com/150", // Replace with actual client photo URLs
                quote:
                  "We’ve reduced our photoshoot costs by 80%, and the results look stunning! Our customers love the virtual try-on feature.",
                name: "Sophia Lee",
                position: "CEO at Trendify",
              },
              {
                img: "https://via.placeholder.com/150", // Replace with actual client photo URLs
                quote:
                  "ApricityTS AI4FI has revolutionized our approach to fashion eCommerce. It’s a game-changer for our brand.",
                name: "Michael Carter",
                position: "Marketing Lead at StyleWave",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-xl shadow-lg p-6 transform hover:shadow-2xl transition-all duration-300"
              >
                {/* Client Image */}
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden shadow-lg">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-gray-600 italic text-sm mt-6 text-center">
                  “{testimonial.quote}”
                </blockquote>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-purple-600">{testimonial.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* section6 */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 lg:px-16">
          {/* Pricing Header */}
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-center mb-6 text-gray-900"
          >
            Flexible Plans for Every Business Size
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-600 max-w-3xl mx-auto mb-12"
          >
            Explore our Basic, Pro, and Enterprise plans. Whether you are just starting or scaling, we have the perfect plan for you. Start with a free trial or demo today!
          </motion.p>

          {/* Toggle Button */}
          <div className="flex justify-center mb-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className={`px-6 py-2 text-sm font-medium rounded-l-lg ${isMonthly ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              onClick={() => setIsMonthly(true)}
            >
              Monthly
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className={`px-6 py-2 text-sm font-medium rounded-r-lg ${!isMonthly ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              onClick={() => setIsMonthly(false)}
            >
              Annually
            </motion.button>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Basic",
                priceMonthly: "$29",
                priceAnnually: "$290",
                credits: "100 Credits",
                features: ["Free Trial Available", "Basic AI Features", "Email Support"],
                buttonText: "Start Free Trial",
              },
              {
                name: "Pro",
                priceMonthly: "$79",
                priceAnnually: "$790",
                credits: "500 Credits",
                features: ["Advanced AI Features", "Priority Support", "Custom Backgrounds"],
                buttonText: "Start Free Trial",
              },
              {
                name: "Enterprise",
                priceMonthly: "Custom Pricing",
                priceAnnually: "Custom Pricing",
                credits: "Unlimited Credits",
                features: ["Dedicated AI Solutions", "Account Manager", "Full Customization"],
                buttonText: "Contact Us",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`bg-white p-10 rounded-3xl shadow-lg border ${plan.name === "Pro" ? "border-purple-600" : "border-gray-300"
                  } flex flex-col items-center min-h-[420px]`}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{plan.name}</h3>
                <p className="text-lg text-gray-500 mb-2">{plan.credits}</p>
                <p className="mt-4 text-3xl font-bold text-gray-900">
                  {isMonthly ? plan.priceMonthly : plan.priceAnnually}
                  <span className="text-sm text-gray-600">{plan.name === "Enterprise" ? "" : "/month"}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-8 px-8 py-4 rounded-lg font-medium transition-transform ${plan.name === "Pro"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                    }`}
                >
                  {plan.buttonText}
                </motion.button>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Call-to-Action */}
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              View Pricing
            </motion.button>
          </div>
        </div>
      </section>
      {/* section7 */}
      <section
        ref={ref2}
        className="relative bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 py-16 px-6 lg:px-24 overflow-hidden"
      >
        {/* Background Gradient Accent */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-400 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-200 opacity-30 rounded-full filter blur-3xl animate-pulse"></div>

        {/* Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Section: Call to Action Content */}
          <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight animate-fade-in">
              Ready to Transform Your Fashion Business?
            </h1>
            <p className="text-lg text-gray-700 animate-fade-in-delay">
              Take the next step and elevate your business with AI-powered fashion solutions. Whether you want to explore our platform, book a personalized demo, or get in touch with us, we’re here to help you transform your fashion experience.
            </p>
            <div className="flex flex-col lg:flex-row justify-center lg:justify-start lg:space-x-4 space-y-4 lg:space-y-0 animate-fade-in">
              <button className="bg-purple-600 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-purple-700 w-full sm:w-auto">
                Sign Up Now
              </button>
              <button className="bg-teal-600 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-teal-700 w-full sm:w-auto">
                Book a Demo
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-blue-700 w-full sm:w-auto">
                Contact Us
              </button>
            </div>

          </div>

          {/* Right Section: Visual Representation (Optional) */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://eucarlwears.com/wp-content/uploads/2022/05/ezgif.com-gif-maker-2022-05-17T231822.092.webp"
              alt="Fashion Transformation"
              className="rounded-lg shadow-lg w-full max-w-md lg:max-w-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm text-purple-700 font-bold uppercase"
          >
            FAQ
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2"
          >
            Frequently Asked Questions
          </motion.h1>
          <div className="mt-8 space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="border-b border-gray-300 pb-4"
              >
                <button
                  className="w-full flex justify-between items-center text-left text-lg text-gray-700 font-medium hover:text-gray-900"
                  onClick={() => handleToggle(index)}
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 text-lg"
                  >
                    {activeIndex === index ? "−" : "+"}
                  </motion.span>
                </button>
                {activeIndex === index && (
                  <motion.p
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 text-gray-600 text-sm"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
};

export default HeroSection;