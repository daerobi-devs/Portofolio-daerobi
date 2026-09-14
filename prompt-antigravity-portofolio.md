# Prompt untuk Antigravity — Bikin Portofolio Website Otomatis

> Cara pakai: isi bagian "DAFTAR PROJEK" di bawah dengan link GitHub + link live tiap projek kamu, lalu paste seluruh isi file ini ke Antigravity sebagai satu instruksi besar. Kalau projeknya banyak, boleh dikerjakan bertahap per FASE (minta Antigravity stop setelah tiap fase buat kamu review dulu).

---

## KONTEKS

Saya mahasiswa IT (Universitas Pamulang) yang sering "vibe coding" pakai kamu (Antigravity). Semua projek saya di-hosting sendiri di server Coolify pribadi (homelab: mini PC berbasis Proxmox), dan biasanya juga di-push ke GitHub.

Saya mau kamu bantu bikin **website portofolio pribadi** yang isinya rangkuman semua projek saya, lengkap dengan bukti visual (screenshot live) dan video showcase (pakai Remotion, yang sudah terpasang di repo ini).

## DATA DIRI (tampilkan di section Hero/About)
- Nama: Daerobi
- Status: Mahasiswa IT, Universitas Pamulang
- ( founder Buatin.biz.id — jasa pembuatan website)

## DAFTAR PROJEK
**PENTING: yang saya maksud "link projek" adalah link WEBSITE-nya yang sudah live/jadi, bukan link repo GitHub.** Repo GitHub sifatnya opsional/tambahan kalau ada dan publik. Kalau repo tidak dikasih, analisis projeknya cukup dari visit langsung ke link live-nya (isi halaman, fitur yang kelihatan, teknologi yang kedeteksi dari source/network request).

```
1. http://buatin.biz.id 
2. https://atlas.daeroom.my.id
3. https://arrohman.vercel.app
4. https://wagate.daeroom.my.id/`
```

## SOSIAL MEDIA
Cantumkan di header/footer, pakai **logo original/brand resmi** tiap platform (bukan icon generik) — ambil dari asset resmi (misal simple-icons atau SVG official brand kit), bukan emoji/placeholder:
- Instagram: (https://www.instagram.com/dae.obiy?stkn=MTJxNGZ3YzBiYzdwcw==)
- GitHub: (https://github.com/daerobi-devs)

## TUJUAN AKHIR
Website portofolio (Next.js) yang punya:
- Hero section dengan data diri saya (lihat DATA DIRI di atas)
- Grid/list semua projek, tiap kartu projek punya: nama, deskripsi, tech stack, link live (+ link GitHub kalau ada), screenshot
- Section "Project Showcase" berupa video (hasil render Remotion) yang muter cuplikan tiap projek secara sinematik
- Section skill/tech stack overview (dikumpulkan otomatis dari analisis semua link projek, bukan saya ketik manual)
- Section/footer sosial media dengan logo original (lihat SOSIAL MEDIA di atas)
- Komponen UI dibangun pakai library dari **21st.dev** (ambil komponen yang relevan lewat CLI/registry-nya, bukan bikin dari nol) supaya visualnya lebih matang, dikombinasikan dengan Tailwind CSS
- Responsive & tampilan modern, bukan template generic

---

## FASE 1 — Kumpulkan & Analisis Data Projek
Untuk setiap link di DAFTAR PROJEK:
1. Kunjungi link live-nya (Playwright), analisis konten halaman, fitur yang kelihatan, dan cek source/network request buat nebak tech stack front-end-nya (framework, library, dsb).
2. **Kalau link repo GitHub-nya juga dikasih**, clone/baca repo itu juga — baca `README.md`, `package.json`/`requirements.txt`/manifest lain buat deteksi tech stack lebih akurat (termasuk back-end yang nggak kelihatan dari sisi client).
3. Rangkum tiap projek jadi format terstruktur (JSON/markdown): `{nama, deskripsi_singkat, tech_stack[], link_live, link_repo (kalau ada)}`.
4. Gabungkan semua tech stack dari seluruh projek jadi satu daftar skill overview (hitung frekuensi pemakaian tiap tech buat tau mana yang paling saya kuasai).

Simpan hasilnya di file `data/projects.json` di root repo portofolio. Tampilkan ringkasannya ke saya dulu sebelum lanjut ke Fase 2.

## FASE 2 — Screenshot Otomatis
1. Pakai Playwright (headless browser) buat buka tiap link live di DAFTAR PROJEK.
2. Ambil screenshot full-page tiap projek (desktop viewport 1440x900), simpan di `public/screenshots/{nama-projek}.png`.
3. Kalau memungkinkan, ambil juga 2-3 screenshot tambahan dari halaman/state lain di projek itu (misal: halaman login, dashboard) buat variasi visual.
4. Kalau ada link yang gagal diakses (down/error), catat dan lapor ke saya, jangan di-skip diam-diam.

## FASE 3 — Bangun Website Portofolio (Next.js)
1. Setup project Next.js baru (App Router, Tailwind CSS).
2. Ambil komponen UI dari **21st.dev** (pakai CLI/registry resminya) buat elemen-elemen seperti hero, card, navbar, button, dsb — jangan bikin komponen dari nol kalau sudah ada yang cocok di sana.
3. Bangun struktur halaman:
   - Hero: data diri saya (Nama: Robi, Mahasiswa IT Universitas Pamulang), tagline singkat, CTA scroll ke projek
   - About: singkat, bisa saya edit manual nanti
   - Skills: visualisasi tech stack dari hasil Fase 1 (misal badge/chart, urutkan dari paling sering dipakai)
   - Projects: grid kartu projek dari `data/projects.json`, tiap kartu pakai screenshot dari Fase 2, ada link ke live demo (+ GitHub kalau ada)
   - Sosial media: section/footer dengan link Instagram & GitHub saya, pakai **logo original/brand resmi tiap platform** (ambil SVG dari asset resmi seperti simple-icons, bukan icon generik)
   - Contact/footer
4. Desain: modern, dark-mode friendly, animasi transisi halus pakai Framer Motion (bukan Remotion — Remotion khusus buat render video, bukan animasi UI langsung).
5. Pastikan responsive di mobile.

## FASE 4 — Video Showcase pakai Remotion
1. Pakai skill Remotion yang sudah ada di repo ini.
2. Bikin komposisi video yang nampilin screenshot tiap projek secara berurutan dengan efek transisi sinematik (zoom/pan/slide, ken-burns effect), plus overlay teks nama projek & tech stack.
3. Render video itu jadi mp4 pendek (durasi ~20-40 detik total, atau per-projek 3-5 detik kalau digabung jadi satu reel).
4. Simpan hasil render di `public/videos/showcase.mp4`, embed di section "Project Showcase" di halaman utama sebagai video player (autoplay muted loop).

## FASE 5 — Deploy
1. Siapkan `Dockerfile`/build config yang kompatibel buat di-deploy ke Coolify (server saya sendiri), sama seperti projek-projek lain saya.
2. Kasih saya instruksi langkah deploy-nya di akhir.

---

## ATURAN KERJA
- Kerjakan **satu fase dulu**, laporkan hasilnya, tunggu saya konfirmasi sebelum lanjut fase berikutnya.
- Jangan pakai data/screenshot palsu atau placeholder kalau link live-nya gagal diakses — laporkan errornya.
- Semua kode harus real & jalan, bukan simulasi.
