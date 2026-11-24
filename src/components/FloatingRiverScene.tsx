import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Eye, Copy, Heart } from 'lucide-react';
import { Language, KrathongCustomization, UserWishData } from '../types';
import { UI_TEXT } from '../utils/translations';
import { KrathongPreview } from './KrathongPreview';
import { soundEngine } from '../utils/audio';
import { wishStore } from '../utils/wishStore';
import { WishDetailModal } from './WishDetailModal';
import { RiverWishesDrawer } from './RiverWishesDrawer';

interface FloatingRiverSceneProps {
  currentLang: Language;
  krathongConfig: KrathongCustomization;
  userWish: UserWishData | null;
  onOpenLetter: () => void;
  onProceedToCelebration: () => void;
}

interface RiverKrathongNode {
  id: string;
  x: number;
  y: number;
  speed: number;
  scale: number;
  phase: number;
  candleColor: string;
  wishData: UserWishData;
  isSpecialRionn: boolean;
}

interface RiverPetal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  color: string;
  size: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const FloatingRiverScene: React.FC<FloatingRiverSceneProps> = ({
  currentLang,
  krathongConfig,
  userWish,
  onOpenLetter,
  onProceedToCelebration,
}) => {
  const t = UI_TEXT[currentLang].floating;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating journey states
  const [journeyPhase, setJourneyPhase] = useState<'departing' | 'drifting' | 'faraway'>('departing');
  const [showFinishedMessage, setShowFinishedMessage] = useState(false);
  const [allWishes, setAllWishes] = useState<UserWishData[]>([]);
  const [inspectWish, setInspectWish] = useState<UserWishData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  // Load all wishes from store
  useEffect(() => {
    const wishes = wishStore.getAllWishes();
    setAllWishes(wishes);
    // Background fetch if serverless api is available
    wishStore.fetchRemoteWishes().then((updated) => {
      setAllWishes(updated);
    });
  }, []);

  useEffect(() => {
    // Gentle romantic cinematic progression
    const timer1 = setTimeout(() => {
      setJourneyPhase('drifting');
    }, 4500);

    const timer2 = setTimeout(() => {
      setJourneyPhase('faraway');
      setShowFinishedMessage(true);
    }, 10500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Canvas River Simulation Engine with interactive Krathongs
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Build festival krathongs from real wishes + ambient additions
    const riverWishesList = wishStore.getAllWishes();
    const distantKrathongs: RiverKrathongNode[] = riverWishesList.map((w, i) => {
      const isRionn = w.isSpecialRionn || w.senderName.toLowerCase().includes('rionn');
      return {
        id: w.id,
        x: isRionn ? width * 0.48 : (i * (width / Math.max(riverWishesList.length, 6))) + (Math.random() * 40 - 20),
        y: isRionn ? height * 0.58 : height * 0.44 + (Math.random() * (height * 0.35)),
        speed: 0.12 + Math.random() * 0.2,
        scale: isRionn ? 0.42 : 0.22 + Math.random() * 0.18,
        phase: Math.random() * Math.PI * 2,
        candleColor: ['#F5D58B', '#F4BBD0', '#FFF6E9', '#FFE082'][i % 4],
        wishData: w,
        isSpecialRionn: isRionn,
      };
    });

    // Floating water petals
    const petalColors = ['#F4BBD0', '#FFD166', '#FFF6E9', '#D46A8B', '#FFE082'];
    const riverPetals: RiverPetal[] = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * width,
      y: height * 0.4 + Math.random() * (height * 0.6),
      vx: 0.2 + Math.random() * 0.35,
      vy: 0.05 + Math.random() * 0.15,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      size: 4 + Math.random() * 5,
    }));

    // Interactive ripples
    const ripples: Ripple[] = [];

    // Water ripple loop
    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Deep Midnight River Gradient
      const riverGrad = ctx.createLinearGradient(0, height * 0.35, 0, height);
      riverGrad.addColorStop(0, '#0D1224');
      riverGrad.addColorStop(0.3, '#10152B');
      riverGrad.addColorStop(0.7, '#141A36');
      riverGrad.addColorStop(1, '#090D1C');
      ctx.fillStyle = riverGrad;
      ctx.fillRect(0, height * 0.35, width, height * 0.65);

      // 2. Moonlight Vertical Water Shimmer Reflection Column
      const moonX = width * 0.72;
      const moonGlow = ctx.createRadialGradient(
        moonX,
        height * 0.4,
        10,
        moonX,
        height * 0.75,
        width * 0.35
      );
      moonGlow.addColorStop(0, 'rgba(245, 213, 139, 0.3)');
      moonGlow.addColorStop(0.3, 'rgba(245, 213, 139, 0.12)');
      moonGlow.addColorStop(0.7, 'rgba(199, 169, 232, 0.05)');
      moonGlow.addColorStop(1, 'rgba(16, 21, 43, 0)');
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, height * 0.35, width, height * 0.65);

      // 3. Horizontal Gentle Wave Crest Shimmers
      ctx.strokeStyle = 'rgba(245, 213, 139, 0.18)';
      ctx.lineWidth = 1.2;
      const waveCount = 14;
      for (let i = 0; i < waveCount; i++) {
        const y = height * 0.42 + (i / waveCount) * (height * 0.55);
        ctx.beginPath();
        for (let x = 0; x < width; x += 30) {
          const waveY =
            y +
            Math.sin(x * 0.015 + time + i) * 3 +
            Math.cos(x * 0.025 - time * 0.5) * 2;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // 4. Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.8;
        r.alpha -= 0.012;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.38, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 213, 139, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw Festival Krathongs (with interactive click hit detection)
      distantKrathongs.forEach((k) => {
        k.x += k.speed;
        if (k.x > width + 80) k.x = -80;

        const bobY = k.y + Math.sin(time * 2 + k.phase) * 3.5;

        ctx.save();
        ctx.translate(k.x, bobY);
        ctx.scale(k.scale, k.scale);

        // Special golden halo for Rionn's dedicated Krathong
        if (k.isSpecialRionn) {
          ctx.beginPath();
          ctx.ellipse(0, 16, 50, 18, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(245, 213, 139, 0.45)';
          ctx.fill();

          // Outer glowing pulse ring
          ctx.beginPath();
          ctx.ellipse(0, 16, 40 + Math.sin(time * 3) * 6, 15, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(244, 187, 208, 0.7)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Candle ambient water reflection
        ctx.beginPath();
        ctx.ellipse(0, 15, 26, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = k.isSpecialRionn ? 'rgba(255, 222, 125, 0.6)' : 'rgba(255, 209, 102, 0.25)';
        ctx.fill();

        // Banana leaf hull
        ctx.beginPath();
        ctx.ellipse(0, 0, 32, 12, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#2E4F35';
        ctx.fill();

        // Hull rim detail
        ctx.beginPath();
        ctx.ellipse(0, -2, 28, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#3E6548';
        ctx.fill();

        // Candle cylinder
        ctx.fillStyle = k.candleColor;
        ctx.fillRect(-2, -22, 4, 20);

        // Flame glow
        const fGlow = ctx.createRadialGradient(0, -26, 1, 0, -26, 20);
        fGlow.addColorStop(0, '#FFF9E6');
        fGlow.addColorStop(0.35, '#FFD166');
        fGlow.addColorStop(1, 'rgba(255, 111, 0, 0)');
        ctx.fillStyle = fGlow;
        ctx.beginPath();
        ctx.arc(0, -26, 20, 0, Math.PI * 2);
        ctx.fill();

        // Label above Krathong if it's Rionn's
        if (k.isSpecialRionn) {
          ctx.font = '12px Prompt, sans-serif';
          ctx.fillStyle = '#F5D58B';
          ctx.textAlign = 'center';
          ctx.fillText('Rionn ♡ Yuqii', 0, -36);
        }

        ctx.restore();
      });

      // 6. Draw Floating River Petals
      riverPetals.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.x > width + 20) p.x = -20;
        if (p.y > height + 20) p.y = height * 0.4;

        ctx.save();
        ctx.translate(p.x, p.y + Math.sin(time + p.x * 0.01) * 2);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Tap on river water: hit-test for floating Krathongs or create water ripples
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if clicked on any floating Krathong to inspect its wish!
      for (const k of distantKrathongs) {
        const dx = clickX - k.x;
        const dy = clickY - k.y;
        const hitRadius = 35 * (k.scale * 2);
        if (Math.hypot(dx, dy) < hitRadius) {
          soundEngine.playCandleIgnition();
          setInspectWish(k.wishData);
          return;
        }
      }

      // Otherwise, spawn gentle water ripple
      soundEngine.playWaterRipple();
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 85,
        alpha: 0.8,
      });

      // Spawn flower petals where tapped
      for (let j = 0; j < 3; j++) {
        riverPetals.push({
          x: clickX + (Math.random() - 0.5) * 20,
          y: clickY + (Math.random() - 0.5) * 15,
          vx: 0.15 + Math.random() * 0.3,
          vy: 0.05 + Math.random() * 0.1,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.03,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
          size: 4 + Math.random() * 4,
        });
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  const handleCopyShareLink = () => {
    soundEngine.playSoftClick();
    const wishToShare = userWish || wishStore.getMyWish() || allWishes[0];
    if (wishToShare) {
      const link = wishStore.generateShareUrl(wishToShare);
      navigator.clipboard.writeText(link);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 3000);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none bg-[#10152B]">
      {/* 1. Living HTML5 Water Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full cursor-pointer"
      />

      {/* 2. Sky Backdrop & Full Moon */}
      <div className="absolute top-0 inset-x-0 h-[40%] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#090C1A] via-[#10152B] to-transparent" />

        {/* Full Moon */}
        <div className="absolute top-8 right-[24%] pointer-events-none">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#FFFDF9] via-[#FDF5E6] to-[#F5D58B] shadow-[0_0_50px_rgba(245,213,139,0.7)] flex items-center justify-center">
            <div className="absolute -inset-10 rounded-full bg-[#F5D58B]/15 blur-2xl" />
          </div>
        </div>

        {/* Floating Sky Lanterns (Khom Loi) rising into the night sky */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { left: '20%', delay: 0, scale: 0.6 },
            { left: '42%', delay: 3, scale: 0.75 },
            { left: '60%', delay: 1.5, scale: 0.5 },
            { left: '78%', delay: 4, scale: 0.65 },
          ].map((item, idx) => (
            <motion.div
              key={`sky-khom-${idx}`}
              className="absolute bottom-0 w-6 h-8 rounded-sm bg-gradient-to-t from-[#FF9F1C] to-[#FFF9E6] shadow-[0_0_12px_#FFD166]"
              style={{ left: item.left }}
              animate={{
                y: ['0vh', '-45vh'],
                opacity: [0, 0.9, 0],
                x: [0, (idx % 2 === 0 ? 1 : -1) * 20],
              }}
              transition={{
                duration: 16,
                delay: item.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3. The User's Custom Krathong Floating Journey */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <motion.div
          initial={{
            scale: 0.95,
            y: '22vh',
            x: '0vw',
            opacity: 1,
          }}
          animate={
            journeyPhase === 'departing'
              ? {
                  scale: 0.75,
                  y: '10vh',
                  x: '-4vw',
                  opacity: 0.98,
                }
              : journeyPhase === 'drifting'
              ? {
                  scale: 0.48,
                  y: '-2vh',
                  x: '10vw',
                  opacity: 0.92,
                }
              : {
                  scale: 0.26,
                  y: '-12vh',
                  x: '24vw',
                  opacity: 0.85,
                }
          }
          transition={{
            duration: journeyPhase === 'departing' ? 4.5 : 7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative flex flex-col items-center"
        >
          {/* Candle glow shimmer under the krathong */}
          <div className="absolute -bottom-8 w-48 h-16 bg-[#FFDE7D]/35 rounded-full blur-xl animate-pulse" />

          {/* User's crafted krathong with flame lit */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [-1.2, 1.2, -1.2],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <KrathongPreview
              config={{ ...krathongConfig, isLit: true }}
              size={340}
              showWaterGlow={true}
            />
          </motion.div>

          {/* Wish label attached softly to the krathong */}
          {userWish && userWish.text && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: journeyPhase === 'faraway' ? 0.4 : 0.9, y: 0 }}
              className="mt-2 px-3 py-1 rounded-full bg-loy-midnight/80 border border-loy-gold/40 text-[11px] text-loy-gold max-w-[200px] truncate shadow-lg"
            >
              ✨ "{userWish.text}"
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* 4. Top Floating Bar: Touch hint & View All River Wishes Drawer */}
      <div className="absolute top-20 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 pointer-events-none">
        <p className="text-[11px] text-loy-lavender/60 font-light hidden sm:block">
          {t.hintTouchRiver} • Tap any Krathong to read its wish
        </p>

        {/* Button to open River Wishes Drawer */}
        <button
          onClick={() => {
            soundEngine.playSoftClick();
            setIsDrawerOpen(true);
          }}
          className="pointer-events-auto ml-auto px-3.5 py-1.5 rounded-full glass-panel hover:bg-loy-purple/60 border border-loy-gold/30 text-loy-gold text-xs font-medium shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
          <span>River Wishes ({allWishes.length})</span>
        </button>
      </div>

      {/* 5. Poetic Completion Overlay Message */}
      <AnimatePresence>
        {showFinishedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute bottom-8 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-30 max-w-lg w-full text-center"
          >
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl border border-loy-gold/40">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-loy-purple/50 border border-loy-gold/30 text-loy-gold text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3 text-loy-gold" />
                <span>{t.badge}</span>
              </div>

              {/* Poetic Lines */}
              <h3 className="font-serif text-lg sm:text-xl font-bold text-loy-cream mb-1 text-glow-gold">
                "{t.moonQuote}"
              </h3>
              <p className="font-thai text-xl sm:text-2xl font-semibold text-loy-gold mb-5">
                "{t.thaiWishRealized}"
              </p>

              {/* Shareable Link Banner for Porpor */}
              <div className="mb-5 p-2.5 rounded-2xl bg-loy-indigo/40 border border-loy-pink/30 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-loy-pink text-left">
                  <Heart className="w-3.5 h-3.5 fill-loy-pink text-loy-pink flex-shrink-0" />
                  <span className="text-[11px] leading-tight">
                    Share your Krathong link with Porpor
                  </span>
                </div>
                <button
                  onClick={handleCopyShareLink}
                  className="px-3 py-1 rounded-xl bg-loy-pink/20 hover:bg-loy-pink/40 border border-loy-pink text-loy-cream text-xs font-medium flex items-center space-x-1 transition-all cursor-pointer shadow-xs"
                >
                  <Copy className="w-3 h-3 text-loy-pink" />
                  <span>{copiedShareLink ? 'Copied! ✓' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    soundEngine.playCandleIgnition();
                    onOpenLetter();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-loy-pink via-[#F8BBD0] to-loy-gold text-[#10152B] font-semibold text-xs sm:text-sm tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#10152B]" />
                  <span>{t.readLetterBtn}</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playSoftClick();
                    onProceedToCelebration();
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full glass-panel hover:bg-loy-purple/60 border border-loy-lavender/30 text-loy-cream text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-loy-gold" />
                  <span>{t.continueCelebrationBtn}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal to inspect any floating Krathong's wish */}
      <WishDetailModal
        wish={inspectWish}
        onClose={() => setInspectWish(null)}
      />

      {/* Drawer showing all river wishes */}
      <RiverWishesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        wishes={allWishes}
        onSelectWish={(w) => {
          setIsDrawerOpen(false);
          setInspectWish(w);
        }}
      />
    </section>
  );
};
