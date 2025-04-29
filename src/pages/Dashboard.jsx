import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from "react-redux";
import Meta from "../helper/Meta"

export default function App() {
  const { initials,  name, plugin_installed_at } = useSelector(state => state.user);

  return (
    <>
    <Meta 
      title="Outx.ai Dashboard - Manage Your LinkedIn Growth" 
      description="View and manage your Sales Navigator scraping and keyword tracking all in one dashboard." 
      keywords="LinkedIn scraping dashboard, LinkedIn tracker dashboard, Outx.ai dashboard" 
    />
    <div className="min-h-screen w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
      <main className="py-6">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f2f0f8] flex items-center justify-center font-semibold text-sm sm:text-md">
            {initials}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">Welcome {name} 👋</h1>
            <p className="text-gray-600 text-sm sm:text-md">
              Get started by installing the browser extension and start prospecting on LinkedIn today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl text-gray-800 pb-2 font-semibold">Install the extension</h2>
            <p className="text-sm sm:text-md text-gray-500 pb-3">
            Install the OutX extension from google chrome to use outx.ai.
            </p>
            <div className="w-full">
            <a target="_blank" href="https://chromewebstore.google.com/detail/outxai-ai-powered-linkedi/epnimaeheelhgeelbppbfkjegklflakj">
            <button className="cursor-pointer mt-auto w-full bg-[#6241D3] text-white px-4 py-2 rounded-md text-sm sm:text-md" onClick={() => MixpanelService.trackDashboardInteraction("add_to_chrome")}>
              
              {plugin_installed_at ? 
              <>
              Already Installed {" "}
              <FontAwesomeIcon icon={faCheck} className="text-md"/>
              </>
               : 
              <>
              Add to Chrome {" "}
              <FontAwesomeIcon icon={faPlus} className="text-md"/>
              </>
              }
            </button>
            </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl text-gray-800 pb-2 font-semibold">Track Linkedin Posts</h2>
            <p className="text-sm sm:text-md text-gray-500 pb-3">
            Automatically track and monitor LinkedIn posts using relevant keywords.
            </p>
            <div className="w-full">
            <a href="/tracking/?addKeyword=true">
            <button className="cursor-pointer mt-auto w-full border border-gray-300 px-4 py-2 rounded text-sm sm:text-md" onClick={() => MixpanelService.trackDashboardInteraction("track_linkedin_posts")}>
              Give it a try
            </button>
            </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl text-gray-800 pb-2 font-semibold">Scrape lead from Linkedin</h2>
            <p className="text-sm sm:text-md text-gray-500 pb-3">
            Scrape sales navigator leads or any posts leads from linkedin.
            </p>
            <div className="w-full">
            <a target="_blank" href="https://www.linkedin.com/in/siddhantmohan/">
            <button className="cursor-pointer mt-auto w-full border border-gray-300 px-4 py-2 rounded text-sm sm:text-md"  onClick={() => MixpanelService.trackDashboardInteraction("scrape_leads")}>
              Give it a try
            </button>
            </a>
            </div>
          </div>
        </div>
        
        <div className="py-6 lg:my-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4">
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold">Analytics</h2>
              <p className="text-gray-500">Get familiar with your usage.</p>
            </div>
            <div className="flex flex-row gap-2">
              <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                <option>{name} (Me)</option>
                {/* <option>User 1</option>
                <option>User 2</option> */}
              </select>
              <select className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-lg">Credits Used</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-lg">Phone Credit Used</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-lg">Contacts Created</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

      </main>
    </div>
    </>
  );
}
