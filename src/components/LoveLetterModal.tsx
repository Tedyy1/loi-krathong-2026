import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Globe, Stamp } from 'lucide-react';
import { Language } from '../types';
import { PERSONAL_CONFIG } from '../config/personalization';
import { soundEngine } from '../utils/audio';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLang: Language;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  defaultLang,
}) => {
  const [letterLang, setLetterLang] = useState<Language>(defaultLang);

  if (!isOpen) return null;

  const currentLetter = PERSONAL_CONFIG.letter[letterLang];

  const handleClose = () => {
    soundEngine.playSoftClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#090D1C]/85 backdrop-blur-md"
        />

        {/* Romantic Letter Envelope / Parchment Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-xl w-full my-auto"
        >
          {/* Subtle Golden Glow behind the letter */}
          <div className="absolute -inset-2 bg-gradient-to-r from-loy-gold/30 via-loy-pink/25 to-loy-gold/30 rounded-3xl blur-xl pointer-events-none" />

          {/* Letter parchment container */}
          <div className="relative bg-[#FFFDF9] text-[#2D241E] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border-2 border-[#D4AF37]/50 overflow-hidden">
            {/* Elegant Vintage Corner Motifs */}
            <div className="absolute top-3 left-3 text-[#D4AF37]/60 text-xs pointer-events-none">
              ❦
            </div>
            <div className="absolute top-3 right-10 text-[#D4AF37]/60 text-xs pointer-events-none">
              ❦
            </div>
            <div className="absolute bottom-3 left-3 text-[#D4AF37]/60 text-xs pointer-events-none">
              ❦
            </div>
            <div className="absolute bottom-3 right-3 text-[#D4AF37]/60 text-xs pointer-events-none">
              ❦
            </div>

            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F5EEDB] hover:bg-[#EAE0CA] text-[#7A5B1C] transition-colors cursor-pointer"
              title="Close Letter"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Seal Stamp & Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FBF3E4] border border-[#D4AF37]/40 text-[#8C6A1C] text-[11px] font-medium mb-3">
                <Stamp className="w-3 h-3 text-[#C2185B]" />
                <span>Loy Krathong Love Letter 2026</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1710] tracking-tight">
                A Little Message Just for You ♡
              </h2>

              {/* Language Switcher for the letter */}
              <div className="inline-flex items-center space-x-1 mt-3 px-2 py-1 rounded-full bg-[#F5EEE4] border border-[#E3D6C5]">
                <Globe className="w-3 h-3 text-[#8C6A1C] ml-1" />
                {(['th', 'en', 'id'] as Language[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      soundEngine.playSoftClick();
                      setLetterLang(code);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
                      letterLang === code
                        ? 'bg-[#8C6A1C] text-[#FFFDF9]'
                        : 'text-[#695748] hover:text-[#1F1710]'
                    }`}
                  >
                    {code === 'th' ? 'ไทย' : code === 'en' ? 'EN' : 'ID'}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter Body: Rendered with intimate typography */}
            <div className="space-y-4 my-6 text-[#382D24] font-thai leading-relaxed border-t border-b border-[#F0E4D3] py-6 max-h-[50vh] overflow-y-auto px-2">
              {/* Salutation */}
              <h3 className="font-semibold text-base sm:text-lg text-[#1F1710] flex items-center space-x-2">
                <span>{currentLetter.salutation}</span>
                <Heart className="w-4 h-4 text-[#C2185B] fill-[#C2185B]" />
              </h3>

              {/* Paragraphs */}
              {currentLetter.body.map((para, idx) => (
                <motion.p
                  key={`${letterLang}-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="text-sm sm:text-base font-light text-[#4A3D33]"
                >
                  {para}
                </motion.p>
              ))}

              {/* Closing */}
              <div className="pt-4 text-right">
                <p className="text-xs sm:text-sm text-[#7A6453] italic font-serif">
                  {currentLetter.closing}
                </p>
                <p className="font-serif text-base sm:text-lg font-bold text-[#8C6A1C] mt-1 flex items-center justify-end space-x-1">
                  <span>{currentLetter.sender}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                </p>
              </div>
            </div>

            {/* Romantic Wax Stamp Visual */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2 text-[11px] text-[#8C7662]">
                <span className="w-6 h-6 rounded-full bg-[#BE123C] text-white flex items-center justify-center font-serif text-[10px] font-bold shadow-sm">
                  Y♡R
                </span>
                <span>Sealed with love • 24 Nov 2026</span>
              </div>

              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C99738] text-[#1F1710] font-semibold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Keep In My Heart ♡
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
