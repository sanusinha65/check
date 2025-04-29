import React from 'react';
import ConvertSales from "../assets/convertsales.png"
import User from "../assets/user.jpg"

const Testimonial = () => {
  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30 py-20">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src={ConvertSales}
            alt="Testimonial"
            className="w-full h-auto rounded-2xl object-cover shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-3/4 space-y-8 animate-fade-up flex-1">
          <blockquote className="text-3xl md:text-4xl font-medium tracking-tight leading-12">
          "Convert Sales Navigator searches into verified email lists instantly — save time and boost outreach."</blockquote>
          <div className="flex items-center gap-4">
            {/* <img
              src={User}
              alt="User"
              className="w-20 h-20 rounded-full object-cover bg-gray-200"
            /> */}
            <div>
              <h4 className="font-semibold text-lg">Brendan McDonald</h4>
              <p className="text-gray-600">Data Operations, PartnerStack</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold flex gap-x-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                </svg>
                <span>75%</span>
                </div>
              </div>
              <p className="text-gray-600">In time saved on prospecting</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold flex items-center gap-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span>97%</span>
                </div>
              </div>
              <p className="text-gray-600">Achieved data accuracy on average</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
              <div className="text-2xl font-bold flex items-center gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
                <span>3 days</span>
                </div>
              </div>
              <p className="text-gray-600">Time to achieve the first results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
