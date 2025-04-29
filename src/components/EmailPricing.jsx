import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function EmailPricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [credits, setCredits] = useState(10000);

  const pricing = {
    10000: { monthly: 99, yearly: 68 },
    5000: { monthly: 59, yearly: 41 },
    500: { monthly: 19, yearly: 13 },
    1000: { monthly: 29, yearly: 20 },
    2000: { monthly: 39, yearly: 27 },
    20000: { monthly: 179, yearly: 124 },
    40000: { monthly: 299, yearly: 206 },
    80000: { monthly: 499, yearly: 344 },
    100000: { monthly: 589, yearly: 406 },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Find Emails</h2>
        <p className="text-gray-500 mt-1">Find the emails of the leads:</p>
      </div>

      <div className="flex flex-col items-center w-full md:w-96 mx-auto mt-6 gap-4">
        <button className="flex flex-col items-center justify-center p-4 w-full bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
          <span className="text-lg font-medium">All Leads</span>
          <span className="text-gray-300 text-sm">36 credits</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 w-full bg-white border border-gray-800 text-black rounded-lg hover:bg-gray-100 transition">
          <span className="text-lg font-medium">Selected Leads</span>
          <span className="text-black text-sm">34 credits</span>
        </button>
      </div>

      <p className="text-gray-500 text-sm mt-3 text-center">
        Credits will be refunded for unfound emails
      </p>

      <div className="flex items-center justify-center gap-4 my-8">
        <span className="text-gray-600 text-lg">Monthly</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
          <div className="w-14 h-7 bg-gray-400 peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gray-800"></div>
        </label>
        <span className="text-gray-600 text-lg">Yearly</span>
        <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-full font-bold">-17%</span>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-lg mx-auto text-center w-full md:w-96">
        <h2 className="text-4xl font-bold text-gray-800">
          ${isYearly ? pricing[credits].yearly : pricing[credits].monthly}
        </h2>
        <p className="text-gray-600">Per month</p>
        <Link to="/register">
          <button className="mt-4 w-full cursor-pointer bg-gray-800 text-white py-2 rounded-lg text-lg font-semibold hover:bg-gray-700 transition">
            Try OutX Now
          </button>
        </Link>

        <div className="mt-5 text-gray-700 space-y-1">
          <p className="text-sm font-semibold">1 lead or account exported = 1 credit</p>
          <p className="text-sm font-semibold">1 email found = 1 credit</p>
          <p className="text-sm text-gray-500">(1 lead exported with email = 2 credits)</p>
        </div>

        <select
          className="mt-4 w-full p-2 text-md font-semibold border rounded-lg text-gray-700 bg-white"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
        >
          {Object.keys(pricing).map((credit) => (
            <option key={credit} value={credit}>
              {credit} credits/month
            </option>
          ))}
        </select>

        <div className="mt-6 text-left text-gray-700 space-y-2">
          {[
            'Export leads',
            'Export accounts',
            'Find emails',
            'Verify emails',
            'Clean data',
            'Filter leads',
            'Unlimited seats',
            'Unlimited SN accounts',
            'Credits rollover',
          ].map((feature) => (
            <div key={feature} className="flex items-center">
              <input type="checkbox" checked className="mr-2 accent-gray-600" readOnly />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmailPricing;
