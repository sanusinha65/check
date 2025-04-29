import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { addKeyword } from "../api/supabase";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function KeywordModal({ onClose, refreshList, keywordList, listName}) {
  const [trackingListName, setTrackingListName] = useState(""); 
  const [keywords, setKeywords] = useState([{ main: "", required: "", excluded: "" }]);
  const [loading, setLoading] = useState(false);
  const { team_id, user_id } = useSelector(state => state.user);
  
  useEffect(() => {
    if (listName) setTrackingListName(listName);
    
    if (keywordList && Array.isArray(keywordList)) {
      const formatted = keywordList.map((item) => ({
        main: item.primaryKeyword || "",         // Set `main` as the `name`
        required: item.requiredKeywords || "",                  // Leave required and excluded empty
        excluded: item.excludeKeywords || "",                  // Leave required and excluded empty
      }));
  
      setKeywords(formatted.length ? formatted : [{ main: "", required: "", excluded: "" }]);
    }
  }, [keywordList, listName]);
  

  const addNewKeyword = () => {
    setKeywords([...keywords, { main: "", required: "", excluded: "" }]);
  };

  const updateKeyword = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index][field] = value;
    setKeywords(newKeywords);
  };

  const removeKeyword = (index) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async () => {

    // if (keywords.every((keyword) => !keyword.main.trim())) {
    //   return;
    // }

    
    setLoading(true);

    const formattedKeywords = keywords.map((keyword) => ({
      name: trackingListName,
      keyword: keyword.main,
      required_keywords: String(keyword.required || "").split(",").map((kw) => kw.trim()),
      exclude_keywords: String(keyword.excluded || "").split(",").map((kw) => kw.trim()),
    }));
     
    // console.log(formattedKeywords)

    const response = await addKeyword(team_id, user_id, formattedKeywords);
    if (response.error) {
      console.error("Failed to add keywords:", response.error);
    } else {
      // console.log("Keywords added successfully:", response.data);
      toast.success("Fetching posts from LinkedIn... This may take 5–10 minutes.", {
        duration: 6000, // duration in milliseconds
      });
      onClose(); // Close modal on success
    }
    setLoading(false);
    refreshList();
  };

  return (
    <div className="p-6 bg-white rounded-md max-w-6xl mx-auto w-full">
      <div className="mb-4">
        <label className="block text-lg font-bold text-[#6241D3]">Tracking List Name</label>
        <input
          type="text"
          className="w-full mt-2 p-2 border border-gray-300 rounded-md outline-none"
          placeholder="Enter tracking list name..."
          value={trackingListName}
          onChange={(e) => setTrackingListName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#6241D3]">Keyword</h2>
          {keywords.map((keyword, index) => (
            <div key={index} className="relative mb-4 flex w-full items-left flex-col">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden flex-grow">
                <div className="bg-gray-100 p-2 text-[#6241D3]">
                  <FontAwesomeIcon icon={faHashtag} className="h-5 w-5" />
                </div>
                <input
                  placeholder="Not case sensitive"
                  type="text"
                  className="py-2 px-3 w-full outline-none"
                  value={keyword.main}
                  onChange={(e) => updateKeyword(index, "main", e.target.value)}
                />
              </div>
              <span className="text-sm py-1 text-[#6241D3]">Not case sensitive, partial keyword match</span>
            </div>
          ))}
          <button 
          onClick={addNewKeyword} 
          className={`bg-[#6241D3] hover:text-[#6241D3] border border-[#6241D3] hover:bg-white text-white px-4 py-2 rounded-md ${
            keywords.every((keyword) => !keyword.main.trim()) ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={keywords.every((keyword) => !keyword.main.trim())}
          >
            <FontAwesomeIcon icon={faPlus} /> Add next keyword
          </button>
        </div>

        <div>
          <h2 className="text-lg font-medium">Required keywords</h2>
          {keywords.map((keyword, index) => (
            <div key={index} className="mb-4 flex items-start flex-col">
              <input
                type="text"
                placeholder="Separate keywords with a comma"
                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                value={keyword.required}
                onChange={(e) => updateKeyword(index, "required", e.target.value)}
              />
              <span className="text-sm py-1 text-[#6241D3]">Not case sensitive, exact keyword match</span>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-medium">Excluded keywords</h2>
          {keywords.map((keyword, index) => (
            <div key={index} className="mb-4 flex items-start flex-col">
              <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Separate keywords with a comma"
                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                value={keyword.excluded}
                onChange={(e) => updateKeyword(index, "excluded", e.target.value)}
              />
              {keywords.length > 1 && (
                <button onClick={() => removeKeyword(index)} className="ml-2 text-gray-400 hover:text-gray-700">
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              )}
              </div>
              <span className="text-sm py-1 text-[#6241D3]">Not case-sensitive, exact keyword does not match.</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-x-2 mt-4">
        <button onClick={() => {
          onClose();
          MixpanelService.trackModalInteraction("add_tracking_list", "closed");
        }}
        className="bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded-md">Cancel</button>
        <button
          onClick={handleSubmit}
          className={`bg-[#6241D3] hover:text-[#6241D3] border border-[#6241D3] hover:bg-white text-white px-4 py-2 rounded-md ${
            keywords.every((keyword) => !keyword.main.trim()) ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={keywords.every((keyword) => !keyword.main.trim())}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}