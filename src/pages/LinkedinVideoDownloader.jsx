import React, {  useState } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Steps from "../components/Steps"
import SearchScrapLead from "../assets/pasteLink.png";
import ChromeExtension from "../assets/copylink.png";
import DownloadVideo from "../assets/downloadvideo.png"
import PopularQuestions from '../components/PopularQuestions'
import Features from '../components/Features'
import { motion } from 'framer-motion';
import VideoDownloader from '../components/VideoDownloader';
import { scrapeLinkedinVideo } from '../api/supabase';
import Meta from "../helper/Meta"

function Banner() {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState(""); 
  const [loading, setLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const fetchVideoData = async () => {
    setHasSubmitted(true);
    setLoading(true);
    try {
      const data = await scrapeLinkedinVideo(linkedinUrl);
      if (data) {
        setVideoData(data);
        setLinkedinUrl(""); // ✅ only clear if data exists
      } else {
        setError("Please try again or enter a valid post url.");
      }
    } catch (err) {
      setError("Error fetching video data: " + err.message);
    } finally {
      setLoading(false);
    }
  };  

   // Animation variants
   const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  // Animation for floating elements
  const floatingAnimation = {
    y: [0, -10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleDownload = async () => {
    try {
      // Fetch the video file
      const response = await fetch(videoData.contentUrl);
      if (!response.ok) throw new Error('File fetch failed');
  
      // Create a blob from the response
      const blob = await response.blob();
  
      // Create a link element to trigger download
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = "video.mp4"; // Specify the filename for the download
      link.click(); // Trigger the download
  
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the video:", error);
    }
  };
  
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50 via-white to-blue-50"></div>

        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-purple-300/30 filter blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-blue-300/30 filter blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-12 xl:px-30 2xl:px-30 py-20 lg:py-28"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-18 text-center mt-10 sm:mt-30 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-indigo-700 to-purple-600"
          variants={itemVariants}
        >
          Download LinkedIn Videos for Free
          <motion.div 
            className="h-1 w-24 sm:w-40 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "40%", opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.h1>

        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-center lg:leading-10 sm:leading-8 lg:my-4 my-2 max-w-4xl text-gray-700"
          variants={itemVariants}
        >
          Easily download your favorite videos with this handy tool
        </motion.p>

        <motion.div
          className="flex flex-col justify-center items-center gap-6 sm:gap-8 px-4 py-6"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <input
              type="text"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="Paste LinkedIn video URL here"
              className="flex-grow lg:min-w-md px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              className="px-6 cursor-pointer py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:opacity-90 transition"
              onClick={() => fetchVideoData(linkedinUrl)}
            >
              Get Video
            </button>
          </div>

          <div className="flex justify-center items-center w-full sm:w-auto">
            {error && <div className="text-red-500">{error}</div>}
            {!loading ? (
              videoData && videoData.contentUrl ? (
                <div className="text-center">
                  <video
                    controls
                    className="w-full rounded-md border-2 border-purple-500 shadow-md shadow-purple-700/50 transition duration-300"
                    src={videoData.contentUrl}
                    width="100%"
                  >
                    Your browser does not support the video tag.
                  </video>
                  <a
                    onClick={handleDownload}
                    className="mt-4 cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-md hover:opacity-90 transition"
                  >
                    Download Video
                  </a>
                </div>
              ) : (
                hasSubmitted && (
                  <div className="text-center text-red-600 font-medium">
                    Please enter a valid LinkedIn post URL
                  </div>
                )
              )
            ) : (
              <div className="flex justify-center items-center gap-x-2 col-span-full">
                <span className="text-purple-800">Please wait...</span>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function LinkedinVideoDownloader()
{
  const steps = [
    {
      number: 1,
      title: "Copy the Video URL.",
      description: "",
      features: [
        "Click the 3 dots at the top right of the post to open options.",
        "Select 'Copy link to post' to grab the video URL."
      ],
      image: ChromeExtension,
    },
    {
      number: 2,
      title: "Paste the Video URL.",
      description: "",
      features: [
        "Navigate to OutX's LinkedIn video downloader.",
        "Paste the copied video URL into the provided field."
      ],
      image: SearchScrapLead,
    },
    {
      number: 3,
      title: "Click the Download Your Video Button",
      description: "Quick and easy download with no limits or hidden fees.",
      features: [
        "You can download unlimited LinkedIn videos at no cost.",
        "Use the downloader as many times as needed, hassle-free."
      ],
      image: DownloadVideo
    },
  ];
  

        const features = [
            { icon: "fa-check-circle", title: "Easy to Use", description: "Download LinkedIn videos in just 3 simple steps." },
            { icon: "fa-infinity", title: "Unlimited Downloads", description: "No cap on how many videos you can save." },
            { icon: "fa-dollar-sign", title: "Completely Free", description: "No hidden charges or subscription needed." },
            { icon: "fa-user-slash", title: "No Sign-Up Required", description: "Instant access without creating an account." },
            { icon: "fa-tachometer-alt", title: "Fast & Reliable", description: "Download videos quickly without hassle." },
            { icon: "fa-laptop", title: "Works on Any Device", description: "Access and download from mobile or desktop." }
        ];          
    

        const faqs = [
          {
            id:1,
            question: "Is this LinkedIn Video Downloader free?",
            answer:
              "Yes! It's 100% free to use—no hidden fees, no sign-up, and no limits."
          },
          {
            id:2,
            question: "Do I need an account to download videos?",
            answer:
              "Not at all. Just paste the video URL and click download. It’s that simple."
          },
          {
            id:3,
            question: "Can I use this tool on mobile devices?",
            answer:
              "Yes! The tool works perfectly on phones, tablets, and desktops—any device with a browser."
          },
          {
            id:4,
            question: "Is there a limit on how many videos I can download?",
            answer:
              "Nope! Download as many LinkedIn videos as you want—totally unlimited."
          },
        ];

  return (
    <>
    <Meta 
        title="LinkedIn Video Downloader - Save LinkedIn Videos Easily | Outx.ai" 
        description="Download LinkedIn videos in one click. Save important content and share with your team." 
        keywords="LinkedIn video downloader, download LinkedIn videos, save LinkedIn content" 
    />
    <Header/>
    <Banner/>
    <Steps stepsData={steps} heading="You can download any LinkedIn video in 3 easy steps with OutX"/>
    <Features features={features} />
    <VideoDownloader/>
    <PopularQuestions faqs={faqs}/>
    <Footer/>
    </>
  )
}

export default LinkedinVideoDownloader