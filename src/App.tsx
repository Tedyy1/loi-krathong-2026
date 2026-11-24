import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Language, SceneStep, KrathongCustomization, UserWishData } from './types';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { OpeningScreen } from './components/OpeningScreen';
import { HeroSection } from './components/HeroSection';
import { KrathongCreator } from './components/KrathongCreator';
import { MakeWishScene } from './components/MakeWishScene';
import { LightCandleScene } from './components/LightCandleScene';
import { FloatingRiverScene } from './components/FloatingRiverScene';
import { FinalScene } from './components/FinalScene';
import { LoveLetterModal } from './components/LoveLetterModal';
import { WishDetailModal } from './components/WishDetailModal';
import { wishStore, decodeWishFromUrl } from './utils/wishStore';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('th');
  const [currentStep, setCurrentStep] = useState<SceneStep>('intro');
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isLetterRead, setIsLetterRead] = useState(false);
  const [incomingWishAlert, setIncomingWishAlert] = useState<UserWishData | null>(null);
  const [inspectWishModal, setInspectWishModal] = useState<UserWishData | null>(null);

  // User's customizable Krathong
  const [krathongConfig, setKrathongConfig] = useState<KrathongCustomization>({
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

  // User's written wish
  const [userWish, setUserWish] = useState<UserWishData | null>(null);

  // Check URL query parameters on mount (e.g. ?w=... sent from Rionn to Porpor)
  useEffect(() => {
    // 1. Check for incoming shared wish in URL param
    const params = new URLSearchParams(window.location.search);
    const encodedWish = params.get('w');
    if (encodedWish) {
      const decoded = decodeWishFromUrl(encodedWish);
      if (decoded) {
        wishStore.importWish(decoded);
        setIncomingWishAlert(decoded);
      }
    }

    // 2. Restore user's own wish from store
    const myWish = wishStore.getMyWish();
    if (myWish) {
      setUserWish(myWish);
    }
  }, []);

  const handleOpenLetter = () => {
    setIsLetterOpen(true);
    setIsLetterRead(true);
  };

  const handleCloseLetter = () => {
    setIsLetterOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#10152B] text-[#FFF6E9] overflow-x-hidden select-none">
      {/* Delicate trailing star/heart cursor for desktop */}
      <CustomCursor />

      {/* Floating Navigation Header (visible after opening screen) */}
      {currentStep !== 'intro' && (
        <Navbar
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          onOpenLetter={handleOpenLetter}
          isLetterRead={isLetterRead}
        />
      )}

      {/* Sweet Incoming Wish Toast Banner (When opened via shared link) */}
      <AnimatePresence>
        {incomingWishAlert && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-18 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 z-50 max-w-md w-full"
          >
            <div
              onClick={() => {
                setInspectWishModal(incomingWishAlert);
                setIncomingWishAlert(null);
              }}
              className="glass-panel-gold rounded-2xl p-3 sm:px-4 flex items-center justify-between border border-loy-pink shadow-xl cursor-pointer hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-loy-pink/20 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-loy-pink fill-loy-pink" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-loy-cream">
                    {incomingWishAlert.senderName} sent you a Krathong!
                  </p>
                  <p className="text-[11px] text-loy-gold line-clamp-1">
                    "{incomingWishAlert.text}"
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-loy-gold text-loy-midnight text-[11px] font-semibold flex items-center space-x-1 flex-shrink-0">
                <Sparkles className="w-3 h-3" />
                <span>View</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Scenes Orchestration */}
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {/* 1. Opening Fullscreen Screen */}
          {currentStep === 'intro' && (
            <OpeningScreen
              key="scene-intro"
              currentLang={currentLang}
              onEnter={() => setCurrentStep('hero')}
            />
          )}

          {/* 2. Main Hero Section */}
          {currentStep === 'hero' && (
            <motion.div
              key="scene-hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <HeroSection
                currentLang={currentLang}
                onStartCrafting={() => setCurrentStep('creator')}
                onOpenLetter={handleOpenLetter}
              />
            </motion.div>
          )}

          {/* 3. Interactive Krathong Creator Workshop */}
          {currentStep === 'creator' && (
            <motion.div
              key="scene-creator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <KrathongCreator
                currentLang={currentLang}
                onProceedToWish={(config) => {
                  setKrathongConfig(config);
                  setCurrentStep('wish');
                }}
              />
            </motion.div>
          )}

          {/* 4. Make a Wish on the Parchment Card */}
          {currentStep === 'wish' && (
            <motion.div
              key="scene-wish"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <MakeWishScene
                currentLang={currentLang}
                krathongConfig={krathongConfig}
                onWishSaved={(wish) => {
                  setUserWish(wish);
                  setCurrentStep('light');
                }}
                onBackToCreator={() => setCurrentStep('creator')}
              />
            </motion.div>
          )}

          {/* 5. Light the Candle Scene */}
          {currentStep === 'light' && (
            <motion.div
              key="scene-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <LightCandleScene
                currentLang={currentLang}
                krathongConfig={krathongConfig}
                onProceedToFloat={(litConfig) => {
                  setKrathongConfig(litConfig);
                  setCurrentStep('floating');
                }}
              />
            </motion.div>
          )}

          {/* 6. Floating River Simulation */}
          {currentStep === 'floating' && (
            <motion.div
              key="scene-floating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <FloatingRiverScene
                currentLang={currentLang}
                krathongConfig={krathongConfig}
                userWish={userWish}
                onOpenLetter={handleOpenLetter}
                onProceedToCelebration={() => setCurrentStep('final')}
              />
            </motion.div>
          )}

          {/* 7. Final Scene & Panorama Celebration */}
          {currentStep === 'final' && (
            <motion.div
              key="scene-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <FinalScene
                currentLang={currentLang}
                onReplayFromStart={() => {
                  setKrathongConfig((prev) => ({ ...prev, isLit: false }));
                  setCurrentStep('intro');
                }}
                onReadLetterAgain={handleOpenLetter}
                onMakeAnotherWish={() => {
                  setKrathongConfig((prev) => ({ ...prev, isLit: false }));
                  setCurrentStep('creator');
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Love Letter Modal (accessible anytime via Nav button or journey trigger) */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={handleCloseLetter}
        defaultLang={currentLang}
      />

      {/* Wish Detail Modal for inspecting incoming/floating wishes */}
      <WishDetailModal
        wish={inspectWishModal}
        onClose={() => setInspectWishModal(null)}
      />
    </div>
  );
}

export default App;
