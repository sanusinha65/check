import React from 'react';

function Video() {
  return (
    <div className='w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-60 py-20 flex flex-col md:flex-row items-center gap-10'>
      <div className='flex-1 text-center md:text-left'>
        <h4 className='text-3xl md:text-4xl lg:text-[55px] font-bold leading-tight py-5'>
          See the magic in action.
        </h4>
        <p className='text-lg md:text-xl'>
          See how our LinkedIn email finder can help your team generate leads from LinkedIn at scale.
        </p>
      </div>
      <img
        src='data:image/jpeg;base64,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'
        alt='video'
        className='w-full md:w-1/2 lg:w-[500px] h-auto object-cover rounded-lg shadow-lg'
      />
    </div>
  );
}

export default Video;
