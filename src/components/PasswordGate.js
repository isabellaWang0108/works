import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Animation3DEdge from "./animation3DEdge";

const PASSWORD_HASH = "872e4e50ce9990d8b041330c47c9ddd11bec6b503ae9386a99da8584e9bb12c4";
const SESSION_KEY = "portfolio_auth";

async function sha256(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function PasswordGate({ children }) {
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === "true"
    );
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [focused, setFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hash = await sha256(input);
        if (hash === PASSWORD_HASH) {
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
                            type="password"
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(false); }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            autoFocus
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "14px 16px",
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
                    </div>
                    {error && (
                        <p style={{ color: "#e05c5c", margin: 0, fontSize: 14, textAlign: "left" }}>
                            Incorrect password. Please try again.
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
