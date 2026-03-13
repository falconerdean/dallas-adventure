import { useState, useEffect, useRef, useMemo } from "react";

const stops = [
  {
    time: "10:50 AM",
    emoji: "🚗",
    riddle: "The adventure begins when the car arrives — leave the room behind, the day's alive. A chariot summoned from your phone, whisking you off to the great unknown.",
    hints: [
      "A stranger's carriage, summoned by sorcery in your pocket",
      "Forty winks of highway and the skyline unfolds like a pop-up book",
      "Step outside the tall glass tower where we slept — your chariot idles at the curb",
    ],
    answer: "Uber from Hyatt Regency Frisco → Downtown Dallas",
    description: "The day starts! We're grabbing an Uber at 10:50 AM and heading 40 minutes south to the West End in downtown Dallas.",
    vibe: "🌅 Fresh Start • Let's Roll",
    gradient: "linear-gradient(135deg, #2d1b69 0%, #4a2d8a 50%, #6b3fa0 100%)",
    accent: "#c4b5fd",
    icon: "🚙",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(196,181,253,0.03) 35px, rgba(196,181,253,0.03) 70px)",
  },
  {
    time: "11:30 AM",
    emoji: "🧳",
    riddle: "Before the fun begins, there's one quick stop — leave the weight behind, no bags to schlepp. Five minutes flat, then out the door — hands free to wander and explore.",
    hints: [
      "Think of a coat check — but for everything you own today",
      "A little shop of holding, tucked in the old warehouse district",
      "Rhymes with 'pounce' — five minutes and your arms are free as birds",
    ],
    answer: "Bounce Bag Drop — Travel Light!",
    description: "Quick pit stop at Bounce luggage storage in the West End. We drop 4 bags (2 suitcases + 2 backpacks, pre-paid), they keep them safe all day, and we pick them up later. Hands free from here on out!",
    vibe: "✨ Light • Free • Easy",
    gradient: "linear-gradient(135deg, #1a3a2a 0%, #2d5a3f 50%, #3d7a5f 100%)",
    accent: "#6ee7b7",
    icon: "📦",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(110,231,183,0.03) 35px, rgba(110,231,183,0.03) 70px)",
  },
  {
    time: "11:45 AM",
    emoji: "🌶️",
    riddle: "Not Tex-Mex, not tacos from a truck — but something deeper, ancient, and full of luck. Think mole that simmers for days on end, and hand-ground corn from a tradition that won't bend.",
    hints: [
      "Forget the border — this kitchen dreams of mountains, jungles, and ancient stone pyramids",
      "Chocolate sneaks into the main course here, simmered low and slow with chilies and secrets",
      "A Mesoamerican goddess lends her name to this place — and the patio margaritas are mandatory",
    ],
    answer: "Authentic Interior Mexican Lunch",
    description: "Meso Maya Downtown, 1611 McKinney Ave — Resy reservation for 2 in the Dining Room. Mole, margaritas, patio if weather's nice. About 75 minutes to savor it all.",
    vibe: "🍽️ Flavors • Patio • Margaritas",
    gradient: "linear-gradient(135deg, #4a1942 0%, #6b2d5b 50%, #c94277 100%)",
    accent: "#f4a261",
    icon: "🌮",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(244,162,97,0.03) 35px, rgba(244,162,97,0.03) 70px)",
  },
  {
    time: "1:00 PM",
    emoji: "🪟",
    riddle: "Behind a window on the sixth floor, history took a turn no one could ignore. A building of books hid a darker tale — with an audio guide to tell every detail.",
    hints: [
      "A warehouse of knowledge with one window the whole world knows by heart",
      "Voices in your ears will walk you through what happened — take your time, it's worth it",
      "Count the floors from the sidewalk. Stop at the one that changed a century.",
    ],
    answer: "The Sixth Floor Museum",
    description: "Audio guide, walk through the exhibits, see the sniper's perch. About 75 minutes — it's worth taking your time.",
    vibe: "🎧 Audio Guide • History • Must-See",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #1e2d4a 50%, #243b5e 100%)",
    accent: "#f472b6",
    icon: "🏛️",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(244,114,182,0.03) 35px, rgba(244,114,182,0.03) 70px)",
  },
  {
    time: "2:15 PM",
    emoji: "🔍",
    riddle: "Two marks on the road where the world stood still, a grassy rise where theories spill. An open memorial with no roof or wall — where a nation remembers the day that changed it all.",
    hints: [
      "A president waved, a clock stopped, and the world has argued about it ever since",
      "Someone painted two pale letters on the pavement — and tourists still stand on them",
      "A small hill with a picket fence that launched a thousand conspiracy theories",
    ],
    answer: "Dealey Plaza, Grassy Knoll & JFK Memorial",
    description: "Walk the plaza where history unfolded. Find the X marks on Elm Street, stand on the Grassy Knoll — it hits harder after the museum exhibit. About 20–30 minutes to take it all in.",
    vibe: "🏛️ History • Reflection • Iconic",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    accent: "#e94560",
    icon: "📍",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(233,69,96,0.03) 35px, rgba(233,69,96,0.03) 70px)",
  },
  {
    time: "2:45 PM",
    emoji: "🌸",
    riddle: "Sixty-six acres where the earth paints itself in every color spring can dream. Thousands of petals open their eyes when the Texas sun begins to gleam.",
    hints: [
      "Every March, the earth throws a costume party and half a million flowers show up overdressed",
      "A lake watches quietly from the edge while you wander paths that smell like perfume",
      "Sixty-six acres of living confetti — the azaleas are the headliners this week",
    ],
    answer: "Dallas Arboretum & Botanical Garden",
    description: "Dallas Blooms! Buy tickets at the gate. 500,000+ spring blooms, azaleas nearing peak, and stunning views over White Rock Lake. About 75 minutes to wander bag-free.",
    vibe: "🌷 Nature • Beauty • Wandering",
    gradient: "linear-gradient(135deg, #184e3a 0%, #2d6a4f 50%, #40916c 100%)",
    accent: "#95d5b2",
    icon: "🌺",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(149,213,178,0.03) 35px, rgba(149,213,178,0.03) 70px)",
  },
  {
    time: "4:00 PM",
    emoji: "🎒",
    riddle: "Retrace your steps to where the day began — grab what you left and catch a van. The adventure's not done, but the bags come along — next stop: the airport where we belong.",
    hints: [
      "Remember that little shop of holding? It's been babysitting all day — time to collect",
      "Reverse the morning's journey, back to the old brick streets where we started",
      "Bags reunited, then one last ride — toward the place where the ground becomes sky",
    ],
    answer: "Bag Pickup → Uber to DFW",
    description: "Uber back to West End, pick up bags from Bounce, then a ~25-minute ride to DFW. The adventure's not over yet!",
    vibe: "🚕 Homeward Bound • One More Stop",
    gradient: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
    accent: "#94a3b8",
    icon: "🧳",
    bgPattern: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(148,163,184,0.03) 35px, rgba(148,163,184,0.03) 70px)",
  },
  {
    time: "4:45 PM",
    emoji: "🍸",
    riddle: "A card of gold unlocks a hidden door — where weary travelers rest and spirits pour. Brand new walls that no one's seen, a sanctuary wrapped in black and green.",
    hints: [
      "Flash a particular piece of plastic and a velvet rope parts like magic",
      "The paint is barely dry — this sanctuary just opened its doors to the weary",
      "A Roman warrior stands guard near gate D12, and the cocktails inside are dangerously good",
    ],
    answer: "The Centurion Lounge at DFW",
    description: "AMEX Centurion Lounge, Terminal D — Platinum card gets you in. Craft cocktails, chef-curated bites, and ~90 minutes to decompress after a full day. We've earned this one.",
    vibe: "🛋️ Relax • Cocktails • Recharge",
    gradient: "linear-gradient(135deg, #1b2838 0%, #2c3e6b 50%, #4a69a8 100%)",
    accent: "#ffd166",
    icon: "🥂",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,209,102,0.03) 35px, rgba(255,209,102,0.03) 70px)",
  },
  {
    time: "7:05 PM",
    emoji: "✈️",
    riddle: "Terminal Echo, gate eleven — time to fly back through the evening heaven. The Skylink takes us back in style, then wheels up in just a little while.",
    hints: [
      "A little robot train whisks you between kingdoms named after letters of the alphabet",
      "The fifth letter, the eleventh gate — your magic carpet has a seat number",
      "Three digits and two letters carry us home to the land of rain, evergreens, and coffee",
    ],
    answer: "Board AS 317 → Seattle! 🌲",
    description: "Skylink back to Terminal E, board AS 317 at Gate E11, and we're homeward bound. One last Texas sunset from 35,000 feet to cap off a perfect Dallas day.",
    vibe: "🌅 Sunset • Homeward • Memories",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #4a2d7a 100%)",
    accent: "#a78bfa",
    icon: "🛫",
    bgPattern: "repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(167,139,250,0.03) 35px, rgba(167,139,250,0.03) 70px)",
  },
];

