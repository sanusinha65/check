import React from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import Steps from "../components/Steps"
import SearchScrapLead from "../assets/posts.png";
import ChromeExtension from "../assets/extension.png";
import LinkedinCSV from "../assets/mail.png"
import Newsletter from '../components/Newsletter'
import PopularQuestions from '../components/PopularQuestions'
import Features from '../components/Features'
import Intro from '../components/Intro'
import Stats from '../components/Stats'
import Pricing from '../components/Pricing'
import Banner from '../components/Banner'
import ExtractLeads from "../assets/extractleads.png";
import FeaturesGrid from '../components/FeaturesGrid.jsx';
import KeywordPricing from '../components/KeywordPricing.jsx'
import Meta from '../helper/Meta.jsx';

function KeywordTracker ()
{
  

  const pricingData = {
    title: "80% cheaper than competitors",
    subtitle: "Compare tracking costs",
    ctaText: "Start Saving Today",
    ctaSubtext: "No credit card required. Try it risk-free.",
    items: [
      { company: "Brand24", price: "199$", width: "100%", highlight: false, savings: "0%" },
      { company: "Mention", price: "83$", width: "70%", highlight: false, savings: "58%" },
      { 
        company: "OUTX", 
        price: "39$", 
        width: "25%", 
        highlight: true, 
        savings: "81%",
        bestValueText: "Best value for your investment - Save 81% compared to top competitors"
      }
    ]
  };

    const steps = [
          {
            number: 1,
            title: "Install OutX.ai Chrome Extension",
            description:
              "Export entire searches, lead lists, or projects from LinkedIn.",
            features: [
              "Quick and easy setup—takes less than 30 seconds.",
              "No coding or LinkedIn credentials required.",
            ],
            image: ChromeExtension,
            cta: {
              text: "Get Chrome Extension",
              href: "https://chromewebstore.google.com/search/OutX%20-%20LinkedIn%20Scrapping%2C%20Tracking%20%26%20Automation?pli=1",
            },
          },
          {
            number: 2,
            title: "Enter Your Target Keywords",
            description:
              "Find verified email addresses and phone numbers for your LinkedIn Prospects with 99% accuracy.",
            features: [
              "Track industry terms, competitor names, job-related keywords, or customer pain points.",
              "Use multiple keywords to capture all relevant conversations.",
            ],
            image: SearchScrapLead,
          },
          {
            number: 3,
            title: "Get Real-Time Alerts & Insights",
            description:
              "Built in prospect and company enrichment for your leads.",
            features: [
              "Instantly see posts mentioning your keywords.",
              "Identify prospects, monitor competitors, and follow industry trends.",
            ],
            image: LinkedinCSV
          },
        ];
    
    
        const data = {
          heading : "Real-Time LinkedIn Keyword Tracking with Outx.ai",
          subheading:"Track any keyword on LinkedIn posts in real-time. Stay ahead of conversations, spot leads, follow competitors, and engage faster—no LinkedIn access shared!",
          para : false
        }

        const newsletterData = {
          heading:"Download your first leads now",
          cta:"Export your list",
          workEmail:false,
          features:false
        }

        const features = [
          { icon: "fa-bolt", title: "Track Keywords in Real Time", description: "See LinkedIn posts with your keywords instantly." },
          { icon: "fa-search", title: "Find Leads Faster", description: "Spot people posting or engaging with your keywords." },
          { icon: "fa-bell", title: "Get Alerts Instantly", description: "Know when prospects mention tracked topics." },
          { icon: "fa-comments", title: "Engage at the Right Time", description: "Jump into conversations that matter." },
          { icon: "fa-cloud", title: "No Manual Searching", description: "Cloud-powered tracking saves you time." },
          { icon: "fa-shield-alt", title: "Privacy-Protected", description: "No LinkedIn access or credentials shared." }
        ];
        
        const statsData = {
          heading : "Start Tracking Today!",
          subheading : "Turn LinkedIn Posts into Instant Opportunities!",
          stats : false,
          cta : true
        }
        const faqs = [
          {
            id: 1,
            question: "Why Use OutX LinkedIn Keyword Tracker?",
            answer:
              "Stay ahead of trends and opportunities by tracking specific keywords on LinkedIn in real time. Get instant alerts, engage faster, and never miss a relevant post again—all while keeping your data private."
          },
          {
            id: 2,
            question: "How Does LinkedIn Keyword Tracking Work?",
            answer:
              "Simply add your target keywords in OutX. Our system scans LinkedIn posts in real time and notifies you when a match is found, so you can engage at the right moment."
          },
          {
            id: 3,
            question: "What Keywords Should I Track?",
            answer:
              "Track industry trends, competitor mentions, sales triggers, job opportunities, or any topic that matters to your business. Tailor it to your goals and maximize engagement."
          },
          {
            id: 4,
            question: "Can I Get Alerts for New Keyword Mentions?",
            answer:
              "Yes! OutX sends instant notifications whenever your chosen keywords appear in LinkedIn posts, so you can act fast and stay ahead of the conversation."
          },
          {
            id: 5,
            question: "How Does OutX Keep My Data Private?",
            answer:
              "OutX operates in a privacy-first cloud-based setup. We don’t store or share your LinkedIn credentials, ensuring a secure and compliant tracking experience."
          },
          {
            id: 6,
            question: "Does It Work on All LinkedIn Posts?",
            answer:
              "Yes, OutX scans posts from your network, industry leaders, and public content, giving you a comprehensive view of relevant discussions."
          }
        ];

  return (
    <>
    <Meta 
      title="LinkedIn Post Keyword Tracker - Track Leads & Trends | Outx.ai" 
      description="Track LinkedIn posts by keywords in real time. Spot prospects, trends, and outreach opportunities before anyone else." 
      keywords="LinkedIn keyword tracker, track LinkedIn posts, LinkedIn monitoring, LinkedIn trends tracking" 
    />
    <Header/>
    <Banner data={data}/>
    <Intro
      title="Monitor LinkedIn Posts in Real-Time – Find Leads, Track Competitors & Engage Faster."
      description=""
      image={ExtractLeads}
      steps={[
        {
          "title": "Install Extension",
          "description" : "Quickly set up OutX’s Chrome extension to start tracking LinkedIn content effortlessly."
        },
        {
          "title": "Enter Your Target Keywords",
          "description": "Define specific keywords relevant to your industry, prospects, or topics to track posts in real time."
        },
        {
          "title": "Get Real-Time Alerts & Engage Instantly",
          "description": "Receive instant notifications when posts match your keywords, allowing you to engage at the right moment."
        }
      ]}
      buttonText="Track Keywords Now"
      buttonLink="/register"
      subtext="No credit card required. Start tracking LinkedIn posts in real time!"
    />
    <FeaturesGrid/>
    <Steps stepsData={steps} heading="How It Works – Track Keywords on LinkedIn Effortlessly! "/>
      <Features features={features} />
      <Pricing
        pricingData={pricingData}
        onCtaClick={() => console.log("CTA clicked")}
      />
    <PopularQuestions faqs={faqs}/>
    <Footer/>
    </>
  )
}

export default KeywordTracker