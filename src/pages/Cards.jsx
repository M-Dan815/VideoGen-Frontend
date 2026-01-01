import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useNavigate } from "react-router-dom";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardsRef = useRef(null);
  const cardRefs = useRef([]);

  // Platform cards data with explicit navigation routes
  const platformCards = [
    {
      id: 1,
      name: "AMAZON",
      description: "Transform your Amazon product images with AI-powered background removal and enhancement. Meet Amazon's strict image requirements with professional white backgrounds.",
      features: ["White Background Required", "1000px Minimum Resolution", "Professional Enhancement", "SP-API Integration"],
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-900/20 to-yellow-900/20",
      icon: "🛒",
      buttonText: "ENHANCE FOR AMAZON",
      route: "/view?service=amazon"
    },
    {
      id: 2,
      name: "EBAY",
      description: "Optimize your eBay listings with stunning lifestyle backgrounds and professional product photography. Stand out in the marketplace with eye-catching visuals.",
      features: ["Lifestyle Backgrounds", "500px Minimum Resolution", "Studio Quality Enhancement", "Trading API Integration"],
      gradient: "from-blue-500 to-purple-500",
      bgGradient: "from-blue-900/20 to-purple-900/20",
      icon: "🏪",
      buttonText: "ENHANCE FOR EBAY",
      route: "/view?service=ebay"
    },
    {
      id: 3,
      name: "SHOPIFY",
      description: "Create premium product images for your Shopify store with AI-generated backgrounds and professional optimization. Boost conversion rates with stunning visuals.",
      features: ["Premium Backgrounds", "2048px High Resolution", "Brand Consistent Styling", "Admin API Integration"],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/20 to-emerald-900/20",
      icon: "🛍️",
      buttonText: "ENHANCE FOR SHOPIFY",
      route: "/view?service=shopify"
    }
  ];

  // Navigation function for button clicks
  const handlePlatformNavigation = (route) => {
    navigate(route);
  };

  // Animation for Hero section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for all text elements - slide from left
      gsap.set([headingRef.current, subtextRef.current, buttonsRef.current], {
        opacity: 0,
        x: -100
      });

      // Animate all text elements together from left
      gsap.to([headingRef.current, subtextRef.current, buttonsRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animation for Cards section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with stagger effect
      cardRefs.current.forEach((cardRef, index) => {
        if (cardRef) {
          gsap.set(cardRef, {
            opacity: 0,
            y: 100
          });

          gsap.to(cardRef, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen w-full overflow-hidden text-white pt-16 sm:pt-20 md:pt-24"
      >
        {/* Base solid background */}
        <div className="absolute inset-0 bg-[#0A0A0A]"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* Readability layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1E6B] from-10% via-[#2E1E6B]/60 via-60% to-transparent"></div>

        <div className="relative z-10 min-h-screen container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-0">
          <div className="w-full text-center flex flex-col items-center justify-center">
            {/* Main Heading */}
            <h1 
              ref={headingRef} 
              className="text-[30px] sm:text-[36px] md:text-[48px] lg:text-[54px] mt-10 font-extrabold leading-tight sm:leading-snug mb-6 sm:mb-8 max-w-4xl"
            >
              LET'S{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                CONNECT
              </span>{" "}
              AND
              <br />
              CREATE SOMETHING{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                AMAZING
              </span>
            </h1>

            {/* Subtext */}
            <div 
              ref={subtextRef} 
              className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl"
            >
              <p>Ready to transform your images with cutting-edge AI?</p>
              <p>We're here to answer your questions and help you get started.</p>
              <p>Your journey to stunning visuals begins with a simple conversation.</p>
            </div>

            {/* Action Buttons */}
            <div 
              ref={buttonsRef} 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-12 sm:mb-16 w-full sm:w-auto"
            >
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 uppercase tracking-wide shadow-lg transform skew-x-[-12deg] transition-all duration-300 hover:scale-105 text-sm md:text-base w-full sm:w-auto">
                <span className="inline-block skew-x-[12deg]">START CONVERSATION</span>
              </button>
              <button className="border border-purple-400 text-purple-200 font-bold py-3 sm:py-4 px-8 sm:px-10 uppercase tracking-wide transform skew-x-[-12deg] transition-all duration-300 hover:scale-105 bg-transparent hover:border-purple-300 hover:text-white text-sm md:text-base w-full sm:w-auto">
                <span className="inline-block skew-x-[12deg]">BOOK A DEMO</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Cards Section */}
      <section 
        ref={cardsRef}
        className="bg-gradient-to-br from-[#1a1c54] via-[#2d2e7a] to-[#4c0d73] py-12 sm:py-20 px-4 sm:px-6 min-h-screen flex items-center overflow-hidden relative"
      >
        {/* Background overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-wide leading-tight">
              SELECT YOUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                PLATFORM
              </span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Each platform has unique requirements. Choose yours and let our AI handle the optimization.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {platformCards.map((card, index) => (
              <div
                key={card.id}
                ref={el => cardRefs.current[index] = el}
                className="group relative"
              >
                {/* Card Container with enhanced glassmorphism effect */}
                <div className={`relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 sm:p-8 
                                 h-auto min-h-[500px]`}>
                  
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 
                                   group-hover:opacity-100 transition-all duration-500 rounded-3xl`}></div>
                  
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.gradient} opacity-0 
                                   group-hover:opacity-20 blur-sm transition-all duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Platform Icon */}
                    <div className="text-4xl sm:text-5xl mb-4 text-center transform group-hover:scale-110 
                                    transition-transform duration-300">
                      {card.icon}
                    </div>

                    {/* Platform Name */}
                    <h3 className={`text-2xl sm:text-3xl font-bold mb-4 text-center bg-gradient-to-r ${card.gradient} 
                                    bg-clip-text text-transparent transform group-hover:scale-105 
                                    transition-transform duration-300`}>
                      {card.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 text-center">
                      {card.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-8 transform group-hover:translate-y-[-2px] transition-transform duration-300">
                      <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Features:</h4>
                      <ul className="space-y-2">
                        {card.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-gray-300 text-sm flex items-center 
                                                           hover:text-white transition-colors duration-200">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.gradient} mr-3 flex-shrink-0 
                                            animate-pulse`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button - Updated with onClick handler */}
                    <div className="text-center">
                      <button 
                        onClick={() => handlePlatformNavigation(card.route)}
                        className={`bg-gradient-to-r ${card.gradient} text-white font-bold 
                                    py-3 px-6 sm:px-8 uppercase tracking-wide shadow-lg 
                                    transform skew-x-[-12deg] transition-all duration-300 
                                    hover:scale-105 text-xs sm:text-sm w-full cursor-pointer`}
                      >
                        <span className="inline-block skew-x-[12deg]">{card.buttonText}</span>
                      </button>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent 
                                  rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent 
                                  rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Not sure which platform? Contact our team for personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              {/* Contact Support */}
              <button className="border border-purple-400 text-purple-200 font-bold py-3 px-6 sm:px-8 
                                  uppercase tracking-wide 
                                  transform skew-x-[-12deg] transition-all duration-300 hover:scale-105 
                                  bg-transparent hover:border-purple-300 hover:text-white w-full sm:w-auto">
                <span className="inline-block skew-x-[12deg]">CONTACT SUPPORT</span>
              </button>

              {/* Back to Home */}
              <Link 
                to="/" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 sm:px-8 
                           uppercase tracking-wide shadow-lg 
                           transform skew-x-[-12deg] transition-all duration-300 hover:scale-105 w-full sm:w-auto inline-block text-center"
              >
                <span className="inline-block skew-x-[12deg]">BACK TO HOME</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cards;