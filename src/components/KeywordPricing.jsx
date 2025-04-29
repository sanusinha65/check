import React from 'react';

const KeywordPricing = () => {
  return (
    <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 xl:px-30 2xl:px-30">
      <div className='py-20'>
      <h1 className="font-bold text-3xl md:text-4xl leading-tight mb-4 text-center">70% cheaper than competitors</h1>
      <p className="text-lg md:text-xl  text-center mb-12">Compare tracking costs</p>

      <div className="space-y-4">
        <div>
          <div className="text-xl mb-2">Brand24</div>
          <div className="flex items-center">
            <div className="h-8 rounded-md bg-gray-200 w-full max-w-full"></div>
            <div className="ml-4 text-2xl">199$</div>
          </div>
        </div>


        <div>
          <div className="text-xl mb-2">Mention</div>
          <div className="flex items-center">
            <div className="h-8 rounded-md bg-gray-200 w-4/5 max-w-3xl"></div>
            <div className="ml-4 text-2xl">83$</div>
          </div>
        </div>


        <div>
          <div className="font-bold text-xl mb-2">OUTX <span className='text-2xl'>🎉</span></div>
          <div className="flex items-center">
            <div className="h-8 w-1/4 max-w-sm rounded bg-[#8160ec]"></div>
            <div className="ml-4 text-xl font-semibold flex items-center">
              <span className="text-xl">39$</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default KeywordPricing;