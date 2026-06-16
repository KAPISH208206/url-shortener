import React, { useState } from "react";
import { shortenUrl } from "../utils/api";

export default function UrlForm({ onSuccess }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!input.trim()) return setError("Please enter a URL.");

    setLoading(true);
    try {
      const { data } = await shortenUrl(input.trim());
      onSuccess(data);
      setInput("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-row">
        <input
          type="text"
          className="url-input"
          placeholder="Paste your long URL here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className="shorten-btn" type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </div>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}
