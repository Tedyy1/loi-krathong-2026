import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Flower,
  Flame,
  Layers,
  Heart,
  Check,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import {
  Language,
  KrathongBaseType,
  FlowerType,
  CandleType,
  KrathongCustomization,
  ExtraDecorations,
} from '../types';
import { UI_TEXT } from '../utils/translations';
import { KrathongPreview } from './KrathongPreview';
import { soundEngine } from '../utils/audio';

interface KrathongCreatorProps {
  currentLang: Language;
  onProceedToWish: (config: KrathongCustomization) => void;
}

export const KrathongCreator: React.FC<KrathongCreatorProps> = ({
  currentLang,
  onProceedToWish,
}) => {
  const t = UI_TEXT[currentLang].creator;

  const [activeTab, setActiveTab] = useState<'base' | 'flower' | 'candle' | 'decor'>('base');

  const [config, setConfig] = useState<KrathongCustomization>({
    base: 'banana-leaf',
    flower: 'pink-lotus',
    candle: 'golden',
    decorations: {
      incense: true,
      flowerPetals: true,
      goldFoil: true,
      miniLotuses: false,
      heartOrnaments: true,
    },
    isLit: false, // will be lit in Step 7
  });

  const handleBaseChange = (base: KrathongBaseType) => {
    soundEngine.playSoftClick();
    setConfig((prev) => ({ ...prev, base }));
  };

  const handleFlowerChange = (flower: FlowerType) => {
    soundEngine.playSoftClick();
    setConfig((prev) => ({ ...prev, flower }));
  };

  const handleCandleChange = (candle: CandleType) => {
    soundEngine.playSoftClick();
    setConfig((prev) => ({ ...prev, candle }));
  };

  const handleToggleDecor = (key: keyof ExtraDecorations) => {
    soundEngine.playSoftClick();
    setConfig((prev) => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        [key]: !prev.decorations[key],
      },
    }));
  };

  const handleReset = () => {
    soundEngine.playSoftClick();
    setConfig({
      base: 'banana-leaf',
      flower: 'pink-lotus',
      candle: 'golden',
      decorations: {
        incense: true,
        flowerPetals: true,
        goldFoil: true,
        miniLotuses: false,
        heartOrnaments: true,
      },
      isLit: false,
    });
  };

  const handleComplete = () => {
    soundEngine.playCandleIgnition();
    onProceedToWish(config);
  };

  return (
    <section id="creator" className="relative min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-loy-purple/40 border border-loy-gold/30 text-loy-gold text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
            <span>{t.sectionBadge}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-loy-cream mb-2 text-glow-gold">
            {t.title}
          </h2>
          <p className="font-thai text-sm sm:text-base text-loy-lavender/80">
            {t.subtitle}
          </p>
        </div>

        {/* Main Workshop Grid: Preview Left/Center, Controls Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Workshop Crafting Desk / Preview Center (lg: col 7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full relative glass-panel-gold rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[500px] overflow-hidden">
              {/* Decorative traditional Thai water pattern backdrop */}
              <div className="absolute inset-0 bg-radial from-loy-indigo/40 via-loy-midnight/90 to-[#0A0D1B] opacity-80" />

              {/* Live Status Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 px-3 py-1 rounded-full bg-loy-midnight/80 border border-loy-gold/30 text-[11px] text-loy-gold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.previewBadge}</span>
              </div>

              {/* Reset button top right */}
              <button
                onClick={handleReset}
                className="absolute top-4 right-4 z-20 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-loy-indigo/60 hover:bg-loy-indigo text-loy-cream/70 hover:text-loy-gold text-xs border border-loy-lavender/20 transition-colors"
                title={t.resetBtn}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.resetBtn}</span>
              </button>

              {/* Interactive SVG Krathong Preview */}
              <motion.div
                key={`${config.base}-${config.flower}-${config.candle}`}
                initial={{ scale: 0.94, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative z-10 my-4"
              >
                <KrathongPreview config={config} size={360} />
              </motion.div>

              {/* Selected Attributes Summary Bar */}
              <div className="relative z-10 w-full mt-4 pt-4 border-t border-loy-lavender/10 flex flex-wrap items-center justify-center gap-2 text-[11px] text-loy-cream/80">
                <span className="px-2.5 py-1 rounded-lg bg-loy-midnight/60 border border-loy-emerald/40 text-emerald-300">
                  {t.bases[config.base === 'banana-leaf' ? 'banana' : config.base === 'pink-lotus' ? 'lotus' : config.base === 'golden-flower' ? 'golden' : 'purple'].name}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-loy-midnight/60 border border-loy-pink/30 text-loy-pink">
                  {t.flowers[config.flower === 'pink-lotus' ? 'lotus' : config.flower === 'white-jasmine' ? 'jasmine' : config.flower === 'yellow-marigold' ? 'marigold' : config.flower === 'purple-orchid' ? 'orchid' : 'rose']}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-loy-midnight/60 border border-loy-gold/30 text-loy-gold">
                  {t.candles[config.candle]}
                </span>
              </div>
            </div>
          </div>

          {/* Configuration Controls (lg: col 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Step Tabs Navigation */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-loy-midnight/80 rounded-2xl border border-loy-lavender/15">
              {[
                { id: 'base', label: t.tabBase, icon: Layers },
                { id: 'flower', label: t.tabFlower, icon: Flower },
                { id: 'candle', label: t.tabCandle, icon: Flame },
                { id: 'decor', label: t.tabDecor, icon: Heart },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundEngine.playSoftClick();
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                      isActive
                        ? 'bg-gradient-to-b from-loy-purple to-loy-indigo text-loy-gold shadow-md border border-loy-gold/30'
                        : 'text-loy-lavender/60 hover:text-loy-cream hover:bg-loy-indigo/30'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-loy-gold' : ''}`} />
                    <span className="truncate w-full text-[11px]">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Options Content Card */}
            <div className="glass-panel rounded-3xl p-5 min-h-[320px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {/* 1. Base Options */}
                {activeTab === 'base' && (
                  <motion.div
                    key="tab-base"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2.5"
                  >
                    <h3 className="text-xs font-medium text-loy-gold uppercase tracking-wider mb-2">
                      Choose Krathong Vessel Base
                    </h3>
                    {[
                      {
                        id: 'banana-leaf' as const,
                        name: t.bases.banana.name,
                        desc: t.bases.banana.desc,
                        color: 'from-emerald-900 to-[#2E4F35]',
                        border: 'border-emerald-600',
                      },
                      {
                        id: 'pink-lotus' as const,
                        name: t.bases.lotus.name,
                        desc: t.bases.lotus.desc,
                        color: 'from-pink-900/60 to-rose-950',
                        border: 'border-rose-400',
                      },
                      {
                        id: 'golden-flower' as const,
                        name: t.bases.golden.name,
                        desc: t.bases.golden.desc,
                        color: 'from-amber-900/60 to-yellow-950',
                        border: 'border-amber-400',
                      },
                      {
                        id: 'purple-royal' as const,
                        name: t.bases.purple.name,
                        desc: t.bases.purple.desc,
                        color: 'from-purple-950 to-indigo-950',
                        border: 'border-purple-400',
                      },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleBaseChange(item.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          config.base === item.id
                            ? `bg-gradient-to-r ${item.color} ${item.border} shadow-[0_0_15px_rgba(245,213,139,0.2)]`
                            : 'bg-loy-indigo/20 border-loy-lavender/10 hover:bg-loy-indigo/40'
                        }`}
                      >
                        <div>
                          <div className="font-thai text-sm font-medium text-loy-cream">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-loy-lavender/70 line-clamp-1">
                            {item.desc}
                          </div>
                        </div>
                        {config.base === item.id && (
                          <div className="w-5 h-5 rounded-full bg-loy-gold text-loy-midnight flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 2. Flower Options */}
                {activeTab === 'flower' && (
                  <motion.div
                    key="tab-flower"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xs font-medium text-loy-gold uppercase tracking-wider mb-2">
                      Choose Sacred Flower Decoration
                    </h3>
                    {[
                      { id: 'pink-lotus' as const, name: t.flowers.lotus, badge: '🪷' },
                      { id: 'white-jasmine' as const, name: t.flowers.jasmine, badge: '🌼' },
                      { id: 'yellow-marigold' as const, name: t.flowers.marigold, badge: '🌻' },
                      { id: 'purple-orchid' as const, name: t.flowers.orchid, badge: '🌺' },
                      { id: 'rose-petals' as const, name: t.flowers.rose, badge: '🌹' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleFlowerChange(item.id)}
                        className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          config.flower === item.id
                            ? 'bg-loy-purple/60 border-loy-gold text-loy-cream shadow-sm'
                            : 'bg-loy-indigo/20 border-loy-lavender/10 hover:bg-loy-indigo/40 text-loy-cream/80'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <span className="text-lg">{item.badge}</span>
                          <span className="font-thai text-xs sm:text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        {config.flower === item.id && (
                          <div className="w-5 h-5 rounded-full bg-loy-gold text-loy-midnight flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 3. Candle Options */}
                {activeTab === 'candle' && (
                  <motion.div
                    key="tab-candle"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2.5"
                  >
                    <h3 className="text-xs font-medium text-loy-gold uppercase tracking-wider mb-2">
                      Choose Candle Color
                    </h3>
                    {[
                      { id: 'golden' as const, name: t.candles.golden, dot: '#F5D58B', bg: 'bg-amber-950/40' },
                      { id: 'pink' as const, name: t.candles.pink, dot: '#F4BBD0', bg: 'bg-pink-950/40' },
                      { id: 'white' as const, name: t.candles.white, dot: '#FFF6E9', bg: 'bg-slate-900/40' },
                      { id: 'lavender' as const, name: t.candles.lavender, dot: '#C7A9E8', bg: 'bg-purple-950/40' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleCandleChange(item.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          config.candle === item.id
                            ? `${item.bg} border-loy-gold text-loy-cream shadow-sm`
                            : 'bg-loy-indigo/20 border-loy-lavender/10 hover:bg-loy-indigo/40 text-loy-cream/80'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className="w-4 h-4 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            style={{ backgroundColor: item.dot }}
                          />
                          <span className="font-thai text-xs sm:text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        {config.candle === item.id && (
                          <div className="w-5 h-5 rounded-full bg-loy-gold text-loy-midnight flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* 4. Extra Adornments */}
                {activeTab === 'decor' && (
                  <motion.div
                    key="tab-decor"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-2"
                  >
                    <h3 className="text-xs font-medium text-loy-gold uppercase tracking-wider mb-2">
                      Extra Festive Adornments
                    </h3>
                    {[
                      { key: 'incense' as const, name: t.decorations.incense, desc: 'ธูป 3 ดอก น้อมจิตอธิษฐาน' },
                      { key: 'flowerPetals' as const, name: t.decorations.flowerPetals, desc: 'โปรยกลีบบัวและดาวเรือง' },
                      { key: 'goldFoil' as const, name: t.decorations.goldFoil, desc: 'ทองคำเปลวบริสุทธิ์เรืองรอง' },
                      { key: 'miniLotuses' as const, name: t.decorations.miniLotuses, desc: 'บัวตูมจิ๋วเพิ่มความอ่อนหวาน' },
                      { key: 'heartOrnaments' as const, name: t.decorations.heartOrnaments, desc: 'หัวใจทองคำและชมพูสื่อรัก' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleToggleDecor(item.key)}
                        className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                          config.decorations[item.key]
                            ? 'bg-loy-purple/50 border-loy-pink text-loy-cream'
                            : 'bg-loy-indigo/20 border-loy-lavender/10 hover:bg-loy-indigo/40 text-loy-cream/70'
                        }`}
                      >
                        <div>
                          <div className="font-thai text-xs sm:text-sm font-medium">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-loy-lavender/60">{item.desc}</div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                            config.decorations[item.key]
                              ? 'bg-loy-pink border-loy-pink text-loy-midnight'
                              : 'border-loy-lavender/30'
                          }`}
                        >
                          {config.decorations[item.key] && (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Continue Button */}
              <div className="pt-4 mt-4 border-t border-loy-lavender/10">
                <button
                  onClick={handleComplete}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-loy-gold via-[#FFEAA7] to-loy-gold text-[#10152B] font-semibold text-sm tracking-wide shadow-lg hover:shadow-loy-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{t.continueBtn}</span>
                  <ArrowRight className="w-4 h-4 text-[#10152B]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
