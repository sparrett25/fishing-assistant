// src/components/TemperaturePage.jsx
import React from "react";
import fishData from "../data/fishData.json";

// Example: selectedTemperature could be a number (°F)
export default function TemperaturePage({
  selectedSpecies = "largemouth_bass",
  selectedTemperature = 70
}) {
  const speciesObj = fishData[selectedSpecies];

  // Find strategies for this temperature (within +/- 2°F)
  const strategies = (speciesObj?.strategies || []).filter(
    strat =>
      strat.conditions &&
      typeof strat.conditions.temperature === "number" &&
      Math.abs(strat.conditions.temperature - selectedTemperature) <= 2
  );

  return (
    <div>
      <h2>Temperature Tips for {speciesObj ? speciesObj.name : "Unknown Species"}</h2>
      <p>Current Water Temperature: <strong>{selectedTemperature}&deg;F</strong></p>
      {strategies.length > 0 ? (
        <ul>
          {strategies.map((strat, i) => (
            <li key={i}>{strat.description}</li>
          ))}
        </ul>
      ) : (
        <p>
          No special tips for this temperature in the database.<br />
          When the water is cold, fish slow and deep. When it's warm, try topwater lures and fish early or late!
        </p>
      )}

      <section style={{ background: "#e8f5e9", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
        <h3>🌡️ Why Does Water Temperature Matter?</h3>
        <p>
          Fish are cold-blooded, so their bodies change with the water temperature. When it's cold, they slow down. When it's warm, they're more active!
        </p>
        <h3>🎣 Quick Tips:</h3>
        <ul>
          <li>In cold water, use slow-moving lures near the bottom.</li>
          <li>In warm water, fish might bite faster lures and topwater baits.</li>
        </ul>
      </section>
    </div>
  );
}
