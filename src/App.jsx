import { useState, useEffect, useRef } from "react";

const stops = [
  {
    time: "9:00 AM",
    emoji: "🚗",
    riddle: "The adventure begins when the car arrives — leave the room behind, the day's alive. A chariot summoned from your phone, whisking you off to the great unknown.",
    hints: [
      "No rental car, no parking to find",
      "Just tap, wait, and ride",
      "Our Uber awaits at the hotel lobby",
    ],
    answer: "Uber from the Hotel — Let's Go!",
    description: "The day starts now! We're grabbing an Uber at 9 AM and heading straight into our Dallas adventure. No driving, no stress — just sit back and watch the city unfold.",
    vibe: "🌅 Fresh Start • Let's Roll",
    gradient: "linear-gradient(135deg, #2d1b69 0%, #4a2d8a 50%, #6b3fa0 100%)",
    accent: "#c4b5fd",
    icon: "🚙",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(196,181,253,0.03) 35px, rgba(196,181,253,0.03) 70px)",
  },
  {
    time: "Morning",
    emoji: "🔍",
    riddle: "Behind a window on the sixth floor, history took a turn no one could ignore. A building of books hid a darker tale — where a motorcade passed through a fateful trail.",
    hints: [
      "November 22, 1963",
      "A plaza named after a man who never became president",
      "The most famous window in Texas",
    ],
    answer: "The Sixth Floor Museum at Dealey Plaza",
    description: "We're stepping back in time to one of America's most pivotal moments. Walk the very streets where history unfolded.",
    vibe: "🏛️ History • Mystery • Reflection",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#e94560",
    icon: "🏛️",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(233,69,96,0.03) 35px, rgba(233,69,96,0.03) 70px)",
  },
  {
    time: "Midday",
    emoji: "🌶️",
    riddle: "Not Tex-Mex, not tacos from a truck — but something deeper, ancient, and full of luck. Think mole that simmers for days on end, and hand-ground corn from a tradition that won't bend.",
    hints: [
      "The cuisine comes from deep in Mexico's interior — Oaxaca, Puebla, Veracruz",
      "Cocoa in the sauce, but this isn't dessert",
      "Colorful, bold, and meant to be shared over margaritas",
    ],
    answer: "Authentic Interior Mexican Lunch",
    description: "We're having lunch at Meso Maya — where every dish is a love letter to the interior regions of Mexico. Expect hand-ground corn tortillas, mole that takes days to make, and the best margaritas in Dallas.",
    vibe: "🍽️ Flavors • Culture • Fiesta",
    gradient: "linear-gradient(135deg, #4a1942 0%, #6b2d5b 50%, #c94277 100%)",
    accent: "#f4a261",
    icon: "🌮",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(244,162,97,0.03) 35px, rgba(244,162,97,0.03) 70px)",
  },
  {
    time: "Afternoon",
    emoji: "🌸",
    riddle: "Sixty-six acres where the earth paints itself in every color spring can dream. Thousands of petals open their eyes when the Texas sun begins to gleam.",
    hints: [
      "It happens every March — a blooming spectacle",
      "A garden by the lake, but not just any garden",
      "Half a million tulips can't be wrong",
    ],
    answer: "Dallas Arboretum & Botanical Garden",
    description: "We're arriving during Dallas Blooms — the largest floral festival in the Southwest. Think endless fields of tulips, poppies, and colors you didn't know existed.",
    vibe: "🌷 Nature • Beauty • Wandering",
    gradient: "linear-gradient(135deg, #184e3a 0%, #2d6a4f 50%, #40916c 100%)",
    accent: "#95d5b2",
    icon: "🌺",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(149,213,178,0.03) 35px, rgba(149,213,178,0.03) 70px)",
  },
  {
    time: "Evening",
    emoji: "🍸",
    riddle: "A card of gold unlocks a hidden door — where weary travelers rest and spirits pour. Brand new walls that no one's seen, a sanctuary wrapped in black and green.",
    hints: [
      "A Roman soldier guards the entrance",
      "It just opened — we'll be among the first",
      "Terminal D, before we fly",
    ],
    answer: "The Centurion Lounge at DFW",
    description: "Time to unwind in the brand new AMEX Centurion Lounge. Craft cocktails, chef-curated bites, and a moment to relax after a full day of adventure — before we head home.",
    vibe: "🛋️ Relax • Cocktails • Recharge",
    gradient: "linear-gradient(135deg, #1b2838 0%, #2c3e6b 50%, #4a69a8 100%)",
    accent: "#ffd166",
    icon: "🥂",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,209,102,0.03) 35px, rgba(255,209,102,0.03) 70px)",
  },
];

