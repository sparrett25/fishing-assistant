// src/App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import LunarPage from "./components/LunarPage";
import WeatherPage from "./components/WeatherPage";
import TemperaturePage from "./components/TemperaturePage";
import SeasonPage from "./components/SeasonPage";
import SpeciesSelector from "./components/SpeciesSelector";
import Fishing101 from "./components/Fishing101";
import Glossary from "./components/Glossary";
import Quiz from "./components/Quiz";
import FishingJournal from "./components/FishingJournal";
import TackleBox from "./components/TackleBox";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedSpecies, setSelectedSpecies] = useState("largemouth_bass");
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [selectedLocation, setSelectedLocation] = useState("river");

  // You can replace these with actual API results if you have them!
  const [selectedWeather, setSelectedWeather] = useState("Sunny");
  const [selectedTemperature, setSelectedTemperature] = useState(72);

  // Handler for species/date/location selection
  const handleSpeciesApply = (species, date, location) => {
    setSelectedSpecies(species);
    setSelectedDate(date);
    setSelectedLocation(location);
    setCurrentPage("dashboard");
  };

  return (
    <div>
      <header>
        <h1 style={{
          textAlign: "center",
          background: "#007acc",
          color: "white",
          margin: 0,
          padding: "1rem 0"
        }}>
          Fishing Assistant
        </h1>
        <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />
      </header>
      <main style={{ maxWidth: 600, margin: "1rem auto", padding: "1rem" }}>
        {currentPage === "dashboard" && (
          <Dashboard
            selectedSpecies={selectedSpecies}
            selectedDate={selectedDate}
            selectedLocation={selectedLocation}
          />
        )}
        {currentPage === "lunar" && (
          <LunarPage
            selectedSpecies={selectedSpecies}
            selectedDate={selectedDate}
          />
        )}
        {currentPage === "weather" && (
          <WeatherPage
            selectedSpecies={selectedSpecies}
            selectedWeather={selectedWeather}
          />
        )}
        {currentPage === "temperature" && (
          <TemperaturePage
            selectedSpecies={selectedSpecies}
            selectedTemperature={selectedTemperature}
          />
        )}
        {currentPage === "season" && (
          <SeasonPage
            selectedSpecies={selectedSpecies}
            selectedDate={selectedDate}
          />
        )}
        {currentPage === "species" && (
          <SpeciesSelector
            selectedSpecies={selectedSpecies}
            selectedDate={selectedDate}
            selectedLocation={selectedLocation}
            onApply={handleSpeciesApply}
          />
        )}
        {currentPage === "fishing101" && <Fishing101 />}
        {currentPage === "glossary" && <Glossary />}
        {currentPage === "quiz" && <Quiz />}
        {currentPage === "journal" && <FishingJournal />}
        {currentPage === "tacklebox" && (
          <TackleBox
            species={selectedSpecies}
            location={selectedLocation}
          />
        )}
      </main>
    </div>
  );
}
