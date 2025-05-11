// src/components/SeasonPage.jsx
import React from "react";
import fishData from "../data/fishData.json";

// Utility: Get season from date (Northern Hemisphere)
function getSeason(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Fall";
  return "Winter";
}

export default function SeasonPage({ selectedSpecies = "largemouth_bass", selectedDate }) {
  const date = selectedDate || new Date().toISOString().slice(0, 10);
  const season = getSeason(date);

  // Get species object from fishData
  const speciesObj = fishData[selectedSpecies];

  // Try to get season-specific data from fishData.json
  // Example structure in fishData.json:
  // "largemouth_bass": {
  //   "seasons": {
  //     "Spring": { lifecycle: "...", hotspots: [...], strategies: [...] },
  //     ...
  //   }
  // }
  const seasonInfo = speciesObj?.seasons?.[season];

  // Fallback if no season data for this species
  const hasData = !!seasonInfo;

  return (
    <div>
      <h2>Seasonal Patterns for {speciesObj ? speciesObj.name : "Unknown Species"}</h2>
      <div>
        <strong>Date:</strong> {date}<br />
        <strong>Current Season:</strong> {season}
      </div>
      <hr />

      {hasData ? (
        <>
          <h3>{speciesObj.name} Lifecycle</h3>
          <p>{seasonInfo.lifecycle}</p>
          <h3>Seasonal Hotspots</h3>
          <ul>
            {seasonInfo.hotspots.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
          <h3>Recommended Strategies</h3>
          <ul>
            {seasonInfo.strategies.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>No species-specific data for {season}.</h3>
          <p>
            Try fishing shallow in spring, deep and slow in winter, and follow baitfish in fall. 
            Use topwater lures early or late in summer.
          </p>
        </>
      )}

      <p style={{ fontSize: "0.9rem", color: "#888" }}>
        *Seasonal patterns are a key factor in fish location and behavior. Combine with lunar phase, weather, and temperature for best results.
      </p>

      <section style={{ background: "#fff3e0", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
        <h3>🍃 What is a Season?</h3>
        <p>
          There are four <strong>seasons</strong>: spring, summer, fall, and winter. Each season has different weather and water temperatures, and fish change their habits during each one.
        </p>
        <h3>🐟 Why Does It Matter for Fishing?</h3>
        <p>
          In spring, fish might lay eggs and stay close to the shore. In summer, they hide in cool, shady spots. In fall, they eat a lot to get ready for winter. In winter, they move slow and stay deep.
        </p>
        <h3>🎣 How Can You Use This?</h3>
        <ul>
          <li>In spring, look for fish in shallow water near plants.</li>
          <li>In summer, try fishing early or late in the day when it’s cooler.</li>
          <li>In fall, use lures that look like small fish or bugs.</li>
          <li>In winter, fish slow and deep-be patient!</li>
        </ul>
        <h3>💡 Did You Know?</h3>
        <p>
          Fish can “feel” the seasons change, even underwater!
        </p>
      </section>
    </div>
  );
}
