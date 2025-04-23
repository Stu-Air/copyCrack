import React from "react";
import { useEffect, useState } from "react";
import "./MicrocopyGenerator.css";

export default function MicrocopyGenerator() {
  const [category, setCategory] = useState("button");
  const [tone, setTone] = useState("friendly");
  const [microcopyData, setMicrocopyData] = useState(null);

  useEffect(() => {
    // Dynamically import the JSON file
    import("../data/microcopy.json")
      .then((module) => {
        setMicrocopyData(module.default); // Vite uses "default" export for JSON
      })
      .catch((err) => console.error("Error loading microcopy data:", err));
  }, []);

  if (!microcopyData) {
    return <div>Loading...</div>;
  }

  const options = microcopyData?.[category]?.[tone] || [];

  return (
    <div className="generator">
      <h4 className="generator-title">
        <img src="src/assets/logoLong.png"></img>
        'dangerously good microcopy'
      </h4>

      <div className="generator-controls">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(microcopyData).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          {Object.keys(microcopyData[category]).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <ul className="generator-list">
        {options.map((line, i) => (
          <li key={i} className="generator-item">
            <span className="text">{line}</span>
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(line)}
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
