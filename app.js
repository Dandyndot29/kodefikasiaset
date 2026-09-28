// Logika Aplikasi Generator Kodefikasi

const pad = (num, size) => num.toString().padStart(size, '0');

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

// -- FILTERING FUNCTIONS --

// 1. Filter Lokasi Berdasarkan Bidang Atas
function updateLokasiOptions() {
    const bidangId = document.getElementById('k_bidang_atas').value;
    const lokasiSelect = document.getElementById('k_lokasi');
    
    lokasiSelect.innerHTML = '';
    const allowedKeys = DB.lokasi_mapping[bidangId] || [];
    
    allowedKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `[${key}] - ${DB.lokasi[key]}`;
        lokasiSelect.appendChild(option);
    });

    updatePreview();
}

// 2. Filter Sub Kelompok Berdasarkan Kelompok Bawah
function updateSubKelompokOptions() {
    const kelompokId = document.getElementById('k_kelompok').value;
    const subKelSelect = document.getElementById('k_sub_kelompok');
    
    subKelSelect.innerHTML = '';
    const allowedKeys = DB.sub_kelompok_mapping[kelompokId] || [];
    
    allowedKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `[${key}] - ${DB.sub_kelompok[key]}`;
        subKelSelect.appendChild(option);
    });

    // Otomatis memicu update Sub-Sub Kelompok (Rantai filter)
    updateSubSubKelompokOptions();
}

// 3. Filter Sub-Sub Kelompok Berdasarkan Sub Kelompok Bawah
function updateSubSubKelompokOptions() {
    const subKelId = document.getElementById('k_sub_kelompok').value;
    const subSubKelSelect = document.getElementById('k_sub_sub_kelompok');
    
    subSubKelSelect.innerHTML = '';
    // Jika tidak ada mapping spesifik, tampilkan kosong (menghindari error)
    const allowedKeys = DB.sub_sub_kelompok_mapping[subKelId] || [];
    
    allowedKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `[${key}] - ${DB.sub_sub_kelompok[key]}`;
        subSubKelSelect.appendChild(option);
    });

    updatePreview();
}

// -- INISIALISASI & PREVIEW --

function init() {
    populateSelect('k_komponen', DB.komponen);
    populateSelect('k_direktorat', DB.direktorat);
    populateSelect('k_bidang_atas', DB.bidang);
    populateSelect('k_golongan', DB.golongan);
    populateSelect('k_bidang_bawah', DB.bidang);
    populateSelect('k_kelompok', DB.kelompok);

    // Jalankan filter rantai pertama kali saat halaman dimuat
    updateLokasiOptions(); 
    updateSubKelompokOptions(); 
}

function updatePreview() {
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const c5 = pad(document.getElementById('k_tahun_penetapan').value, 2);
    
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    // Gunakan pengecekan (opsional default) jika filter sub belum terisi
    const b4 = document.getElementById('k_sub_kelompok').value || "00";
    const b5 = document.getElementById('k_sub_sub_kelompok').value || "00";
    const b6 = pad(document.getElementById('k_tahun_beli').value, 2);
    const b7 = pad(document.getElementById('k_registrasi').value, 4);

    document.getElementById('preview_atas').textContent = `${c1}.${c2}.${c3}.${c4}.${c5}`;
    document.getElementById('preview_bawah').textContent = `${b1}.${b2}.${b3}.${b4}.${b5}.${b6}.${b7}`;

    // Update Text Keterangan
    if(document.getElementById('detail_atas') && document.getElementById('detail_bawah')){
        const detailAtas = [
            DB.komponen[c1], DB.direktorat[c2], DB.bidang[c3],
            DB.lokasi[c4], `THN PENETAPAN 20${c5}`
        ].filter(Boolean).join(" - ");

        const detailBawah = [
            DB.golongan[b1], DB.bidang[b2], DB.kelompok[b3],
            DB.sub_kelompok[b4], DB.sub_sub_kelompok[b5],
            `THN BELI 20${b6}`, `REG ${b7}`
        ].filter(Boolean).join(" - ");

        document.getElementById('detail_atas').textContent = detailAtas;
        document.getElementById('detail_bawah').textContent = detailBawah;
    }
}

// -- EVENT LISTENERS PADA INPUT --

// Event khusus pemicu filter rantai
document.getElementById('k_bidang_atas').addEventListener('change', updateLokasiOptions);
document.getElementById('k_kelompok').addEventListener('change', updateSubKelompokOptions);
document.getElementById('k_sub_kelompok').addEventListener('change', updateSubSubKelompokOptions);

// Event umum untuk input lainnya agar langsung update preview teks
document.querySelectorAll('select, input').forEach(el => {
    // Abaikan elemen yang sudah punya fungsi spesifik di atas
    if (el.id !== 'k_bidang_atas' && el.id !== 'k_kelompok' && el.id !== 'k_sub_kelompok') {
        el.addEventListener('change', updatePreview);
    }
    if(el.type === 'number') {
        el.addEventListener('keyup', updatePreview);
    }
});

// Jalankan program
init();


// -- BAGIAN COPY (TETAP SAMA SEPERTI SEBELUMNYA) --

function showAlert(msg) {
    const alertEl = document.getElementById('alert_msg');
    alertEl.textContent = msg;
    alertEl.classList.remove('opacity-0');
    setTimeout(() => alertEl.classList.add('opacity-0'), 2500);
}

// COPY EXCEL (Format Presisi Jeda Kolom + Garis Tengah)
function copyExcel() {
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const c5 = pad(document.getElementById('k_tahun_penetapan').value, 2);
    
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    const b4 = document.getElementById('k_sub_kelompok').value || "00";
    const b5 = document.getElementById('k_sub_sub_kelompok').value || "00";
    const b6 = pad(document.getElementById('k_tahun_beli').value, 2);
    const b7 = pad(document.getElementById('k_registrasi').value, 4);

    const splitTab = (str) => str.split('').join('\t');

    const strAtas = [c1, c2, c3, c4, c5].map(splitTab).join('\t\t');
    const strBawahDepan = [b1, b2, b3, b4, b5, b6].map(splitTab).join('\t\t');
    const strBawah = strBawahDepan + '\t\t' + splitTab(b7);

    // 2 Enter agar melewati garis pembatas di Excel Template Baru
    const excelFormat = strAtas + '\n\n' + strBawah;
    
    navigator.clipboard.writeText(excelFormat).then(() => {
        showAlert('Siap di-paste! Klik kotak pertama di Excel lalu Paste.');
    });
}

// COPY STANDARD (Satu Baris Menyamping untuk 1 Kolom Excel)
function copyStandard() {
    const atas = document.getElementById('preview_atas').textContent;
    const bawah = document.getElementById('preview_bawah').textContent;
    const fullText = `${atas} / ${bawah}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        showAlert('Teks tersalin! Siap di-paste ke 1 kolom Excel.');
    });
}