function ConfettiPiece({ delay, color }) {
  const style = {
    position: "absolute",
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    backgroundColor: color,
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
    left: `${Math.random() * 100}%`,
    top: `-10px`,
    opacity: 0,
    transform: `rotate(${Math.random() * 360}deg)`,
    animation: `confettiFall 1.5s ease-out ${delay}s forwards`,
  };
  return <div style={style} />;
}

function Sparkle({ x, y, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "4px",
        height: "4px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        boxShadow: "0 0 6px 2px rgba(255,255,255,0.6)",
        opacity: 0,
        animation: `sparkle 2s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function StopCard({ stop, index }) {
  const [phase, setPhase] = useState("sealed"); // sealed, hints, revealed
  const [currentHint, setCurrentHint] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef(null);

  const handleClick = () => {
    if (phase === "sealed") {
      setPhase("hints");
    } else if (phase === "hints") {
      if (currentHint < stop.hints.length - 1) {
        setCurrentHint((prev) => prev + 1);
      } else {
        setPhase("revealed");
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }
  };

  const confettiColors = [stop.accent, "#fff", "#ffd166", "#ef476f", "#06d6a0", "#118ab2"];

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        padding: phase === "revealed" ? "0" : "2px",
        background: phase === "revealed" ? "transparent" : `linear-gradient(135deg, ${stop.accent}66, ${stop.accent}22)`,
        cursor: phase === "revealed" ? "default" : "pointer",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeSlideIn 0.8s ease-out ${index * 0.15}s both`,
      }}
    >
      {showConfetti && (
        <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none", overflow: "hidden" }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <ConfettiPiece key={i} delay={Math.random() * 0.5} color={confettiColors[i % confettiColors.length]} />
          ))}
        </div>
      )}

      <div
        style={{
          position: "relative",
          borderRadius: "18px",
          background: phase === "revealed" ? stop.gradient : "#1a1a2e",
          backgroundImage: phase !== "revealed" ? stop.bgPattern : "none",
          padding: "32px",
          minHeight: phase === "revealed" ? "280px" : "200px",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Time badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              display: "inline-block",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: stop.accent,
              border: `1px solid ${stop.accent}44`,
              backgroundColor: `${stop.accent}11`,
            }}
          >
            {stop.time}
          </span>
          <span style={{ fontSize: "32px", filter: phase === "sealed" ? "grayscale(1) opacity(0.3)" : "none", transition: "filter 0.5s" }}>
            {stop.icon}
          </span>
        </div>

        {/* Sealed state */}
        {phase === "sealed" && (
          <div style={{ animation: "fadeIn 0.5s ease-out" }}>
            <div
              style={{
                fontSize: "48px",
                textAlign: "center",
                marginBottom: "12px",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {stop.emoji}
            </div>
            <p
              style={{
                color: "#8892b0",
                fontSize: "16px",
                lineHeight: 1.7,
                fontStyle: "italic",
                textAlign: "center",
                margin: 0,
              }}
            >
              {stop.riddle}
            </p>
            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
                color: stop.accent,
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              ▸ Tap for hints ◂
            </div>
          </div>
        )}

        {/* Hints state */}
        {phase === "hints" && (
          <div style={{ animation: "fadeIn 0.4s ease-out" }}>
            <p
              style={{
                color: "#8892b0",
                fontSize: "15px",
                lineHeight: 1.7,
                fontStyle: "italic",
                textAlign: "center",
                margin: "0 0 20px 0",
                opacity: 0.7,
              }}
            >
              {stop.riddle}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {stop.hints.map((hint, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    backgroundColor: i <= currentHint ? `${stop.accent}15` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i <= currentHint ? `${stop.accent}33` : "rgba(255,255,255,0.05)"}`,
                    transition: "all 0.4s ease",
                    animation: i <= currentHint ? `hintReveal 0.5s ease-out ${i * 0.1}s both` : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      minWidth: "24px",
                      textAlign: "center",
                    }}
                  >
                    {i <= currentHint ? "💡" : "🔒"}
                  </span>
                  <span
                    style={{
                      color: i <= currentHint ? "#ccd6f6" : "#444",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      transition: "color 0.4s",
                    }}
                  >
                    {i <= currentHint ? hint : "???"}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "16px",
                color: stop.accent,
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              {currentHint < stop.hints.length - 1 ? "▸ Tap for next hint ◂" : "▸ Tap to reveal! ◂"}
            </div>
          </div>
        )}

        {/* Revealed state */}
        {phase === "revealed" && (
          <div style={{ animation: "revealBurst 0.6s ease-out" }}>
            <h2
              style={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: 700,
                margin: "0 0 4px 0",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {stop.answer}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "15px",
                lineHeight: 1.7,
                margin: "12px 0",
              }}
            >
              {stop.description}
            </p>
            <span
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              {stop.vibe}
            </span>
          </div>
        )}

        {/* Corner sparkles */}
        {phase === "hints" && (
          <>
            <Sparkle x="10%" y="15%" delay={0} />
            <Sparkle x="85%" y="80%" delay={0.7} />
            <Sparkle x="90%" y="20%" delay={1.4} />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    if (started) {
      setTimeout(() => setTitleVisible(true), 300);
    }
  }, [started]);

  if (!started) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "'Georgia', 'Times New Roman', serif",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={() => setStarted(true)}
      >
        {/* Background stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
              animation: `sparkle 3s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}

        <div style={{ animation: "float 4s ease-in-out infinite", fontSize: "64px", marginBottom: "24px" }}>
          🤠
        </div>
        <h1
          style={{
            color: "#ffd166",
            fontSize: "clamp(28px, 6vw, 42px)",
            fontWeight: 700,
            margin: "0 0 12px 0",
            letterSpacing: "2px",
          }}
        >
          Stefanie & Dean's
        </h1>
        <h2
          style={{
            color: "#ccd6f6",
            fontSize: "clamp(18px, 4vw, 24px)",
            fontWeight: 400,
            margin: "0 0 8px 0",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Mystery Day Trip
        </h2>
        <p style={{ color: "#8892b0", fontSize: "16px", margin: "0 0 40px 0" }}>
          Friday, March 13, 2026
        </p>
        <div
          style={{
            display: "inline-block",
            padding: "14px 36px",
            borderRadius: "30px",
            border: "2px solid #ffd166",
            color: "#ffd166",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            animation: "pulse 2s ease-in-out infinite",
            transition: "all 0.3s",
          }}
        >
          Tap to Begin ✦
        </div>
        <p style={{ color: "#4a5568", fontSize: "13px", marginTop: "32px", maxWidth: "280px", lineHeight: 1.6 }}>
          Each stop is a riddle. Tap to unlock hints. Tap again to reveal where we're going.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 30%, #0a0a1a 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "0 0 60px 0",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes hintReveal {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes revealBurst {
          0% { opacity: 0; transform: scale(0.8); }
          60% { transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(400px) rotate(720deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { height: 0; }
          to { height: 100%; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 20px 40px",
          animation: "slideDown 0.8s ease-out",
        }}
      >
        <p style={{ color: "#ffd166", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", margin: "0 0 8px 0" }}>
          Friday, March 13
        </p>
        <h1
          style={{
            color: "#ccd6f6",
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: 700,
            margin: "0 0 8px 0",
          }}
        >
          Your Mystery Itinerary 🗺️
        </h1>
        <p style={{ color: "#8892b0", fontSize: "14px", margin: 0 }}>
          Tap each card to unravel the riddle
        </p>
      </div>

      {/* Bag info */}
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto 24px",
          padding: "0 20px",
          animation: "fadeSlideIn 0.8s ease-out 0.3s both",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 18px",
            borderRadius: "14px",
            backgroundColor: "rgba(255,209,102,0.08)",
            border: "1px solid rgba(255,209,102,0.15)",
          }}
        >
          <span style={{ fontSize: "22px" }}>🧳</span>
          <p style={{ color: "#ccd6f6", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
            <strong style={{ color: "#ffd166" }}>Bags handled!</strong> We'll drop our luggage at the airport before heading out and pick it up on the way back. Travel light, explore free.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "32px",
            top: "0",
            bottom: "0",
            width: "2px",
            background: "linear-gradient(180deg, #ffd16644 0%, #e9456044 33%, #95d5b244 66%, #ffd16644 100%)",
            animation: "lineGrow 1.5s ease-out",
            transformOrigin: "top",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
          {stops.map((stop, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              {/* Timeline dot */}
              <div
                style={{
                  minWidth: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: stop.accent,
                  boxShadow: `0 0 12px ${stop.accent}66`,
                  marginTop: "32px",
                  position: "relative",
                  zIndex: 1,
                  animation: `fadeIn 0.5s ease-out ${i * 0.2 + 0.5}s both`,
                }}
              />
              {/* Card */}
              <div style={{ flex: 1 }}>
                <StopCard stop={stop} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "48px 20px 20px",
          animation: `fadeIn 1s ease-out 1s both`,
        }}
      >
        <p style={{ color: "#4a5568", fontSize: "13px", letterSpacing: "1px" }}>
          Made with ❤️ for our adventure
        </p>
      </div>
    </div>
  );
}
