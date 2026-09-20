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

// Mengambil nilai dan memperbarui tampilan teks kode
function updatePreview() {
    // ATAS
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const c5 = pad(document.getElementById('k_tahun_penetapan').value, 2);
    
    // BAWAH
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    const b4 = document.getElementById('k_sub_kelompok').value;
    const b5 = document.getElementById('k_sub_sub_kelompok').value;
    const b6 = pad(document.getElementById('k_tahun_beli').value, 2);
    const b7 = pad(document.getElementById('k_registrasi').value, 4);

    document.getElementById('preview_atas').textContent = `${c1}.${c2}.${c3}.${c4}.${c5}`;
    document.getElementById('preview_bawah').textContent = `${b1}.${b2}.${b3}.${b4}.${b5}.${b6}.${b7}`;
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

// COPY STANDARD
function copyStandard() {
    const atas = document.getElementById('preview_atas').textContent;
    const bawah = document.getElementById('preview_bawah').textContent;
    const fullText = `Atas: ${atas}\nBawah: ${bawah}`;
    navigator.clipboard.writeText(fullText).then(() => {
        showAlert('Format Standar tersalin!');
    });
}

// COPY EXCEL (Tab-separated)
function copyExcel() {
    // Mengambil nilai raw tanpa titik
    const c1 = document.getElementById('k_komponen').value;
    const c2 = document.getElementById('k_direktorat').value;
    const c3 = document.getElementById('k_bidang_atas').value;
    const c4 = document.getElementById('k_lokasi').value;
    const c5 = pad(document.getElementById('k_tahun_penetapan').value, 2);
    
    const b1 = document.getElementById('k_golongan').value;
    const b2 = document.getElementById('k_bidang_bawah').value;
    const b3 = document.getElementById('k_kelompok').value;
    const b4 = document.getElementById('k_sub_kelompok').value;
    const b5 = document.getElementById('k_sub_sub_kelompok').value;
    const b6 = pad(document.getElementById('k_tahun_beli').value, 2);
    let b7 = pad(document.getElementById('k_registrasi').value, 4);

    // Memecah menjadi karakter individu lalu disatukan dengan TAB (\t) untuk Excel
    // Contoh: "01" -> "0" \t "1"
    
    // Baris Atas: 5 pasangan (10 karakter)
    const strAtas = (c1+c2+c3+c4+c5).split('').join('\t');
    
    // Baris Bawah: 6 pasangan (12 karakter) + 4 karakter reg = 16 karakter total
    const strBawah = (b1+b2+b3+b4+b5+b6+b7).split('').join('\t');
    
    // Gabung baris atas dan bawah dengan Enter (\n)
    const excelFormat = strAtas + '\n' + strBawah;
    
    navigator.clipboard.writeText(excelFormat).then(() => {
        showAlert('Siap di-paste ke kotak Excel!');
    });
}
