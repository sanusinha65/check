import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from "../api/supabaseClient";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false)
  const [freeToolsOpen, setFreeToolsOpen] = useState(false);
  const freeToolsRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const productsRef = useRef(null);
  const pricingRef = useRef(null)

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false);
      }

      if (pricingRef.current && !pricingRef.current.contains(event.target)) {
        setPricingOpen(false);
      }

      if (freeToolsRef.current && !freeToolsRef.current.contains(event.target)) {
        setPricingOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [productsRef, pricingRef, freeToolsRef]);

  const navLinks = [
    // { name: "Home", path: "/" },
    // { name: "Pricing", path: "/linkedin-sales-navigator-scraper/pricing" },
    { name: "Blog", path: "/blog" },
    // { name: "About", path: "/about" }
  ];

  const productsLinks = [
    { name: "LinkedIn Sales Navigator Scraper", path: "/linkedin-sales-navigator-scraper"},
    { name: "LinkedIn Keyword Tracking", path: "/linkedin-keyword-tracker" }
    // { name: "Chrome Extension", path: "/chrome-extension" }
  ];

  const pricingLinks = [
    { name: "LinkedIn Sales Navigator Pricing", path: "/linkedin-sales-navigator-pricing"},
    { name: "LinkedIn Keyword Tracking Pricing", path: "/linkedin-keyword-tracker-pricing" }
  ];

  const freeToolsLinks = [
    // { name: "LinkedIn Post Generator", path: "/linkedin-post-generator" },
    // { name: "LinkedIn Headline Generator", path: "/linkedin-headline-generator" },
    // { name: "LinkedIn Summary Generator", path: "/linkedin-summary-generator" },
    // { name: "LinkedIn Profile Feedback", path: "/linkedin-profile-feedback" },
    // {name : "Viral Post Generator", path: "/viral-post-generator"},
    // {name : "LinkedIn Post Booster", path: "/linkedin-post-booster"},
    {name : "LinkedIn Video Downloader", path: "/linkedin-video-downloader"},
    // {name : "LinkedIn Carousel Generator", path: "/linkedin-carousel-generator"},
  ];

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.4,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    },
    closed: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const dropdownVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    },
    closed: { 
      opacity: 0, 
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  const dropdownItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }
    },
    closed: {
      opacity: 0,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white/95 backdrop-blur-md shadow-md' : 'py-4 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center">
            <motion.div 
              className="text-2xl font-bold text-purple-700 mr-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              OutX
            </motion.div>
            <motion.span 
              className="text-sm text-gray-600 hidden md:inline-block"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LinkedIn Automation
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden lg:flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Regular nav links */}
            <Link 
              to="/" 
              className="px-4 py-2 text-gray-700 hover:text-purple-700 rounded-md font-medium text-sm transition-colors"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div ref={productsRef} className="relative">
              <button 
                className="px-4 py-2 text-gray-700 hover:text-purple-700 rounded-md font-medium text-sm transition-colors flex items-center"
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setPricingOpen(false);
                }}
                onMouseEnter={() => {
                  setProductsOpen(true);
                  setPricingOpen(false);
                }}
              >
                Products
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${productsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {productsOpen && (
                  <motion.div 
                    className="absolute left-0 mt-1 w-72 bg-white rounded-md shadow-lg py-1 z-50"
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {productsLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        variants={dropdownItemVariants}
                      >
                        <Link 
                          to={link.path} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => setProductsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={pricingRef} className="relative">
              <button 
                className="px-4 py-2 text-gray-700 hover:text-purple-700 rounded-md font-medium text-sm transition-colors flex items-center"
                onClick={() => setPricingOpen(!pricingOpen)}
                onMouseEnter={() => setPricingOpen(true)}
              >
                Pricing
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${pricingOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {pricingOpen && (
                  <motion.div 
                    className="absolute left-0 mt-1 w-72 bg-white rounded-md shadow-lg py-1 z-50"
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onMouseLeave={() => setPricingOpen(false)}
                  >
                    {pricingLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        variants={dropdownItemVariants}
                      >
                        <Link 
                          to={link.path} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => setPricingOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={freeToolsRef} className="relative">
              <button 
                className="px-4 py-2 text-gray-700 hover:text-purple-700 rounded-md font-medium text-sm transition-colors flex items-center"
                onClick={() => setFreeToolsOpen(!freeToolsOpen)}
                onMouseEnter={() => setFreeToolsOpen(true)}
              >
                Free Tools
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 ml-1 transition-transform ${freeToolsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {freeToolsOpen && (
                  <motion.div 
                    className="absolute left-0 mt-1 w-72 bg-white rounded-md shadow-lg py-1 z-50"
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onMouseLeave={() => setFreeToolsOpen(false)}
                  >
                    {freeToolsLinks.map((link, index) => (
                      <motion.div
                        key={index}
                        variants={dropdownItemVariants}
                      >
                        <Link 
                          to={link.path} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          onClick={() => setFreeToolsOpen(false)}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Remaining nav links */}
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
              >
                <Link 
                  to={link.path} 
                  className="px-4 py-2 text-gray-700 hover:text-purple-700 rounded-md font-medium text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {isAuthenticated ?
            <motion.div
            className="ml-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Link to="/dashboard">
              <motion.button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Dashboard
              </motion.button>
            </Link>
          </motion.div> : ( <><motion.div
              className="ml-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Link to="/login">
                <motion.button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Log in
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <Link to="/register">
                <motion.button 
                  className="ml-2 px-4 py-2 bg-[#6241D3] text-white rounded-md hover:bg-purple-700 font-medium text-sm shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get started
                </motion.button>
              </Link>
            </motion.div> </>)}
          </motion.nav>

          {/* Mobile menu button */}
          <motion.button 
            className="lg:hidden flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6 text-gray-800"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden overflow-hidden mt-4"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div className="flex flex-col py-2 space-y-1 bg-white/90 backdrop-blur-md rounded-lg shadow-lg">
                {/* Home link */}
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/" 
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>

                {/* Products with nested mobile dropdown */}
                <motion.div variants={itemVariants}>
                  <button 
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                    onClick={() => {
                      setProductsOpen(!productsOpen);
                      setPricingOpen(false);
                    }}
                  >
                    Products
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {productsLinks.map((link, index) => (
                          <Link 
                            key={index}
                            to={link.path} 
                            className="block px-8 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button 
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                    onClick={() => setPricingOpen(!pricingOpen)}
                  >
                    Pricing
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transition-transform ${pricingOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {pricingOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {pricingLinks.map((link, index) => (
                          <Link 
                            key={index}
                            to={link.path} 
                            className="block px-8 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button 
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center justify-between"
                    onClick={() => setFreeToolsOpen(!freeToolsOpen)}
                  >
                    Free Tools
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 transition-transform ${freeToolsOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {freeToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        {freeToolsLinks.map((link, index) => (
                          <Link 
                            key={index}
                            to={link.path} 
                            className="block px-8 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Remaining mobile nav links */}
                {navLinks.map((link, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                  >
                    <Link 
                      to={link.path} 
                      className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                
                {isAuthenticated ? (
                  <motion.div 
                  className="border-t border-gray-100 pt-2 mt-2 px-4 flex flex-col space-y-2"
                  variants={itemVariants}
                >
                  <Link to="/dashboard">
                    <button className="w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      Dashboard
                    </button>
                  </Link>
                  </motion.div>
                  ) : (<motion.div 
                  className="border-t border-gray-100 pt-2 mt-2 px-4 flex flex-col space-y-2"
                  variants={itemVariants}
                >
                  <Link to="/login">
                    <button className="w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                      Log in
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="w-full py-2 bg-[#6241D3] text-white rounded-md hover:bg-purple-700 transition-colors">
                      Get started
                    </button>
                  </Link>
                </motion.div>)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;