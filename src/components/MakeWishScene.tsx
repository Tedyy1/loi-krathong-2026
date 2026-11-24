import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowLeft, Check, Feather, Share2, Copy } from 'lucide-react';
import { Language, PresetWish, UserWishData, KrathongCustomization } from '../types';
import { UI_TEXT } from '../utils/translations';
import { soundEngine } from '../utils/audio';
import { PERSONAL_CONFIG } from '../config/personalization';
import { wishStore } from '../utils/wishStore';

interface MakeWishSceneProps {
  currentLang: Language;
  krathongConfig: KrathongCustomization;
  onWishSaved: (wish: UserWishData) => void;
  onBackToCreator: () => void;
}

export const MakeWishScene: React.FC<MakeWishSceneProps> = ({
  currentLang,
  krathongConfig,
  onWishSaved,
  onBackToCreator,
}) => {
  const t = UI_TEXT[currentLang].wish;

  const [wishText, setWishText] = useState('');
  const [senderName, setSenderName] = useState(PERSONAL_CONFIG.couple.senderName);
  const [receiverName, setReceiverName] = useState(PERSONAL_CONFIG.couple.receiverNickname);
  const [selectedPresets, setSelectedPresets] = useState<PresetWish[]>(['happiness', 'love', 'dreams']);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load from wishStore or localStorage if present
  useEffect(() => {
    const existing = wishStore.getMyWish();
    if (existing) {
      if (existing.text) setWishText(existing.text);
      if (existing.senderName) setSenderName(existing.senderName);
      if (existing.receiverName) setReceiverName(existing.receiverName);
      if (existing.presetTags) setSelectedPresets(existing.presetTags);
    }
  }, []);

  const togglePreset = (key: PresetWish) => {
    soundEngine.playSoftClick();
    setSelectedPresets((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playCandleIgnition();

    const data: UserWishData = {
      id: `wish-${Date.now()}`,
      text: wishText.trim() || 'ขอให้มีความสุขและรอยยิ้มที่สดใสเสมอในทุก ๆ วันนะ ♡',
      senderName: senderName.trim() || PERSONAL_CONFIG.couple.senderName,
      receiverName: receiverName.trim() || PERSONAL_CONFIG.couple.receiverNickname,
      presetTags: selectedPresets,
      krathongConfig: krathongConfig,
      createdAt: Date.now(),
      isSpecialRionn: senderName.toLowerCase().includes('rionn'),
    };

    wishStore.saveWish(data);
    const link = wishStore.generateShareUrl(data);
    setShareUrl(link);
    setShowSavedToast(true);

    setTimeout(() => {
      onWishSaved(data);
    }, 700);
  };

  const handleCopyLink = () => {
    if (!shareUrl) {
      const data: UserWishData = {
        id: `wish-${Date.now()}`,
        text: wishText.trim() || 'ขอให้มีความสุขและรอยยิ้มที่สดใสเสมอในทุก ๆ วันนะ ♡',
        senderName: senderName.trim() || PERSONAL_CONFIG.couple.senderName,
        receiverName: receiverName.trim() || PERSONAL_CONFIG.couple.receiverNickname,
        presetTags: selectedPresets,
        krathongConfig: krathongConfig,
        createdAt: Date.now(),
        isSpecialRionn: senderName.toLowerCase().includes('rionn'),
      };
      const link = wishStore.generateShareUrl(data);
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
      return;
    }

    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 flex items-center justify-center">
      {/* Background starlight atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10152B] via-[#1B2245] to-[#10152B] pointer-events-none" />

      {/* Romantic Golden Parchment Letter Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full"
      >
        {/* Soft Backing Outer Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-loy-gold/25 via-loy-pink/20 to-loy-gold/25 rounded-3xl blur-xl" />

        <div className="relative bg-[#FFF9F0] text-[#2C241B] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-loy-gold/50 overflow-hidden">
          {/* Thai corner golden ornamental accents */}
          <div className="absolute top-3 left-3 text-loy-gold/60 pointer-events-none text-xs">❖</div>
          <div className="absolute top-3 right-3 text-loy-gold/60 pointer-events-none text-xs">❖</div>
          <div className="absolute bottom-3 left-3 text-loy-gold/60 pointer-events-none text-xs">❖</div>
          <div className="absolute bottom-3 right-3 text-loy-gold/60 pointer-events-none text-xs">❖</div>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#F5EEDB] border border-loy-gold/40 text-[#8C6A1C] text-[11px] font-medium mb-3">
              <Sparkles className="w-3 h-3 text-loy-gold" />
              <span>{t.badge}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1710] tracking-tight mb-2">
              {t.title}
            </h2>

            {/* Thai quote */}
            <p className="font-thai text-base sm:text-lg font-medium text-[#7A5B1C] mb-1">
              "{t.thaiQuote}"
            </p>
            <p className="text-xs text-[#827161] italic font-serif">
              "{t.subQuote}"
            </p>
          </div>

          <form onSubmit={handleSaveAndProceed} className="space-y-5">
            {/* Sender & Receiver Input Rows */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#574332] mb-1">
                  From (ผู้ส่ง)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name (Rionn)"
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#E0D3C1] text-xs font-thai text-[#2C241B] outline-none focus:border-[#C99738]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#574332] mb-1">
                  For (ผู้รับ)
                </label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Yuqii / Porpor"
                  className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#E0D3C1] text-xs font-thai text-[#2C241B] outline-none focus:border-[#C99738]"
                />
              </div>
            </div>

            {/* Wish Textarea */}
            <div className="relative">
              <label className="block text-xs font-semibold text-[#574332] mb-1.5 flex items-center justify-between">
                <span className="flex items-center space-x-1">
                  <Feather className="w-3.5 h-3.5 text-[#8C6A1C]" />
                  <span>Your Personal Wish & Blessing</span>
                </span>
                <span className="text-[10px] text-[#A08873]">Saved online for Porpor ♡</span>
              </label>

              <textarea
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder={t.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-[#FFFDF9] border border-[#E0D3C1] focus:border-[#C99738] focus:ring-2 focus:ring-[#C99738]/20 text-[#2C241B] text-sm font-thai leading-relaxed placeholder-[#B4A596] outline-none resize-none transition-all shadow-inner"
              />
            </div>

            {/* Preset Blessing Pills */}
            <div>
              <p className="text-xs font-semibold text-[#574332] mb-2">
                {t.presetHeading}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { key: 'happiness' as const, label: t.presets.happiness, icon: '✨' },
                  { key: 'health' as const, label: t.presets.health, icon: '🌿' },
                  { key: 'luck' as const, label: t.presets.luck, icon: '🍀' },
                  { key: 'love' as const, label: t.presets.love, icon: '💖' },
                  { key: 'dreams' as const, label: t.presets.dreams, icon: '🌙' },
                  { key: 'together' as const, label: t.presets.together, icon: '💍' },
                ].map((item) => {
                  const isSelected = selectedPresets.includes(item.key);
                  return (
                    <button
                      type="button"
                      key={item.key}
                      onClick={() => togglePreset(item.key)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-thai font-medium border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F5D58B]/40 border-[#C99738] text-[#543A0C] shadow-xs'
                          : 'bg-[#FFFDF9] border-[#E8DDCE] text-[#695748] hover:bg-[#F9F3EA]'
                      }`}
                    >
                      <span className="flex items-center space-x-1 truncate">
                        <span>{item.icon}</span>
                        <span className="truncate">{item.label}</span>
                      </span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-[#543A0C] flex-shrink-0 ml-1 stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Share Link Banner */}
            <div className="p-3 rounded-2xl bg-[#F5EEDB] border border-loy-gold/40 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-[#695748]">
                <Share2 className="w-4 h-4 text-[#8C6A1C] flex-shrink-0" />
                <span className="text-[11px] font-medium leading-tight">
                  Shareable link for Porpor so she sees your Krathong floating!
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl bg-[#8C6A1C] hover:bg-[#735515] text-[#FFF9F0] text-xs font-medium flex items-center space-x-1 transition-all cursor-pointer shadow-xs flex-shrink-0"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedLink ? 'Copied! ✓' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Couple watermark note */}
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#8C7662]">
              <Heart className="w-3 h-3 text-[#C2185B] fill-[#C2185B]" />
              <span>Written with love under the full moon for Yuqii/Porpor</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={onBackToCreator}
                className="px-4 py-3 rounded-2xl border border-[#D9CBBA] text-[#695748] hover:bg-[#F5EEE3] text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.backBtn}</span>
              </button>

              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5D58B] to-[#C99738] text-[#1F1710] font-semibold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.saveBtn}</span>
                <Sparkles className="w-4 h-4 text-[#1F1710]" />
              </button>
            </div>
          </form>

          {/* Saved Toast */}
          {showSavedToast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#1F1710] text-[#FFF6E9] text-xs shadow-lg flex items-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5 text-loy-gold" />
              <span>{t.savedToast}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
