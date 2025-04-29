import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPosts, getKeywordsById, getTrackingListNameById } from "../api/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faLink, 
  faFilter, 
  faSearch,
  faFire,
  faThumbsUp,
  faThumbsDown,
  faMeh,
  faBookmark as solidBookmark,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import { formatDistanceToNowStrict } from 'date-fns';
import Postcard from "../components/PostCard.jsx";
import { useSelector } from "react-redux";
import Meta from "../helper/Meta.jsx";

function Tracking() {
  const { team_id } = useSelector(state => state.user);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent_first");
  const [showFilters, setShowFilters] = useState(true);
  const [sentiment, setSentiment] = useState("")
  const [influenceScore, setInfluenceScore] = useState("")
  const {slug} = useParams();
  const uuidMatch = slug.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
  const id = uuidMatch[0];
  const [keywords, setKeywords] = useState([]);
  const [trackingListDetails, setTrackingListDetails] = useState({})
  const [lastSyncedAt, setLastSyncedAt] = useState("");
  const [selectedKeywordId, setSelectedKeywordId] = useState("");
  const [mentions, setMentions] = useState("");
  const [totalPositive, setTotalPositive] = useState("");
  const [totalNegative, setTotalNegative] = useState("")
  const [showSavedOnly, setShowSavedOnly] = useState("");
  const [page, setPage] = useState(1);
  const [isPublic, setIsPublic] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [tempSearchTerm, setTempSearchTerm] = useState("")
  const [allKeywords, setAllKeywords] = useState([])
  const [trackingTeamId, setTrackingTeamId] = useState("")
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [noInitialPosts, setNoInitialPosts] = useState(false);

  const fetchKeywords = async () => {
    const { data, error } = await getKeywordsById(id);
    if (error) {
      console.error("Failed to fetch keywords:", error);
    }
    
    const primaryKeywords = data.map(item => ({
      id: item.id, 
      name: item.primary_keyword
    }));

    const allKeywords = data.map(item => ({
      id: item.id, 
      primaryKeyword: item.primary_keyword,
      requiredKeywords: item.required_keywords,
      excludeKeywords: item.exclude_keywords
    }));

    setAllKeywords(allKeywords);
    setKeywords(primaryKeywords);
  }

  const fetchTrackingListDetails = async () => {
    const { data, error } = await getTrackingListNameById(id);
    if (error) {
      console.error("Failed to fetch keywords:", error);
    }

    if(data[0].teamid){
      setTrackingTeamId(data[0].teamid)
    }

    const formattedLastSyncDate = data[0].last_synced_at ? new Date(data[0].last_synced_at).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) : "";
    
    setMentions(data[0].mention_count);
    setTotalNegative(data[0].negative_count);
    setTotalPositive(data[0].positive_count);
    setIsPublic(data[0].is_public);
    setLastSyncedAt(formattedLastSyncDate); 
    setTrackingListDetails(data[0])   
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(tempSearchTerm); 
    }
  };

  const formattedLastSyncedAt = lastSyncedAt &&
  formatDistanceToNowStrict(new Date(lastSyncedAt), { addSuffix: true });

  const fetchData = async (initialLoading) => {
    const { data } = await fetchPosts(
      id,
      page,
      sentiment,
      influenceScore,
      sortOption,
      selectedKeywordId,
      searchTerm,
      showSavedOnly,
      team_id
    );
  
    if (data && data.length > 0) {
      setPosts(data);
      if (initialLoading) {
         setNoInitialPosts(false);
         setInitialLoading(false);
      }
    } else {
      setPosts([]);
      if (initialLoading && lastSyncedAt){ 
        setNoInitialPosts(true);
        setInitialLoading(false);
      } // only when loading for first time
    }
  };

  if (isPublic === false && !isAuthenticated) {
    navigate("/login");
    return null;
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleReset = () => {
    setTempSearchTerm("");
    setSearchTerm("")
    setInfluenceScore("");
    setSentiment("");
    setSortOption("recent_first")
    setSelectedKeywordId("")
    setShowSavedOnly("")
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const fetchAll = async (isInitial) => {
    setLoading(true);
  
    try {
      if (isInitial) {
        setPosts([]);
  
        // Step 1: Fetch tracking list details
        await fetchTrackingListDetails();

        // Step 2: Start fetchData immediately
        await fetchData(isInitial);
  
        // Step 3: Fetch keywords in parallel (don't wait)
        fetchKeywords().catch(err => {
          console.error("Error in fetching keywords:", err);
        });
      } else {
        // If not initial, only fetchData
        await fetchData(isInitial);
      }
    } catch (err) {
      console.error("Error in fetchAll:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll(initialLoading);
  }, [lastSyncedAt, id, page, sortOption, sentiment, influenceScore, selectedKeywordId, searchTerm, showSavedOnly]);
  
  const refreshPosts = () => {
    fetchAll(false);
  };

  return (
    <>
    <Meta 
      title="LinkedIn Scraper & Post Tracker - Outx.ai" 
      description="Scrape LinkedIn Sales Navigator, track LinkedIn posts by keyword, and grow your network faster with Outx.ai. No LinkedIn access needed." 
      keywords="LinkedIn scraper, Sales Navigator scraping, LinkedIn keyword tracker, LinkedIn automation" 
    />
    { isAuthenticated && <DashboardHeader/>}
    <div className="flex flex-col min-h-screen w-full max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8">
      <main className="flex-grow container mx-auto py-6">
        {/* Page Header */}
        <div className="bg-purple-50 mb-6 px-5 py-3 p-6 rounded-lg shadow-md text-black">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1 text-[#6241D3]">Tracking list : {trackingListDetails?.name
                ? trackingListDetails.name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : ''}
              </h1>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Tracking keywords : {keywords.map((keyword) => keyword.name).join(", ")}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-800">
                  Last synced at :{" "}
                  {!lastSyncedAt && "fetching, please wait for couple of minutes."}
                  {<span
                    className="relative underline cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {formattedLastSyncedAt} 
                    {isHovered && (
                       <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-max px-2 py-1 text-xs text-black bg-gray-100 rounded shadow-lg">
                         {lastSyncedAt}
                        </span>
                    )}
                  </span>
                  }
                </span>
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-blue-600">{mentions}</div>
                <div className="text-xs font-medium text-blue-600">Mentions</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-green-600">{totalPositive}</div>
                <div className="text-xs font-medium text-green-600">Positive</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                <div className="text-2xl font-bold text-red-600">{totalNegative}</div>
                <div className="text-xs font-medium text-red-600">Negative</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              placeholder="Search mentions, authors & domains..."
              value={tempSearchTerm}
              onChange={(e) => setTempSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="flex gap-2">

          <button 
                onClick={refreshPosts}
                className="text-gray-500 border border-gray-300 hover:bg-[#6241D3] hover:text-white px-2 py-2 rounded-md transition cursor-pointer w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faRefresh}/>
              </button>

            <div className="relative flex-shrink-0">
              <select 
                className="appearance-none h-full bg-white text-gray-800 border border-indigo-200 rounded-lg pl-4 pr-10 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm w-full text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="popular_first">Popular First</option>
                <option value="recent_first">Recent First</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-600">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            
            <button 
              onClick={toggleFilters} 
              className="bg-[#6421D3]  hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm transition-colors duration-200 md:hidden"
            >
              <FontAwesomeIcon icon={faFilter} />
              Filters
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-nowrap md:flex-wrap md:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`w-full lg:w-[260px] md:w-full flex-shrink-0  md:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="bg-purple-50 text-[#6241D3] px-5 py-3">

                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} />
                  Filters
                </h3>
              </div>
              
              <div className="p-5">

                <div className="mb-5">
                  <h4 className="text-gray-800 font-medium mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLink} className="text-blue-600" />
                    All Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span 
                      key={keyword.id} 
                      onClick={() => setSelectedKeywordId(keyword.id)} 
                      className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors 
                        ${selectedKeywordId === keyword.id ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                    >
                      {keyword.name}
                    </span>
                  ))}
                  </div>
                </div>
                <div className="mb-5">
                  <h4 className="text-gray-800 font-medium mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faMeh} className="text-blue-600" />
                    Sentiment
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${sentiment === "POSITIVE" ? 'bg-green-50 border-green-300' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        value="POSITIVE"
                        checked={sentiment === "POSITIVE"}
                        onChange={() => setSentiment("POSITIVE")}
                      />
                      <FontAwesomeIcon icon={faThumbsUp} className="h-5 w-5 text-green-600" />
                      <span className={`text-xs font-medium ${sentiment === "POSITIVE" ? 'text-green-700' : 'text-gray-700'}`}>Positive</span>
                    </label>

                    <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${sentiment === "NEUTRAL" ? 'bg-gray-50 border-gray-500' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        value="NEUTRAL"
                        checked={sentiment === "NEUTRAL"}
                        onChange={() => setSentiment("NEUTRAL")}
                      />
                      <FontAwesomeIcon icon={faMeh} className="h-5 w-5 text-gray-600" />
                      <span className="text-xs font-medium text-gray-700">Neutral</span>
                    </label>

                    <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${sentiment === "NEGATIVE" ? 'bg-red-50 border-red-300' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="checkbox" 
                        className="sr-only"
                        value="NEGATIVE"
                        checked={sentiment === "NEGATIVE"}
                        onChange={() => setSentiment("NEGATIVE")}
                      />
                      <FontAwesomeIcon icon={faThumbsDown} className="h-5 w-5 text-red-600" />
                      <span className={`text-xs font-medium ${sentiment === "NEGATIVE" ? 'text-red-700' : 'text-gray-700'}`}>Negative</span>
                    </label>
                  </div>

                </div>
                
                <div className="mb-5">
                  <h4 className="text-gray-800 font-medium mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faFire} className="text-blue-600" />
                    Influence Score
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                  <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${influenceScore === "low" ? 'bg-purple-50 border-purple-300' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      value="low"
                      checked={influenceScore === "low"}
                      onChange={() => setInfluenceScore("low")}
                    />
                    <span className={`text-xs font-medium ${influenceScore === "low" ? 'text-purple-700' : 'text-gray-700'}`}>Low</span>
                    <span className={`text-xs font-medium ${influenceScore === "low" ? 'text-purple-500' : 'text-gray-500'}`}>(0–3)</span>
                  </label>

                  <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${influenceScore === "medium" ? 'bg-purple-50 border-purple-300' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      value="medium"
                      checked={influenceScore === "medium"}
                      onChange={() => setInfluenceScore("medium")}
                    />
                    <span className={`text-xs font-medium ${influenceScore === "medium" ? 'text-purple-700' : 'text-gray-700'}`}>Medium</span>
                    <span className={`text-xs font-medium ${influenceScore === "medium" ? 'text-purple-500' : 'text-gray-500'}`}>(4–7)</span>
                  </label>

                  <label className={`flex flex-col items-center justify-center gap-1 cursor-pointer p-2 rounded-lg transition-colors duration-200 border ${influenceScore === "high" ? 'bg-purple-50 border-purple-300' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="checkbox" 
                      className="sr-only"
                      value="high"
                      checked={influenceScore === "high"}
                      onChange={() => setInfluenceScore("high")}
                    />
                    <span className={`text-xs font-medium ${influenceScore === "high" ? 'text-purple-700' : 'text-gray-700'}`}>High</span>
                    <span className={`text-xs font-medium ${influenceScore === "high" ? 'text-purple-500' : 'text-gray-500'}`}>(8–10)</span>
                  </label>
                </div>

                </div>

                {isAuthenticated && <div className="mb-5">
                  <h4 className="text-gray-800 font-medium mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={solidBookmark} className="text-blue-600" />
                    Saved Posts
                  </h4>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <input 
                        type="checkbox" 
                        checked={showSavedOnly}
                        value={showSavedOnly}
                        onChange={() => setShowSavedOnly(!showSavedOnly)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      Show only saved posts
                    </label>
                  </div>

                </div>}

                
                <button 
                  className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 px-5 py-3 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                  onClick={handleReset}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle Content: Post List */}
          <div className="flex-grow lg:order-1 md:order-2 order-2">
          <div className="grid gap-5">
            { initialLoading ? <div className="bg-white rounded-lg p-8 text-center border border-gray-200 col-span-full shadow-md">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faSearch}/>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Fetching Posts...</h3>
                <p className="text-gray-500 mb-1">Please wait while we load your content.</p>
                <p className="text-gray-400 mb-4">It may take 5–10 mins. Try refreshing later.</p>
              </div> :
            loading ? (
              <div className="flex justify-center items-center h-60 col-span-full">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  <p className="mt-3 text-gray-600">Loading posts...</p>
                </div>
              </div>
            ) : noInitialPosts ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200 col-span-full shadow-md">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Oops! No posts matched your keywords</h3>
              <p className="text-gray-500 mb-4">Try searching with a different keyword.</p>
            </div>

            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200 col-span-full shadow-md">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  className="text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 font-medium px-4 py-2 rounded-lg text-sm"
                  onClick={handleReset}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <Postcard key={post.id} {...post} keywords={keywords.map(keyword => keyword.name)} searchTerm={searchTerm} trackingListsId={id} refreshPosts={refreshPosts} isAuthenticated={isAuthenticated} team_id={team_id} trackingTeamId={trackingTeamId}/>
              ))
            )}
          </div>

          { !loading &&  posts.length >= 20 && (<div className="flex justify-center mt-8 gap-x-2">
              <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-[#6241D3] text-white rounded-lg shadow-md hover:bg-[#9a89d2] transition"
            >
              Next
            </button>
            </div>)}

          </div>
          
          {/* Right Sidebar: Stats & Activity */}
          <div className="w-full lg:w-80 lg:order-2 md:order-1 order-1 flex-shrink-0 block">
            <div className="space-y-5">

              {!isAuthenticated ? 
              <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
                <div className="bg-purple-50 px-5 pb-3 pt-4 text-black">
                  <h3 className="font-bold text-lg text-[#6241D3]">
                    <div>Never miss a linkedin post again! <FontAwesomeIcon icon={faFire}/></div>
                  </h3>
                </div>
                <div className="px-5 py-6">
                OutX tracks LinkedIn keywords in real-time so you can engage faster and win more opportunities.
                </div>
                
                <Link to="/register">
                <button className="bg-[#6241D3] w-full text-center cursor-pointer text-white py-3 font-bold hover:text-[#6241D3] hover:bg-[#e8e6f0]">Try for FREE 🚀</button>
                </Link>
              </div> : 
             team_id !== null && team_id !== trackingTeamId ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
                <div className="bg-purple-50 px-5 pb-3 pt-4 text-black">
                  <h3 className="font-bold text-lg text-[#6241D3]">
                    <div>Never miss a linkedin post again! <FontAwesomeIcon icon={faFire} /></div>
                  </h3>
                </div>
                <div className="px-5 py-6">
                  OutX tracks LinkedIn keywords in real-time so you can engage faster and win more opportunities.
                </div>
                <Link to="/tracking/?addKeyword=true" state={{ keywordList: allKeywords, listName: trackingListDetails.name }}>
                  <button className="bg-[#6241D3] w-full text-center cursor-pointer text-white py-3 font-bold hover:text-[#6241D3] hover:bg-[#e8e6f0]">Clone the list 🚀</button>
                </Link>
              </div>
            ) : null
            }
              
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-800 to-purple-900 text-white py-4 px-6 mt-8 rounded-t-lg shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-3 sm:mb-0">
              <p className="font-medium">Copyrights © 2025 OutX, Inc. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
              <Link to="/terms-of-service" className="hover:text-blue-300 transition-colors">Terms of use</Link>
              <span className="hidden sm:inline text-gray-500">•</span>
              <Link to="/privacy-policy" className="hover:text-blue-300 transition-colors">Privacy Policy</Link>
              {/* <span className="hidden sm:inline text-gray-500">•</span> */}
              {/* <Link to="/dmca" className="hover:text-blue-300 transition-colors">DMCA</Link>
              <span className="hidden sm:inline text-gray-500">•</span>
              <Link to="/dsa" className="hover:text-blue-300 transition-colors">Digital Service Act</Link>
              <span className="hidden sm:inline text-gray-500">•</span>
              <Link to="/personal-data" className="hover:text-blue-300 transition-colors">Personal Data</Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Tracking;