import LinkedinIcon from "../assets/images/contact/linkedin.svg";
import EmailIcon from "../assets/images/contact/email.svg";
import BackToTopIcon from "../assets/icons/Back2Top.svg";

import NYTangoProduct from "../assets/images/home/Project card/NYTango_product.png";
import NYTangoBackground from "../assets/images/home/Project card/NY_Tango_Background.webp";
import VoiceProduct from "../assets/images/home/Project card/Voice_product.png";
import VoiceBackground from "../assets/images/home/Project card/Voice_background.webp";
import AIPlatformProduct from "../assets/images/home/Project card/AIPlatform_product.png";
import AIPlatformBackground from "../assets/images/home/Project card/AIPlatform_background.webp";
import DesignSystemProduct from "../assets/images/home/Project card/DS_product.png";
import DesignSystemBackground from "../assets/images/home/Project card/DS_background.webp";
import KioskProduct from "../assets/images/home/kiosk.png";

import VoicePic2 from "../assets/images/Voice/pic_2.svg";
import VoicePic3 from "../assets/images/Voice/pic_3.png";
import VoicePic4 from "../assets/images/Voice/pic_4.png";
import VoicePain1 from "../assets/images/Voice/pain_1.svg";
import VoicePain2 from "../assets/images/Voice/pain_2.svg";
import VoicePain3 from "../assets/images/Voice/pain_3.svg";

import AIGuidePic1 from "../assets/images/LeverGuide/img_1.svg";
import AIGuidePic2 from "../assets/images/LeverGuide/img_2.svg";
import AIGuidePic3 from "../assets/images/LeverGuide/img_3.svg";

import JanusPic2 from "../assets/images/Janus/img_2.svg";
import JanusPic4_1 from "../assets/images/Janus/img_4_1.svg";
import JanusPic4_2 from "../assets/images/Janus/img_4_2.svg";

import DSPic3 from "../assets/images/DesignSystem/ds_pic3.png";
import DSPic4 from "../assets/images/DesignSystem/ds_pic4.png";
import DSPic6 from "../assets/images/DesignSystem/ds_pic6.png";

const loadedImages = new Map();
const loadedModules = new Map();
const loadedFonts = new Map();
const CRITICAL_ASSET_TIMEOUT_MS = 2200;
const SECONDARY_ASSET_DELAY_MS = 900;

const sharedAssets = [LinkedinIcon, EmailIcon, BackToTopIcon];

const preloadSets = {
  "/": {
    critical: [
      NYTangoBackground,
      AIPlatformBackground,
    ],
    secondary: [
      VoiceBackground,
      DesignSystemBackground,
      KioskProduct,
    ],
  },
  "/contact": {
    critical: [],
    secondary: [],
  },
  "/projects": {
    critical: [],
    secondary: [
      NYTangoBackground,
      AIPlatformBackground,
      VoiceBackground,
      DesignSystemBackground,
      KioskProduct,
    ],
  },
  "/design-system": {
    critical: [DesignSystemProduct],
    secondary: [DSPic3, DSPic4, DSPic6],
  },
  "/voice": {
    critical: [VoiceProduct],
    secondary: [VoicePain1, VoicePain2, VoicePain3, VoicePic2, VoicePic3, VoicePic4],
  },
  "/ai-research-guide": {
    critical: [AIPlatformProduct],
    secondary: [AIGuidePic1, AIGuidePic2, AIGuidePic3],
  },
  "/platforms-integration": {
    critical: [],
    secondary: [JanusPic2, JanusPic4_1, JanusPic4_2],
  },
  "/kiosk": {
    critical: [KioskProduct],
    secondary: [],
  },
};

const fontFaces = [
  "1rem SuisseIntl-Regular",
  "1rem SuisseIntl-SemiBold",
  "1rem SuisseIntl-Thin",
];

const runSoon = (callback) => {
  if ("requestIdleCallback" in window) {
    const idleId = window.requestIdleCallback(callback, { timeout: SECONDARY_ASSET_DELAY_MS });
    return () => window.cancelIdleCallback(idleId);
  }

  const timeoutId = window.setTimeout(callback, SECONDARY_ASSET_DELAY_MS);
  return () => window.clearTimeout(timeoutId);
};

const preloadImage = (src, priority = "low") => {
  if (!src || loadedImages.has(src)) {
    return loadedImages.get(src)?.promise || Promise.resolve();
  }

  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";

  if ("fetchPriority" in image) {
    image.fetchPriority = priority;
  }

  const promise = new Promise((resolve) => {
    let isFinished = false;
    const timeoutId = setTimeout(() => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      resolve();
    }, CRITICAL_ASSET_TIMEOUT_MS);

    const finish = () => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      clearTimeout(timeoutId);

      resolve();
    };

    image.onload = finish;
    image.onerror = () => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      clearTimeout(timeoutId);
      resolve();
    };
    image.src = src;

    if (image.complete) {
      finish();
    }
  });

  loadedImages.set(src, { image, promise });
  return promise;
};

const preloadFonts = () => {
  if (!("fonts" in document)) {
    return Promise.resolve();
  }

  const promises = fontFaces.map((fontFace) => {
    if (loadedFonts.has(fontFace)) {
      return loadedFonts.get(fontFace);
    }

    const promise = document.fonts.load(fontFace).catch(() => {});
    loadedFonts.set(fontFace, promise);
    return promise;
  });

  return Promise.all(promises);
};

const preloadModules = (modules = []) => {
  const promises = modules.map((loadModule) => {
    if (loadedModules.has(loadModule)) {
      return loadedModules.get(loadModule);
    }

    const promise = loadModule().catch(() => {});
    loadedModules.set(loadModule, promise);
    return promise;
  });

  return Promise.all(promises);
};

export const preloadRouteAssets = (pathname = "/") => {
  const assets = preloadSets[pathname] || preloadSets["/"];

  preloadFonts();
  sharedAssets.forEach((src) => preloadImage(src, "low"));
  assets.critical.forEach((src) => preloadImage(src, "high"));
  preloadModules(assets.modules);

  return runSoon(() => {
    assets.secondary.forEach((src) => preloadImage(src, "low"));
  });
};

export const preloadRouteCriticalAssets = (pathname = "/") => {
  const assets = preloadSets[pathname] || preloadSets["/"];
  const criticalImages = [
    ...sharedAssets.map((src) => preloadImage(src, "low")),
    ...assets.critical.map((src) => preloadImage(src, "high")),
  ];

  return Promise.all([
    preloadFonts(),
    preloadModules(assets.modules),
    ...criticalImages,
  ]);
};
