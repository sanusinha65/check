import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faHashtag, faTrash } from "@fortawesome/free-solid-svg-icons";
import { editTrackingKeyword, getKeywordsById } from "../api/supabase";
import MixpanelService from "../utils/mixpanel";
import { useSelector } from "react-redux";

export default function EditKeywordModal({ onClose, refreshList, trackingListId }) {
  const [originalKeywords, setOriginalKeywords] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [deletedKeywords, setDeletedKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const { team_id , user_id} = useSelector(state => state.user);
  
  // Fetch existing keywords when component mounts
  useEffect(() => {
    const fetchKeywords = async () => {
      const { data, error } = await getKeywordsById(trackingListId);
      if (error) {
        console.error("Failed to fetch keywords:", error);
      } else if (data.length > 0) {
        const formattedKeywords = data.map((kw) => ({
          keyword_id: kw.id,
          main: kw.primary_keyword || "",
          required: kw.required_keywords.join(", ") || "",
          excluded: kw.exclude_keywords.join(", ") || "",
          isOriginal: true,
          isNew: false,
        }));
        
        setOriginalKeywords(formattedKeywords);
        setKeywords(formattedKeywords);
      } else {
        setKeywords([{ main: "", required: "", excluded: "", isNew: true }]); // Default structure
      }
    };

    if (trackingListId) {
      fetchKeywords();
    }
  }, [trackingListId]);

  const addNewKeyword = () => {
    setKeywords([...keywords, { main: "", required: "", excluded: "", isNew: true }]);
  };

  const removeKeyword = (index) => {
    console.log("Deleting keyword at index:", index);
  
    setDeletedKeywords(prev => [
      ...prev,
      { keyword_id: keywords[index]?.keyword_id, delete_keyword: true }
    ]);
  
    setKeywords(prevKeywords => {
      const updatedKeywords = prevKeywords.filter((_, idx) => idx !== index);
  
      if (updatedKeywords.length === 0) {
        updatedKeywords.push({ main: "", required: "", excluded: "", isNew: true });
      }
  
      return [...updatedKeywords]; 
    });
  };
  

  
  const updateKeyword = (index, field, value) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index][field] = value;
    
    // If this is an original keyword, mark it as modified
    if (updatedKeywords[index].isOriginal) {
      updatedKeywords[index].isModified = true;
    }
    
    setKeywords(updatedKeywords);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Start with deleted keywords
      const payload = [...deletedKeywords];
      
      // Add only new keywords
      keywords.forEach(kw => {
        if (kw.isNew) {
          // This is a new keyword
          payload.push({
            keyword: kw.main,
            required_keywords: kw.required ? kw.required.split(',').map(k => k.trim()).filter(k => k) : [],
            exclude_keywords: kw.excluded ? kw.excluded.split(',').map(k => k.trim()).filter(k => k) : [],
            tracking_lists_id: trackingListId
          });
        }
        else if (kw.isModified) {
          payload.push({
            keyword_id: kw.keyword_id,
            required_keywords: kw.required
              ? kw.required.split(",").map((k) => k.trim()).filter((k) => k)
              : [],
            exclude_keywords: kw.excluded
              ? kw.excluded.split(",").map((k) => k.trim()).filter((k) => k)
              : [],
          });
        }
      });
      
      const response = await editTrackingKeyword(team_id, user_id,payload);
      
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
      refreshList();
      onClose();
    }
  };

  return (
    <div className="p-6 bg-white rounded-md max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#6241D3]">Keyword</h2>
          {console.log(keywords)}
          {keywords.map((keyword, index) => (
            <div key={index} className="relative mb-4 flex items-center">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden flex-grow">
                <div className="bg-gray-100 p-2 text-[#6241D3]">
                  <FontAwesomeIcon icon={faHashtag} className="h-5 w-5" />
                </div>
                <input
                  placeholder="Not case sensitive"
                  type="text"
                  className="py-2 px-3 w-full outline-none"
                  value={keyword.main}
                  readOnly={!keyword.isNew}
                  onChange={(e) => updateKeyword(index, "main", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button
            onClick={addNewKeyword} className={`bg-[#6241D3] hover:text-[#6241D3] border border-[#6241D3] hover:bg-white text-white px-4 py-2 rounded-md ${
              keywords.every((keyword) => !keyword.main.trim()) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={keywords.every((keyword) => !keyword.main.trim())}>
            <FontAwesomeIcon icon={faPlus} /> Add next keyword
          </button>
        </div>

        <div>
          <h2 className="text-lg font-medium">Required keywords</h2>
          {keywords.map((keyword, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="Separate keywords with a comma"
                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                value={keyword.required}
                onChange={(e) => updateKeyword(index, "required", e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-medium">Excluded keywords</h2>
          {keywords.map((keyword, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                placeholder="Separate keywords with a comma"
                className="w-full border border-gray-300 rounded-md p-2 outline-none"
                value={keyword.excluded}
                onChange={(e) => updateKeyword(index, "excluded", e.target.value)}
              />
              <button onClick={() => removeKeyword(index)} className="ml-2 text-[#6241D3] hover:text-purple-400">
                  <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                </button>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-x-2 mt-4">
        <button onClick={() => {onClose(); MixpanelService.trackModalInteraction("edit_keywords", "closed")}} className="bg-gray-200 hover:bg-gray-100 px-4 py-2 rounded-md">Cancel</button>
        <button onClick={handleSubmit}
        className={`bg-[#6241D3] hover:text-[#6241D3] border border-[#6241D3] hover:bg-white text-white px-4 py-2 rounded-md ${
          keywords.every((keyword) => !keyword.main.trim()) ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={keywords.every((keyword) => !keyword.main.trim())}>
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}