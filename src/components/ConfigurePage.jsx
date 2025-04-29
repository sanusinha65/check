import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactListConfiguration = () => {
  const [contactCount, setContactCount] = useState(34);
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const decreaseCount = () => {
    if (contactCount > 1) {
      setContactCount(contactCount - 1);
    }
  };

  const increaseCount = () => {
    setContactCount(contactCount + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 p-2 rounded-full w-12 h-12 flex items-center justify-center">
            <i className="fas fa-cog text-gray-600"></i>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Configure</h1>
            <p className="text-gray-500 text-sm">Specify your rules and get the exact data you need.</p>
          </div>
        </div>

        <Link to="/lead-enrichment">
        <button className="flex items-center text-gray-500 hover:text-gray-700 mt-4 md:mt-0 border border-gray-200 rounded-md px-4 py-2">
          <i className="fas fa-chevron-left mr-2"></i>
          <span>Go back</span>
        </button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="listName" className="block text-sm font-medium text-gray-700 mb-2">
            Name this list
          </label>
          <input
            type="text"
            id="listName"
            className="w-full px-4 py-3 border border-gray-300 rounded-md"
            placeholder="e.g: Sales Directors in NYC"
          />
        </div>

        <div>
          <label htmlFor="folder" className="block text-sm font-medium text-gray-700 mb-2">
            Folder
          </label>
          <div className="relative">
            <select className="flex items-center border border-gray-300 rounded-md px-4 py-3 w-full cursor-pointer">
              <option>Select Folder</option>
              
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contactCount" className="block text-sm font-medium text-gray-700 mb-2">
            Number of contacts to scrape
          </label>
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              onClick={decreaseCount}
              className="px-4 py-3 bg-white hover:bg-gray-100 text-gray-500 border-r border-gray-300"
            >
              <i className="fas fa-minus"></i>
            </button>
            <div className="flex-1 flex items-center justify-center text-gray-700 font-medium">
              {contactCount}
            </div>
            <button 
              onClick={increaseCount}
              className="px-4 py-3 bg-white hover:bg-gray-100 text-gray-500 border-l border-gray-300"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

      </div>

      <div className="flex justify-end mt-10">
        <Link to="/lead-enrichment-pricing">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md flex items-center">
          <span>Next step</span>
          <i className="fas fa-chevron-right ml-2"></i>
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactListConfiguration;