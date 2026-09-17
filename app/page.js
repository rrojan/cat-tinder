"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import MatchOverlay from "../components/MatchOverlay";
import MatchesSheet from "../components/MatchesSheet";
import { Flame, Chat, Cross, Star, Heart } from "../components/icons";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState(null);
  const [leaving, setLeaving] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/cats");
    setCats(await response.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function swipe(direction) {
    const cat = cats[0];
    if (!cat || leaving) return;
    setLeaving({ id: cat.id, direction });

    // Ask the server while the card flies away.
    const asking = fetch("/api/swipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cat.id, direction }),
    }).then((response) => response.json());

    await new Promise((resolve) => setTimeout(resolve, 400));
    setCats((rest) => rest.slice(1));
    setLeaving(null);

    if ((await asking).match) {
      setMatches((all) => [...all, cat]);
      setMatch(cat);
    }
  }

  useEffect(() => {
    function onKey(event) {
      if (match || sheetOpen) return;
      if (event.key === "ArrowLeft") swipe("left");
      if (event.key === "ArrowRight") swipe("right");
      if (event.key === "ArrowUp") swipe("super");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <div className="app">
      <header className="top">
        <div className="logo">
          <Flame />
          <span>cat tinderrrrr</span>
        </div>
        <button
          type="button"
          className="matches-btn"
          onClick={() => setSheetOpen(true)}
          aria-label="Your matches"
        >
          <Chat />
          {matches.length > 0 && (
            <span className="badge">{matches.length}</span>
          )}
        </button>
      </header>

      <section className="deck">
        {cats.slice(0, 3).map((cat, index) => (
          <Card
            key={cat.id}
            cat={cat}
            index={index}
            leaving={leaving?.id === cat.id ? leaving.direction : null}
            onSwipe={swipe}
          />
        ))}
        {!loading && cats.length === 0 && (
          <div className="empty">
            <p>No more cats nearby</p>
            <button type="button" onClick={load}>
              Start over
            </button>
          </div>
        )}
      </section>

      <nav className="actions" aria-label="Swipe">
        <button
          type="button"
          className="action nope"
          onClick={() => swipe("left")}
          aria-label="Nope"
        >
          <Cross />
        </button>
        <button
          type="button"
          className="action super"
          onClick={() => swipe("super")}
          aria-label="Super like"
        >
          <Star />
        </button>
        <button
          type="button"
          className="action like"
          onClick={() => swipe("right")}
          aria-label="Like"
        >
          <Heart />
        </button>
      </nav>

      <MatchesSheet
        open={sheetOpen}
        matches={matches}
        onClose={() => setSheetOpen(false)}
      />
      <MatchOverlay cat={match} onClose={() => setMatch(null)} />
    </div>
  );
}
