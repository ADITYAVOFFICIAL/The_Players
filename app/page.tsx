"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Triangle, Circle, Square } from "lucide-react";
import confetti from "canvas-confetti";

const triggerFireworks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);

    // Pink confetti
    confetti({
      particleCount: particleCount / 2,
      spread: 360,
      startVelocity: 30,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ["#FF0676", "#FF1493", "#FF69B4"],
    });

    // Cyan confetti
    confetti({
      particleCount: particleCount / 2,
      spread: 360,
      startVelocity: 30,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ["#00F0FF", "#00BFFF", "#1E90FF"],
    });
  }, 250);
};

export default function Home() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showCountdown, setShowCountdown] = useState(false);
  const [showContestants, setShowContestants] = useState(false);
  const [showContestantButton, setShowContestantButton] = useState(true);

  const targetDate = new Date("2025-02-24T21:00:00");

  const bg1Ref = useRef<HTMLAudioElement>(null);
  const bg2Ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: any;
    if (showCountdown) {
      interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
          setIsRevealed(true);
          clearInterval(interval);
          triggerFireworks();
          if (bg1Ref.current) bg1Ref.current.pause();
          if (bg2Ref.current) bg2Ref.current.play();
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);

      if (bg1Ref.current) bg1Ref.current.play();
    }

    return () => clearInterval(interval);
  }, [showCountdown]);

  useEffect(() => {
    if (showContestants && bg2Ref.current) {
      bg2Ref.current.play();
    }
  }, [showContestants]);

  // Add an 'image' property to each officer with the correct file path
  const officers = [
    {
      position: "Chairperson",
      name: "Srijan Sarkar",
      symbol: "□",
      image: "./sri.jpeg", // <-- Replace with actual path
    },
    {
      position: "Vice-Chair",
      name: "Saakshi Pandey",
      symbol: "□",
      image: "./sak.jpeg", // <-- Replace with actual path
    },
    {
      position: "WebMaster",
      name: "Armaan Ranjan",
      symbol: "□",
      image: "https://srmsigkdd-cdn.netlify.app/images/ar.jpeg", // <-- Replace with actual path
    },
    {
      position: "Secretary",
      name: "Priyanshu Singh",
      symbol: "□",
      image: "./pr.jpeg", // <-- Replace with actual path
    },
    {
      position: "Membership Chair",
      name: "Aditya Singh",
      symbol: "□",
      image: "https://srmsigkdd-cdn.netlify.app/images/adi.jpeg", // <-- Replace with actual path
    },
    {
      position: "Treasurer",
      name: "Nilesh Kanti",
      symbol: "□",
      image: "https://srmsigkdd-cdn.netlify.app/images/nil.jpeg", // <-- Replace with actual path
    },
    {
      position: "R&D head",
      name: "Rishit Vats",
      symbol: "△",
      image: "./ri.jpeg", // <-- Replace with actual path
    },
    {
      position: "Web Development head",
      name: "Ishaan Goel",
      symbol: "△",
      image: "./is.jpeg", // <-- Replace with actual path
    },
    {
      position: "Sponsorship & Operations Head",
      name: "Harsh Singh",
      symbol: "△",
      image: "./har.jpeg", // <-- Replace with actual path
    },
    {
      position: "Editorial Head",
      name: "Ashmit Singh",
      symbol: "△",
      image: "", // <-- Replace with actual path
    },
    {
      position: "R&D lead",
      name: "Krishna Kesab Banik",
      symbol: "○",
      image: "./kri.jpeg", // <-- Replace with actual path
    },
    {
      position: "Sponsorship & Operations Lead",
      name: "Amogh Singh",
      symbol: "○",
      image: "./am.jpeg", // <-- Replace with actual path
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="geometric-pattern" />

      {/* Geometric Shapes */}
      <div className="geometric-shapes shape-circle absolute top-20 left-20" />
      <div className="geometric-shapes shape-triangle absolute top-40 right-40" />
      <div className="geometric-shapes shape-square absolute bottom-20 left-40" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <Triangle className="text-[#00F0FF] h-6 w-6" />
            <Circle className="text-[#FF0676] h-6 w-6" />
            <Square className="text-white h-6 w-6" />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#FF0676] text-3xl"
          >
            ≡
          </motion.button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-32">
        <AnimatePresence mode="wait">
          {!showCountdown ? (
            <motion.div
              key="start-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-screen"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-4xl text-[#FF0676] contestant-text"
                onClick={() => setShowCountdown(true)}
              >
                Let's Play
              </motion.button>
            </motion.div>
          ) : !isRevealed ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Countdown timer content */}
              <motion.h1
                className="text-7xl md:text-9xl font-bold mb-8 text-[#FF0676] tracking-[0.2em] contestant-text"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                READY TO PLAY?
              </motion.h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    className="countdown-container p-8 rounded-xl contestant-text"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-6xl font-bold text-[#00F0FF] neon-text">
                      {value.toString().padStart(2, "0")}
                    </div>
                    <div className="text-sm tracking-[0.2em] text-[#FF0676] mt-2">
                      {unit.toUpperCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selected-players"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {showContestantButton && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-4xl text-[#FF0676] contestant-text mt-16"
                  onClick={() => {
                    setShowContestants(true);
                    setShowContestantButton(false);
                  }}
                >
                  Show Selected Players
                </motion.button>
              )}
              {showContestants && (
                <motion.div
                  key="cards"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.2 },
                    },
                  }}
                >
                  <motion.h2
  className="text-5xl md:text-6xl text-center mb-16 text-[#00F0FF] tracking-[0.2em] contestant-text"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  PLAYERS
</motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-40">
                    {officers.map((officer) => (
                      <motion.div
                      key={officer.name}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="relative"
                    >
                      {/* Card content */}
                      <div className="contestant-card aspect-square p-8 relative overflow-hidden">
                        <div
                          className="absolute inset-0 transform -rotate-45 bg-cover bg-center grayscale scale-125"
                          style={{ backgroundImage: `url(${officer.image})` }}
                        />
                        <div className="contestant-content relative h-full flex flex-col justify-center items-center text-center transform -rotate-45">
                          <div className="text-5xl text-[#FF0676] mb-4 neon-text">
                            {officer.symbol}
                          </div>
                          <h3 className="text-[#00F0FF] text-sm tracking-[0.2em] mb-2 bg-black bg-opacity-70 contestant-text">
                            {officer.position.toUpperCase()}
                          </h3>
                          <p className="text-2xl font-bold tracking-wider text-white bg-black bg-opacity-70 contestant-text">
                            {officer.name}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio elements */}
      <audio ref={bg1Ref} src="/bg1.mp3" loop />
      <audio ref={bg2Ref} src="/bg2.mp3" loop />
    </main>
  );
}