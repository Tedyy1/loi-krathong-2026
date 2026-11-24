import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Flower2 } from 'lucide-react';
import { UserWishData } from '../types';
import { soundEngine } from '../utils/audio';

interface RiverWishesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: UserWishData[];
  onSelectWish: (wish: UserWishData) => void;
}

export const RiverWishesDrawer: React.FC<RiverWishesDrawerProps> = ({
  isOpen,
  onClose,
  wishes,
  onSelectWish,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#090D1C]/70 backdrop-blur-xs"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md h-full bg-[#10152B] border-l border-loy-gold/30 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-loy-lavender/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Flower2 className="w-5 h-5 text-loy-gold animate-spin-slow" />
              <div>
                <h3 className="font-serif text-lg font-bold text-loy-cream">
                  Wishes in the River
                </h3>
                <p className="text-xs text-loy-lavender/70 font-thai">
                  คำอธิษฐานในสายน้ำ ({wishes.length})
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playSoftClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-loy-indigo/60 hover:bg-loy-indigo text-loy-cream/70 hover:text-loy-gold transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Wishes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  soundEngine.playSoftClick();
                  onSelectWish(w);
                }}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  w.isSpecialRionn
                    ? 'bg-gradient-to-r from-loy-purple/60 to-rose-950/60 border-loy-pink shadow-[0_0_15px_rgba(244,187,208,0.25)]'
                    : 'bg-loy-indigo/30 hover:bg-loy-indigo/60 border-loy-lavender/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif font-bold text-sm text-loy-cream">
                      {w.senderName}
                    </span>
                    {w.isSpecialRionn && (
                      <span className="px-2 py-0.5 rounded-full bg-loy-pink/20 text-loy-pink text-[10px] font-medium border border-loy-pink/30 flex items-center space-x-1">
                        <Heart className="w-2.5 h-2.5 fill-loy-pink" />
                        <span>Rionn's Wish</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-loy-lavender/50">
                    {new Date(w.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="font-thai text-xs text-loy-cream/90 line-clamp-2 leading-relaxed">
                  "{w.text}"
                </p>

                {w.receiverName && (
                  <div className="mt-2 text-[10px] text-loy-lavender/70 flex items-center space-x-1">
                    <span>For:</span>
                    <strong className="text-loy-gold">{w.receiverName}</strong>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 border-t border-loy-lavender/10 text-center bg-loy-midnight/60">
            <p className="text-[11px] text-loy-lavender/60 flex items-center justify-center space-x-1">
              <Sparkles className="w-3 h-3 text-loy-gold" />
              <span>Tap any wish to open its full blessing card</span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
