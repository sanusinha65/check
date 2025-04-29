import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogArticles from "./BlogArticles";
import OutXTransformingLinkedinOutreach from "../json_data/blogs/linkedin-sales-navigator.js"
import BuildTargetLeadList from "../json_data/blogs/build-targeted-lead-list-linkedin-sales-navigator.js"
import LinkedinScrapingVsManualProspecting from "../json_data/blogs/linkedin-scraping-vs-manual-prospecting.js"
import LinkedinScrapingMythsDebunked from "../json_data/blogs/linkedin-scraping-myths-debunked.js"

const articlesMap = {
  "linkedin-sales-navigator": OutXTransformingLinkedinOutreach,
  "build-targeted-lead-list-linkedin-sales-navigator": BuildTargetLeadList,
  "linkedin-scraping-vs-manual-prospecting": LinkedinScrapingVsManualProspecting,
  "linkedin-scraping-myths-debunked": LinkedinScrapingMythsDebunked
};

const articleList = Object.keys(articlesMap);

const BlogLayout = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 4;
  const totalPages = Math.ceil(articleList.length / articlesPerPage);
  const startIndex = currentPage * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const paginatedArticles = articleList.slice(startIndex, endIndex).map(slug => ({
    ...articlesMap[slug], 
    slug 
  }));
  
  return (
    <div className="mx-auto flex flex-col gap-6">
      <div className="flex flex-col lg:flex-col gap-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 flex lg:flex-row flex-col gap-x-4 items-center lg:mb-14">
          <img src={paginatedArticles[0].coverImage} alt={paginatedArticles[0].title} className="w-full h-full object-cover flex-1" />
          <div className="px-4 flex-1 lg:py-0 py-4">
            <p className="text-[#6241D3] font-semibold">— {paginatedArticles[0].publishDate}</p>
            <h2 className="text-xl lg:text-4xl font-bold mt-2 hover:text-gray-700">
            <Link to={`/blog/${paginatedArticles[0].slug}`}>{paginatedArticles[0].title}</Link>
            </h2>
            <p className="text-gray-600 lg:my-4">{paginatedArticles[0].description.replace(/<[^>]*>/g, '').split(" ").slice(0, 80).join(" ") + (paginatedArticles[0].description.split(" ").length > 20 ? "..." : "")}
            </p>
            <p className="mt-4 text-[#6241D3] lg:my-4 font-bold">By {paginatedArticles[0].authorName}</p>
          </div>
        </div>
        <BlogArticles articles={paginatedArticles.slice(1)} />
      </div>
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-100"
          disabled={currentPage === 0}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentPage(index)}
            className={`px-3 py-2 rounded ${currentPage === index ? 'bg-[#6241D3] text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))} 
          className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-100"
          disabled={endIndex >= articleList.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogLayout;
