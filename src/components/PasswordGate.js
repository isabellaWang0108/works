import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Animation3DEdge from "./animation3DEdge";

const PASSWORD_HASH = "bade44aafc581068f83d2971b0eea6460bf0667c1db26b82aad2d4629e2fd6f0";
const SESSION_KEY = "portfolio_auth";

async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function matchesPasswordCaseAgnostic(value) {
    const directHash = await sha256(value);
    if (directHash === PASSWORD_HASH) return true;

    const letterIndexes = [];
    for (let i = 0; i < value.length; i += 1) {
        if (/[a-z]/i.test(value[i])) letterIndexes.push(i);
    }

    if (letterIndexes.length === 0) return false;

    const permutationCount = 2 ** letterIndexes.length;
    if (permutationCount > 4096) {
        const lowerHash = await sha256(value.toLowerCase());
        const upperHash = await sha256(value.toUpperCase());
        return lowerHash === PASSWORD_HASH || upperHash === PASSWORD_HASH;
    }

    const originalChars = value.split("");
    for (let mask = 0; mask < permutationCount; mask += 1) {
        const candidateChars = [...originalChars];
        for (let bit = 0; bit < letterIndexes.length; bit += 1) {
            const idx = letterIndexes[bit];
            const ch = originalChars[idx];
            candidateChars[idx] = (mask & (1 << bit)) ? ch.toUpperCase() : ch.toLowerCase();
        }

        const hash = await sha256(candidateChars.join(""));
        if (hash === PASSWORD_HASH) return true;
    }

    return false;
}

function PasswordGate({ children }) {
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === "true"
    );
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isMatch = await matchesPasswordCaseAgnostic(input);
        if (isMatch) {
            sessionStorage.setItem(SESSION_KEY, "true");
            setAuthenticated(true);
        } else {
            setError(true);
            setInput("");
        }
    };

    if (authenticated) return children;

    const floated = focused || input.length > 0;
    const borderColor = error ? "#e05c5c" : focused ? "#FF8CC4" : "#666";

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            backgroundColor: "#171717",
        }}>
            <Canvas
                style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
                camera={{ position: [0, 0, 25] }}
            >
                <hemisphereLight intensity={0.7} groundColor="#555" />
                <pointLight position={[50, 0, 0]} intensity={10} />
                <Animation3DEdge />
            </Canvas>
            <div style={{ textAlign: "center", maxWidth: 500, width: "90%", position: "relative", zIndex: 1 }}>
                <div className="logo bold pink" style={{ fontSize: 24, marginBottom: 24 }}>Isabella Wang</div>
                <h2 style={{ color: "white", marginBottom: 24, fontWeight: 800 }}>I'm an AI-fluent designer and systems thinker who makes complexity clear.</h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ position: "relative", marginTop: 8 }}>
                        <label style={{
                            position: "absolute",
                            left: 14,
                            top: floated ? -9 : "50%",
                            transform: floated ? "none" : "translateY(-50%)",
                            fontSize: floated ? 12 : 16,
                            color: error ? "#e05c5c" : floated ? "#FF8CC4" : "#888",
                            backgroundColor: "#2a2a2a",
                            padding: "0 4px",
                            lineHeight: 1,
                            transition: "top 0.15s ease, font-size 0.15s ease, color 0.15s ease",
                            pointerEvents: "none",
                            borderRadius: 2,
                            fontFamily: "SuisseIntl-Regular",
                        }}>
                            Enter password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(false); }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            autoFocus
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "14px 88px 14px 16px",
                                fontSize: 16,
                                fontFamily: "SuisseIntl-Regular",
                                border: `1.5px solid ${borderColor}`,
                                borderRadius: 6,
                                backgroundColor: "#2a2a2a",
                                color: "white",
                                outline: "none",
                                transition: "border-color 0.15s ease",
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                border: "none",
                                background: "transparent",
                                color: "#FF8CC4",
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: 0.3,
                                cursor: "pointer",
                                padding: "6px 8px",
                            }}
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                    {error && (
                        <p style={{ color: "#e05c5c", margin: 0, fontSize: 14, textAlign: "left" }}>
                            Incorrect password. Check what's written on the resume and try again.
                        </p>
                    )}
                    <button
                        type="submit"
                        style={{
                            padding: "12px 16px",
                            fontSize: 16,
                            border: "none",
                            borderRadius: 8,
                            backgroundColor: "#FF8CC4",
                            color: "black",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PasswordGate;
