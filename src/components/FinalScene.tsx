import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Mail, Flower, Heart } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../utils/translations';
import { PERSONAL_CONFIG } from '../config/personalization';
import { soundEngine } from '../utils/audio';

interface FinalSceneProps {
  currentLang: Language;
  onReplayFromStart: () => void;
  onReadLetterAgain: () => void;
  onMakeAnotherWish: () => void;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  currentLang,
  onReplayFromStart,
  onReadLetterAgain,
  onMakeAnotherWish,
}) => {
  const t = UI_TEXT[currentLang].final;

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col justify-between items-center overflow-hidden bg-[#10152B]">
      {/* Background Starlight & River Panorama */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090C1A] via-[#10152B] to-[#1E2548] pointer-events-none" />

      {/* Falling Flower Petals Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={`falling-petal-${i}`}
            className="absolute rounded-full opacity-80"
            style={{
              left: `${(i * 13) % 100}%`,
              top: '-5%',
              width: `${(i % 3) * 3 + 8}px`,
              height: `${(i % 3) * 2 + 6}px`,
              backgroundColor: ['#F4BBD0', '#FFD166', '#FFF6E9', '#D46A8B'][i % 4],
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: ['0px', `${(i % 2 === 0 ? 1 : -1) * 60}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + (i % 5) * 2,
              repeat: Infinity,
              delay: (i % 6) * 1.2,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Floating River Surface with Lantern Lights */}
      <div className="absolute bottom-0 inset-x-0 h-[45%] pointer-events-none overflow-hidden">
        {/* River Water Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D1B] via-[#141B3B] to-transparent opacity-90" />

        {/* Floating glowing krathong dots drifting down the river */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={`river-glow-${i}`}
            className="absolute flex flex-col items-center"
            style={{
              bottom: `${(i * 12) % 40}%`,
              left: `${(i * 7) % 95}%`,
            }}
            animate={{
              x: ['-20px', '40px'],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 6 + (i % 4) * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <div className="w-4 h-4 rounded-full bg-loy-gold shadow-[0_0_12px_#FFD166] animate-pulse" />
            <div className="w-10 h-3 bg-loy-emerald/50 rounded-full blur-xs mt-1" />
          </motion.div>
        ))}
      </div>

      {/* Glowing Moon Top Center */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FDF5E6] to-[#F5D58B] shadow-[0_0_60px_rgba(245,213,139,0.7)] flex items-center justify-center">
          <div className="absolute -inset-10 rounded-full bg-[#F5D58B]/20 blur-2xl" />
        </div>
      </div>

      {/* Center Hero Card */}
      <div className="relative z-10 max-w-2xl mx-auto text-center pt-28 sm:pt-36 pb-12 flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-loy-purple/40 border border-loy-gold/30 text-loy-gold text-xs font-medium mb-4 shadow-[0_0_20px_rgba(245,213,139,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
          <span>{t.badge}</span>
          <span className="text-loy-pink">♡</span>
        </motion.div>

        {/* Quote 1 */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-lg sm:text-2xl text-loy-lavender/90 italic mb-2"
        >
          "{t.quote1}"
        </motion.p>

        {/* Quote 2 (Thai Main) */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-thai text-3xl sm:text-5xl font-bold text-loy-cream mb-3 text-glow-gold"
        >
          {t.quote2Thai}
        </motion.h2>

        {/* Quote 3 */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-2xl sm:text-3xl font-bold text-loy-gold mb-8 text-glow-pink"
        >
          "{t.quote3}"
        </motion.h3>

        {/* Dedication Tag */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl glass-panel border border-loy-pink/30 text-xs text-loy-pink mb-10"
        >
          <Heart className="w-3.5 h-3.5 fill-loy-pink text-loy-pink" />
          <span>
            {PERSONAL_CONFIG.couple.senderName} ♡ {PERSONAL_CONFIG.couple.receiverNickname}
          </span>
          <span className="text-loy-lavender/40">•</span>
          <span className="text-loy-cream">{PERSONAL_CONFIG.event.date}</span>
        </motion.div>

        {/* 3 Interactive Replay Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-xl"
        >
          {/* 1. Experience Again */}
          <button
            onClick={() => {
              soundEngine.playCandleIgnition();
              onReplayFromStart();
            }}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-loy-gold via-[#FFEAA7] to-loy-gold text-[#10152B] font-semibold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-loy-gold/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#10152B]" />
            <span>{t.btnReplay}</span>
          </button>

          {/* 2. Read My Letter Again */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onReadLetterAgain();
            }}
            className="py-3.5 px-4 rounded-2xl bg-loy-purple/60 hover:bg-loy-purple border border-loy-pink/40 text-loy-pink font-semibold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-loy-pink" />
            <span>{t.btnReadLetter}</span>
          </button>

          {/* 3. Make Another Wish */}
          <button
            onClick={() => {
              soundEngine.playSoftClick();
              onMakeAnotherWish();
            }}
            className="py-3.5 px-4 rounded-2xl glass-panel hover:bg-loy-indigo/60 border border-loy-lavender/30 text-loy-cream font-medium text-xs sm:text-sm shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Flower className="w-4 h-4 text-loy-gold" />
            <span>{t.btnMakeWish}</span>
          </button>
        </motion.div>
      </div>

      {/* Sweet Footer Note */}
      <footer className="relative z-10 text-center py-4 border-t border-loy-lavender/10 w-full max-w-4xl mx-auto">
        <p className="text-xs text-loy-lavender/60 font-thai">
          {t.footerText}
        </p>
        <p className="text-[11px] text-loy-gold/70 mt-1 font-serif italic">
          "A little river, a thousand wishes, and one person who means everything to me." ♡
        </p>
      </footer>
    </section>
  );
};
