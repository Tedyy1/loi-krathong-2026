import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, Flower2, ChevronDown } from 'lucide-react';
import { Language, KrathongCustomization } from '../types';
import { UI_TEXT } from '../utils/translations';
import { PERSONAL_CONFIG } from '../config/personalization';
import { KrathongPreview } from './KrathongPreview';
import { soundEngine } from '../utils/audio';

interface HeroSectionProps {
  currentLang: Language;
  onStartCrafting: () => void;
  onOpenLetter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onStartCrafting,
  onOpenLetter,
}) => {
  const t = UI_TEXT[currentLang].hero;

  // Ambient sample krathong for the hero showcase
  const heroKrathongConfig: KrathongCustomization = {
    base: 'banana-leaf',
    flower: 'pink-lotus',
    candle: 'golden',
    decorations: {
      incense: true,
      flowerPetals: true,
      goldFoil: true,
      miniLotuses: true,
      heartOrnaments: true,
    },
    isLit: true,
  };

  return (
    <section className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Atmosphere: River Night Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10152B] via-[#1A2040] to-[#0A0D1A] pointer-events-none" />

      {/* Floating Sky Lanterns (Khom Loi / โคมลอย) drifting up in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '15%', delay: 0, dur: 18, size: 28 },
          { x: '35%', delay: 4, dur: 22, size: 22 },
          { x: '65%', delay: 2, dur: 20, size: 24 },
          { x: '82%', delay: 6, dur: 24, size: 20 },
          { x: '48%', delay: 8, dur: 19, size: 26 },
        ].map((lantern, idx) => (
          <motion.div
            key={`sky-lantern-${idx}`}
            className="absolute -bottom-10 rounded-sm"
            style={{
              left: lantern.x,
              width: lantern.size,
              height: lantern.size * 1.35,
              background: 'linear-gradient(to top, #FF9F1C, #FFD166, #FFF9E6)',
              boxShadow: '0 0 16px rgba(255, 209, 102, 0.7)',
              opacity: 0.8,
            }}
            animate={{
              y: ['0vh', '-110vh'],
              x: ['0px', `${(idx % 2 === 0 ? 1 : -1) * 35}px`],
              opacity: [0, 0.85, 0.7, 0],
            }}
            transition={{
              duration: lantern.dur,
              delay: lantern.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Glowing Full Moon */}
      <div className="absolute top-16 right-6 sm:right-24 pointer-events-none">
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FDF5E6] to-[#F5D58B] shadow-[0_0_60px_rgba(245,213,139,0.55)] flex items-center justify-center relative">
          <div className="absolute -inset-8 bg-[#F5D58B]/15 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left pt-6 sm:pt-0">
            {/* Festival & Date Pill */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border-loy-gold/30 text-loy-gold text-xs font-medium mb-4"
            >
              <Calendar className="w-3.5 h-3.5 text-loy-gold" />
              <span>{PERSONAL_CONFIG.event.date}</span>
              <span className="text-loy-lavender/40">•</span>
              <span className="font-thai">{PERSONAL_CONFIG.event.thaiDate}</span>
            </motion.div>

            {/* Main Title (Thai) */}
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-thai text-3xl sm:text-4xl md:text-5xl font-semibold text-loy-cream leading-tight mb-4 text-glow-gold"
            >
              {t.mainTitle}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-lg sm:text-2xl text-loy-gold/90 italic mb-4"
            >
              "{t.subtitle}"
            </motion.p>

            {/* Long distance heartfelt quote */}
            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base text-loy-lavender/90 max-w-xl leading-relaxed mb-6 font-light"
            >
              {t.distanceQuote}
            </motion.p>

            {/* Couple love badge */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-loy-purple/30 border border-loy-pink/20 text-xs text-loy-pink mb-8"
            >
              <span>Made with all my heart for</span>
              <strong className="text-loy-cream">{PERSONAL_CONFIG.couple.receiverNickname}</strong>
              <Heart className="w-3.5 h-3.5 fill-loy-pink text-loy-pink" />
              <span>from</span>
              <strong className="text-loy-gold">{PERSONAL_CONFIG.couple.senderName}</strong>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => {
                  soundEngine.playSoftClick();
                  onStartCrafting();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-loy-gold via-[#FFEAA7] to-loy-gold text-[#10152B] font-semibold text-sm sm:text-base tracking-wide shadow-[0_4px_25px_rgba(245,213,139,0.35)] hover:shadow-[0_4px_35px_rgba(245,213,139,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Flower2 className="w-5 h-5 text-[#10152B]" />
                <span>{t.createKrathongBtn}</span>
                <Sparkles className="w-4 h-4 text-[#10152B]" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playSoftClick();
                  onOpenLetter();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel hover:bg-loy-purple/50 border border-loy-pink/40 text-loy-pink font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.openLetterBtn}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Floating Krathong Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <KrathongPreview config={heroKrathongConfig} size={330} />
            </motion.div>

            {/* Caption underneath the hero Krathong */}
            <p className="text-xs text-loy-lavender/70 font-thai text-center mt-2 flex items-center space-x-1.5">
              <span>กระทงใบตองหลวงวิจิตร จุดเทียนทองนำโชค</span>
              <Sparkles className="w-3 h-3 text-loy-gold" />
            </p>
          </div>
        </div>
      </div>

      {/* Down arrow scroll hint */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-8">
        <button
          onClick={onStartCrafting}
          className="flex flex-col items-center text-loy-lavender/60 hover:text-loy-gold transition-colors cursor-pointer group"
        >
          <span className="text-[11px] mb-1 group-hover:translate-y-0.5 transition-transform">
            Scroll or tap to create your krathong
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-loy-gold/70" />
        </button>
      </div>
    </section>
  );
};
