import React from "react";

export default function HistoryTable({ urls }) {
  if (!urls.length) return null;

  return (
    <div className="history">
      <h3 className="history-title">Recent Links</h3>
      <div className="table-wrapper">
        <table className="url-table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((u) => (
              <tr key={u.shortCode}>
                <td>
                  <a href={u.shortUrl} target="_blank" rel="noreferrer">
                    {u.shortUrl}
                  </a>
                </td>
                <td className="truncate" title={u.originalUrl}>
                  {u.originalUrl}
                </td>
                <td className="clicks">{u.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
