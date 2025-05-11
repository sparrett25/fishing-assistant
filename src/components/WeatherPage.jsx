// src/components/WeatherPage.jsx
import React from "react";
import fishData from "../data/fishData.json";

// Example: selectedWeather could be "Sunny", "Cloudy", "Rainy", etc.
export default function WeatherPage({
  selectedSpecies = "largemouth_bass",
  selectedWeather = "Sunny"
}) {
  const speciesObj = fishData[selectedSpecies];

  // Find strategies for this weather
  const strategies = (speciesObj?.strategies || []).filter(
    strat => strat.conditions && strat.conditions.weather === selectedWeather
  );

  return (
    <div>
      <h2>Weather Tips for {speciesObj ? speciesObj.name : "Unknown Species"}</h2>
      <p>Current Weather: <strong>{selectedWeather}</strong></p>
      {strategies.length > 0 ? (
        <ul>
          {strategies.map((strat, i) => (
            <li key={i}>{strat.description}</li>
          ))}
        </ul>
      ) : (
        <p>
          No special tips for this weather in the database.<br />
          Try using natural-colored lures on sunny days and bright or noisy lures when it's cloudy or rainy!
        </p>
      )}

      <section style={{ background: "#e3f2fd", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
        <h3>🌦️ Why Does Weather Matter?</h3>
        <p>
          Weather changes how fish behave. On cloudy days, fish might swim closer to the surface. On sunny days, they might hide in the shade or deeper water.
        </p>
        <h3>🎣 Quick Tips:</h3>
        <ul>
          <li>After rain, try fishing near where water flows into the lake or pond.</li>
          <li>On windy days, fish might chase food blown into the water.</li>
        </ul>
      </section>
    </div>
  );
}
