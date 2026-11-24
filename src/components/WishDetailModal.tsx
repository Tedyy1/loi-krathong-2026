import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Calendar } from 'lucide-react';
import { UserWishData } from '../types';
import { KrathongPreview } from './KrathongPreview';
import { soundEngine } from '../utils/audio';

interface WishDetailModalProps {
  wish: UserWishData | null;
  onClose: () => void;
}

export const WishDetailModal: React.FC<WishDetailModalProps> = ({ wish, onClose }) => {
  if (!wish) return null;

  const handleClose = () => {
    soundEngine.playSoftClick();
    onClose();
  };

  const formattedDate = new Date(wish.createdAt).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#090D1C]/80 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10 max-w-md w-full my-auto"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-loy-gold/40 via-loy-pink/30 to-loy-gold/40 rounded-3xl blur-lg pointer-events-none" />

          <div className="relative bg-[#FFFDF9] text-[#2D241E] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-loy-gold/50 overflow-hidden">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#F5EEDB] hover:bg-[#EAE0CA] text-[#7A5B1C] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Badge */}
            <div className="text-center mb-4">
              <div
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  wish.isSpecialRionn
                    ? 'bg-rose-100 text-rose-800 border border-rose-300'
                    : 'bg-[#FBF3E4] text-[#8C6A1C] border border-[#D4AF37]/40'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-loy-gold" />
                <span>
                  {wish.isSpecialRionn ? 'Special Wish From Rionn ♡' : 'Floating River Wish'}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1710]">
                {wish.senderName}
              </h3>

              {wish.receiverName && (
                <p className="text-xs text-[#8C7662] mt-0.5 flex items-center justify-center space-x-1">
                  <span>For:</span>
                  <strong className="text-[#C2185B]">{wish.receiverName}</strong>
                  <Heart className="w-3 h-3 text-[#C2185B] fill-[#C2185B] inline" />
                </p>
              )}
            </div>

            {/* Krathong Preview if available */}
            {wish.krathongConfig && (
              <div className="flex justify-center -my-4 scale-75 transform-gpu pointer-events-none">
                <KrathongPreview config={wish.krathongConfig} size={260} showWaterGlow={false} />
              </div>
            )}

            {/* Wish Text Box */}
            <div className="bg-[#FFF8EE] rounded-2xl p-4 border border-[#EEDBBA] my-4 shadow-inner">
              <p className="font-thai text-sm sm:text-base text-[#3D3025] leading-relaxed text-center italic">
                "{wish.text}"
              </p>
            </div>

            {/* Preset Tags */}
            {wish.presetTags && wish.presetTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                {wish.presetTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#F5EEDB] text-[#7A5B1C] text-[11px] font-medium capitalize"
                  >
                    ✨ {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer Date */}
            <div className="flex items-center justify-between text-[11px] text-[#A08B77] pt-2 border-t border-[#F0E4D3]">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </span>
              <span>Loy Krathong Festival 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
