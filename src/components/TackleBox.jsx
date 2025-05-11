// src/components/TackleBox.jsx
import React from "react";
import fishData from "../data/fishData.json";

function renderStars(score) {
  return (
    <>
      {"★".repeat(score)}
      {"☆".repeat(5 - score)}
    </>
  );
}

export default function TackleBox({ species = "largemouth_bass", location = "river" }) {
  const speciesObj = fishData[species];
  const gear = speciesObj?.locations?.[location];

  if (!gear) {
    return <div>No recommendations yet for this species and location.</div>;
  }

  return (
    <div>
      <h2>
        {speciesObj.name} - {location.charAt(0).toUpperCase() + location.slice(1)}
      </h2>
      {["rod", "reel", "line", "lure"].map(category => (
        <div key={category}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <ul>
            {gear[category]?.map((item, idx) => (
              <li key={idx}>
                <strong>{item.type}</strong> {renderStars(item.score)}
                <br />
                <em>{item.reason}</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <strong>Fun Fact:</strong> {speciesObj.fun_fact}
      </div>
    </div>
  );
}
