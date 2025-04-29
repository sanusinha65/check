import React from "react";
import { Link } from "react-router-dom";

const BlogArticles = ({ articles }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-6 flex-1">
      {articles.map((article, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden flex-1 min-w-[250px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-40 object-cover" />
          <div className="p-4 flex flex-col">
            {articles.readTime && <p className="text-gray-600 font-semibold">{article.category} — {article.readTime}</p>}
            <h3 className="text-lg font-bold mt-2 hover:text-gray-700">
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </h3>
            <p className="text-gray-600 mt-2">
              {article.description.replace(/<[^>]*>/g, '').split(" ").slice(0, 20).join(" ") + (article.description.split(" ").length > 20 ? "..." : "")}
            </p>
            <p className="mt-4 text-md text-[#6241D3] lg:my-4 font-bold">By {article.authorName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogArticles;
