import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {  deleteLinkedInProfiles, deletePost, updateBookmark } from "../api/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faExternalLink, 
  faTrash, 
  faCalendarAlt, 
  faFire,
  faThumbsUp,
  faThumbsDown,
  faMeh,
  faComment,
  faPlusCircle,
  faBookmark as solidBookmark,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { formatDistanceToNowStrict } from 'date-fns';
import AddUserToList from "../components/AddUserToList.jsx";
import MixpanelService from "../utils/mixpanel.js";
import Logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';

const Postcard = ({ 
    trackingListsId,
    id, 
    author_name = "Unknown", 
    author_url = "#", 
    linkedin_post_url = "#", 
    content = "", 
    image_url = "", 
    likes_count,
    comments_count,
    influence_score,
    bookmark,
    sentiment,
    image_text,
    posted_at, 
    keywords = [],
    refreshPosts,
    isAuthenticated, 
    userTeamId,
    trackingTeamId,
    post_type,
    list_info,
  }) =>
  {
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [loading , setLoading] = useState(false)
    const [deleteError, setDeleteError] = useState("");
    const { team_id } = useSelector(state => state.user);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false); 

    const handleDelete = async (e) => {
      e.preventDefault();
      setLoading(true);
      setDeleteError(""); 
    
      try {
        await deletePost(team_id, trackingListsId, id); 
        refreshPosts();
        setShowDeletePopup(false);
        toast.success('Successfully deleted!')
      } catch (error) {
        if (error.message?.includes("No authenticated user")) {
          setDeleteError("You must be logged in to delete a post.");
        } else {
          setDeleteError(error.message || "Failed to delete post");
        }      
      } finally {
        setLoading(false);
      }
    };
    
    const getInitials = (name) => {
      if (!name || name === "Unknown") return "?";
      
      const nameParts = name.split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      
      // Get first letter of first name and first letter of last name
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    };
    
    useEffect(() => {
      if (!showDeletePopup) {
        setDeleteError(""); 
      }
    }, [showDeletePopup]);
    
    const profileInitial = getInitials(author_name);
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 500;
    const [isPostDateHovered, setIsPostDateHovered] = useState(false)
    const [newBookmark, setNewBookmark] = useState(bookmark);
    const [isOpen, setIsOpen] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);
    const [listInfo, setListInfo] = useState(list_info || []);
  
    const formattedDate = posted_at 
    ? new Date(posted_at).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }) 
    : 'N/A';
  
    const formattedTime = posted_at
    ? formatDistanceToNowStrict(new Date(posted_at), { addSuffix: true })
    : 'N/A';
    
    const getSentimentColor = (sentiment) => {
      switch(sentiment) {
        case "POSITIVE": return "bg-green-100 text-green-700";
        case "NEGATIVE": return "bg-red-100 text-red-700";
        default: return "bg-gray-100 text-gray-700";
      }
    };
    
    const getSentimentIcon = (sentiment) => {
      switch(sentiment) {
        case "POSITIVE": return faThumbsUp;
        case "NEGATIVE": return faThumbsDown;
        default: return faMeh;
      }
    };
  
    function highlightMatches(text, keywords) {
      // Extract hashtags separately
      const hashtagRegex = /#\w+/g;
      text = text.replace(hashtagRegex, (match) => {
        return `<span style="color: blue;">${match}</span>`;
      });
    
      // Process normal keyword highlighting (excluding hashtags)
      const wordSet = new Set();
      keywords.forEach(phrase => {
        phrase.split(/\s+/).forEach(word => {
          if (word.trim()) wordSet.add(word.toLowerCase());
        });
      });
    
      const words = Array.from(wordSet);
      if (words.length === 0) return text; 
    
      const regex = new RegExp(`(${words.join('|')})`, 'gi');
      
      return text.replace(regex, (match) => {
        return `<span style="background-color: yellow;">${match}</span>`;
      });
    }
  
    const handleDeleteLinkedinProfile = async (linkedin_profile_id, list_id) => {
      // Trigger confirmation modal
      setShowConfirmDelete(true);
      setLinkedinProfileToDelete({ linkedin_profile_id, list_id }); // Store the profile to delete
  
    };
  
    const [linkedinProfileToDelete, setLinkedinProfileToDelete] = useState(null);
  
    const confirmDeleteLinkedinProfile = async () => {
      if (!linkedinProfileToDelete) return;
  
      const { linkedin_profile_id, list_id } = linkedinProfileToDelete;
      setLoading(true);
  
      // Optimistically update the UI by removing the profile from only that list
      setListInfo(prev =>
        prev.filter(item => !(item.list_id === list_id && item.linkedin_profile_id === linkedin_profile_id))
      );
  
      try {
        await deleteLinkedInProfiles(team_id, [linkedin_profile_id]);
        console.log("LinkedIn profile deleted successfully");
        toast.success("Profile deleted");
      } catch (error) {
        console.log(error);
        // In case of error, optionally revert back — needs full info
      } finally {
        setLoading(false);
      }
      setShowConfirmDelete(false); // Close the confirmation popup
    };
  
    const cancelDelete = () => {
      setShowConfirmDelete(false); // Close the confirmation popup without deleting
    };
  
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full shadow-md text-sm transition-all duration-300 hover:shadow-lg">
        {/* Card Header */}
        <div className="flex lg:items-center items-start gap-3 p-4 border-b border-gray-100">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-md">
            {profileInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold">
            <div className="flex items-center flex-wrap justify-between">
            <div className="flex flex-wrap gap-x-1 items-center">
              <a
                href={`https://www.linkedin.com/in/${author_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-800 hover:text-blue-700 leading-6 transition-colors duration-200"
              >
                {author_name}
              </a>
  
              {listInfo && listInfo.map((list, index) => (
                <button
                  key={index}
                  onClick={() => handleDeleteLinkedinProfile(list.linkedin_profile_id, list.list_id)}  // Pass only the ID
                  className="flex items-center gap-x-1 text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700 cursor-pointer"
                >
                  <span>{list.name}</span>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              ))}
  
            {(post_type == "person") && <button onClick={() => {setIsOpen(true); MixpanelService.trackModalInteraction("add_user_to_list", "open");
                          }} className="flex items-center underline cursor-pointer gap-x-1 text-purple-600 hover:text-purple-800 duration-300">
              <FontAwesomeIcon icon={faPlusCircle} className="text-xs" />
              <span className="text-xs">Add user to list</span>
            </button>}
            </div>
          </div>
  
  
            </p>
            <div className="flex items-center gap-x-1 text-xs flex-wrap">
              {formattedDate && <p className="text-gray-600">
                  <span className="font-semibold text-gray-500">
                    <FontAwesomeIcon icon={faCalendarAlt}/> {" "} 
                    <span
                      className="relative underline cursor-pointer"
                      onMouseEnter={() => setIsPostDateHovered(true)}
                      onMouseLeave={() => setIsPostDateHovered(false)}
                    >
                      {formattedTime}
                      {isPostDateHovered && (
                         <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-max px-2 py-1 text-xs text-black bg-gray-100 rounded shadow-lg">
                         {formattedDate}
                       </span>                                       
                      )}
                    </span>
                  </span>
                </p>}
              {sentiment && <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${getSentimentColor(sentiment)}`}>
                <FontAwesomeIcon icon={getSentimentIcon(sentiment)} />
                {sentiment}
              </span>}
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                <FontAwesomeIcon icon={faFire} />
                Score: {influence_score}
              </span>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-4">
        <div className="relative mb-4">
        <div className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap rounded-lg">
          <span
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? highlightMatches(content, keywords)
                : highlightMatches(content.slice(0, maxLength), keywords),
            }}
          />
          {!isExpanded && content.length > maxLength && (
            <span
              onClick={() => setIsExpanded(true)}
              className="text-gray-500 cursor-pointer hover:underline"
            >
              {" "}...more
            </span>
          )}
        </div>
  
  
        </div>
  
          {image_url && (
            <div className="overflow-hidden rounded-lg shadow-md mb-3">
              <img 
                src={image_url} 
                className="w-full object-cover transition-transform duration-300 hover:scale-105" 
                alt={image_text || "Post image"} 
              />
            </div>
          )}
  
          <div className="flex items-center px-2 gap-x-4">
          <button 
            className="text-gray-500 flex items-center gap-1 text-xs font-medium transition-all duration-200 rounded-full" 
            onClick={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            {likes_count}
          </button>
          <button 
            className="text-gray-500 flex items-center gap-1 text-xs font-medium transition-all duration-200 rounded-full" 
            onClick={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faComment} />
            {comments_count}
          </button>
          </div>
        </div>
        
        {/* Card Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-x-2 items-center">
        {!isAuthenticated ? (
          <button
            className="flex cursor-pointer items-center gap-2 text-xs font-medium transition-all duration-200 py-1.5 px-3 rounded-full shadow-sm border bg-white text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"
            onClick={() => setShowRegisterPopup(true)}
          >
            <FontAwesomeIcon icon={regularBookmark} />
            Save
          </button>
        ) : userTeamId === trackingTeamId ? (
          <button
            className={`flex cursor-pointer items-center gap-2 text-xs font-medium transition-all duration-200 py-1.5 px-3 rounded-full shadow-sm border
              ${newBookmark ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white"}
            `}
            onClick={async (e) => {
              e.preventDefault();
              const updatedBookmark = !newBookmark;
              const { success } = await updateBookmark(id, trackingListsId, updatedBookmark);
              if (success) setNewBookmark(updatedBookmark);
            }}
          >
            <FontAwesomeIcon icon={newBookmark ? solidBookmark : regularBookmark} />
            {newBookmark ? "Saved" : "Save"}
          </button>
        ) : null}
  
          </div>
          <div className="flex gap-x-2 items-center">
          {linkedin_post_url && (
            <a 
              href={linkedin_post_url} 
              className="text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2 text-xs font-medium transition-all duration-200 bg-white border border-blue-200 py-1.5 px-3 rounded-full shadow-sm" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faExternalLink} />
              LinkedIn
            </a>
          )}
  
          {/* CREATE ENDPOINT FOR DELETE POSTS */}
          {(!userTeamId || userTeamId === trackingTeamId) && (
            <a 
              className="text-red-600 cursor-pointer hover:bg-red-600 hover:text-white flex items-center gap-2 text-xs font-medium transition-all duration-200 bg-white border border-red-200 py-1.5 px-3 rounded-full shadow-sm" 
              onClick={() => setShowDeletePopup(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </a>
          )}
  
  
          {/* <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faClock}/>
          {formattedTime}
          </div> */}
          </div>
        </div>
  
        {
          showRegisterPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
              <div className="relative max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                
                {/* Close Icon */}
                <button
                  onClick={() => setShowRegisterPopup(false)} 
                  className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl"/>
                </button>
  
                <div className="flex flex-col items-center">
                  <Link to="/">
                    <div className="flex items-center">
                      <img src={Logo} alt="logo" className="h-10 w-auto" />
                      <span className="font-bold text-2xl text-[#6241D3]">OUTX</span>
                    </div>
                  </Link>
                  <h2 className="text-xl sm:text-2xl font-bold mt-4 text-center sm:text-left">
                    Create an account.
                  </h2>
                  <h4 className="text-md my-2 text-center sm:text-left">
                    Never miss a LinkedIn post again. Try OutX now!
                  </h4>
                </div>
  
                <form className="space-y-4">
                  <a href="/register" target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="cursor-pointer w-full my-2 bg-[#6241D3] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#a093cc] transition disabled:bg-gray-400"
                    >
                      Register now
                    </button>
                  </a>
  
                </form>
              </div>
            </div>
          )
        }
  
        {showDeletePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <p className="text-lg font-semibold mb-2">Are you sure?</p>
              <p className="text-sm text-gray-600 mb-2 text-left">Do you really want to delete this post? This action cannot be undone.</p>
              {deleteError && (
                <p className="text-sm text-red-600 mb-2 text-left">{deleteError}.</p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg shadow-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-md"
                >
                  {loading ? "Deleting.." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

{showConfirmDelete && (
         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-10">
             <div className="bg-white rounded-lg shadow-lg p-6 w-80">
             <p className="text-md text-gray-800 mb-4 text-left">Are you sure you want to remove this user from the list?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={confirmDeleteLinkedinProfile} 
                className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded"
              >
                {loading ? "Deleting.." : "Delete"}
              </button>
              <button 
                onClick={cancelDelete} 
                className="bg-gray-300 cursor-pointer text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      {isOpen && 
      <AddUserToList 
        setIsOpen={setIsOpen}
        full_name={author_name} 
        slug={author_url} 
        setListInfo={setListInfo}
       />}
  
      </div>
    );
};

export default Postcard;
