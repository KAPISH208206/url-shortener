import React, { useState } from "react";

export default function ResultCard({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // BUG FIX: navigator.clipboard.writeText is async; add error handling
    navigator.clipboard.writeText(data.shortUrl).catch(() => {
      // Fallback for non-HTTPS environments
      const el = document.createElement("textarea");
      el.value = data.shortUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="result-card">
      <div className="result-row">
        <div className="result-info">
          <span className="label">Short URL</span>
          <a href={data.shortUrl} target="_blank" rel="noreferrer" className="short-url">
            {data.shortUrl}
          </a>
        </div>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div className="original-url">
        <span className="label">Original</span>
        <span className="long-url">{data.originalUrl}</span>
      </div>
    </div>
  );
}
