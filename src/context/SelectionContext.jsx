import React, { createContext, useContext, useState } from "react";

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  // Default values can be whatever you want
  const [species, setSpecies] = useState("largemouth_bass");
  const [location, setLocation] = useState("pond");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const value = {
    species, setSpecies,
    location, setLocation,
    date, setDate,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

// Custom hook for easy access
export function useSelection() {
  return useContext(SelectionContext);
}
