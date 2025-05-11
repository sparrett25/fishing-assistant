// src/components/Glossary.jsx
import React from "react";

const terms = [
  {
    word: "Bait",
    definition: "Something you put on your hook to attract fish. It can be worms, bugs, or pretend fish called lures."
  },
  {
    word: "Bobber",
    definition: "A float that sits on top of the water and moves when a fish bites."
  },
  {
    word: "Cast",
    definition: "Throwing your fishing line out into the water."
  },
  {
    word: "Lure",
    definition: "A fake fish or bug used to trick fish into biting."
  },
  {
    word: "Reel",
    definition: "The part of your rod that winds up the fishing line."
  },
  {
    word: "Rod",
    definition: "The long stick you use to cast and catch fish."
  },
  {
    word: "Hook",
    definition: "A small, sharp piece of metal that catches the fish."
  },
  {
    word: "Catch and release",
    definition: "When you catch a fish and gently put it back in the water so it can grow bigger."
  },
  {
    word: "Shore",
    definition: "The edge of the lake or pond where you stand to fish."
  },
  {
    word: "Tackle box",
    definition: "A box where you keep your fishing gear like hooks, lures, and bobbers."
  },
];

export default function Glossary() {
  return (
    <div>
      <h2>📖 Fishing Glossary</h2>
      <section style={{ background: "#fffde7", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {terms.map((term, idx) => (
            <li key={idx} style={{ marginBottom: "1rem" }}>
              <strong>{term.word}:</strong> {term.definition}
            </li>
          ))}
        </ul>
        <p style={{ fontStyle: "italic", color: "#888" }}>
          If you see a word you don't know while fishing, check here!
        </p>
      </section>
    </div>
  );
}
