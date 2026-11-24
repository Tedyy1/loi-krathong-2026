import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Waves } from 'lucide-react';
import { Language, KrathongCustomization } from '../types';
import { UI_TEXT } from '../utils/translations';
import { KrathongPreview } from './KrathongPreview';
import { soundEngine } from '../utils/audio';

interface LightCandleSceneProps {
  currentLang: Language;
  krathongConfig: KrathongCustomization;
  onProceedToFloat: (litConfig: KrathongCustomization) => void;
}

export const LightCandleScene: React.FC<LightCandleSceneProps> = ({
  currentLang,
  krathongConfig,
  onProceedToFloat,
}) => {
  const t = UI_TEXT[currentLang].light;
  const [isLit, setIsLit] = useState(krathongConfig.isLit);
  const [sparkParticles, setSparkParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleLightCandle = () => {
    if (isLit) return;
    soundEngine.playCandleIgnition();
    setIsLit(true);

    // Spawn celebratory spark burst around the candle
    const sparks = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -60 - Math.random() * 90,
    }));
    setSparkParticles(sparks);
  };

  const handleFloat = () => {
    soundEngine.playWaterRipple();
    onProceedToFloat({ ...krathongConfig, isLit: true });
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Deep dimming vignette for dramatic lighting */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isLit ? 'bg-[#10152B]/90' : 'bg-[#090C17]/95'
        }`}
      />

      {/* Atmospheric center spotlight / moonlight beam */}
      <div
        className={`absolute w-[500px] h-[500px] rounded-full filter blur-3xl transition-opacity duration-1000 pointer-events-none ${
          isLit ? 'bg-[#F5D58B]/20 opacity-100 scale-125' : 'bg-[#594477]/15 opacity-60 scale-100'
        }`}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-loy-purple/40 border border-loy-gold/30 text-loy-gold text-xs font-medium mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
          <span>{t.badge}</span>
        </motion.div>

        {/* English Title */}
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl font-bold text-loy-cream mb-2"
        >
          "{t.title}"
        </motion.h2>

        {/* Thai Sacred Quote */}
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-thai text-lg sm:text-xl font-medium text-loy-gold mb-6"
        >
          "{t.thaiQuote}"
        </motion.p>

        {/* Center Krathong Visual in Sacred Dim Setting */}
        <div
          onClick={handleLightCandle}
          className="relative my-4 cursor-pointer group flex items-center justify-center"
        >
          {/* Subtle click-to-light hint overlay if not lit */}
          {!isLit && (
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-6 px-3 py-1 rounded-full bg-loy-gold/20 border border-loy-gold/50 text-[11px] text-loy-gold z-30 pointer-events-none shadow-[0_0_15px_rgba(245,213,139,0.3)]"
            >
              Tap to light the flame 🕯️
            </motion.div>
          )}

          {/* Spark Particles Animation */}
          {sparkParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: -40, scale: 0.5, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: [1, 0], opacity: [1, 0] }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute w-2 h-2 rounded-full bg-loy-gold shadow-[0_0_8px_#FFD166] pointer-events-none z-30"
            />
          ))}

          <motion.div
            animate={{
              y: isLit ? [0, -6, 0] : 0,
            }}
            transition={{
              duration: 4,
              repeat: isLit ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            <KrathongPreview
              config={{ ...krathongConfig, isLit }}
              size={360}
              showWaterGlow={true}
            />
          </motion.div>
        </div>

        {/* Instruction text */}
        <p className="text-xs text-loy-lavender/70 font-light max-w-sm mb-6">
          {t.instruction}
        </p>

        {/* Action Buttons */}
        <div className="w-full max-w-sm">
          <AnimatePresence mode="wait">
            {!isLit ? (
              <motion.button
                key="btn-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleLightCandle}
                whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(245,213,139,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-loy-gold to-amber-500 text-loy-midnight font-semibold text-base tracking-wide shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-loy-midnight fill-amber-700" />
                <span>{t.lightBtn}</span>
              </motion.button>
            ) : (
              <motion.button
                key="btn-float"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleFloat}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(244,187,208,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-loy-pink via-[#F8BBD0] to-loy-gold text-loy-midnight font-semibold text-base tracking-wide shadow-xl flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Waves className="w-5 h-5 text-loy-midnight" />
                <span>{t.floatBtn}</span>
                <Sparkles className="w-4 h-4 text-loy-midnight" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
