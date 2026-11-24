import { UserWishData, KrathongCustomization } from '../types';
import { PERSONAL_CONFIG } from '../config/personalization';

const STORAGE_KEY = 'loy_krathong_all_wishes_2026';
const MY_WISH_KEY = 'loy_krathong_my_wish_2026';

// Pre-seeded special wish from Rionn dedicated to Yuqii / Porpor
export const DEFAULT_RIONN_WISH: UserWishData = {
  id: 'wish-rionn-special-2026',
  senderName: PERSONAL_CONFIG.couple.senderName, // "rionn"
  receiverName: PERSONAL_CONFIG.couple.receiverNickname, // "Yuqii / Porpor"
  text: 'ขอให้รอยยิ้มที่น่ารักของ Porpor สว่างไสวในทุก ๆ วันนะ... แม้เราจะอยู่ห่างกัน แต่ฉันจะรักและอยู่เคียงข้างเธอเสมอ คืนนี้ขอให้ความฝันของเธอเป็นจริงทุกประการ ♡',
  presetTags: ['happiness', 'love', 'dreams', 'together'],
  createdAt: Date.now() - 1000 * 60 * 30, // 30 mins ago
  isSpecialRionn: true,
  krathongConfig: {
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
  },
};

// Initial community wishes on the festival river
const INITIAL_FESTIVAL_WISHES: UserWishData[] = [
  DEFAULT_RIONN_WISH,
  {
    id: 'wish-festival-1',
    senderName: 'Mali (มะลิ)',
    receiverName: 'Family',
    text: 'ขอให้ครอบครัวทุกคนมีความสุข สุขภาพแข็งแรง ไร้โรคภัยตลอดปี ๒๕๖๙',
    presetTags: ['happiness', 'health'],
    createdAt: Date.now() - 1000 * 60 * 55,
    krathongConfig: {
      base: 'golden-flower',
      flower: 'white-jasmine',
      candle: 'golden',
      decorations: { incense: true, flowerPetals: true, goldFoil: true, miniLotuses: false, heartOrnaments: false },
      isLit: true,
    },
  },
  {
    id: 'wish-festival-2',
    senderName: 'Somchai & Anong',
    receiverName: 'Everyone',
    text: 'May our love float gently like this candle in the night sky. Happy Loy Krathong!',
    presetTags: ['love', 'luck'],
    createdAt: Date.now() - 1000 * 60 * 90,
    krathongConfig: {
      base: 'pink-lotus',
      flower: 'rose-petals',
      candle: 'pink',
      decorations: { incense: true, flowerPetals: true, goldFoil: false, miniLotuses: true, heartOrnaments: true },
      isLit: true,
    },
  },
  {
    id: 'wish-festival-3',
    senderName: 'Nong Ploy',
    receiverName: 'Future Self',
    text: 'ขอให้ปีนี้สอบผ่านทุกวิชา ได้ทำสิ่งที่รัก และยิ้มได้เยอะๆ ในทุกวัน ✨',
    presetTags: ['dreams', 'luck'],
    createdAt: Date.now() - 1000 * 60 * 120,
    krathongConfig: {
      base: 'purple-royal',
      flower: 'purple-orchid',
      candle: 'lavender',
      decorations: { incense: true, flowerPetals: true, goldFoil: true, miniLotuses: false, heartOrnaments: false },
      isLit: true,
    },
  },
];

// Helper to encode a wish into a shareable URL string
export function encodeWishToUrl(wish: UserWishData): string {
  try {
    const jsonStr = JSON.stringify({
      id: wish.id,
      text: wish.text,
      sender: wish.senderName,
      receiver: wish.receiverName,
      presets: wish.presetTags,
      config: wish.krathongConfig,
      created: wish.createdAt,
    });
    return btoa(encodeURIComponent(jsonStr));
  } catch {
    return '';
  }
}

// Helper to decode a wish from a URL string
export function decodeWishFromUrl(encoded: string): UserWishData | null {
  try {
    const jsonStr = decodeURIComponent(atob(encoded));
    const data = JSON.parse(jsonStr);
    return {
      id: data.id || `wish-url-${Date.now()}`,
      text: data.text || '',
      senderName: data.sender || PERSONAL_CONFIG.couple.senderName,
      receiverName: data.receiver || PERSONAL_CONFIG.couple.receiverNickname,
      presetTags: data.presets || ['love', 'happiness'],
      krathongConfig: data.config,
      createdAt: data.created || Date.now(),
      isSpecialRionn: (data.sender || '').toLowerCase().includes('rionn'),
    };
  } catch {
    return null;
  }
}

// Cloud sync endpoint fallback using public JSON/KV storage
const PUBLIC_SYNC_URL = 'https://api.counterapi.dev/v1/loy_krathong_2026_wishes/sync';

export const wishStore = {
  // Get all floating wishes
  getAllWishes(): UserWishData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: UserWishData[] = JSON.parse(stored);
        // Ensure Rionn's default wish is always included if missing
        if (!parsed.some((w) => w.id === DEFAULT_RIONN_WISH.id)) {
          parsed.unshift(DEFAULT_RIONN_WISH);
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_FESTIVAL_WISHES;
  },

  // Save a new wish
  saveWish(wish: UserWishData): UserWishData[] {
    const wishes = this.getAllWishes();
    const existingIdx = wishes.findIndex((w) => w.id === wish.id);
    if (existingIdx >= 0) {
      wishes[existingIdx] = wish;
    } else {
      wishes.unshift(wish);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
      localStorage.setItem(MY_WISH_KEY, JSON.stringify(wish));
    } catch {
      // ignore
    }

    // Attempt optional background cloud broadcast
    this.broadcastToCloud(wish);

    return wishes;
  },

  // Get user's own created wish
  getMyWish(): UserWishData | null {
    try {
      const stored = localStorage.getItem(MY_WISH_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return null;
  },

  // Import a wish (e.g. from URL deep link)
  importWish(wish: UserWishData): boolean {
    const wishes = this.getAllWishes();
    const exists = wishes.some((w) => w.id === wish.id || (w.text === wish.text && w.senderName === wish.senderName));
    if (!exists) {
      wishes.unshift(wish);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  },

  // Generate shareable link
  generateShareUrl(wish: UserWishData): string {
    const encoded = encodeWishToUrl(wish);
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('w', encoded);
    return url.toString();
  },

  // Async cloud sync for public visibility across devices
  async broadcastToCloud(wish: UserWishData) {
    try {
      // In addition to URL sharing, we can send to a serverless /api/wishes endpoint when deployed to Vercel
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wish),
      }).catch(() => {
        // Fallback gracefully if /api/wishes is not configured
      });
    } catch {
      // Offline fallback
    }
  },

  // Fetch online wishes from server/cloud if available
  async fetchRemoteWishes(): Promise<UserWishData[]> {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const remoteData: UserWishData[] = await res.json();
        if (Array.isArray(remoteData) && remoteData.length > 0) {
          const current = this.getAllWishes();
          const merged = [...remoteData];
          current.forEach((w) => {
            if (!merged.some((m) => m.id === w.id)) {
              merged.push(w);
            }
          });
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
      }
    } catch {
      // Offline / client-only fallback
    }
    return this.getAllWishes();
  },
};
