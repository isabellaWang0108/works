import React, { useEffect, useRef, useState } from "react";

import sendButtonIcon from "../assets/icons/chatbox/send-button.svg";
import sendArrowIcon from "../assets/icons/chatbox/send-arrow.svg";
import portfolioKnowledge from "../data/portfolioKnowledge.json";

const projectIdByRoute = {
    "/ai-research-guide": "AIResearchGuide",
    "/platforms-integration": "PlatformsIntegration",
    "/design-system": "Design-system",
    "/kiosk": "Kiosk",
    "/voice": "Voice",
    "https://nytango.vercel.app/": "NYTango"
};

const adjacentKeywordMap = {
    ai: ["artificial intelligence", "machine learning", "automation", "smart", "assistive", "generated", "generative ai", "llm", "copilot", "agentic", "human in the loop", "responsible ai"],
    "artificial intelligence": ["ai", "machine learning", "automation", "generative ai", "llm", "copilot"],
    "generative ai": ["ai", "llm", "prompt", "copilot", "agentic", "generated"],
    llm: ["ai", "generative ai", "prompt", "rag", "retrieval", "copilot"],
    copilot: ["ai", "assistant", "agentic", "workflow automation", "decision support"],
    agentic: ["ai", "copilot", "automation", "workflow orchestration", "human in the loop"],
    rag: ["retrieval", "source backed", "citation", "knowledge management", "enterprise search"],
    b2b: ["enterprise", "internal tool", "saas", "business", "platform", "workflow"],
    saas: ["b2b", "enterprise", "platform", "subscription", "internal tool"],
    enterprise: ["b2b", "saas", "platform", "internal tool", "workflow", "stakeholder"],
    frontend: ["front-end", "ui engineering", "implementation", "design to code", "design engineering", "prototype"],
    "design engineering": ["frontend", "front-end", "implementation", "design to code", "prototype", "ship"],
    "design to code": ["frontend", "implementation", "design engineering", "ui engineering"],
    "design system": ["component library", "tokens", "documentation", "patterns", "ui kit", "governance", "figma variables", "wcag"],
    accessibility: ["wcag", "inclusive design", "compliance", "usable", "a11y"],
    workflow: ["process", "flow", "journey", "operations", "task", "orchestration", "automation"],
    operations: ["workflow", "process", "efficiency", "automation", "service design"],
    research: ["discovery", "interviews", "validation", "testing", "synthesis", "user research", "qualitative"],
    strategy: ["product strategy", "problem framing", "vision", "roadmap", "business impact"],
    consulting: ["enterprise", "knowledge", "assessment", "client", "discovery", "expert"],
    marketplace: ["creator", "selling", "commerce", "nft", "two sided", "activation", "seller"],
    growth: ["activation", "conversion", "funnel", "retention", "engagement"],
    onboarding: ["activation", "education", "guided workflow", "first run", "conversion"],
    hardware: ["iot", "ipad", "kiosk", "physical", "device", "touchscreen"],
    proptech: ["real estate", "workplace", "visitor", "office", "kiosk"],
    events: ["calendar", "community", "discovery", "organizer", "operations", "cms"],
    "local discovery": ["events", "calendar", "map", "location based", "community", "consumer"],
    cms: ["content management", "organizer", "admin", "self serve", "events", "operations"],
    community: ["events", "creator", "engagement", "consumer", "platform"],
    hiring: ["recruiting", "talent", "candidate", "recruiter", "hr tech"],
    metrics: ["impact", "outcomes", "business impact", "efficiency", "activation", "conversion"],
    ambiguous: ["ambiguity", "0 to 1", "problem framing", "discovery", "strategy"],
    "0 to 1": ["zero to one", "mvp", "early stage", "ambiguous", "product launch"]
};

const normalizeText = (value) => String(value || "")
    .toLowerCase()
    .replace(/0\s*[-→]\s*1/g, "zero to one")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokenize = (value) => normalizeText(value).split(/\s+/).filter(Boolean);

const editDistance = (source, target) => {
    if (source === target) {
        return 0;
    }

    if (Math.abs(source.length - target.length) > 2) {
        return 3;
    }

    const previous = Array.from({ length: target.length + 1 }, (_, index) => index);

    for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex += 1) {
        let diagonal = sourceIndex - 1;
        previous[0] = sourceIndex;

        for (let targetIndex = 1; targetIndex <= target.length; targetIndex += 1) {
            const temporary = previous[targetIndex];
            const cost = source[sourceIndex - 1] === target[targetIndex - 1] ? 0 : 1;
            previous[targetIndex] = Math.min(
                previous[targetIndex] + 1,
                previous[targetIndex - 1] + 1,
                diagonal + cost
            );
            diagonal = temporary;
        }
    }

    return previous[target.length];
};

