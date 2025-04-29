import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, ExternalLink, Heart } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  // Reorganized and enhanced footer sections
  const footerSections = [
    {
      title: "Products",
      links: [
        { name: "LinkedIn Sales Navigator Scraper", path: "/linkedin-sales-navigator-scraper"},
        { name: "LinkedIn Keyword Tracking", path: "/linkedin-keyword-tracker" },
        // { name: "Chrome Extension", path: "/chrome-extension" }
      ]
    },
    // {
    //   title: "Free Tools",
    //   links: [
    //     { name: "LinkedIn Post Generator", path: "/linkedin-post-generator" },
    //     { name: "LinkedIn Headline Generator", path: "/linkedin-headline-generator" },
    //     { name: "LinkedIn Summary Generator", path: "/linkedin-summary-generator" },
    //     { name: "LinkedIn Profile Feedback", path: "/linkedin-profile-feedback" },
    //     {name : "Viral Post Generator", path: "/viral-post-generator"},
    //     {name : "LinkedIn Post Booster", path: "/linkedin-post-booster"},
    //     {name : "LinkedIn Video Downloader", path: "/linkedin-video-downloader"},
    //     {name : "LinkedIn Carousel Generator", path: "/linkedin-carousel-generator"},
    //   ]
    // },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        // { name: "Help Center", path: "/help" }
      ]
    },
    {
      title: "Company",
      links: [
        // { name: "About Us", path: "/about" },
        { name: "Linkedin Sales Navigator Pricing", path: "/linkedin-sales-navigator-pricing" },
        { name: "Linkedin Keyword Tracking Pricing", path: "/linkedin-keyword-tracker-pricing" },
        { name: "Become an Affiliate", path: "/affiliate-program" },
        // { name: "Careers", path: "/careers" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms-of-service" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Cookie Policy", path: "/cookie-policy" },
        { name: "GDPR Compliance", path: "/gdpr-compliance" },
        { name: "CCPA Privacy Policy", path: "/ccpa-privacy-policy" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: faTwitter, url: "#", color: "bg-blue-400 hover:bg-blue-500" },
    { name: "LinkedIn", icon: faLinkedin, url: "#", color: "bg-blue-700 hover:bg-blue-800" },
    { name: "Facebook", icon: faFacebook, url: "#", color: "bg-blue-600 hover:bg-blue-700" },
    { name: "Instagram", icon: faInstagram, url: "#", color: "bg-pink-600 hover:bg-pink-700" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.3, 
        delay: 0.1 + (i * 0.05) 
      } 
    })
  };

  return (
    <footer className="relative pt-20 pb-6 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-30"></div>
        
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200/20 filter blur-3xl"
          animate={{ 
            y: [0, 20, 0], 
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 15,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-200/20 filter blur-3xl"
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 18,
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter Section (New) */}
        <motion.div 
          className="relative mb-20 p-8 lg:p-10 bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-60"></div>
          <div className="absolute right-0 bottom-0 w-40 h-40 md:w-64 md:h-64 opacity-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#6241D3" d="M44.6,-58.9C57.5,-49.4,67.5,-35.5,73.4,-19.3C79.3,-3.1,81.1,15.3,74.2,29.5C67.3,43.7,51.6,53.7,35.5,61.1C19.3,68.5,2.7,73.3,-13.9,71.8C-30.5,70.4,-47.1,62.8,-59.3,49.8C-71.5,36.8,-79.3,18.4,-78.1,0.7C-77,-17,-66.9,-34,-53.8,-43.5C-40.7,-53,-20.3,-55.1,-1.7,-53C16.9,-50.9,33.8,-44.6,47.4,-56.5C60.9,-68.4,76.2,-98.6,44.6,-58.9Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-left max-w-lg">
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Stay updated with OutX
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get the latest news, updates and tips delivered directly to your inbox.
              </motion.p>
            </div>
            
            <motion.div 
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-72 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Footer top section with logo and links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-16">
            {/* Logo and company info column */}
            <motion.div 
              className="lg:col-span-2"
              variants={childVariants}
            >
              <Link to="/" className="inline-block mb-6">
                <motion.div 
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  OutX.ai
                </motion.div>
              </Link>
              <p className="text-gray-600 mb-6 max-w-xs">
                Helping sales professionals unlock the power of LinkedIn with automatic lead generation and real-time tracking.
              </p>
              
              {/* Social links */}
              {/* <div className="flex space-x-3 mb-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white shadow-sm`}
                    whileHover={{ y: -4, rotate: 5, boxShadow: "0 8px 15px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                  >
                    <FontAwesomeIcon icon={social.icon} size="lg" />
                  </motion.a>
                ))}
              </div>
               */}
               
              {/* Contact link */}
              <motion.a 
                href="mailto:hello@outx.ai" 
                className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-700"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 mr-2" />
                hello@outx.ai
              </motion.a>
            </motion.div>
            
            {/* Links columns */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex}
                variants={childVariants}
              >
                <h4 className="text-base font-bold text-gray-900 mb-5 pb-1 border-b border-gray-200">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      custom={linkIndex}
                      variants={linkVariants}
                    >
                      <Link 
                        to={link.path} 
                        className={`group flex items-center text-sm ${link.highlight ? 'text-purple-600 font-medium' : 'text-gray-600'} hover:text-purple-700 transition-colors duration-200`}
                      >
                        <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                        {link.name}
                        {link.highlight && (
                          <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                            New
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          {/* Footer bottom section */}
          <motion.div 
            className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-center md:text-left"
            variants={childVariants}
          >
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} OutX.ai. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              {/* <motion.a 
                href="#"
                className="hover:text-purple-600 transition-colors flex items-center"
                whileHover={{ x: 2 }}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                Status
              </motion.a> */}
              {/* <motion.a 
                href="#"
                className="hover:text-purple-600 transition-colors flex items-center"
                whileHover={{ x: 2 }}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                Security
              </motion.a> */}
              <motion.div 
                className="flex items-center text-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                <span>Made with</span>
                <Heart className="w-4 h-4 mx-1 text-red-500" />
                <span>in SF</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Disclaimer */}
        <motion.p 
          className='text-gray-400 text-xs md:text-sm py-8 text-center mt-10'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Disclaimer: OutX Inc, is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Microsoft or LinkedIn, or any of their subsidiaries or affiliates.
          The name LinkedIn, as well as related names, marks, logos, emblems, and images are registered trademarks of their respective owners.
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;