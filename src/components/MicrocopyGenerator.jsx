import React from "react";
import { useEffect, useState } from "react";
import "./MicrocopyGenerator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

export default function MicrocopyGenerator() {
  const [isChecked, setIsChecked] = useState(false);
  const [category, setCategory] = useState("button");
  const [tone, setTone] = useState("friendly");
  const [microcopyData, setMicrocopyData] = useState(null);

  useEffect(() => {
    // Dynamically import the JSON file
    import("../data/microcopy.json")
      .then((module) => {
        setMicrocopyData(module.default);
      })
      .catch((err) => console.error("Error loading microcopy data:", err));
  }, []);

  if (!microcopyData) {
    return <div>Loading...</div>;
  }

  const options = microcopyData?.[category]?.[tone] || [];

  //   <FontAwesomeIcon icon={fasStar} />
  //   <FontAwesomeIcon icon={farStar} />

  function copied() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  if (isChecked) {
    document.querySelector("body").style.cssText = "background:#fff";
    document.querySelector(":root").style.cssText = "--text:#000";
  } else {
    document.querySelector("body").style.cssText = "background:#21262e";
    document.querySelector(":root").style.cssText = "--text:#fff";
  }

  return (
    <div className="generator">
      <div>
        <label
          class="switch"
          for="switch"
          checked={isChecked}
          onChange={handleOnChange}
        >
          <input id="switch" type="checkbox" class="circle" />
          <svg
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
            class="moon svg"
          >
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
          </svg>
          <div class="sun svg">
            <span class="dot"></span>
          </div>
        </label>
      </div>

      <h4 className="generator-title">
        <img src={require("../assets/logoLong.png")} />
        Dangerously Good Microcopy{" "}
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
            <div id="snackbar">Woohoo you got it!!</div>
            <span className="text">{line}</span>
            <div className="btns">
              <button
                className="copy-button"
                onClick={() => {
                  navigator.clipboard.writeText(line);
                  copied();
                }}
              >
                Gimme
              </button>
              <a>
                <FontAwesomeIcon icon={farStar} />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
