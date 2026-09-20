# Aplikasi Generator Kodefikasi PDAM Batulanteh

Ini adalah *source code* (kode sumber) aplikasi web untuk memudahkan penomoran aset/barang berdasarkan klasifikasi PDAM Batulanteh.

## Cara Menggunakan Aplikasi:
1. Ekstrak file ZIP ini ke dalam sebuah folder di komputer Anda.
2. Buka folder tersebut, klik dua kali pada file `index.html`.
3. Aplikasi akan langsung terbuka di web browser (Chrome, Firefox, atau Edge). Anda tidak perlu menginstal server khusus karena menggunakan HTML/JS standar.

## Cara Mengembangkan Lebih Lanjut (Untuk Programmer):
Aplikasi ini dipecah menjadi 3 file utama agar mudah diedit:
1. `index.html` : Mengatur struktur dan tampilan aplikasi (UI). Tampilan dibuat menggunakan framework Tailwind CSS.
2. `data.js` : Berisi "Database Sementara" dalam format JSON/Object JavaScript. Jika ada penambahan kategori (misal: Unit Kerja Baru), Anda cukup menambahkan kodenya di file ini.
3. `app.js` : Berisi logika utama aplikasi. Mengatur bagaimana kode dirangkai dan fungsi untuk Copy/Paste ke Excel.

Selamat mengembangkan!
