import React, { useState } from 'react';
import TeamsTableComponent from '../components/TeamsTableComponent';
import TeamsModal from '../components/TeamsModal';
import MixpanelService from '../utils/mixpanel';
import Meta from '../helper/Meta';

const Teams = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  return (
    <>
    <Meta 
        title="Outx.ai Team Collaboration" 
        description="Collaborate with your team on LinkedIn scraping and tracking tasks inside Outx.ai." 
        keywords="LinkedIn scraping team, LinkedIn tracking collaboration, Outx.ai teams" 
    />
    <div className="min-h-screen w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
      <div className="my-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between my-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Teams</h2>
            <p className="text-gray-500 text-sm">
            Invite teammates, assign roles, set credit limits and more.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-x-4'>
          <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <i className="fa fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

          <button 
            onClick={() => {setIsOpen(true); MixpanelService.trackModalInteraction("invite_user", "opened")}} 
            className="bg-[#6241D3] text-white px-5 py-2 rounded-md mt-4 md:mt-0 transition hover:bg-[#8b82a6] cursor-pointer flex items-center gap-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"><path d="M17 14V20M5.75 19V16.25C5.75 15.1454 6.64543 14.25 7.75 14.25H12M15.25 8C15.25 9.79493 13.7949 11.25 12 11.25C10.2051 11.25 8.75 9.79493 8.75 8C8.75 6.20507 10.2051 4.75 12 4.75C13.7949 4.75 15.25 6.20507 15.25 8Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 17H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <span> Invite user</span>
          </button>
      </div>
        </div>
      </div>
      <TeamsTableComponent searchTerm={searchTerm} refreshTrigger={refreshTrigger}/>
      <TeamsModal isOpen={isOpen} setIsOpen={setIsOpen} setRefreshTrigger={setRefreshTrigger} />
    </div>
    </>
  );
};

export default Teams;
