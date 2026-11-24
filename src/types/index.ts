export type Language = 'th' | 'en' | 'id';

export type KrathongBaseType = 'banana-leaf' | 'pink-lotus' | 'golden-flower' | 'purple-royal';

export type FlowerType = 'pink-lotus' | 'white-jasmine' | 'yellow-marigold' | 'purple-orchid' | 'rose-petals';

export type CandleType = 'golden' | 'pink' | 'white' | 'lavender';

export interface ExtraDecorations {
  incense: boolean; // 3 traditional Thai incense sticks
  flowerPetals: boolean;
  goldFoil: boolean;
  miniLotuses: boolean;
  heartOrnaments: boolean;
}

export interface KrathongCustomization {
  base: KrathongBaseType;
  flower: FlowerType;
  candle: CandleType;
  decorations: ExtraDecorations;
  isLit: boolean;
}

export type PresetWish = 
  | 'happiness' 
  | 'health' 
  | 'luck' 
  | 'love' 
  | 'dreams' 
  | 'together';

export interface UserWishData {
  id: string;
  text: string;
  presetTags: PresetWish[];
  senderName: string;
  receiverName: string;
  krathongConfig?: KrathongCustomization;
  createdAt: number;
  isSpecialRionn?: boolean;
}

export type SceneStep = 
  | 'intro'         // Opening cinematic invitation screen
  | 'hero'          // Festival overview & start button
  | 'creator'       // Crafting the custom Krathong
  | 'wish'          // Writing wish on parchment
  | 'light'         // Dim scene: lighting the candle with realistic sparks
  | 'floating'      // Floating in the river with ripples, camera zoom, lanterns
  | 'letter'        // Love letter modal / page
  | 'final';        // Celebration scene with options to replay
