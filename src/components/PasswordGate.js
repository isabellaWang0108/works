import React, { useState } from "react";

const CORRECT_PASSWORD = "HelloWorld";
const SESSION_KEY = "portfolio_auth";

function PasswordGate({ children }) {
    const [authenticated, setAuthenticated] = useState(
        () => sessionStorage.getItem(SESSION_KEY) === "true"
    );
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === CORRECT_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "true");
            setAuthenticated(true);
        } else {
            setError(true);
            setInput("");
        }
    };

    if (authenticated) return children;

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            backgroundColor: "#171717",
        }}>
            <div style={{ textAlign: "center", maxWidth: 360, width: "90%" }}>
                <h2 style={{ color: "white", marginBottom: 8 }}>I'm an AI-fluent designer and systems thinker who makes complexity clear.</h2>
                <p style={{ color: "#aaa", marginBottom: 32 }}>Enter the password to view this portfolio.</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                        type="password"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError(false); }}
                        placeholder="Password"
                        autoFocus
                        style={{
                            padding: "12px 16px",
                            fontSize: 16,
                            border: error ? "1px solid #e05c5c" : "1px solid #444",
                            borderRadius: 8,
                            backgroundColor: "#2a2a2a",
                            color: "white",
                            outline: "none",
                        }}
                    />
                    {error && (
                        <p style={{ color: "#e05c5c", margin: 0, fontSize: 14 }}>
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
                            color: "white",
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
