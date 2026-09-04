const MAX_KEYWORD_LENGTH = 80;
const GA_MEASUREMENT_ID = process.env.PUBLIC_GA_MEASUREMENT_ID || "";

const hasBrowserAnalytics = () => (
  typeof window !== "undefined"
  && Boolean(GA_MEASUREMENT_ID)
);

const sendAnalyticsEvent = (eventName, parameters = {}) => {
  if (!hasBrowserAnalytics() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, parameters);
};

export const initializeAnalytics = () => {
  if (!hasBrowserAnalytics() || window.gtag) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
  });
};

export const trackPageView = (path) => {
  sendAnalyticsEvent("page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};

export const sanitizeKeywordForAnalytics = (value) => String(value || "")
  .toLowerCase()
  .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[email]")
  .replace(/\+?\d[\d\s().-]{7,}\d/g, "[phone]")
  .replace(/https?:\/\/\S+/g, "[url]")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, MAX_KEYWORD_LENGTH);

export const trackPortfolioKeywordSearch = ({ keyword, recommendation }) => {
  const searchTerm = sanitizeKeywordForAnalytics(keyword);

  if (!searchTerm) {
    return;
  }

  sendAnalyticsEvent("portfolio_keyword_search", {
    search_term: searchTerm,
    match_status: recommendation ? "matched" : "no_match",
    matched_project: recommendation || "none",
  });
};

export const trackProjectClick = ({ projectId, source = "unknown", destination }) => {
  if (!projectId) {
    return;
  }

  sendAnalyticsEvent("portfolio_project_click", {
    project_id: projectId,
    source,
    destination: String(destination || ""),
  });
};
