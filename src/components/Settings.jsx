import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Meta from "../helper/Meta";

export default function Settings() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", icon: "fas fa-user" },
    { name: "Account", icon: "fas fa-building" },
    { name: "Billing", icon: "fas fa-credit-card" },
  ];

  useEffect(() => {
    const currentTab = location.pathname.split("/").pop();
    setActiveTab(currentTab.charAt(0).toUpperCase() + currentTab.slice(1));
  }, [location]);

  return (
    <>
    <Meta 
      title="LinkedIn Scraper & Post Tracker - Outx.ai" 
      description="Scrape LinkedIn Sales Navigator, track LinkedIn posts by keyword, and grow your network faster with Outx.ai. No LinkedIn access needed." 
      keywords="LinkedIn scraper, Sales Navigator scraping, LinkedIn keyword tracker, LinkedIn automation" 
    />
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block w-1/4 bg-white border-r border-gray-300 pl-8 py-10">
        <h2 className="text-lg font-semibold mb-4 pb-4 border-gray-300">Settings</h2>
        <ul>
          {tabs.map((tab) => (
            <Link to={tab.name.toLowerCase()} key={tab.name}>
              <li
                className={`flex items-center p-3 cursor-pointer transition-all hover:bg-gray-200 ${
                  activeTab === tab.name ? "bg-gray-100" : ""
                }`}
              >
                <i className={`${tab.icon} mr-3`}></i>
                {tab.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
    </>
  );
}