const getFuzzyTokenScore = (queryToken, fieldTokens) => {
    if (queryToken.length < 4) {
        return 0;
    }

    return fieldTokens.some((fieldToken) => {
        if (fieldToken.includes(queryToken) || queryToken.includes(fieldToken)) {
            return queryToken.length >= 4 && fieldToken.length >= 4;
        }

        const maxDistance = queryToken.length >= 7 ? 2 : 1;
        return editDistance(queryToken, fieldToken) <= maxDistance;
    }) ? 1 : 0;
};

const expandQueryTerms = (query) => {
    const normalizedQuery = normalizeText(query);
    const baseTerms = tokenize(normalizedQuery);
    const expandedTerms = new Set(baseTerms);

    Object.entries(adjacentKeywordMap).forEach(([keyword, aliases]) => {
        const normalizedKeyword = normalizeText(keyword);
        const queryHasKeyword = normalizedQuery.includes(normalizedKeyword)
            || getFuzzyTokenScore(normalizedKeyword, baseTerms);

        if (queryHasKeyword) {
            expandedTerms.add(normalizedKeyword);
            aliases.forEach((alias) => expandedTerms.add(normalizeText(alias)));
        }
    });

    return [...expandedTerms].filter(Boolean);
};

const searchableFields = [
    ["title", 8],
    ["tags", 7],
    ["skills", 6],
    ["bestFor", 5],
    ["summary", 4],
    ["proof", 3],
    ["role", 1.5],
    ["team", 1],
    ["duration", 0.5]
];

const getFieldText = (project, field) => {
    const value = project[field];
    return Array.isArray(value) ? value.join(" ") : value;
};

const getProjectScore = (project, queryTerms) => searchableFields.reduce((score, [field, weight]) => {
    const fieldText = normalizeText(getFieldText(project, field));
    const fieldTokens = tokenize(fieldText);

    return queryTerms.reduce((fieldScore, term) => {
        const termTokens = tokenize(term);
        const hasExactPhrase = term.includes(" ") && fieldText.includes(term);
        const tokenScore = termTokens.reduce((tokenTotal, token) => {
            if (fieldTokens.includes(token)) {
                return tokenTotal + weight * 2;
            }

            if (getFuzzyTokenScore(token, fieldTokens)) {
                return tokenTotal + weight * 0.85;
            }

            return tokenTotal;
        }, 0);

        return fieldScore + tokenScore + (hasExactPhrase ? weight * 3 : 0);
    }, score);
}, 0);

export const findRecommendation = (keyword) => {
    const queryTerms = expandQueryTerms(keyword);

    if (!queryTerms.length) {
        return null;
    }

    const rankedProjects = portfolioKnowledge.caseStudies
        .map((project, index) => ({
            id: projectIdByRoute[project.route],
            score: getProjectScore(project, queryTerms),
            index
        }))
        .filter((project) => project.id)
        .sort((a, b) => b.score - a.score || a.index - b.index);

    const bestProject = rankedProjects[0];

    return bestProject?.score > 0 ? bestProject.id : null;
};

function PortfolioChat({ isExpanded = true, onExpand, onCollapse, onRecommend, onNoMatch }) {
    const [keyword, setKeyword] = useState("");
    const chatRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            inputRef.current?.focus();
        }
    }, [isExpanded]);

    useEffect(() => {
        if (!isExpanded || !onCollapse) {
            return undefined;
        }

        const handlePointerDown = (event) => {
            if (!chatRef.current?.contains(event.target)) {
                onCollapse();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, [isExpanded, onCollapse]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const recommendation = findRecommendation(keyword);

        if (recommendation) {
            onRecommend(recommendation);
            return;
        }

        if (keyword.trim()) {
            onNoMatch?.();
        }
    };

    if (!isExpanded) {
        return (
            <button
                type="button"
                className="portfolio-chat-launch portfolio-chat-field"
                onClick={onExpand}
                aria-label="Open case study search"
            >
                <span>Type in keywords, and I’ll point you to relevant work.</span>
                <span className="portfolio-chat-launch-action" aria-hidden="true">
                    <img className="portfolio-chat-submit-bg" src={sendButtonIcon} alt="" />
                    <img className="portfolio-chat-submit-arrow" src={sendArrowIcon} alt="" />
                </span>
            </button>
        );
    }

    return (
        <form ref={chatRef} className="portfolio-chat" onSubmit={handleSubmit} aria-label="Case study recommender">
            <p>Type in a few keywords, and I’ll point you to the right case study.</p>
            <label className="portfolio-chat-field">
                <input
                    ref={inputRef}
                    value={keyword}
                    onChange={(event) => setKeyword(event.target.value)}
                    placeholder="e.g. AI product, Design System, Complex Workflow"
                    aria-label="Case study keyword"
                />
                <button className="portfolio-chat-submit" type="submit" aria-label="Recommend a case study">
                    <img className="portfolio-chat-submit-bg" src={sendButtonIcon} alt="" />
                    <img className="portfolio-chat-submit-arrow" src={sendArrowIcon} alt="" />
                </button>
            </label>
        </form>
    );
}

export default PortfolioChat;