// — Time-gate utilities —
const CDT_OFFSET = 5; // CDT = UTC−5 (DST active March 13, 2026)

function stopTimeToDate(timeStr) {
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let h = hours;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return new Date(Date.UTC(2026, 2, 13, h + CDT_OFFSET, minutes, 0));
}

const ADVENTURE_START = stopTimeToDate("10:50 AM");
const GATE_OPEN = new Date(ADVENTURE_START.getTime() - 60 * 60 * 1000);

function formatCountdown(ms) {
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (d > 0) return `${d}d ${pad(h)}h ${pad(m)}m ${pad(sec)}s`;
  if (h > 0) return `${pad(h)}:${pad(m)}:${pad(sec)}`;
  return `${pad(m)}:${pad(sec)}`;
}

function useAdmin() {
  return new URLSearchParams(window.location.search).get("admin") === "true";
}

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

function StopCard({ stop, index, extraRevealContent }) {
  const cardKey = `card-${stop.time}`;
  const saved = loadState()[cardKey];
  const [phase, setPhase] = useState(saved?.phase || "sealed");
  const [currentHint, setCurrentHint] = useState(saved?.hint || 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef(null);

  const persistCard = (p, h) => saveState({ [cardKey]: { phase: p, hint: h } });

  const handleClick = () => {
    if (phase === "sealed") {
      setPhase("hints");
      persistCard("hints", 0);
    } else if (phase === "hints") {
      if (currentHint < stop.hints.length - 1) {
        const next = currentHint + 1;
        setCurrentHint(next);
        persistCard("hints", next);
      } else {
        setPhase("revealed");
        persistCard("revealed", currentHint);
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
          <div style={{ animation: "revealBurst 0.6s ease-out", textAlign: "center" }}>
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
            {extraRevealContent}
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

const STORAGE_KEY = "dallas-adventure";

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function saveState(update) {
  try {
    const current = loadState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...update }));
  } catch {}
}

export default function App() {
  const [started, setStarted] = useState(() => loadState().started || false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const admin = useAdmin();

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started) {
      setTimeout(() => setTitleVisible(true), 300);
    }
  }, [started]);

  // Memoize star positions so they don't flicker on re-render
  const stars = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0.3 + Math.random() * 0.5,
        delay: Math.random() * 3,
      })),
    [],
  );

  const lastCardRef = useRef(null);
  const prevVisibleCount = useRef(0);

  const gateOpen = admin || now >= GATE_OPEN;
  const msUntilAdventure = ADVENTURE_START.getTime() - now.getTime();
  function getRevealDate(stop) {
    if (stop.revealAt) return stopTimeToDate(stop.revealAt);
    return new Date(stopTimeToDate(stop.time).getTime() - 60 * 60 * 1000);
  }

  const visibleStops = admin
    ? stops
    : stops.filter((stop) => now >= getRevealDate(stop));

  const nextStop = !admin && visibleStops.length < stops.length
    ? stops[visibleStops.length]
    : null;
  const msUntilNextStop = nextStop
    ? getRevealDate(nextStop).getTime() - now.getTime()
    : null;

  const hasScrolledOnLoad = useRef(false);

  useEffect(() => {
    if (started && visibleStops.length > prevVisibleCount.current && prevVisibleCount.current > 0) {
      setTimeout(() => {
        lastCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
    prevVisibleCount.current = visibleStops.length;
  }, [visibleStops.length, started]);

  useEffect(() => {
    if (started && !hasScrolledOnLoad.current && visibleStops.length > 1) {
      hasScrolledOnLoad.current = true;
      setTimeout(() => {
        lastCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 600);
    }
  }, [started, visibleStops.length]);

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
          cursor: gateOpen ? "pointer" : "default",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={() => { if (gateOpen) { setStarted(true); saveState({ started: true }); } }}
      >
        {/* Background stars */}
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "#fff",
              borderRadius: "50%",
              left: star.left,
              top: star.top,
              opacity: star.opacity,
              animation: `sparkle 3s ease-in-out ${star.delay}s infinite`,
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
        <p style={{ color: "#f4a261", fontSize: "16px", margin: "0 0 4px 0", fontStyle: "italic" }}>
          Pack your bags for a whimsical pre-flight day in Dallas
        </p>
        <p style={{ color: "#8892b0", fontSize: "15px", margin: "0 0 32px 0" }}>
          Friday, March 13, 2026
        </p>

        {/* Master riddle */}
        <div
          style={{
            maxWidth: "380px",
            margin: "0 auto 32px",
            padding: "24px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,209,102,0.15)",
          }}
        >
          <p
            style={{
              color: "#8892b0",
              fontSize: "14px",
              lineHeight: 1.9,
              fontStyle: "italic",
              margin: 0,
            }}
          >
            A day in nine acts beneath the Lone Star:
            <br />
            Leave your burdens with strangers — you'll travel far.
            <br />
            Peer through the window where two timelines meet,
            <br />
            then walk where a nation's heart cracked in the street.
            <br />
            Feast where gods stirred chocolate into fire,
            <br />
            wade through a sea of petals dressed for a ball,
            <br />
            then flash something golden to enter the hall.
            <br />
            When the sun paints the sky, a silver bird calls —
            <br />
            nine secrets, nine riddles, nine curtains that fall.
          </p>
        </div>

        {/* Free start — first clue */}
        <div
          style={{
            maxWidth: "380px",
            width: "100%",
            margin: "0 auto 32px",
            textAlign: "left",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          <p
            style={{
              color: "#ffd166",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              textAlign: "center",
              margin: "0 0 12px 0",
            }}
          >
            ✦ Your first clue — free! ✦
          </p>
          <StopCard
            stop={stops[0]}
            index={0}
            extraRevealContent={
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#ffd166",
                    fontSize: "15px",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  Sit back, relax, and watch the skyline grow closer.
                </p>
              </div>
            }
          />
        </div>

        {/* Countdown */}
        {msUntilAdventure > 0 && (
          <div style={{ margin: "0 0 28px 0" }}>
            <p
              style={{
                color: "#4a5568",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0 0 8px 0",
              }}
            >
              Adventure begins in
            </p>
            <p
              style={{
                color: "#ffd166",
                fontSize: "clamp(28px, 6vw, 40px)",
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "2px",
              }}
            >
              {formatCountdown(msUntilAdventure)}
            </p>
          </div>
        )}

        {gateOpen ? (
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
        ) : (
          <div
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: "30px",
              border: "2px solid #4a5568",
              color: "#4a5568",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            🔒 Not Yet...
          </div>
        )}

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
          {visibleStops.map((stop, i) => (
            <div
              key={i}
              ref={i === visibleStops.length - 1 ? lastCardRef : undefined}
              style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
            >
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
          {!admin && visibleStops.length < stops.length && (
            <div
              style={{
                textAlign: "center",
                padding: "32px 16px",
              }}
            >
              <p style={{ color: "#4a5568", fontSize: "14px", fontStyle: "italic", animation: "pulse 3s ease-in-out infinite" }}>
                ✨ More stops will appear as the day unfolds...
              </p>
              {msUntilNextStop != null && msUntilNextStop > 0 && (
                <p
                  style={{
                    color: "#ffd166",
                    fontSize: "clamp(18px, 4vw, 24px)",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 700,
                    margin: "12px 0 0 0",
                    letterSpacing: "2px",
                  }}
                >
                  {formatCountdown(msUntilNextStop)}
                </p>
              )}
            </div>
          )}
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
