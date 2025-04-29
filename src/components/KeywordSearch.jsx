import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setKeywords([...keywords, query.trim()]);
      setQuery("");
    }
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white mt-2 border border-gray-300 rounded-lg outline-none"
          placeholder="Search and hit enter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* {query && (
          <FontAwesomeIcon
            icon={faTimes}
            className="text-gray-500 cursor-pointer mx-2"
            size="lg"
            onClick={() => setQuery("")}
          />
        )} */}
      </div>
      <div className="flex gap-2 flex-wrap mt-2">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex items-center bg-white px-3 py-1 rounded-full text-sm shadow">
            {keyword}
            <FontAwesomeIcon icon={faTimes} className="ml-2 text-gray-500 cursor-pointer" size="sm" onClick={() => removeKeyword(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}