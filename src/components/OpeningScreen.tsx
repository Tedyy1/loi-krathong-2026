import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { Language } from '../types';
import { UI_TEXT } from '../utils/translations';
import { PERSONAL_CONFIG } from '../config/personalization';

interface OpeningScreenProps {
  currentLang: Language;
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ currentLang, onEnter }) => {
  const t = UI_TEXT[currentLang].opening;

  const handleStart = () => {
    // Start ambient romantic synthesizer music upon user interaction
    soundEngine.startMusic();
    soundEngine.playCandleIgnition();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#10152B]"
    >
      {/* 1. Deep Midnight Gradient & Celestial Stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E1E] via-[#10152B] to-[#20264A] opacity-95" />

      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 45 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-loy-cream animate-pulse"
            style={{
              top: `${(i * 37) % 85}%`,
              left: `${(i * 53) % 95}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              opacity: 0.2 + ((i % 5) * 0.15),
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i % 3) * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Fireflies (Kunang-kunang) */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute rounded-full bg-[#FFE082]"
            style={{
              width: `${(i % 2) + 3}px`,
              height: `${(i % 2) + 3}px`,
              boxShadow: '0 0 10px #FFD54F, 0 0 20px #FFB300',
            }}
            initial={{
              x: `${(i * 4.5) % 95}vw`,
              y: `${50 + (i * 3) % 45}vh`,
              opacity: 0.2,
            }}
            animate={{
              x: [`${(i * 4.5) % 95}vw`, `${((i * 4.5) % 95) + (i % 2 ? 6 : -6)}vw`],
              y: [`${50 + (i * 3) % 45}vh`, `${50 + (i * 3) % 45 - 25}vh`],
              opacity: [0.2, 0.9, 0.3],
            }}
            transition={{
              duration: 5 + (i % 4) * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: (i % 5) * 0.6,
            }}
          />
        ))}
      </div>

      {/* 2. Glowing Full Moon */}
      <div className="absolute top-[10%] sm:top-[12%] right-[10%] sm:right-[18%] pointer-events-none">
        {/* Deep aura */}
        <div className="absolute -inset-10 sm:-inset-16 rounded-full bg-[#F5D58B]/20 blur-3xl animate-pulse-glow" />
        <div className="relative w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FDF5E6] to-[#F5D58B] shadow-[0_0_50px_rgba(245,213,139,0.7)] flex items-center justify-center">
          {/* Subtle lunar maria craters */}
          <div className="w-6 h-6 rounded-full bg-[#E8CCA0]/25 absolute top-5 left-6 filter blur-xs" />
          <div className="w-9 h-9 rounded-full bg-[#E8CCA0]/20 absolute bottom-7 right-8 filter blur-xs" />
          <div className="w-4 h-4 rounded-full bg-[#E8CCA0]/30 absolute top-12 right-10 filter blur-xs" />
        </div>
      </div>

      {/* 3. Distant Silhouette of Thai Traditional Chedi & Riverside Trees */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10 opacity-70">
        <svg
          viewBox="0 0 1440 280"
          className="w-full h-auto"
          preserveAspectRatio="none"
          fill="#0B0E1E"
        >
          {/* Distant mountains / riverbanks */}
          <path d="M0,220 Q360,180 720,210 T1440,200 L1440,280 L0,280 Z" opacity="0.6" />
          {/* Thai Chedi / Spire temple silhouette */}
          <path d="M1120,210 L1125,120 L1127,70 L1128,45 L1129,70 L1131,120 L1136,210 Z" />
          <ellipse cx="1128" cy="140" rx="14" ry="4" />
          <ellipse cx="1128" cy="170" rx="22" ry="6" />
          {/* Traditional Sala roof silhouette */}
          <path d="M1060,210 L1080,180 Q1095,175 1110,180 L1110,210 Z" />
          <path d="M220,210 L235,140 L238,85 L240,60 L242,85 L245,140 L260,210 Z" opacity="0.7" />
          {/* Riverside tropical palms / trees silhouette */}
          <path d="M40,220 Q60,160 110,140 Q130,170 140,220 Z M80,220 Q120,130 160,220 Z" />
          <path d="M1320,220 Q1360,150 1420,220 Z" />
          {/* River waterline base */}
          <rect y="235" width="1440" height="45" fill="#080B17" />
        </svg>
      </div>

      {/* 4. Center Content Card */}
      <div className="relative z-20 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Golden romantic badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-loy-purple/40 border border-loy-gold/30 text-loy-gold text-xs tracking-wider mb-6 shadow-[0_0_15px_rgba(245,213,139,0.2)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
          <span className="font-thai">{t.badge}</span>
          <span className="text-loy-pink">♡</span>
        </motion.div>

        {/* English Romantic Title */}
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-loy-cream mb-3 text-glow-gold"
        >
          {t.title}
        </motion.h1>

        {/* Thai Greeting */}
        <motion.h2
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-thai text-2xl sm:text-3xl font-medium text-loy-gold mb-4"
        >
          {t.thaiGreeting}
        </motion.h2>

        {/* Thai Invitation Quote */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-thai text-base sm:text-lg text-loy-lavender/90 max-w-md leading-relaxed mb-2"
        >
          "{t.invitation}"
        </motion.p>

        {/* Personal Tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs text-loy-pink/80 mb-8 flex items-center space-x-1.5"
        >
          <span>A gift from {PERSONAL_CONFIG.couple.senderName}</span>
          <Heart className="w-3 h-3 text-loy-pink fill-loy-pink inline" />
          <span>for {PERSONAL_CONFIG.couple.receiverNickname}</span>
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(245,213,139,0.5)' }}
          whileTap={{ scale: 0.96 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-loy-gold via-[#FFEAA7] to-loy-gold text-[#10152B] font-semibold text-sm sm:text-base tracking-wide shadow-xl flex items-center space-x-2.5 transition-all duration-300 group cursor-pointer"
        >
          <Moon className="w-4 h-4 text-[#10152B] group-hover:rotate-12 transition-transform" />
          <span>{t.enterBtn}</span>
          <Sparkles className="w-4 h-4 text-[#10152B] group-hover:scale-125 transition-transform" />
        </motion.button>

        {/* Sound hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5 }}
          className="text-[11px] text-loy-lavender/60 mt-3 font-light"
        >
          {t.soundHint}
        </motion.p>
      </div>
    </motion.div>
  );
};
