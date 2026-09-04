import { track } from "@vercel/analytics";

const MAX_KEYWORD_LENGTH = 80;

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

  track("Portfolio keyword search", {
    search_term: searchTerm,
    match_status: recommendation ? "matched" : "no_match",
    matched_project: recommendation || "none",
  });
};

export const trackProjectClick = ({ projectId, source = "unknown", destination }) => {
  if (!projectId) {
    return;
  }

  track("Portfolio project click", {
    project_id: projectId,
    source,
    destination: String(destination || ""),
  });
};
