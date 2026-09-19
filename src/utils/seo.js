import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  AUTHOR,
  SHARED_KEYWORDS,
  SITE_NAME,
  absoluteUrl,
  buildPageSchema,
  getRouteSeo,
  personSchema,
  projectItemListSchema,
} from "../data/recruiterSeo.mjs";

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
};

const setLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const setJsonLd = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location.pathname);
    const url = absoluteUrl(location.pathname);
    const keywords = [...SHARED_KEYWORDS, ...seo.keywords].join(", ");

    document.documentElement.lang = "en";
    document.title = seo.title;

    setMeta('meta[name="description"]', { name: "description", content: seo.description });
    setMeta('meta[name="author"]', { name: "author", content: AUTHOR });
    setMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    setMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "profile" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: url });
    setMeta('meta[property="profile:first_name"]', { property: "profile:first_name", content: "Isabella" });
    setMeta('meta[property="profile:last_name"]', { property: "profile:last_name", content: "Wang" });
    setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });

    setLink("canonical", url);
    setJsonLd("person-json-ld", personSchema);
    setJsonLd("page-json-ld", buildPageSchema({ pathname: location.pathname, ...seo }));
    setJsonLd("project-list-json-ld", projectItemListSchema);
  }, [location.pathname]);

  return null;
}
