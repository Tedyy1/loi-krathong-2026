export interface PersonalizationConfig {
  couple: {
    receiverName: string; // "yuqii/porpor"
    receiverDisplayNameTh: string; // "น้องยุคกี้ / ป้อแป้อ (Yuqii ♡ Porpor)"
    receiverNickname: string; // "Porpor"
    senderName: string; // "rionn"
    senderDisplayNameTh: string; // "ริออน (Rionn)"
  };
  event: {
    titleEn: string;
    titleTh: string;
    titleId: string;
    subtitleEn: string;
    subtitleTh: string;
    subtitleId: string;
    date: string; // "24 November 2026"
    thaiDate: string; // "๒๔ พฤศจิกายน ๒๕๖๙ (วันลอยกระทง)"
    festivalYear: number; // 2026
  };
  letter: {
    th: {
      salutation: string;
      body: string[];
      closing: string;
      sender: string;
    };
    en: {
      salutation: string;
      body: string[];
      closing: string;
      sender: string;
    };
    id: {
      salutation: string;
      body: string[];
      closing: string;
      sender: string;
    };
  };
}

export const PERSONAL_CONFIG: PersonalizationConfig = {
  couple: {
    receiverName: "yuqii/porpor",
    receiverDisplayNameTh: "ยุคกี้ / ป้อแป้อ (Yuqii ♡ Porpor)",
    receiverNickname: "Yuqii / Porpor",
    senderName: "rionn",
    senderDisplayNameTh: "ริออน (Rionn)",
  },
  event: {
    titleEn: "A Little Wish for You ♡",
    titleTh: "คำอธิษฐานดวงน้อยเพื่อเธอ ♡",
    titleId: "Sebuah Harapan Kecil Untukmu ♡",
    subtitleEn: "A Magical Loy Krathong Night Made Just for You",
    subtitleTh: "ค่ำคืนลอยกระทงสุดแสนวิเศษที่สร้างขึ้นเพื่อเธอคนเดียว",
    subtitleId: "Malam Loy Krathong Ajaib Khusus Untukmu",
    date: "24 November 2026",
    thaiDate: "๒๔ พฤศจิกายน ๒๕๖๙",
    festivalYear: 2026,
  },
  letter: {
    th: {
      salutation: "ถึงคนพิเศษของฉัน (Yuqii / Porpor) ♡",
      body: [
        "สุขสันต์วันลอยกระทงนะที่รัก",
        "คืนนี้ฉันอาจไม่ได้อยู่เคียงข้างเธอเพื่อจุดเทียนและลอยกระทงด้วยกันใต้แสงจันทร์...",
        "แต่ฉันอยากให้เธอรู้ไว้เสมอว่า ทุก ๆ จังหวะของหัวใจฉันกำลังส่งความรักและคำอธิษฐานที่ดีที่สุดข้ามฟ้าไปให้เธอ",
        "ขอให้เธอมีความสุข สดใสในทุก ๆ วัน",
        "ขอให้ทุกความฝันและความปรารถนาของเธอเบ่งบานและเป็นจริง",
        "ขอให้รอยยิ้มที่น่ารักของเธอส่องสว่างเสมอ ไม่ว่าจะพบเจอเรื่องใดก็ตาม",
        "แม้ระยะทางจะทำให้เราอยู่ห่างกัน แต่เธอก็เป็นคนเดียวที่เป็นดั่งดวงจันทร์และดวงดาวในใจฉันเสมอ",
        "คืนนี้ฉันไม่ได้ขอพรเพื่อตัวเองเลย... ฉันขอเพียงให้เธอมีความสุข ปลอดภัย และมีชีวิตที่เต็มไปด้วยรอยยิ้ม",
        "และฉันสัญญาว่า สักวันหนึ่ง เราจะได้ไปยืนเคียงข้างกัน และปล่อยกระทงลงสู่แม่น้ำสายจริงด้วยกันนะ",
      ],
      closing: "ด้วยความรักและคิดถึงสุดหัวใจ,",
      sender: "Rionn ♡",
    },
    en: {
      salutation: "To my most special person, Yuqii / Porpor ♡",
      body: [
        "Happy Loy Krathong Festival, my love.",
        "Tonight, even though miles might keep us apart and I cannot hold your hand under the full moon...",
        "I want you to know that with every breath, I am sending my sweetest wishes and warmest love directly to you.",
        "May you be filled with boundless happiness each and every day.",
        "May every cherished dream of yours turn into a magical reality.",
        "May that precious smile of yours keep brightening my world forever.",
        "No matter the distance, you will forever be the most special person residing in my heart.",
        "Tonight, I didn't ask for much for myself. I only prayed for your joy, health, and peace of mind.",
        "And I deeply hope that one day very soon, we will celebrate Loy Krathong hand in hand beside the real river together.",
      ],
      closing: "With all my love and devotion,",
      sender: "Rionn ♡",
    },
    id: {
      salutation: "Untuk seseorang yang paling spesial di hatiku, Yuqii / Porpor ♡",
      body: [
        "Selamat Hari Festival Loy Krathong 2026, cintaku.",
        "Malam ini, meski jarak memisahkan kita dan aku belum bisa menggenggam tanganmu di tepi sungai berbulan purnama...",
        "Aku ingin kamu tahu bahwa doa dan harapan terindahku selalu terbang mengarungi langit untukmu.",
        "Semoga hari-harimu selalu dipenuhi kebahagiaan dan kehangatan.",
        "Semoga setiap impian manis yang kamu simpan dapat terwujud nyata.",
        "Semoga senyuman manismu tidak pernah pudar dan selalu menjadi cahaya bagi duniaku.",
        "Meski kita terpisah oleh jarak, kamu adalah satu-satunya orang paling istimewa di hatiku.",
        "Malam ini aku tidak meminta banyak hal untuk diriku sendiri. Aku hanya memohon agar kamu selalu bahagia, sehat, dan tersenyum.",
        "Dan aku berharap suatu hari nanti, kita bisa merayakan malam Loy Krathong berdua di Thailand secara nyata.",
      ],
      closing: "Dengan segenap rasa sayang dan rindu,",
      sender: "Rionn ♡",
    },
  },
};
