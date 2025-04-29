import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import OutXTransformingLinkedinOutreach from "../json_data/blogs/linkedin-sales-navigator.js"
import BuildTargetLeadList from "../json_data/blogs/build-targeted-lead-list-linkedin-sales-navigator.js"
import LinkedinScrapingVsManualProspecting from "../json_data/blogs/linkedin-scraping-vs-manual-prospecting.js"
import LinkedinScrapingMythsDebunked from "../json_data/blogs/linkedin-scraping-myths-debunked.js"
import BlogArticles from "./BlogArticles.jsx";
import Meta from "../helper/Meta.jsx";

const articlesMap = {
  "linkedin-sales-navigator": OutXTransformingLinkedinOutreach,
  "build-targeted-lead-list-linkedin-sales-navigator": BuildTargetLeadList,
  "linkedin-scraping-vs-manual-prospecting": LinkedinScrapingVsManualProspecting,
  "linkedin-scraping-myths-debunked": LinkedinScrapingMythsDebunked
};

const metaMap = {
  "linkedin-sales-navigator": {
    title: "Master LinkedIn Sales Navigator with Outx.ai",
    description: "Tips, strategies, and best practices to use LinkedIn Sales Navigator for smarter lead generation.",
    keywords: "LinkedIn Sales Navigator tips, how to use Sales Navigator, Sales Navigator strategies"
  },
  "build-targeted-lead-list-linkedin-sales-navigator": {
    title: "How to Build a Targeted Lead List Using LinkedIn Sales Navigator",
    description: "Step-by-step guide to building laser-targeted lead lists with LinkedIn Sales Navigator and Outx.ai.",
    keywords: "LinkedIn lead list, Sales Navigator leads, build LinkedIn prospects list"
  },
  "linkedin-scraping-vs-manual-prospecting": {
    title: "LinkedIn Scraping vs Manual Prospecting: Which is Better?",
    description: "Understand the pros and cons of LinkedIn scraping versus manual prospecting. Find what fits your growth.",
    keywords: "LinkedIn scraping benefits, manual prospecting, LinkedIn lead generation strategies"
  },
  "linkedin-scraping-myths-debunked": {
    title: "LinkedIn Scraping Myths Debunked: What's Legal, What's Not",
    description: "Bust the myths around LinkedIn scraping. Learn whatâ€™s allowed and how to scrape safely.",
    keywords: "LinkedIn scraping myths, LinkedIn scraping legality, LinkedIn data scraping"
  }
};


export const BlogPage = () => {
  const { slug } = useParams();  
  const article = articlesMap[slug];
  const meta = metaMap[slug];
  
  const relatedArticles = Object.entries(articlesMap)
    .filter(([key]) => key !== slug)
    .map(([, value]) => value);

    return (
    <>
     {meta && (
        <Meta 
          title={meta.title}
          description={meta.description}
          keywords={meta.keywords}
        />
      )}
    <Header />
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-20 xl:px-80 2xl:px-80 py-20">
        <Link to="/blog">
          <button className="rounded-md border text-[#6241D3] border-[#6241D3] px-2 py-1 cursor-pointer flex gap-x-2 items-center my-6">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Blog</span>
          </button>
        </Link>

        <img
          src={article.coverImage}  
          alt={article.title}
          className="w-full h-100 object-cover rounded-md"
        />

        <h1 className="text-3xl lg:text-5xl font-extrabold py-4 lg:leading-14">
          {article.title}
        </h1>
        <p className="text-md lg:text-lg text-[#6241D3]">
          By {article.authorName}
        </p>

        <p className="text-md lg:text-lg text-[#6241D3]">
          {article.publishDate}
        </p>

        <div className="blog-content py-4" dangerouslySetInnerHTML={{ __html: article.description }} />

        <div className="flex-col lg:flex-col gap-6">
            <h2 className="text-2xl font-bold my-6 lg:my-10">Related Blogs</h2>
            <BlogArticles articles={relatedArticles} />
        </div>
      </div>
    <Footer />
    </>
    );
};
