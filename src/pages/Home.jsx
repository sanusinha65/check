import React from 'react'
import Banner from "../components/Banner.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Intro from "../components/Intro.jsx";
import Newsletter from "../components/Newsletter.jsx";
import PopularQuestions from "../components/PopularQuestions.jsx";
import Stats from "../components/Stats.jsx";
import ExtractLeads from "../assets/extractleads.png";
import FeaturesGrid from '../components/FeaturesGrid.jsx';
import Meta from '../helper/Meta.jsx';

function Home() {

    const data = {
      heading : "The Ultimate AI-Powered LinkedIn Assistant",
      subheading:"LinkedIn Sales Navigator Scraping & Keyword Tracking made easy. No Shared Access. No Risk. Just Results.",
      para : false
    }

    const newsletterData = {
      heading:"Join for free today.",
      subheading:"Boost sales effortlessly with the best LinkedIn automation tools.",
      cta:"Create Account",
      workEmail:true,
      features:true
    }

    const statsData = {
      heading : "Introducing Real-Time LinkedIn Insights",
      subheading : "OutX tracks LinkedIn keywords and scrapes Sales Navigator data in real-time, helping you find leads, monitor trends, and engage faster—without manual effort.",
      stats : true,
      cta : false
    }

    const faqs = [
      {
        id: "1",
        question: "Why Choose OutX?",
        answer:
          "Fast & Affordable – Get leads in seconds at the lowest price. Accurate Data – Extract only high-quality and verified emails. Easy to Use – No coding required, just install and start scraping. Safe & Secure – Compliant with LinkedIn guidelines."
        },
      {
        id: "2",
        question: "How to export Sales Navigator Leads?",
        answer:
          "To export leads from LinkedIn Sales Navigator using OutX Chrome Extension, install the extension, run a Sales Navigator search, and click OutX to extract leads. Enable email discovery for verified emails and download the data in CSV format for outreach. Simple, fast, and cost-effective!"
        },
      {
        id: "3",
        question: "How to Use LinkedIn for Sales Prospecting?",
        answer:
          "Maximize LinkedIn Sales Navigator to find decision-makers using advanced filters. Optimize your profile to establish credibility, send personalized connection requests, and engage with prospects through comments and InMail. Use OutX to export and enrich leads with verified emails, making outreach efficient. Combine organic engagement with targeted outreach for better conversions."
      },
      {
        id: "4",
        question: "Why is OutX the best LinkedIn email finder?",
        answer:
          "OutX seamlessly integrates with LinkedIn through a Chrome extension, allowing you to find emails for entire LinkedIn searches or saved lists with a single click. Plus, you only pay for valid emails."
      },
      {
        id: "5",

        question: "How many leads can I extract from LinkedIn?",
        answer:
          "OutX allows you to extract up to 2,500 leads from a single Sales Navigator search or saved list. You can run unlimited scans daily while staying within LinkedIn's fair use limits."
      },
      {
        id: "6",
        question: "How do I get charged exactly?",
        answer:
          "You're only charged for each valid email found. OutX estimates the cost before running a search, and the final charge is often lower. Plus, we provide risky emails for free!"
      },
      {
        id: "7",
        question: "Why Use OutX LinkedIn Keyword Tracker?",
        answer:
          "Stay ahead of trends and opportunities by tracking specific keywords on LinkedIn in real time. Get instant alerts, engage faster, and never miss a relevant post again—all while keeping your data private."
        },
      {
        id: "8",
        question: "How Does LinkedIn Keyword Tracking Work?",
        answer:
          "Simply add your target keywords in OutX. Our system scans LinkedIn posts in real time and notifies you when a match is found, so you can engage at the right moment."
        },
      {
        id: "9",
        question: "What Keywords Should I Track?",
        answer:"Track industry trends, competitor mentions, sales triggers, job opportunities, or any topic that matters to your business. Tailor it to your goals and maximize engagement."
      },
    ];

  return (
    <>
    <Meta 
      title="LinkedIn Scraper & Post Tracker - Outx.ai" 
      description="Scrape LinkedIn Sales Navigator, track LinkedIn posts by keyword, and grow your network faster with Outx.ai. No LinkedIn access needed." 
      keywords="LinkedIn scraper, Sales Navigator scraping, LinkedIn keyword tracker, LinkedIn automation" 
    />
    <Header/>
    <Banner data={data}/>
    <Intro title="Scrape LinkedIn Leads Instantly with OutX’s Sales Navigator Scraper"
      description="Export Targeted Leads with Emails & Phone Numbers – Download Sales Navigator Data to CSV in Seconds"
      image={ExtractLeads}
      steps={[
        {
          "title": "Install Extension",
          "description": "Quick setup with our Chrome extension."
        },
        {
          "title": "Search & Scrape Sales Navigator Leads",
          "description": "Run Sales Navigator searches and extract leads instantly."
        },
        {
          "title": "Export & Engage",
          "description": "Download as CSV or sync with your CRM and start outreach."
        }
      ]}
      buttonText="Start Free Trial"
      buttonLink="/register"
      subtext="No credit card required. Start extracting leads in minutes!"
      />
    <FeaturesGrid/>
    <Stats statsData={statsData}/>
    {/* <Pricing/> */}
    <Newsletter data={newsletterData}/>
    <PopularQuestions faqs={faqs}/>
    <Footer/>
    </>
  )
}

export default Home