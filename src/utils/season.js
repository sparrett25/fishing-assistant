// src/utils/season.js

// Determine the season for a given date (Northern Hemisphere)
export function getSeason(dateInput = new Date()) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Fall";
  return "Winter";
}

// Data for each season (expand as needed)
export const seasonData = {
  Spring: {
    lifecycle:
      "Spawning season; bass move shallow to lay eggs and guard nests. Aggressive behavior, especially from males.",
    hotspots: [
      "Shallow flats",
      "Sandy/gravel beds",
      "Vegetation edges",
      "Protected coves"
    ],
    strategies: [
      "Sight-fish for bedding bass using soft plastics.",
      "Use lizards, creature baits, and jigs near beds.",
      "Try topwater lures early and late in the day."
    ]
  },
  Summer: {
    lifecycle:
      "Post-spawn; bass seek shade or deeper, cooler water during heat. Feeding peaks at dawn and dusk.",
    hotspots: [
      "Deep drop-offs",
      "Shaded cover",
      "Creek channels",
      "Under docks"
    ],
    strategies: [
      "Fish early/late with topwater lures or buzzbaits.",
      "Use deep-diving crankbaits or Carolina rigs midday.",
      "Target shady spots and moving water."
    ]
  },
  Fall: {
    lifecycle:
      "Bass feed heavily to prepare for winter. Follow migrating baitfish into creeks and shallow coves.",
    hotspots: [
      "Creek mouths",
      "Points",
      "Shallow cover",
      "Wind-blown banks"
    ],
    strategies: [
      "Use moving baits like spinnerbaits and crankbaits.",
      "Follow schools of shad or minnows.",
      "Try jerkbaits and lipless cranks in open water."
    ]
  },
  Winter: {
    lifecycle:
      "Bass slow down, move deeper, and feed less actively. Seek out the warmest water available.",
    hotspots: [
      "Deep holes",
      "Ledges",
      "Warm inflows",
      "Sunny banks"
    ],
    strategies: [
      "Fish slow with jigs or soft plastics near bottom.",
      "Target sunny spots in afternoons.",
      "Use blade baits or spoons for suspended fish."
    ]
  }
};
