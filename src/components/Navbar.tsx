import React, { useState } from 'react';
import { Volume2, VolumeX, Mail, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { soundEngine } from '../utils/audio';
import { PERSONAL_CONFIG } from '../config/personalization';
import { UI_TEXT } from '../utils/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenLetter: () => void;
  isLetterRead?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenLetter,
  isLetterRead = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(soundEngine.isAudioPlaying());
  const [volume, setVolume] = useState(soundEngine.getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = UI_TEXT[currentLang];

  const handleToggleSound = () => {
    const newState = soundEngine.toggleMusic();
    setIsPlaying(newState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
    if (!isPlaying && val > 0) {
      soundEngine.startMusic();
      setIsPlaying(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-panel rounded-full px-4 sm:px-6 py-2.5">
        {/* Brand / Couple dedication */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-loy-purple to-loy-gold flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-loy-cream animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-loy-gold">
                {PERSONAL_CONFIG.event.titleEn}
              </span>
              <span className="text-[10px] sm:text-xs text-loy-pink">♡</span>
            </div>
            <div className="text-[10px] text-loy-lavender/80 hidden sm:block">
              For {PERSONAL_CONFIG.couple.receiverNickname} from {PERSONAL_CONFIG.couple.senderName}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Audio Synthesizer Controls */}
          <div
            className="relative flex items-center"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button
              onClick={handleToggleSound}
              aria-label="Toggle Sound"
              className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                isPlaying
                  ? 'bg-loy-gold/20 text-loy-gold border border-loy-gold/40 shadow-[0_0_12px_rgba(245,213,139,0.3)]'
                  : 'bg-loy-indigo/40 text-loy-cream/70 hover:text-loy-gold border border-loy-lavender/10'
              }`}
              title={isPlaying ? t.nav.musicOff : t.nav.musicOn}
            >
              {isPlaying ? (
                <div className="flex items-center space-x-1.5">
                  <Volume2 className="w-4 h-4 text-loy-gold" />
                  <span className="flex space-x-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-loy-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-0.5 h-3 bg-loy-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-0.5 h-1.5 bg-loy-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Volume slider tooltip on desktop */}
            {showVolumeSlider && (
              <div className="absolute right-0 top-full mt-2 p-2.5 glass-panel rounded-xl shadow-xl flex items-center space-x-2 z-50">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-loy-gold h-1 bg-loy-indigo/80 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-loy-cream/80 w-6">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* Love Letter Quick Button */}
          <button
            onClick={onOpenLetter}
            className="relative p-2 rounded-full bg-loy-purple/40 hover:bg-loy-purple/70 text-loy-pink border border-loy-pink/30 hover:border-loy-pink transition-all duration-300 flex items-center space-x-1.5"
            title={t.nav.letterTooltip}
          >
            <Mail className="w-4 h-4" />
            <span className="text-xs font-medium hidden md:inline text-loy-pink">
              Letter ♡
            </span>
            {!isLetterRead && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-loy-pink rounded-full animate-ping" />
            )}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="px-2.5 py-1.5 rounded-full bg-loy-indigo/60 hover:bg-loy-indigo text-loy-cream/90 border border-loy-lavender/20 flex items-center space-x-1 text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-loy-lavender" />
              <span className="font-medium uppercase">{currentLang}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-36 glass-panel rounded-xl p-1.5 shadow-2xl flex flex-col space-y-1 z-50">
                {[
                  { code: 'th', label: 'ไทย (Thai)' },
                  { code: 'en', label: 'English' },
                  { code: 'id', label: 'Indonesia' },
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code as Language);
                      setShowLangMenu(false);
                      soundEngine.playSoftClick();
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      currentLang === item.code
                        ? 'bg-loy-purple/60 text-loy-gold font-medium'
                        : 'text-loy-cream/80 hover:bg-loy-indigo/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    {currentLang === item.code && <span className="text-loy-gold">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
