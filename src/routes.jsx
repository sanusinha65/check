import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Lists from "./pages/Lists.jsx";
import ListReport from "./pages/ListReport.jsx";
import LinkedinScraping from "./pages/LinkedinScraping.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import CookiePolicy from "./pages/CookiePolicy.jsx";
import Blog from "./pages/Blog.jsx";
import {BlogPage} from "./components/BlogPage.jsx";
import VulnerabilityDisclosure from "./components/VulnerabilityDisclosure.jsx";
import GDPRCompliance from "./pages/GDPRCompliance.jsx";
import CCPAPrivacyPolicy from "./pages/CCPAPrivacyPolicy.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import AffiliateProgram from "./pages/AffiliateProgram.jsx";
import AffiliateSignUp from "./components/AffiliateSignup.jsx";
import AffiliateTerms from "./components/AffiliateTerms.jsx";
import Settings from "./components/Settings.jsx";
import ProfileTab from "./components/ProfileTab.jsx";
import BillingTab from "./components/BillingTab.jsx";
import AccountTab from "./components/AccountTab.jsx";
import Teams from "./pages/Teams.jsx";
import Tracking from "./pages/Tracking.jsx";
import LeadEnrichmentSelector from "./components/LeadEnrichment.jsx";
import ContactListConfiguration from "./components/ConfigurePage.jsx";
import EmailPricing from "./components/EmailPricing.jsx";
import TrackingList from "./pages/TrackingList.jsx";
import KeywordTracker from "./pages/KeywordTracker.jsx";
import KeywordTrackerPricing from "./pages/KeywordTrackingPricing.jsx";
import LinkedinVideoDownloader from "./pages/LinkedinVideoDownloader.jsx";
import LinkedinPostGenerator from "./pages/LinkedinPostGenerator.jsx";
import LinkedinSummaryGenerator from "./pages/LinkedinSummaryGenerator.jsx";
import LinkedinProfileFeedback from "./pages/LinkedinProfileFeedback.jsx";
import ViralPostGenerator from "./pages/ViralPostGenerator.jsx";
import LinkedinHeadlineGenerator from "./pages/LinkedinHeadlineGenerator.jsx";
import LinkedinPostBooster from "./pages/LinkedinPostBooster.jsx";
import LinkedinCarouselGenerator from "./pages/LinkedinCarouselGenerator.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";

export const routes = [
  {
    path: "/",
    element: <Home />,
    name: "home"
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    name: "login"
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
    name: "register"
  },
  {
    path: "/blog",
    element: <Blog />,
    name: "blog"
  },
  {
    path: "/blog/:slug",
    element: <BlogPage />,
    name: "blog_article"
  },
  {
    path: "/linkedin-keyword-tracker",
    element: <KeywordTracker />,
    name: "linkedin_keyword_tracker"
  },
  {
    path: "/linkedin-sales-navigator-pricing",
    element: <PricingPage />,
    name: "linkedin_sales_navigator_pricing"
  },
  {
    path: "/linkedin-keyword-tracker-pricing",
    element: <KeywordTrackerPricing />,
    name: "linkedin_keyword_tracker_pricing"
  },
  {
    path: "/linkedin-video-downloader",
    element: <LinkedinVideoDownloader />,
    name: "linkedin_video_downloader"
  },
  {
    path: "/linkedin-post-generator",
    element: <LinkedinPostGenerator />,
    name: "linkedin_post_generator"
  },
  {
    path: "/linkedin-summary-generator",
    element: <LinkedinSummaryGenerator />,
    name: "linkedin_summary_generator"
  },
  {
    path: "/linkedin-profile-feedback",
    element: <LinkedinProfileFeedback />,
    name: "linkedin_profile_feedback"
  },
  {
    path: "/viral-post-generator",
    element: <ViralPostGenerator />,
    name: "viral_post_generator"
  },
  {
    path: "/linkedin-headline-generator",
    element: <LinkedinHeadlineGenerator />,
    name: "linkedin_headline_generator"
  },
  {
    path: "/linkedin-post-booster",
    element: <LinkedinPostBooster />,
    name: "linkedin_post_booster"
  },
  {
    path: "/linkedin-carousel-generator",
    element: <LinkedinCarouselGenerator />,
    name: "linkedin_carousel_generator"
  },
  {
    path: "/affiliate-program",
    element: <AffiliateProgram />,
    name: "affiliate_program"
  },
  {
    path: "/affiliate-signup",
    element: <AffiliateSignUp />,
    name: "affiliate_signup"
  },
  {
    path: "/affiliate-terms",
    element: <AffiliateTerms />,
    name: "affiliate_terms"
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
    name: "terms_of_service"
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    name: "privacy_policy"
  },
  {
    path: "/cookie-policy",
    element: <CookiePolicy />,
    name: "cookie_policy"
  },
  {
    path: "/vulnerability-disclosure",
    element: <VulnerabilityDisclosure />,
    name: "vulnerability_disclosure"
  },
  {
    path: "/gdpr-compliance",
    element: <GDPRCompliance />,
    name: "gdpr_compliance"
  },
  {
    path: "/ccpa-privacy-policy",
    element: <CCPAPrivacyPolicy />,
    name: "ccpa_privacy_policy"
  },
  {
    path: "/linkedin-sales-navigator-scraper",
    element: <LinkedinScraping />,
    name: "linkedin_sales_navigator_scraper"
  },
  {
    path: "/tracking/:slug",
    element: <Tracking />,
    name: "tracking_details"
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    name: "dashboard",
    children: [
      {
        index: true,
        element: <Dashboard />,
        name: "dashboard_home"
      },
      {
        path: "settings",
        element: <Settings />,
        name: "settings",
        children: [
          {
            index: true,
            element: <ProfileTab />,
            name: "profile_settings"
          },
          {
            path: "profile",
            element: <ProfileTab />,
            name: "profile_settings"
          },
          {
            path: "account",
            element: <AccountTab />,
            name: "account_settings"
          },
          {
            path: "billing",
            element: <BillingTab />,
            name: "billing_settings"
          }
        ]
      }
    ]
  },
  {
    path: "/lists",
    element: <DashboardLayout />,
    name: "lists",
    children: [
      {
        index: true,
        element: <Lists />,
        name: "lists_home"
      },
      {
        path: ":listId",
        element: <ListReport />,
        name: "list_report"
      }
    ]
  },
  {
    path: "/teams",
    element: <DashboardLayout />,
    name: "teams",
    children: [
      {
        index: true,
        element: <Teams />,
        name: "teams_home"
      }
    ]
  },
  {
    path: "/tracking",
    element: <DashboardLayout />,
    name: "tracking",
    children: [
      {
        index: true,
        element: <TrackingList />,
        name: "tracking_list"
      }
    ]
  },
  {
    path: "/lead-enrichment",
    element: <LeadEnrichmentSelector />,
    name: "lead_enrichment"
  },
  {
    path: "/lead-enrichment-config",
    element: <ContactListConfiguration />,
    name: "lead_enrichment_config"
  },
  {
    path: "/lead-enrichment-pricing",
    element: <EmailPricing />,
    name: "lead_enrichment_pricing"
  }
]; 