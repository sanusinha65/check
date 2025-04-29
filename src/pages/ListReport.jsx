import { useEffect, useRef, useState } from "react";
import { deleteLinkedInProfiles, fetchEmail, fetchLinkedInProfiles, fetchProfileInfo } from "../api/supabase";
import { useParams } from "react-router-dom";
import FetchAllEmails from "../components/FetchAllEmails";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";
import Meta from "../helper/Meta";

export default function ContactList() {
    const { team_id, user_id } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [companyName, setCompanyName] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [emailStatus, setEmailStatus] = useState("");
    const { listId } = useParams(); 
    const [hasPhoneNumber, setHasPhoneNumber] = useState(null);
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailFetchStatus, setEmailFetchStatus] = useState({});
    const [fetchEmailsDropdown, setFetchEmailsDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
      if (!team_id) return; 

      const delay = setTimeout(() => {
          loadContacts();
          setRefresh(false);
      }, 300); 
  
      return () => clearTimeout(delay);
  }, [team_id, refresh, hasPhoneNumber, emailStatus, page]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFetchEmailsDropdown(false);
      }
    };
  
    if (fetchEmailsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fetchEmailsDropdown]);
  
    
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      };
      
      const loadContacts = async () => {
        setLoading(true);
        
        const filters = {
          email_status: emailStatus, 
          has_phone: hasPhoneNumber,
          title,
          company: companyName,
        };
        
        const data = await fetchLinkedInProfiles(listId, filters, page, pageSize, team_id);
        
        const formattedData = data.map(contact => ({
          ...contact,
          created_at: formatDate(contact.created_at)
        }));
        
        setContacts(formattedData);
        setLoading(false);
      };

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); 
          loadContacts();
        }
      };
    
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
      const handleSelectAll = () => {
        if (selectAll) {
          setSelectedContacts([]);
        } else {
          setSelectedContacts(contacts.map(contact => contact.id));
        }
        setSelectAll(!selectAll);
      };
    
      const handleSelectContact = (id) => {
        if (selectedContacts.includes(id)) {
          setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
          setSelectAll(false);
        } else {
          setSelectedContacts([...selectedContacts, id]);
          if (selectedContacts.length + 1 === contacts.length) {
            setSelectAll(true);
          }
        }
      };

      const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };   

      const handleReset = () => {
        setSearchTerm("");
        setEmailStatus("");
        setHasPhoneNumber(null);
        setTitle("");
        setCompanyName("");
        setSelectedContacts([]);
        setSelectAll(false);
      };

      const filteredContacts = contacts.filter(contact =>
        contact?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteContacts = async () => {
      if (selectedContacts.length === 0) return;
    
      setLoading(true);
    
      try {
        await deleteLinkedInProfiles(team_id, selectedContacts); 
    
        setContacts(prevContacts =>
          prevContacts.filter(contact => !selectedContacts.includes(contact.id))
        );
        setSelectedContacts([]);
      } catch (error) {
        console.error("Error deleting contacts:", error);
      }
    
      setLoading(false);
      setIsModalOpen(false);
    };

    const downloadCSV = (data) => {
      if (!data || data.length === 0) return;
    
      // Define the column order and headers
      const headers = [
        "Full Name", "Personal Email", "Work Email", "Company", "Phone", "Headline", "Created"
      ];
    
      const rows = data.map(contact => {
        let personalEmails = "Not Found";
        let workEmails = "Not Found";
    
        if (Array.isArray(contact.email_info)) {
          const personal = contact.email_info
            .filter(item => item.type === "linkedin_email" && item.email)
            .map(item => item.email);
    
          const work = contact.email_info
            .filter(item => item.type === "company_email" && item.email)
            .map(item => item.email);
    
          if (personal.length > 0) personalEmails = personal.join(", ");
          if (work.length > 0) workEmails = work.join(", ");
        }
    
        return [
          `"${contact.full_name || 'Not found'}"`,
          `"${personalEmails}"`,
          `"${workEmails}"`,
          `"${contact.current_company || 'Not found'}"`,
          `"	${contact.phone || 'Not found'}"`,
          `"${contact.headline || 'Not found'}"`,
          `"${contact.created_at}"`
        ].join(",");
      });
    
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = "contacts.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    

    const downloadEmails = (data) => {
      if (!data || data.length === 0) return;
    
      const headers = ["Personal Email", "Work Email"];
    
      const rows = data.map(contact => {
        let personalEmails = "Not Found";
        let workEmails = "Not Found";
    
        if (Array.isArray(contact.email_info)) {
          const personal = contact.email_info
            .filter(item => item.type === "linkedin_email" && item.email)
            .map(item => item.email);
    
          const work = contact.email_info
            .filter(item => item.type === "company_email" && item.email)
            .map(item => item.email);
    
          if (personal.length > 0) personalEmails = personal.join(", ");
          if (work.length > 0) workEmails = work.join(", ");
        }
    
        return `"${personalEmails}", ${workEmails}`;
      });
    
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = "contacts.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


  const handleFetch = async (contact) => {
    const id = contact.id;

    if (!contact.websiteUrl_campany || contact.websiteUrl_campany === "null") {
    console.log("Invalid websiteUrl_campany");
    return; // Stop the function if the value is invalid
  }

    setEmailFetchStatus((prev) => ({ ...prev, [id]: true }));

    const data = await fetchEmail(
      contact.full_name,
      contact.websiteUrl_campany[contact.websiteUrl_campany.length - 1],
      id
    );

    await loadContacts();

    setEmailFetchStatus((prev) => ({ ...prev, [id]: false }));
  };

  const handleFetchProfilesInfo = async () => {
    if (!team_id || !user_id || selectedContacts.length === 0) return;
      try {

        const fetchResults = await fetchProfileInfo(team_id, user_id, selectedContacts);
        console.log("All profile info fetch results:", fetchResults);
        toast.success("Profile details will be fetched soon.");
        setRefresh(true);
        setSelectedContacts([])
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
  }; 
  
  return (
    <>
    <Meta 
      title="LinkedIn Scraper & Post Tracker - Outx.ai" 
      description="Scrape LinkedIn Sales Navigator, track LinkedIn posts by keyword, and grow your network faster with Outx.ai. No LinkedIn access needed." 
      keywords="LinkedIn scraper, Sales Navigator scraping, LinkedIn keyword tracker, LinkedIn automation" 
    />
    <div className="w-full max-w-[1800px]  mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-y-4 justify-between py-4">
        <div className="">
          <h2 className="text-xl font-semibold">Contacts <span className="text-gray-500 font-bold">{contacts.length}</span></h2>
          <p className="text-gray-500 text-sm">Find your contacts here or filter by segment to export specifics.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setRefresh(true)}
                className="text-[#6241D3] border border-[#6241D3] hover:bg-[#6241D3] hover:text-white px-2 py-2 rounded-md transition cursor-pointer w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faRefresh}/>
              </button>
              <button className="flex gap-2 items-center justify-center px-4 py-2 text-[#6241D3] border rounded-md hover:bg-gray-50 w-full sm:w-auto cursor-pointer"  onClick={() => {downloadEmails(contacts); MixpanelService.trackListCTA("emails_exported")}}>
                <i className="fa fa-download text-[#6241D3]"></i>
                <span>Export Emails</span>
              </button>

              <button className="flex gap-2 items-center justify-center px-4 py-2 bg-[#6241D3] text-white rounded-md w-full sm:w-auto cursor-pointer" onClick={() => {downloadCSV(contacts); MixpanelService.trackListCTA("csv_exported")}}>
                <i className="fa fa-download"></i>
                <span>Export CSV</span>
              </button>

              <button className="flex gap-2 items-center justify-center px-4 py-2 bg-[#6241D3] text-white rounded-md w-full sm:w-auto cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed" 
                onClick={handleFetchProfilesInfo} 
                disabled={selectedContacts.length === 0}>
                <i className="fa fa-search"></i>
                <span>Fetch Profile Info</span>
              </button>
              

              {/* <div ref={dropdownRef} className="relative inline-block text-left">
                <button
                  onClick={() => {
                    setFetchEmailsDropdown(!fetchEmailsDropdown);
                    MixpanelService.trackListCTA("emails_fetched");
                  }}
                  disabled={selectedContacts.length === 0}
                  className="flex gap-2 h-full items-center justify-center px-4 py-2 bg-[#6241D3] text-white rounded-md w-full sm:w-auto cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <span>Fetch Emails</span>
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {fetchEmailsDropdown && (
              <div
                className="
                  absolute z-10 mt-2 w-full lg:w-42 rounded-md shadow-lg bg-white
                  left-1/2 -translate-x-1/2
                  md:left-auto md:translate-x-0
                "
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      // handle fetch emails
                    }}
                    className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Fetch Emails
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Fetch All Details
                  </button>
                </div>
              </div>
            )}

              </div> */}


              <button
                disabled={selectedContacts.length === 0}
                className="flex items-center justify-center gap-x-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa fa-trash"></i>
                <span>Delete</span>
              </button>


              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 className="text-lg font-semibold">Confirm Deletion</h3>
                    <p className="text-gray-600">Are you sure you want to delete the selected contacts?</p>
                    <div className="flex justify-end gap-4 mt-4">
                      <button className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer" onClick={() => setIsModalOpen(false)}>Cancel</button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer" onClick={handleDeleteContacts}>{!loading ? "Delete" : "Deleting.."}</button>
                    </div>
                  </div>
                </div>
              )}

        </div>
        
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">

            <button 
              className="md:hidden px-4 my-2 py-2 bg-gray-100 text-gray-700 rounded-md w-full sm:w-auto flex items-center justify-center"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Filters</span>
            </button>
          </div>

      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row">
          <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={toggleSidebar}>
          </div>
          
          <div className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0
            fixed md:relative top-0 left-0 h-full md:h-auto z-50 md:z-0
            w-80 md:w-64 bg-white md:border-r border-gray-300 
            transform transition-transform duration-300 ease-in-out
            overflow-y-auto
          `}>
            <div className="flex justify-between items-center p-4 border-b border-gray-300 md:hidden">
              <h3 className="font-medium">Filters</h3>
              <button onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 space-y-6"> 

            <div className="flex flex-wrap gap-2">
              <div className="flex gap-x-2 items-center">
              <i className="fa fa-filter text-[#6241D3]"></i>
              <span className="font-medium w-full text-[#6241D3]">{[
                  hasPhoneNumber && "Has Phone",
                  title && "Title",
                  companyName && "Company",
                  emailStatus && "Email Status",
                ].filter(Boolean).length} filters applied.</span>
              </div>
              <div className="flex items-center gap-x-2">
              <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={handleReset}>Reset</button>
              <button className="text-gray-500 hover:text-gray-700" onClick={loadContacts}>
                <i className="fa fa-sync"></i>
              </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa fa-search text-gray-500"></i>
              </div>
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 border rounded-md w-full border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>


              <div>
                <h3 className="font-medium text-gray-700 mb-2">Email status</h3>
                <div className="relative">
                <select 
                onChange={(e) => setEmailStatus(e.target.value)}
                value={emailStatus}
                className="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 pr-8">
                    <option value="valid">Valid</option>
                    <option value="not_found">Not found</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input 
                  type="checkbox"
                  id="hasPhoneNumber" 
                  checked={hasPhoneNumber}
                  onChange={() => setHasPhoneNumber(!hasPhoneNumber)} 
                  className="h-4 w-4 accent-[#6241D3] focus:ring-gray-500 focus:border-gray-500 border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Has a phone number</span>
                </label>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Title</h3>
                <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                 />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Company</h3>
                <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500" value={companyName}
                onChange={(e) => setCompanyName(e.target.value)} 
                onKeyDown={handleKeyDown}/>
              </div>
              
              {/* <div>
                <h3 className="font-medium text-gray-700 mb-2">Added</h3>
                <div className="relative">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                 className="w-full p-2 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 pr-8">
                    <option>Any time</option>
                    <option value="">Within 24 hours</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div> */}

              <div className="mt-6 md:hidden">
                <button 
                  className="w-full px-4 py-2 bg-[#6241DE] text-white rounded-md"
                  onClick={toggleSidebar}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-x-auto">
          <div className="min-w-full flex flex-col h-[540px] min-h-[75vh]"> 
    <div className="flex-grow overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f4f2fa] text-[#6241D3]">
          <tr>
            <th className="py-2 pl-4 pr-2 w-12 ">
              <input 
                type="checkbox" 
                className="h-4 w-4 accent-[#6241D3] focus:ring-blue-500 border-gray-300 rounded"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 text-left uppercase text-xs">Full Name</th>
            <th className="px-4 text-left uppercase text-xs">Personal Email</th>
            <th className="px-4 text-left uppercase text-xs">Work Email</th>
            <th className="px-4 text-left uppercase text-xs">Company</th>
            <th className="px-4 text-left uppercase text-xs">Phone</th>
            <th className="px-4 text-left uppercase text-xs">Headline</th>
            <th className="px-4 text-left uppercase text-xs">Created</th>
          </tr>
        </thead>
          {loading ? (
            <tbody>
              <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                <div className="flex justify-center items-center col-span-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800"></div>
                </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => {
            let personalEmails = "-";
            let workEmails = "Fetch";

            if (Array.isArray(contact.email_info)) {
              const personal = contact.email_info
                .filter(item => item.type === "linkedin_email" && item.email)
                .map(item => item.email);

              const work = contact.email_info
                .filter(item => item.type === "company_email" && item.email)
                .map(item => item.email);

              if (personal.length > 0) personalEmails = personal.join(", ");
              if (work.length > 0) workEmails = work.join(", ");
            }

            return (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="py-3 pl-4 pr-2 w-12">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[#6241D3] focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelectContact(contact.id)}
                  />
                </td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">
                  {contact.full_name || "-"}
                  {contact.tasks[0]?.linkedin_profile_id ? (
                   <div className="relative group inline-block">
                      <button className="text-xs ml-2 bg-yellow-500 text-white py-1 px-2 rounded-md transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:bg-yellow-600">
                        Pending
                      </button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        You will be able to see the details shortly.
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">{personalEmails}</td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">
                  {workEmails === "Fetch" ? (
                    <button
                    className={`px-4 py-2 text-sm bg-gray-100 rounded-md ${
                      !contact.websiteUrl_campany ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`} 
                    disabled={!contact.websiteUrl_campany}
                    onClick={(e) => {
                      if (!contact.websiteUrl_campany) {
                        e.preventDefault();
                        return;
                      }
                      console.log(contact.websiteUrl_campany); 
                      handleFetch(contact);
                    }}
                  >
                    {emailFetchStatus[contact.id] ? "Fetching.." : "Fetch"}
                  </button>                
                  ) : (
                    workEmails
                  )}
                </td>

                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">{contact.current_company || "-"}</td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">{contact.phone || "-"}</td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">{contact.headline || "-"}</td>
                <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-gray-900">{contact.created_at || "-"}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="7" className="px-6 py-4 text-center text-gray-500">Not found</td>
          </tr>
        )}
      </tbody>
          )}
        </table>
      </div>

    {!loading && filteredContacts.length > 0 && (
      <div className="flex justify-center items-center p-4 gap-x-2 mt-auto">
        <button
          className={`px-4 py-2 bg-[#6241D3] text-white border border-[#6241D3] rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-[#6241D3]"}`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="text-gray-700">Page {page}</span>

        <button
          className={`px-4 py-2 bg-[#6241D3] text-white border border-[#6241D3] rounded ${filteredContacts.length < pageSize ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-[#6241D3]"}`}
          onClick={() => setPage(page + 1)}
          disabled={filteredContacts.length < pageSize}
        >
          Next
        </button>
      </div>
    )}
  </div>

          </div>
        </div>
      </div>
      <FetchAllEmails isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
    </>
  );
}