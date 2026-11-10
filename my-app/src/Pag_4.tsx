import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Heart, ThumbsDown, Eye, ChevronUp, ArrowLeft } from "lucide-react";

interface Pag_4Props {
  onIndietro: () => void;
}

export default function Pag_4({ onIndietro }: Pag_4Props) {
  const youtubeVideoId = "nD45l6hCyN8"; // Your YouTube Video ID
  const movieTitle = "Movie Title";

  const [showTutorial, setShowTutorial] = useState(true);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const controls = useAnimation();

  // Hide tutorial automatically after 6 seconds or on first interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTutorial(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismissTutorial = () => {
    if (showTutorial) setShowTutorial(false);
  };

  // Handle Drag / Swipe actions
  const handleDragEnd = async (
    _: any,
    info: { offset: { x: number; y: number } }
  ) => {
    handleDismissTutorial();

    const { x, y } = info.offset;
    const threshold = 100;

    // Determine primary swipe direction
    if (Math.abs(x) > Math.abs(y)) {
      if (x > threshold) {
        // Swipe Right -> Like (Movie)
        setLastAction("Liked ❤️");
        await controls.start({ x: 500, opacity: 0 });
      } else if (x < -threshold) {
        // Swipe Left -> Dislike
        setLastAction("Disliked 👎");
        await controls.start({ x: -500, opacity: 0 });
      }
    } else {
      if (y < -threshold) {
        // Swipe Up -> Watch
        setLastAction("Watch 🍿");
        await controls.start({ y: -500, opacity: 0 });
      } else if (y > threshold) {
        // Swipe Down -> Già Visto
        setLastAction("Già Visto 👁️");
        await controls.start({ y: 500, opacity: 0 });
      }
    }

    // Reset card position after action for demo loop
    setTimeout(() => {
      controls.start({ x: 0, y: 0, opacity: 1, transition: { duration: 0.3 } });
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-gray-950 p-4 font-sans text-white select-none overflow-hidden">
      
      {/* Back Button (Indietro) - linked to your setPagina(2) router */}
      <button
        onClick={onIndietro}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md hover:bg-white/20 transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Indietro
      </button>

      {/* Toast Feedback for Actions */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 z-50 rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-md"
          >
            {lastAction}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card Container */}
      <motion.div
        animate={controls}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        onClick={handleDismissTutorial}
        className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-white/10 cursor-grab active:cursor-grabbing"
      >
        {/* YouTube Autoplay Video Embed */}
        <div className="pointer-events-none h-full w-full">
          <iframe
            className="h-full w-full object-cover scale-150"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}&playsinline=1`}
            title={movieTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Card Overlay Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

        {/* Header / Info */}
        <div className="pointer-events-none absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl font-bold tracking-tight text-white">{movieTitle}</h2>
          <p className="mt-1 text-xs text-gray-300">Swipe card to interact</p>
        </div>

        {/* --- TUTORIAL OVERLAY (TikTok style) --- */}
        <AnimatePresence>
          {showTutorial && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-40 flex flex-col items-center justify-between bg-black/60 p-8 backdrop-blur-sm pointer-events-none"
            >
              {/* Swipe Up: Watch */}
              <div className="flex flex-col items-center text-emerald-400 animate-bounce mt-4">
                <ChevronUp className="h-8 w-8" />
                <span className="text-xs font-bold uppercase tracking-wider">Swipe Up to Watch</span>
              </div>

              {/* Swipe Left / Right Guides */}
              <div className="flex w-full justify-between items-center px-2">
                {/* Swipe Left: Dislike */}
                <motion.div
                  animate={{ x: [-10, 0, -10] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center space-x-2 text-red-400"
                >
                  <ThumbsDown className="h-6 w-6" />
                  <span className="text-xs font-bold uppercase">Dislike</span>
                </motion.div>

                {/* Swipe Right: Like */}
                <motion.div
                  animate={{ x: [10, 0, 10] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center space-x-2 text-pink-400"
                >
                  <span className="text-xs font-bold uppercase">Like</span>
                  <Heart className="h-6 w-6" />
                </motion.div>
              </div>

              {/* Swipe Down: Già Visto */}
              <div className="flex flex-col items-center text-blue-400 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider">Swipe Down for Già Visto</span>
                <Eye className="h-6 w-6 mt-1" />
              </div>

              <div className="absolute bottom-2 text-[10px] text-gray-400">
                Tap anywhere or swipe to skip tutorial
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}