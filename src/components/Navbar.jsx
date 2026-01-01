import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import Logo from "../../public/images/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Navigation items now mapped to your routes
  const navItems = [
    { label: "HOME", path: "/" },
    { label: "SERVICES", path: "/services" },
    { label: "CONTACT US", path: "/contact" },
    { label: "ABOUT", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-purple-900/20 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with text */}
          <div className="flex items-center ml-2 sm:ml-4 md:ml-6 pt-1">
            <img src={Logo} alt="Pixellift Logo" className="h-5 sm:h-6 w-auto mr-2" />
            <span className="font-bold text-base sm:text-lg text-white">
              PIXELLIFT
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 pt-1">
            <ul className="flex space-x-6 lg:space-x-8">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`font-medium transition-colors ${
                      isScrolled
                        ? "text-white hover:text-purple-200"
                        : "text-white hover:text-blue-200"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-2 pb-4 rounded-lg ${
              isScrolled ? "bg-purple-900/30 backdrop-blur-md" : "bg-black/80"
            }`}
          >
            <ul className="flex flex-col space-y-3 px-4 sm:px-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="block py-3 font-medium text-sm sm:text-base text-white"
                    onClick={() => setMobileMenuOpen(false)} // ✅ closes menu after click
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
