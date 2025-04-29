import React from 'react';
import { Link } from 'react-router-dom';

const LeadEnrichmentSelector = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans bg-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4"><path d="M11 12C13.7614 12 16 9.76142 16 7C16 9.76142 18.2386 12 21 12C18.2386 12 16 14.2386 16 17C16 14.2386 13.7614 12 11 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 6.5C8.82843 6.5 9.5 5.82843 9.5 5C9.5 5.82843 10.1716 6.5 11 6.5C10.1716 6.5 9.5 7.17157 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 11C3.55228 11 4 10.5523 4 10C4 10.5523 4.44772 11 5 11C4.44772 11 4 11.4477 4 12C4 11.4477 3.55228 11 3 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 17C6.65685 17 8 15.6569 8 14C8 15.6569 9.34315 17 11 17C9.34315 17 8 18.3431 8 20C8 18.3431 6.65685 17 5 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Select output</h1>
          <p className="text-gray-500 text-sm">Choose the level of data enrichment you want for your leads. The more the better!</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">No Email</h2>
            <p className="text-gray-500 text-sm mb-4">Export leads from LinkedIn without contact info.</p>
          
            <Link to="/lead-enrichment-config">
            <button className="w-full border border-gray-300 shadow-md rounded-md py-3 px-4 mb-6 flex justify-center gap-x-2 items-center text-gray-700 bg-white hover:bg-gray-50">
              <span>Select</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            </Link>
          
            <div>
              <p className="text-gray-500 text-sm mb-3">Data you get:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Full name</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Title</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Company</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">LinkedIn URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Location</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">+21 firmographics</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Mobile number</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Direct dial</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Personal emails</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border border-gray-200  rounded-lg overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-gray-800">Email only</h2>
            </div>
            <p className="text-gray-500 text-sm mb-4">Essential contact info to reach out accurately.</p>
          
            <Link to="/lead-enrichment-config">
            <button className="w-full bg-gray-600 text-white shadow-md rounded-md py-3 px-4 mb-6 flex justify-center gap-x-2 items-center hover:bg-gray-700">
              <span>Select</span>
              <i className="fas fa-chevron-right"></i>
            </button>
            </Link>
          
            <div>
              <p className="text-gray-500 text-sm mb-3">Data you get:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Full name</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Title</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Company</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">LinkedIn URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Location</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">+21 firmographics</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-gray-600 mt-1 w-5 text-xs"></i>
                  <span className="text-sm">Email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Mobile number</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Direct dial</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-gray-400 mt-1 w-5 text-xs"></i>
                  <span className="text-sm text-gray-400">Personal emails</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadEnrichmentSelector;