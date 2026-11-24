# 🪷 Panduan Deploy ke Vercel & Berbagi Harapan (Sharing Wish)

Website **"A Little Wish for You ♡"** sudah dioptimalkan secara penuh untuk deploy ke **Vercel** dengan fitur berbagi harapan (*cross-device wish sharing*).

---

## 🌟 Cara Kerja Fitur Berbagi Harapan

Agar pacar Anda (**Yuqii / Porpor**) dapat langsung melihat Krathong dan doa yang Anda buat:

### 1. Metode Utama: Magical Shareable Link (100% Berfungsi Tanpa Setup Tambahan)
- Setelah Anda selesai membuat Krathong dan menulis harapan di halaman **"Make a Wish"** atau saat Krathong mengapung di sungai, klik tombol **"Copy Link" / "Copy Share Link"**.
- Tautan yang disalin akan berbentuk seperti:  
  `https://nama-projek-anda.vercel.app/?w=eyJ0ZXh0IjoiLi4uIn0=`
- Kirimkan tautan tersebut ke WhatsApp/LINE pacar Anda.
- Saat pacar Anda membukanya:
  1. Akan langsung muncul banner notifikasi manis:  
     *"Rionn sent you a Krathong! ✨"*
  2. Krathong khusus dari Anda dengan cincin pendaran emas (*golden halo*) dan label *"Rionn ♡ Yuqii"* akan langsung mengapung di sungainya.
  3. Pacar Anda dapat mengeklik Krathong Anda kapan saja untuk membaca doa dan pesan cinta Anda.
  4. Pacar Anda juga dapat membuat Krathong-nya sendiri untuk diapungkan berdampingan dengan Krathong Anda!

### 2. Fitur Serverless API (`/api/wishes.ts`)
- Di dalam folder `/api/wishes.ts` sudah tersedia Vercel Serverless Function.
- Setiap kali pengunjung membuat harapan, data dikirimkan ke `/api/wishes`.
- Jika Anda menghubungkan **Vercel KV** atau **Upstash Redis** di dashboard Vercel (gratis), seluruh harapan akan otomatis tersimpan di database awan secara permanen dan tersinkronisasi ke semua pengunjung secara *real-time*.

---

## 🚀 Langkah Deploy ke Vercel

### Opsi A: Melalui GitHub (Paling Direkomendasikan & Otomatis)
1. Buat repository baru di [GitHub](https://github.com) (misalnya: `loi-krathong-2026`).
2. Push source code dari folder ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: magical loy krathong night for Yuqii"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/loi-krathong-2026.git
   git push -u origin main
   ```
3. Buka [Vercel.com](https://vercel.com) dan login.
4. Klik **"Add New..."** -> **"Project"**.
5. Pilih repository `loi-krathong-2026` Anda.
6. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
7. Klik **"Deploy"**! Dalam 1 menit website Anda sudah live dengan URL publik.

### Opsi B: Melalui Vercel CLI Langsung dari Terminal
1. Jalankan di folder ini:
   ```bash
   npx vercel
   ```
2. Ikuti instruksi di terminal (login ke akun Vercel dan tekan Enter).
3. Setelah selesai, Vercel akan langsung memberikan link produksi.

---

## 💌 Tips Romantis untuk Rionn
1. Buka website Anda yang sudah dideploy ke Vercel.
2. Buat Krathong Anda, tuliskan harapan terdalam Anda untuk Porpor, nyalakan lilinnya, dan hanyutkan.
3. Klik tombol **"Copy Link"**.
4. Kirim link tersebut kepada pacar Anda dengan pesan:
   *"Malam ini ada satu lentera dan krathong yang sudah kuapungkan di bawah bulan purnama untukmu... Buka tautan ini ya ♡"*
