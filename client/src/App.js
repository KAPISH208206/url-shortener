import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import ResultCard from "./components/ResultCard";
import HistoryTable from "./components/HistoryTable";
import { getAllUrls } from "./utils/api";
import "./App.css";

export default function App() {
  const [latestResult, setLatestResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const { data } = await getAllUrls();
      setHistory(data);
    } catch {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSuccess = (data) => {
    setLatestResult(data);
    fetchHistory();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">⚡ Snip</div>
        <p className="tagline">Shorten any URL in one click</p>
      </header>

      <main className="main">
        <UrlForm onSuccess={handleSuccess} />
        {latestResult && <ResultCard data={latestResult} />}
        <HistoryTable urls={history} />
      </main>
    </div>
  );
}
