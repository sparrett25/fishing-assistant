// src/components/Dashboard.jsx
import React from "react";
import { getSeason, seasonData } from "../utils/season";
import { getWeatherData } from "../utils/weather";
import { getTemperatureData } from "../utils/temperature";
import { getLunarPhase, getLunarPhaseEmoji } from "../utils/lunar";
import { findBestStrategies } from "../utils/strategy";
import TackleBox from "./TackleBox";

// Example fishData object (expand as needed)
const fishData = {
  bass: {
    name: "Largemouth Bass",
    strategies: [
      {
        description: "Try topwater lures at dawn during the full moon.",
        conditions: { lunar_phase: "Full Moon", time: "05:00-09:00" }
      },
      {
        description: "Fish deep structure with jigs in hot summer afternoons.",
        conditions: { season: "Summer", temperature: 82, time: "12:00-16:00" }
      },
      {
        description: "Use spinnerbaits near vegetation on cloudy spring days.",
        conditions: { season: "Spring", weather: "Partly Cloudy" }
      }
      // Add more strategies as needed
    ]
  }
  // Add more species as needed
};

export default function Dashboard({
  selectedSpecies = "bass",
  selectedDate,
  selectedLocation = "river"
}) {
  // Ensure date is a Date object
  const dateStr = selectedDate || new Date().toISOString().slice(0, 10);
  const jsDate = typeof dateStr === "string" ? new Date(dateStr) : dateStr;

  // Get season, lunar, weather, temp data
  const season = getSeason(jsDate);
  const lunarPhase = getLunarPhase(jsDate);
  const lunarEmoji = getLunarPhaseEmoji(jsDate);
  const weather = getWeatherData({ date: jsDate });
  const temp = getTemperatureData({ date: jsDate });

  // Find best strategies for this species and these conditions
  const speciesObj = fishData[selectedSpecies] || fishData["bass"];
  const bestStrategies = findBestStrategies(speciesObj.strategies, {
    season,
    weather: weather.current,
    lunar_phase: lunarPhase,
    temperature: temp.currentWater,
    // You can add time of day or other factors here
  });

  return (
    <div>
      <h2>Fishing Dashboard</h2>
      <div>
        <strong>Species:</strong> {speciesObj.name}<br />
        <strong>Date:</strong> {dateStr}<br />
        <strong>Location:</strong> {selectedLocation.charAt(0).toUpperCase() + selectedLocation.slice(1)}<br />
        <strong>Season:</strong> {season}<br />
        <strong>Lunar Phase:</strong> {lunarPhase} <span style={{ fontSize: "1.5rem" }}>{lunarEmoji}</span><br />
        <strong>Weather:</strong> {weather.current}, {weather.temp}°F<br />
        <strong>Water Temp:</strong> {temp.currentWater}°F
      </div>
      <hr />
      <h3>Best Strategies</h3>
      {bestStrategies.length > 0 ? (
        <ul>
          {bestStrategies.slice(0, 3).map((s, idx) => (
            <li key={idx}>{s.strategy.description}</li>
          ))}
        </ul>
      ) : (
        <p>No specific strategies match these conditions. Try general seasonal tactics.</p>
      )}
      <hr />
      <h3>Seasonal Pattern</h3>
      <p>{seasonData[season]?.lifecycle}</p>
      <ul>
        {seasonData[season]?.strategies.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
      <hr />
      {/* --- Tackle Box Quick Reference --- */}
      <TackleBox species={selectedSpecies} location={selectedLocation} />
      {/* --- End Tackle Box --- */}
      {/* --- Kid-friendly educational section can go here --- */}
    </div>
  );
}
