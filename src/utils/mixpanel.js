import mixpanel from "mixpanel-browser";

// Initialize Mixpanel with a development token if in development mode
const isDevelopment = import.meta.env.DEV;
const MIXPANEL_TOKEN = isDevelopment ? 'development_token' : import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, { 
    debug: isDevelopment,
    ignore_dnt: isDevelopment // Allow tracking in development
  });
}

const MixpanelService = {
  trackPageView: (page) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.track(`viewed_${page}_page`, { page });
  },
  identifyUser: (userId, email, name) => {
    if (!MIXPANEL_TOKEN || !userId || !email || !name) return;
    mixpanel.identify(userId);
    mixpanel.people.set({
      $email: email,
      $name: name,
      $last_login: new Date(),
    });
  },
  trackLogin: (userId, email, name) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.reset(); // Reset session before identifying the new user
    setTimeout(() => {
      MixpanelService.identifyUser(userId, email, name);
      mixpanel.track("user_logged_in", { userId, email });
    }, 200);
  },
  trackRegistration: (userId, email, name) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.reset(); // Reset session before identifying the new user
    mixpanel.alias(userId);
    setTimeout(() => {
      MixpanelService.identifyUser(userId, email, name);
      mixpanel.track("user_registered", { userId, email });
    }, 200);
  },
  trackLogout: (email) => {
    if (!MIXPANEL_TOKEN || !email) return;
    mixpanel.track("user_logged_out", { email });
    mixpanel.reset(); // This clears the previous session and distinct_id
  },
  trackCTA: (ctaName, additionalData = {}) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.track(`cta_clicked_${ctaName}`, {
      cta: ctaName,
      ...additionalData,
    });
  },
  trackDashboardInteraction: (stepName) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.track(`dashboard_interaction_${stepName}`, {
      stepName,
    });
  },
  trackModalInteraction: (modalName, action, additionalData = {}) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.track(`${modalName}_modal_${action}`, {
      modalName,
      action,
      ...additionalData,
    });
  },
  trackListCTA: (buttonName) => {
    if (!MIXPANEL_TOKEN) return;
    mixpanel.track(`list_${buttonName}`, {
      button: buttonName,
    });
  },
};

export default MixpanelService;
