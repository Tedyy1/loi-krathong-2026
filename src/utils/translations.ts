import { Language } from '../types';

export const UI_TEXT: Record<Language, {
  opening: {
    badge: string;
    title: string;
    thaiGreeting: string;
    invitation: string;
    enterBtn: string;
    soundHint: string;
  };
  hero: {
    badge: string;
    mainTitle: string;
    subtitle: string;
    distanceQuote: string;
    dateLabel: string;
    createKrathongBtn: string;
    openLetterBtn: string;
  };
  creator: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    tabBase: string;
    tabFlower: string;
    tabCandle: string;
    tabDecor: string;
    previewBadge: string;
    continueBtn: string;
    resetBtn: string;
    bases: {
      banana: { name: string; desc: string };
      lotus: { name: string; desc: string };
      golden: { name: string; desc: string };
      purple: { name: string; desc: string };
    };
    flowers: {
      lotus: string;
      jasmine: string;
      marigold: string;
      orchid: string;
      rose: string;
    };
    candles: {
      golden: string;
      pink: string;
      white: string;
      lavender: string;
    };
    decorations: {
      incense: string;
      flowerPetals: string;
      goldFoil: string;
      miniLotuses: string;
      heartOrnaments: string;
    };
  };
  wish: {
    badge: string;
    title: string;
    thaiQuote: string;
    subQuote: string;
    placeholder: string;
    presetHeading: string;
    presets: {
      happiness: string;
      health: string;
      luck: string;
      love: string;
      dreams: string;
      together: string;
    };
    saveBtn: string;
    backBtn: string;
    savedToast: string;
  };
  light: {
    badge: string;
    title: string;
    thaiQuote: string;
    instruction: string;
    lightBtn: string;
    floatBtn: string;
  };
  floating: {
    badge: string;
    moonQuote: string;
    thaiWishRealized: string;
    hintTouchRiver: string;
    readLetterBtn: string;
    continueCelebrationBtn: string;
  };
  letter: {
    title: string;
    stamp: string;
    closeBtn: string;
    languageToggle: string;
  };
  final: {
    badge: string;
    quote1: string;
    quote2Thai: string;
    quote3: string;
    btnReplay: string;
    btnReadLetter: string;
    btnMakeWish: string;
    footerText: string;
  };
  nav: {
    musicOn: string;
    musicOff: string;
    letterTooltip: string;
  };
}> = {
  th: {
    opening: {
      badge: "เทศกาลวันลอยกระทง ๒๕๖๙",
      title: "A Little Wish for You ♡",
      thaiGreeting: "สุขสันต์วันลอยกระทง",
      invitation: "คืนนี้... ฉันมีคำอธิษฐานหนึ่งที่อยากส่งให้เธอ",
      enterBtn: "Enter Our Magical Night ✨",
      soundHint: "กดเพื่อเปิดเสียงเพลงบรรเลงโรแมนติก",
    },
    hero: {
      badge: "Loy Krathong Festival 2026",
      mainTitle: "สุขสันต์วันลอยกระทงนะคนพิเศษของฉัน ♡",
      subtitle: "Tonight, I made a little magical world just for you.",
      distanceQuote: "Even though we might be miles apart, I wish we could celebrate this beautiful night together.",
      dateLabel: "๒๔ พฤศจิกายน ๒๕๖๙",
      createKrathongBtn: "Let's Make a Krathong ♡",
      openLetterBtn: "อ่านจดหมายของฉัน 💌",
    },
    creator: {
      sectionBadge: "เวิร์กช็อปกระทงพิเศษ",
      title: "Interactive Krathong Creator",
      subtitle: "ประดิษฐ์กระทงใบตองและดอกไม้อันงดงามด้วยมือเธอเอง",
      tabBase: "๑. แบบกระทง",
      tabFlower: "๒. ดอกไม้ประดับ",
      tabCandle: "๓. สีเทียน",
      tabDecor: "๔. ของตกแต่ง",
      previewBadge: "กระทงสดพร้อมลอย",
      continueBtn: "Create My Krathong ♡",
      resetBtn: "รีเซ็ตใหม่",
      bases: {
        banana: { name: "กระทงใบตองวิจิตร", desc: "กลีบใบตองพับมือแบบโบราณพร้อมฐานทองหรูหรา" },
        lotus: { name: "กระทงดอกบัวชมพู", desc: "กลีบบัวบานสีชมพูหวานละมุน อ่อนโยนและโรแมนติก" },
        golden: { name: "กระทงทองเรืองรอง", desc: "กลีบทองคำอร่ามและแสงประกายอบอุ่น" },
        purple: { name: "กระทงม่วงราชาวดี", desc: "ประดับด้วยดอกกล้วยไม้ม่วงหรูหรา สง่างาม" },
      },
      flowers: {
        lotus: "ดอกบัวหลวงชมพู (Pink Lotus)",
        jasmine: "ดอกมะลิหอมบริสุทธิ์ (White Jasmine)",
        marigold: "ดอกดาวเรืองมงคล (Yellow Marigold)",
        orchid: "ดอกกล้วยไม้ม่วง (Purple Orchid)",
        rose: "กลีบกุหลาบแดงแห่งความรัก (Rose Petals)",
      },
      candles: {
        golden: "เทียนทองนำโชค (Golden Candle)",
        pink: "เทียนชมพูโรแมนติก (Pink Candle)",
        white: "เทียนขาวบริสุทธิ์ (White Candle)",
        lavender: "เทียนลาเวนเดอร์นุ่มนวล (Lavender Candle)",
      },
      decorations: {
        incense: "ธูป ๓ ดอก (Traditional Incense)",
        flowerPetals: "กลีบดอกไม้โปรยรอบกระทง",
        goldFoil: "แผ่นทองคำเปลวประกายระยิบระยับ",
        miniLotuses: "ดอกบัวตูมจิ๋วเสริมมงคล",
        heartOrnaments: "หัวใจดวงน้อยสื่อรัก",
      },
    },
    wish: {
      badge: "การอธิษฐานใต้แสงจันทร์",
      title: "Make a Little Wish ✨",
      thaiQuote: "อธิษฐานสิ... แล้วส่งคำขอนั้นไปกับกระทงของเธอ",
      subQuote: "Make a wish... and send it away with your krathong.",
      placeholder: "Write your little wish here... เขียนคำอธิษฐานในใจของเธอที่นี่นะ...",
      presetHeading: "เลือกพรอธิษฐานยอดนิยม:",
      presets: {
        happiness: "ความสุขเปี่ยมล้น (Happiness)",
        health: "สุขภาพแข็งแรง (Good Health)",
        luck: "โชคดีตลอดไป (Good Luck)",
        love: "ความรักนิรันดร์ (Endless Love)",
        dreams: "ฝันเป็นจริงทุกประการ (Dreams Come True)",
        together: "ขอให้อยู่ด้วยกันตลอดไป (Together Forever)",
      },
      saveBtn: "Save My Wish ♡",
      backBtn: "แก้ไขกระทง",
      savedToast: "บันทึกคำอธิษฐานของคุณเรียบร้อยแล้ว ✨",
    },
    light: {
      badge: "จุดแสงสว่างแห่งความหวัง",
      title: "Every little light carries a beautiful wish.",
      thaiQuote: "ขอให้แสงเทียนดวงนี้นำพาความสุขมาให้เธอ",
      instruction: "แตะที่ปุ่มหรือตัวเทียนเพื่อจุดไฟให้กระทงของเธอส่องสว่างใต้แสงจันทร์",
      lightBtn: "Light the Candle 🕯️",
      floatBtn: "Let It Float on the River ♡",
    },
    floating: {
      badge: "สายน้ำแห่งความฝัน",
      moonQuote: "Your wish is now floating under the moonlight ✨",
      thaiWishRealized: "ขอให้คำอธิษฐานของเธอเป็นจริงนะ",
      hintTouchRiver: "✨ สัมผัสผิวน้ำเพื่อสร้างระลอกคลื่นและโปรยกลีบดอกไม้",
      readLetterBtn: "อ่านจดหมายจากฉัน 💌",
      continueCelebrationBtn: "ดูบรรยากาศค่ำคืนนี้ ✨",
    },
    letter: {
      title: "A Little Message Just for You ♡",
      stamp: "จากใจ Rionn ถึง Yuqii/Porpor",
      closeBtn: "เก็บจดหมายไว้ในใจ ♡",
      languageToggle: "เลือกภาษาของจดหมาย",
    },
    final: {
      badge: "ใต้ฟ้าเดียวกัน",
      quote1: "Some wishes are too special to keep inside.",
      quote2Thai: "สุขสันต์วันลอยกระทงนะคนที่ฉันรัก ♡",
      quote3: "You are my favorite wish.",
      btnReplay: "Experience Again ♡",
      btnReadLetter: "Read My Letter Again 💌",
      btnMakeWish: "Make Another Wish ✨",
      footerText: "สร้างขึ้นด้วยความรักทั้งหมด โดย Rionn เพื่อ Yuqii/Porpor — Loy Krathong 2026",
    },
    nav: {
      musicOn: "เปิดเพลงบรรเลง",
      musicOff: "ปิดเสียง",
      letterTooltip: "อ่านจดหมายรัก",
    },
  },
  en: {
    opening: {
      badge: "Loy Krathong Festival 2026",
      title: "A Little Wish for You ♡",
      thaiGreeting: "สุขสันต์วันลอยกระทง",
      invitation: "Tonight... I have a special wish I want to send to you.",
      enterBtn: "Enter Our Magical Night ✨",
      soundHint: "Tap to enter with romantic instrumental ambient music",
    },
    hero: {
      badge: "Loy Krathong Festival 2026",
      mainTitle: "Happy Loy Krathong to My Most Special Person ♡",
      subtitle: "Tonight, I made a little magical world just for you.",
      distanceQuote: "Even though we might be miles apart, I wish we could celebrate this beautiful night together.",
      dateLabel: "24 November 2026",
      createKrathongBtn: "Let's Make a Krathong ♡",
      openLetterBtn: "Read My Letter 💌",
    },
    creator: {
      sectionBadge: "Artisan Workshop",
      title: "Interactive Krathong Creator",
      subtitle: "Craft your dream Thai floral vessel with your own hands.",
      tabBase: "1. Vessel Base",
      tabFlower: "2. Floral Center",
      tabCandle: "3. Candle Color",
      tabDecor: "4. Adornments",
      previewBadge: "Live Craft Preview",
      continueBtn: "Create My Krathong ♡",
      resetBtn: "Reset Design",
      bases: {
        banana: { name: "Traditional Banana Leaf", desc: "Hand-folded banana leaf petals on a royal golden base" },
        lotus: { name: "Romantic Pink Lotus", desc: "Soft blooming lotus petals full of sweet romance" },
        golden: { name: "Golden Blossom", desc: "Radiant golden leaves with warm amber glow" },
        purple: { name: "Royal Purple Vessel", desc: "Deep imperial purple petals and delicate lavender lining" },
      },
      flowers: {
        lotus: "Pink Royal Lotus",
        jasmine: "Fragrant White Jasmine",
        marigold: "Auspicious Yellow Marigold",
        orchid: "Purple Orchid Garland",
        rose: "Velvet Red Rose Petals",
      },
      candles: {
        golden: "Golden Candle of Fortune",
        pink: "Pink Candle of Love",
        white: "White Candle of Serenity",
        lavender: "Lavender Candle of Sweet Dreams",
      },
      decorations: {
        incense: "3 Traditional Incense Sticks",
        flowerPetals: "Floating Flower Petals",
        goldFoil: "Shimmering Gold Leaf Flakes",
        miniLotuses: "Miniature Lotus Buds",
        heartOrnaments: "Romantic Golden Hearts",
      },
    },
    wish: {
      badge: "Under the Full Moon",
      title: "Make a Little Wish ✨",
      thaiQuote: "อธิษฐานสิ... แล้วส่งคำขอนั้นไปกับกระทงของเธอ",
      subQuote: "Make a wish... and send it away with your krathong.",
      placeholder: "Write your little wish here... poured straight from your heart...",
      presetHeading: "Or tap to add meaningful blessings:",
      presets: {
        happiness: "Everlasting Happiness",
        health: "Vibrant Health & Vitality",
        luck: "Abundant Good Luck",
        love: "Endless Pure Love",
        dreams: "All Dreams Come True",
        together: "Together Forever & Always",
      },
      saveBtn: "Save My Wish ♡",
      backBtn: "Modify Krathong",
      savedToast: "Your beautiful wish has been recorded ✨",
    },
    light: {
      badge: "The Sacred Flame",
      title: "Every little light carries a beautiful wish.",
      thaiQuote: "ขอให้แสงเทียนดวงนี้นำพาความสุขมาให้เธอ",
      instruction: "Tap the candle or button to ignite the glowing flame before letting it drift into the night.",
      lightBtn: "Light the Candle 🕯️",
      floatBtn: "Let It Float on the River ♡",
    },
    floating: {
      badge: "River of Starlight",
      moonQuote: "Your wish is now floating under the moonlight ✨",
      thaiWishRealized: "ขอให้คำอธิษฐานของเธอเป็นจริงนะ",
      hintTouchRiver: "✨ Touch the river to cast gentle ripples and starlight petals",
      readLetterBtn: "Read My Special Letter 💌",
      continueCelebrationBtn: "Gaze at the Festival River ✨",
    },
    letter: {
      title: "A Little Message Just for You ♡",
      stamp: "From Rionn with love to Yuqii/Porpor",
      closeBtn: "Keep This Close to Heart ♡",
      languageToggle: "Letter language",
    },
    final: {
      badge: "Forever Under One Moon",
      quote1: "Some wishes are too special to keep inside.",
      quote2Thai: "สุขสันต์วันลอยกระทงนะคนที่ฉันรัก ♡",
      quote3: "You are my favorite wish.",
      btnReplay: "Experience Again ♡",
      btnReadLetter: "Read My Letter Again 💌",
      btnMakeWish: "Make Another Wish ✨",
      footerText: "Crafted with all my love by Rionn for Yuqii/Porpor — Loy Krathong 2026",
    },
    nav: {
      musicOn: "Play Ambient Music",
      musicOff: "Mute",
      letterTooltip: "Read Love Letter",
    },
  },
  id: {
    opening: {
      badge: "Festival Loy Krathong 2026",
      title: "A Little Wish for You ♡",
      thaiGreeting: "สุขสันต์วันลอยกระทง",
      invitation: "Malam ini... ada sebuah doa terindah yang ingin kusampaikan untukmu.",
      enterBtn: "Enter Our Magical Night ✨",
      soundHint: "Klik untuk masuk dan nikmati alunan musik romantis",
    },
    hero: {
      badge: "Loy Krathong Festival 2026",
      mainTitle: "Selamat Hari Loy Krathong untuk Orang Paling Spesial ♡",
      subtitle: "Malam ini, aku membuat dunia ajaib kecil ini hanya untukmu.",
      distanceQuote: "Meski kita terpisah jarak, aku berharap bisa merayakan malam yang indah ini bersamamu.",
      dateLabel: "24 November 2026",
      createKrathongBtn: "Mari Buat Krathong ♡",
      openLetterBtn: "Buka Surat Cinta 💌",
    },
    creator: {
      sectionBadge: "Meja Kerajinan Tradisional",
      title: "Interactive Krathong Creator",
      subtitle: "Hias krathong cantikmu sendiri dengan penuh cinta.",
      tabBase: "1. Dasar Krathong",
      tabFlower: "2. Bunga Hias",
      tabCandle: "3. Warna Lilin",
      tabDecor: "4. Hiasan Ekstra",
      previewBadge: "Pratinjau Nyata",
      continueBtn: "Create My Krathong ♡",
      resetBtn: "Atur Ulang",
      bases: {
        banana: { name: "Daun Pisang Tradisional", desc: "Lipatan daun pisang khas Thailand dengan alas emas" },
        lotus: { name: "Bunga Teratai Merah Muda", desc: "Kelopak teratai mekar penuh romansa yang manis" },
        golden: { name: "Bunga Emas Megah", desc: "Kelopak emas kemilau dengan kilau hangat mewah" },
        purple: { name: "Ungu Royal Elegan", desc: "Kelopak ungu bangsawan berhias lavender lembut" },
      },
      flowers: {
        lotus: "Bunga Teratai Pink (Pink Lotus)",
        jasmine: "Bunga Melati Putih Harum (White Jasmine)",
        marigold: "Bunga Kenikir Emas (Yellow Marigold)",
        orchid: "Bunga Anggrek Ungu (Purple Orchid)",
        rose: "Kelopak Mawar Merah (Rose Petals)",
      },
      candles: {
        golden: "Lilin Emas Keberuntungan",
        pink: "Lilin Merah Muda Cinta",
        white: "Lilin Putih Ketulusan",
        lavender: "Lilin Lavender Kedamaian",
      },
      decorations: {
        incense: "3 Batang Dupa Tradisional Thai",
        flowerPetals: "Taburan Kelopak Bunga",
        goldFoil: "Serpihan Emas Berkilau",
        miniLotuses: "Kuncup Teratai Kecil",
        heartOrnaments: "Hiasan Hati Romantis",
      },
    },
    wish: {
      badge: "Di Bawah Cahaya Bulan Purnama",
      title: "Make a Little Wish ✨",
      thaiQuote: "อธิษฐานสิ... แล้วส่งคำขอนั้นไปกับกระทงของเธอ",
      subQuote: "Make a wish... and send it away with your krathong.",
      placeholder: "Tuliskan harapan dan doamu di sini dengan sepenuh hati...",
      presetHeading: "Atau pilih doa penuh berkah:",
      presets: {
        happiness: "Kebahagiaan Tiada Akhir (Happiness)",
        health: "Kesehatan & Kekuatan (Good Health)",
        luck: "Keberuntungan Melimpah (Good Luck)",
        love: "Cinta Sejati Selamanya (Endless Love)",
        dreams: "Semua Mimpi Jadi Nyata (Dreams Come True)",
        together: "Bersama Selamanya (Together Forever)",
      },
      saveBtn: "Save My Wish ♡",
      backBtn: "Ubah Krathong",
      savedToast: "Harapanmu telah tersimpan rapi di dalam krathong ✨",
    },
    light: {
      badge: "Menyalakan Cahaya Doa",
      title: "Every little light carries a beautiful wish.",
      thaiQuote: "ขอให้แสงเทียนดวงนี้นำพาความสุขมาให้เธอ",
      instruction: "Sentuh lilin atau tombol untuk menyalakan api hangat sebelum menghanyutkannya ke sungai.",
      lightBtn: "Light the Candle 🕯️",
      floatBtn: "Let It Float on the River ♡",
    },
    floating: {
      badge: "Sungai Penuh Berkah",
      moonQuote: "Your wish is now floating under the moonlight ✨",
      thaiWishRealized: "ขอให้คำอธิษฐานของเธอเป็นจริงนะ",
      hintTouchRiver: "✨ Sentuh air untuk menciptakan gelombang dan kelopak bunga",
      readLetterBtn: "Baca Surat Istimewa 💌",
      continueCelebrationBtn: "Lihat Suasana Festival ✨",
    },
    letter: {
      title: "A Little Message Just for You ♡",
      stamp: "Dari Rionn dengan cinta untuk Yuqii/Porpor",
      closeBtn: "Simpan Surat di Hati ♡",
      languageToggle: "Bahasa surat",
    },
    final: {
      badge: "Di Bawah Langit yang Sama",
      quote1: "Some wishes are too special to keep inside.",
      quote2Thai: "สุขสันต์วันลอยกระทงนะคนที่ฉันรัก ♡",
      quote3: "You are my favorite wish.",
      btnReplay: "Experience Again ♡",
      btnReadLetter: "Read My Letter Again 💌",
      btnMakeWish: "Make Another Wish ✨",
      footerText: "Dibuat dengan sepenuh cinta oleh Rionn untuk Yuqii/Porpor — Loy Krathong 2026",
    },
    nav: {
      musicOn: "Putar Musik",
      musicOff: "Senyapkan",
      letterTooltip: "Buka Surat Cinta",
    },
  },
};
