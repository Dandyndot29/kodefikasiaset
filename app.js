// Logika Aplikasi Generator Kodefikasi

// Fungsi helper padding angka
const pad = (num, size) => num.toString().padStart(size, '0');

// Populate Dropdown Options
function populateSelect(selectId, dataObj) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    for (const [key, value] of Object.entries(dataObj)) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `[${key}] - ${value}`;
        select.appendChild(option);
    }
}

// Inisialisasi semua dropdown saat halaman dimuat
function init() {
    populateSelect('k_komponen', DB.komponen);
    populateSelect('k_direktorat', DB.direktorat);
    populateSelect('k_bidang_atas', DB.bidang);
    populateSelect('k_lokasi', DB.lokasi);
    
    populateSelect('k_golongan', DB.golongan);
    populateSelect('k_bidang_bawah', DB.bidang);
    populateSelect('k_kelompok', DB.kelompok);
    populateSelect('k_sub_kelompok', DB.sub_kelompok);
    populateSelect('k_sub_sub_kelompok', DB.sub_sub_kelompok);

    updatePreview();
}

// Mengambil nilai dan memperbarui tampilan teks kode beserta detail
function updatePreview() {
    // ATAS (Nilai Kode)
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const val_thn_penetapan = document.getElementById('k_tahun_penetapan').value;
    const c5 = pad(val_thn_penetapan, 2);
    
    // BAWAH (Nilai Kode)
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    const b4 = document.getElementById('k_sub_kelompok').value;
    const b5 = document.getElementById('k_sub_sub_kelompok').value;
    const val_thn_beli = document.getElementById('k_tahun_beli').value;
    const b6 = pad(val_thn_beli, 2);
    const val_registrasi = document.getElementById('k_registrasi').value;
    const b7 = pad(val_registrasi, 4);

    // Update Teks Kode
    document.getElementById('preview_atas').textContent = `${c1}.${c2}.${c3}.${c4}.${c5}`;
    document.getElementById('preview_bawah').textContent = `${b1}.${b2}.${b3}.${b4}.${b5}.${b6}.${b7}`;

    // Update Detail Teks Aset
    const detailAtas = [
        DB.komponen[c1],
        DB.direktorat[c2],
        DB.bidang[c3],
        DB.lokasi[c4],
        `THN PENETAPAN 20${c5}` // Asumsi menggunakan tahun 2000-an
    ].filter(Boolean).join(" - ");

    const detailBawah = [
        DB.golongan[b1],
        DB.bidang[b2],
        DB.kelompok[b3],
        DB.sub_kelompok[b4],
        DB.sub_sub_kelompok[b5],
        `THN BELI 20${b6}`, // Asumsi menggunakan tahun 2000-an
        `REG ${b7}`
    ].filter(Boolean).join(" - ");

    document.getElementById('detail_atas').textContent = detailAtas;
    document.getElementById('detail_bawah').textContent = detailBawah;
}

// Event Listeners agar preview update otomatis
document.querySelectorAll('select, input').forEach(el => {
    el.addEventListener('change', updatePreview);
    el.addEventListener('keyup', updatePreview);
});

// Jalankan init
init();

// Menampilkan alert 
function showAlert(msg) {
    const alertEl = document.getElementById('alert_msg');
    alertEl.textContent = msg;
    alertEl.classList.remove('opacity-0');
    setTimeout(() => alertEl.classList.add('opacity-0'), 2500);
}

// COPY STANDARD (Pilihan 1: Satu baris menyamping)
function copyStandard() {
    const atas = document.getElementById('preview_atas').textContent;
    const bawah = document.getElementById('preview_bawah').textContent;
    
    // Digabungkan dengan spasi dan garis miring
    const fullText = `${atas} / ${bawah}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        showAlert('Teks tersalin! Siap di-paste ke 1 kolom Excel.');
    });
}

// COPY EXCEL (Sesuai format kolom visual di Excel)
// COPY EXCEL (Update perbaikan format yang presisi dengan Template Excel)
function copyExcel() {
    // Mengambil nilai Atas
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const c5 = pad(document.getElementById('k_tahun_penetapan').value, 2);
    
    // Mengambil nilai Bawah
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    const b4 = document.getElementById('k_sub_kelompok').value;
    const b5 = document.getElementById('k_sub_sub_kelompok').value;
    const b6 = pad(document.getElementById('k_tahun_beli').value, 2);
    const b7 = pad(document.getElementById('k_registrasi').value, 4);

    // Fungsi bantu memecah angka menjadi sel-sel berdampingan
    const splitTab = (str) => str.split('').join('\t');

    // BARIS ATAS: Dipisah dengan 2 Tab untuk melompati kolom jeda (spacer)
    const strAtas = [c1, c2, c3, c4, c5].map(splitTab).join('\t\t');
    
    // BARIS BAWAH: 6 kelompok pertama
    const strBawahDepan = [b1, b2, b3, b4, b5, b6].map(splitTab).join('\t\t');
    
    // 4 Digit registrasi disambung dengan 2 tab agar melompati kolom jeda terakhir
    const strBawah = strBawahDepan + '\t\t' + splitTab(b7);

    // Gabung baris atas dan bawah dengan 2 enter (\n\n) 
    // Ini berfungsi agar paste melompati 1 baris ke bawah (tempat garis pembatas)
    const excelFormat = strAtas + '\n\n' + strBawah;
    
    navigator.clipboard.writeText(excelFormat).then(() => {
        showAlert('Siap di-paste! Klik kotak pertama di Excel lalu Paste.');
    });
}
