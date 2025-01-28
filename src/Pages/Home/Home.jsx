"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// import {useScroll, useTransform } from "framer-motion";
import './Home.css';
import top1 from './formal (1).jpg';
import top2 from './casual (1).jpg';
import trdan from './trdan.jpeg'
import ai from './ai.jpeg';
import video from './ai4fivideo.mp4'

const HeroSection = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("pixelPerfect");
  // const ref1 = useRef(null);
  const ref2 = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  // const [ setActiveStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef1 = useRef(null);
  const [allowScroll, setAllowScroll] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Play video with sound when the section is in view
          video.muted = false;
          video.play().catch((err) => console.error("Error playing video:", err));
        } else {
          // Pause video when the section is out of view
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Observe the viewport
      threshold: 0.5, // Trigger when 50% of the section is visible
    });

    observer.observe(section);

    return () => {
      observer.disconnect(); // Clean up observer on unmount
    };
  }, []);

  const imageSets = {
    pixelPerfect: [
      "/images/model-gallery/getimg_ai_img-0TJcYIvAsnPLH3nEMxiOX.jpeg", // Replace with your image paths
      "/images/model-gallery/getimg_ai_img-CPju632voVEmTDM37Iesi.jpeg",
      "/images/model-gallery/getimg_ai_img-4BOumNv2sxEm2z8ePMFNb.jpeg",
    ],
    backgroundPreservation: [
      "/images/model-gallery/getimg_ai_img-Ur59Eheh1KYDPD7Qnywwo.jpeg",
      "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg",
      "/images/model-gallery/img-u2D6ZV51wIFe7hljWA5qN.jpeg",
    ],
    versatilePoses: [
      "/images/model-gallery/getimg_ai_img-5hP1KqLe4bqKuufBhZfEv.jpeg",
      "/images/model-gallery/getimg_ai_img-2LuGKyxjYnuXThjWTabZ5.jpeg",
      "/images/model-gallery/getimg_ai_img-5V5fKiMdAjG2zwwmUFXPO.jpeg",
    ],
    inputFlexibility: [
      "/images/model-gallery/getimg_ai_img-7BxvLDHU6Gw1fjusT2qYh.jpeg",
      "/images/model-gallery/getimg_ai_img-CPju632voVEmTDM37Iesi.jpeg",
      "/images/model-gallery/getimg_ai_img-Ec8Wd4kmnZZSnxOYEtrxO.jpeg",
    ],
  };

  const images = [
    "/images/model-gallery/getimg_ai_img-0TJcYIvAsnPLH3nEMxiOX.jpeg",
    "/images/model-gallery/getimg_ai_img-1q3dXIl8hj7rpd0p323vu.jpeg",
    "/images/model-gallery/getimg_ai_img-2dLJgir45g4JULV48nRy9.jpeg",
    "/images/model-gallery/getimg_ai_img-2LuGKyxjYnuXThjWTabZ5.jpeg",
    "/images/model-gallery/getimg_ai_img-4BOumNv2sxEm2z8ePMFNb.jpeg",
    "/images/model-gallery/getimg_ai_img-4u7qKNo0KPwUVN2HCxtUV.jpeg", // Replace with actual image URL
    "/images/model-gallery/getimg_ai_img-5hP1KqLe4bqKuufBhZfEv.jpeg", // Replace with actual image URL
    "/images/model-gallery/getimg_ai_img-5V5fKiMdAjG2zwwmUFXPO.jpeg", // Replace with actual image URL
    "/images/model-gallery/getimg_ai_img-7BxvLDHU6Gw1fjusT2qYh.jpeg", // Replace with actual image URL
    "/images/model-gallery/getimg_ai_img-7sUPVbA6z33Pq3eRfTSSe.jpeg", // Replace with actual image URL
  ];

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


  const steps = [
    {
      id: 1,
      title: "SELECT MODEL",
      subtitle: "Create your unique avatar in less than 5 minutes",
      description:
        "Easily upload your unique garment designs for the process to begin.",
      image: "https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/f368124b-401c-4047-3f48-965d5f1b0300/public",
    },
    {
      id: 2,
      title: "SELECT GARMENT",
      subtitle: "Bring your 3D designs to life",
      description:
        "Choose your AI model, customize details, and select a background that matches your brand.",
      image: "https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/e50431f0-8bb9-4bc0-a79d-092082226d00/public",
    },
    {
      id: 3,
      title: "DOWNLOAD RESULT",
      subtitle: "Contribute to our digitised future",
      description:
        "Generate stunning, high-quality images and download them for immediate use on your eCommerce platforms.",
      image: "https://imagedelivery.net/X26-mmRvk4CuiCyo9bU9tw/24baab0e-c60a-40b9-eb07-bcf7af6d4e00/public",
    },
  ];

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = (event) => {
      if (scrollTimeout || allowScroll) return; // Prevent rapid multiple scrolls

      // Determine scroll direction
      if (event.deltaY > 0) {
        // Scroll down
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      } else if (event.deltaY < 0) {
        // Scroll up
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
      }

      // Set a timeout to throttle the scroll events
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 1000); // Adjusted for smoother transitions
    };

    const section = sectionRef1.current;
    section.addEventListener("wheel", handleScroll);

    return () => {
      section.removeEventListener("wheel", handleScroll);
    };
  }, [steps.length, allowScroll]);


  useEffect(() => {
    if (currentStep === steps.length - 1) {
      setTimeout(() => {
        setAllowScroll(true);
      }, 1000); // Unlock scroll on the last step
    }
  }, [currentStep, steps.length]);




  return (
    <>
      {/* Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        className='relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 lg:p-20 py-240 bg-gradient-to-br from-white to-gray-100 h-[100vh]'
        style={{ paddingBottom: "100px", marginTop: "-72px", paddingTop: "114px" }}>
        {/* Background Animation */}
        <motion.div
          className='absolute inset-0 pointer-events-none'
          animate={{
            background: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, #5A00FF 0%, transparent 30%)`,
          }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />

        {/* Left Content */}
        <div className='md:w-1/2 space-y-6 md:space-y-8 relative z-10 text-center md:text-left'>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-snug'>
            Say goodbye to costly photoshoots. <br />
            Create stunning, customizable <br />
            AI models and showcase your garments.
          </motion.h1>

          <div className='mt-4 md:mt-6'>
            <a href='/choose-option'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className='bg-[#5A00FF] hover:bg-[#4a00e6] transition-transform duration-300 text-white font-semibold py-3 px-8 rounded-md shadow-lg'>
                Get Started for Free
              </motion.button>
            </a>
          </div>

          {/* User Ratings */}
          <div className='flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 mt-6'>
            <div className='flex -space-x-2'>
              {["45", "47", "48", "49"].map((id, index) => (
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  key={index}
                  src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${id}.jpg`}
                  alt='user'
                  className='w-10 h-10 rounded-full border-2 border-white shadow-md'
                />
              ))}
            </div>
            <div className='flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1'>
              <div className='text-yellow-400 text-lg'>⭐⭐⭐⭐⭐</div>
              <p className='text-gray-600 font-medium text-sm' style={{ fontFamily: "'Playfair Display', serif" }}>
                Loved by <span className='font-bold'>153,000+</span> users
              </p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <motion.div className='grid grid-cols-1 md: grid grid-cols-2 gap-8 md:gap-10 mt-8 md:mt-0 md:w-6/12 lg:w-5/12'>
          {/* Before Image */}
          <div className='relative group'>
            <img
              src={top1}
              alt='Before Photoshoot'
              className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-[45vh] lg:h-[50vh] object-cover'
            />
          </div>
          {/* After Image */}
          <div className='relative group'>
            <img
              src={top2}
              alt='AI-Generated Photoshoot'
              className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-[45vh] lg:h-[50vh] object-cover'
            />
          </div>
        </motion.div>
      </section>
      {/* section4 shift here */}
      <section
        ref={sectionRef1}
        className="h-screen w-full flex flex-col justify-center items-center bg-gray-100 relative overflow-hidden"
        style={{ overflowY: allowScroll ? "auto" : "hidden" }}
      >
        {/* Steps Navigation (Visible on desktop only) */}
        <div
          className="absolute top-[7rem] left-4 md:left-16 space-y-4 md:space-y-6 z-10 hidden md:block"
        >
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-center space-x-4">
              <span
                className={`text-base md:text-2xl lg:text-3xl font-bold transition-all duration-300 ${currentStep === index ? "text-black" : "text-gray-400"
                  }`}
              >
                {step.id < 10 ? `0${step.id}` : step.id}
              </span>

              {/* Horizontal Line */}
              <div
                className={`h-[1px] md:h-[2px] w-10 md:w-16 bg-black transition-all duration-300 ${currentStep === index ? "bg-black" : "bg-gray-300"
                  }`}
              ></div>

              <span
                className={`text-sm md:text-lg font-semibold transition-all duration-300 ${currentStep === index ? "text-black" : "text-gray-400"
                  }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div
          className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 px-4 w-full md:w-[calc(100%-17rem)] ml-0 md:ml-72"
        >
          {/* Steps (Visible only on mobile) */}
          <div className="flex flex-col md:hidden w-full space-y-4 text-center">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative flex items-center justify-center space-x-4"
              >
                <span
                  className={`text-base font-bold ${currentStep === index ? "text-black" : "text-gray-400"
                    }`}
                >
                  {step.id < 10 ? `0${step.id}` : step.id}
                </span>
                <div
                  className={`h-[1px] w-10 bg-black transition-all duration-300 ${currentStep === index ? "bg-black" : "bg-gray-300"
                    }`}
                ></div>
                <span
                  className={`text-sm ${currentStep === index ? "text-black" : "text-gray-400"
                    }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="flex-shrink-0 order-2 md:order-1 w-full md:w-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={steps[currentStep].id}
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="h-[250px] md:h-[400px] lg:h-[500px] w-auto object-cover rounded-lg shadow-lg mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              />
            </AnimatePresence>
          </div>

          {/* Description */}
          <div className="flex flex-col max-w-full md:max-w-md space-y-4 text-center md:text-left order-3">
            <AnimatePresence mode="wait">
              <motion.h2
                key={steps[currentStep].title}
                className="text-lg md:text-xl lg:text-2xl font-bold text-purple-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {steps[currentStep].title}
              </motion.h2>
              <motion.p
                key={steps[currentStep].description}
                className="text-sm md:text-lg lg:text-lg text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {steps[currentStep].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>



      {/* section1 */}
      <section ref={ref2} className='relative bg-white py-16 px-6 lg:px-24 overflow-hidden'>
        <div className='absolute top-0 left-0 w-80 h-80 bg-purple-400 opacity-20 rounded-full filter blur-3xl animate-pulse'></div>

        {/* Background Gradient Accent */}
        <div className='absolute -top-20 -left-20 w-96 h-96 rounded-full filter blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-20 -right-20 w-96 h-96 rounded-full filter blur-3xl animate-pulse'></div>

        {/* Container */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
          {/* Left Section: Content */}
          <div className='flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left'>
            <h1
              className='text-2xl lg:text-4xl font-extrabold text-gray-900 leading-tight animate-fade-in'
              style={{ fontFamily: "'Playfair Display', serif" }}>
              The Challenges of Traditional Fashion Photography
            </h1>
            <p className='text-xl text-gray-600 animate-fade-in-delay' style={{ fontFamily: "'Playfair Display', serif" }}>
              Expensive model hiring and photoshoots. Time-consuming processes for selecting models, locations, and photographers. Limited
              flexibility for customization and quick updates
            </p>
            <ul className='space-y-4 text-gray-700'>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3 relative top-[-3px]'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Expensive costs for hiring models, photographers, and renting locations.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3 relative top-[-3px]'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Time-consuming processes for organizing shoots and selecting the right team.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3 relative top-[-3px]'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Limited flexibility for making quick updates or tailoring visuals to new ideas.
                </p>
              </li>
            </ul>
          </div>

          {/* Right Section: Visual Comparison */}
          <div className='grid grid-cols-2 gap-6'>
            {/* Before Image */}
            <div className='relative group'>
              <span
                className='absolute top-4 left-4 bg-gray-900 text-white text-sm px-3 py-1 rounded-full shadow-lg'
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Traditional
              </span>
              <img
                src={trdan}
                className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-[45vh] lg:h-[55vh] object-cover'
              />
            </div>
            {/* After Image */}
            <div className='relative group'>
              <span
                className='absolute top-4 left-4 bg-purple-600 text-white text-sm px-3 py-1 rounded-full shadow-lg'
                style={{ fontFamily: "'Playfair Display', serif" }}>
                AI-Generated
              </span>
              <img
                src={ai}
                alt='AI-Generated Photoshoot'
                className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 w-full h-[45vh] lg:h-[55vh] object-cover'
              />
            </div>
          </div>
        </div>
      </section>
      {/* section2 */}
      <section
        ref={sectionRef}
        className='relative bg-gradient-to-br from-blue-100 via-teal-50 to-blue-200 py-16 px-6 lg:px-24 overflow-hidden'>
        {/* Background Gradient Accent */}
        <div className='absolute -top-20 -left-20 w-96 h-96 bg-teal-400 opacity-30 rounded-full filter blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-20 -right-20 w-96 h-96 bg-teal-200 opacity-30 rounded-full filter blur-3xl animate-pulse'></div>

        {/* Container */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
          <div className='relative group'>
            {/* Video */}
            <video
              ref={videoRef}
              src={video}
              className='rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover w-full h-auto cursor-pointer'
              style={{ height: "50vh", width: "100%", objectFit: "cover" }}
              playsInline
              loop
              autoPlay
              muted
              poster='your-fallback-image.jpg'
            />
          </div>

          {/* Right Section: Content */}
          <div className='flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left'>
            <h1
              className='text-2xl lg:text-4xl font-extrabold text-gray-900 leading-tight animate-fade-in'
              style={{ fontFamily: "'Playfair Display', serif" }}>
              AI Visual Try-On: Your Game-Changing Fashion Solution
            </h1>
            <ul className='space-y-4 text-gray-700'>
              <li className='flex items-start'>
                <span className='text-purple-700 text-xl font-bold mr-3'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Instantly create realistic fashion models of any nationality and background.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Seamlessly apply your garments to AI-generated models for a perfect fit.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Customize models to fit your brand’s unique aesthetic.
                </p>
              </li>
              <li className='flex items-start'>
                <span className='text-purple-600 text-xl font-bold mr-3'>•</span>
                <p className='text-lg' style={{ fontFamily: "'Playfair Display', serif" }}>
                  Deliver high-quality, eCommerce-ready photos in minutes.
                </p>
              </li>
            </ul>
            <div className='flex justify-center lg:justify-start items-center w-full mt-6'>
              <button
                className='bg-[#5A00FF] hover:bg-[#4a00e6] transition-transform duration-300 text-white font-semibold py-3 px-8 rounded-md shadow-lg'
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Explore Our Technology
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* section3 */}
      <section className='bg-white py-8 px-4 lg:px-16 flex flex-col items-center'>
        {/* Buttons Section */}
        <div className='border border-gray-300 rounded-lg p-6 w-full md:w-3/4 lg:w-2/3'>
          <div className='flex justify-center gap-4 flex-wrap' style={{ fontFamily: "'Playfair Display', serif" }}>
            {Object.keys(imageSets).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 sm:py-3 sm:px-6 rounded-md font-semibold text-sm sm:text-lg transition-all ${
                  activeTab === tab ? "bg-purple-600 text-white transform scale-105" : "bg-gray-200 hover:bg-gray-300"
                }`}>
                {tab.replace(/([A-Z])/g, " $1")} {/* Format tab names */}
              </button>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div className='border border-gray-300 rounded-lg p-4 sm:p-6 mt-8 w-full md:w-3/4 lg:w-2/3' style={{ maxWidth: "800px" }}>
          {/* Heading Above Images */}
          <h2
            className='text-lg sm:text-xl font-medium text-gray-700 mb-4 sm:mb-6 text-center'
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Keeping perfect resemblance to the reference garment is our top priority and research focus
          </h2>

          {/* Images in Responsive Rows */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {imageSets[activeTab].map((image, index) => (
              <div
                key={index}
                className='flex items-center justify-center bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105'
                style={{ width: "100%", height: "240px" }}>
                <img src={image} alt={`Image ${index + 1}`} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* section 4 */}

      {/* section4 */}

      {/* features */}
      <section className='py-16 bg-gray-900 relative overflow-hidden'>
        <div className='container mx-auto px-6 lg:px-16'>
          <h2
            className='text-3xl lg:text-5xl font-extrabold text-center mb-12 text-white'
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Features of <span className='text-purple-400'>AI4FI</span>
          </h2>

          {/* Auto-Scrolling Row */}
          <div className='scroll-container overflow-hidden relative'>
            <div className='scroll-track flex items-center'>
              {images.concat(images).map((imagePath, index) => (
                <div key={index} className='flex-shrink-0' style={{ width: "240px", margin: "0 8px" }}>
                  <img src={imagePath} alt={`Model Gallery ${index + 1}`} className='w-full h-auto rounded-md' />
                </div>
              ))}
            </div>
          </div>

          {/* CSS for Auto Scroll */}
          <style>{`
      .scroll-container {
        width: 100%;
        position: relative;
        overflow: hidden;
        height: 320px; /* Adjust based on your image height */
      }
      .scroll-track {
        display: flex;
        width: calc(200px * ${images.length} * 2); /* Account for duplicate images */
        animation: scroll 30s linear infinite;
      }
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(calc(-200px * ${images.length})); /* Scroll one full set of images */
        }
      }
    `}</style>
        </div>
      </section>

      {/* section 5 */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 py-24 px-6 sm:px-12 lg:px-24">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Plans & Inquiries
          </h2>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Ready to take the next step? We are here to offer you tailored plans and assistance for all your needs. Reach out for a personalized consultation, and let’s discuss how we can make it happen!
          </p>
        </div>

        <div className="flex justify-center mt-16">
          <div className="bg-white border shadow-lg rounded-3xl p-12 w-full max-w-lg text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-300 hover:translate-y-1" style={{ borderColor: "#8852FF", borderWidth: "0.5px" }}>
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our dedicated team is ready to provide tailored solutions for your unique needs. Reach out today for personalized advice and detailed plans!
            </p>
            <a href="/contact">
              <button className="mt-6 bg-[#5A00FF] text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* section7 */}
      <section
        ref={ref2}
        className='relative bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 py-16 px-6 lg:px-24 overflow-hidden'>
        {/* Background Gradient Accent */}
        <div className='absolute -top-20 -left-20 w-96 h-96 bg-indigo-400 opacity-30 rounded-full filter blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-200 opacity-30 rounded-full filter blur-3xl animate-pulse'></div>

        {/* Container */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10'>
          {/* Left Section: Call to Action Content */}
          <div className='flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left'>
            <h1
              className='text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight animate-fade-in'
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Transform Your Fashion Business?
            </h1>
            <p className='text-lg text-gray-700 animate-fade-in-delay' style={{ fontFamily: "'Playfair Display', serif" }}>
              Take the next step and elevate your business with AI-powered fashion solutions. Whether you want to explore our platform, book
              a personalized demo, or get in touch with us, we’re here to help you transform your fashion experience.
            </p>
            <div className='flex flex-col lg:flex-row justify-center lg:justify-start lg:space-x-4 space-y-4 lg:space-y-0 animate-fade-in'>
              <a href='/signup'>
                <button
                  className='bg-purple-600 hover:bg-[#4a00e6] transition-transform duration-300 text-white font-semibold py-3 px-8 rounded-md shadow-lg'
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sign Up Now
                </button>
              </a>
              {/* <button className="bg-teal-600 text-white py-2 px-4 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-lg font-semibold transition-all duration-300 hover:bg-teal-700 w-full sm:w-auto">
                Book a Demo
              </button> */}
              <a href='/contact'>
                <button
                  className='bg-blue-600 hover:bg-[#4a00e6] transition-transform duration-300 text-white font-semibold py-3 px-8 rounded-md shadow-lg'
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Contact Us
                </button>
              </a>
            </div>
          </div>

          {/* Right Section: Visual Representation (Optional) */}
          <div className='flex justify-center lg:justify-end'>
            <img
              src='https://eucarlwears.com/wp-content/uploads/2022/05/ezgif.com-gif-maker-2022-05-17T231822.092.webp'
              alt='Fashion Transformation'
              className='rounded-lg shadow-lg w-full max-w-md lg:max-w-lg transition-all duration-300 hover:scale-105'
            />
          </div>
        </div>
      </section>
      {/* faq section */}
      <section className='bg-gray-50 py-16 px-8'>
        <div className='max-w-6xl mx-auto'>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-sm text-purple-700 font-bold uppercase'
            style={{ fontFamily: "'Playfair Display', serif" }}>
            FAQ
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='text-3xl sm:text-4xl font-bold text-gray-900 mt-2'
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </motion.h1>
          <div className='mt-8 space-y-6'>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='border-b border-gray-300 pb-4'>
                <button
                  className='w-full flex justify-between items-center text-left text-lg text-gray-700 font-medium hover:text-gray-900'
                  onClick={() => handleToggle(index)}>
                  {faq.question}
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className='text-gray-500 text-lg'>
                    {activeIndex === index ? "−" : "+"}
                  </motion.span>
                </button>
                {activeIndex === index && (
                  <motion.p
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className='mt-3 text-gray-600 text-sm'>
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
