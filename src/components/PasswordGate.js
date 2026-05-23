import React, { useRef, useState } from "react";
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
    const gateRef = useRef(null);
    const pointerRef = useRef({ x: 50, y: 50, time: 0, timeout: null });
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

    const handlePointerMove = (e) => {
        if (!gateRef.current) return;

        const rect = gateRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const now = performance.now();
        const previous = pointerRef.current;
        const distance = Math.hypot(x - previous.x, y - previous.y);
        const elapsed = Math.max(now - previous.time, 16);
        const intensity = Math.min(distance / elapsed * 18, 1);

        gateRef.current.style.setProperty("--cursor-x", `${x}%`);
        gateRef.current.style.setProperty("--cursor-y", `${y}%`);
        gateRef.current.style.setProperty("--cursor-drift-x", `${(x - 50) * 0.18}px`);
        gateRef.current.style.setProperty("--cursor-drift-y", `${(y - 50) * 0.18}px`);
        gateRef.current.style.setProperty("--glitch-intensity", intensity.toFixed(2));
        gateRef.current.style.setProperty("--glitch-shift", `${(intensity * 16).toFixed(1)}px`);

        if (previous.timeout) window.clearTimeout(previous.timeout);
        pointerRef.current = {
            x,
            y,
            time: now,
            timeout: window.setTimeout(() => {
                if (gateRef.current) {
                    gateRef.current.style.setProperty("--glitch-intensity", "0");
                    gateRef.current.style.setProperty("--glitch-shift", "0px");
                }
            }, 140),
        };
    };

    return (
        <div
            ref={gateRef}
            className="password-gate"
            onMouseMove={handlePointerMove}
        >
            <Canvas
                className="password-canvas"
                camera={{ position: [0, 0, 25] }}
            >
                <hemisphereLight intensity={0.7} groundColor="#555" />
                <pointLight position={[50, 0, 0]} intensity={10} />
                <Animation3DEdge />
            </Canvas>
            <div className="password-grid" />
            <div className="password-glitch" />
            <div className="password-card">
                <div className="password-kicker">Portfolio access</div>
                <div className="logo bold pink password-brand">Isabella Wang</div>
                <h2 className="password-title">AI-fluent designer and systems thinker making complexity clear.</h2>

                <form onSubmit={handleSubmit} className="password-form">
                    <div className={`password-field ${focused ? "is-focused" : ""} ${floated ? "is-floated" : ""} ${error ? "has-error" : ""}`}>
                        <label className="password-label">
                            Enter password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError(false); }}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            autoFocus
                            className="password-input"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="password-toggle"
                        >
                            {showPassword ? "HIDE" : "SHOW"}
                        </button>
                    </div>
                    {error && (
                        <p className="password-error">
                            Incorrect password. Check what's written on the resume and try again.
                        </p>
                    )}
                    <button
                        type="submit"
                        className="password-submit"
                    >
                        Enter
                    </button>
                </form>
                <a
                    href="mailto:wangxbella0108@gmail.com"
                    className="password-contact"
                >
                    Email me for issues
                </a>
            </div>
        </div>
    );
}

export default PasswordGate;
