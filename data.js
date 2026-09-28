// Database Referensi Kodefikasi PDAM Batulanteh

const DB = {
    komponen: { "01": "SUMBAWA" },
    direktorat: { "01": "UMUM", "02": "TEKHNIK" },
    bidang: {
        "01": "KANTOR PUSAT", "02": "CABANG SUMBAWA", "03": "CABANG EMPANG",
        "04": "CABANG PLAMPANG", "05": "CABANG UTAN", "06": "CABANG ALAS", "07": "CABANG ALAS BARAT"
    },
    lokasi: {
        "01": "GEDUNG KANTOR PUSAT", "02": "GUDANG", "03": "INTAKE SEMONGKAT", "04": "WTP BATULANTEH",
        "05": "WTP UNTER IWES", "06": "KANTOR CABANG SUMBAWA", "07": "UNIT PELAYANAN MOYO HILIR",
        "08": "UNIT PELAYANAN MOYO UTARA", "09": "UNIT PELAYANAN BADAS", "10": "RUMAH POMPA SUMER PAYUNG",
        "11": "SB BRANG BIJI", "12": "SB PURI HARMONY", "13": "SB SAMOTA RESIDENCE",
        "14": "RUMAH DINAS BRANG BARA", "15": "KANTOR CABANG EMPANG", "16": "INTAKE BUAS",
        "17": "KANTOR CABANG PLAMPANG", "18": "KANTOR PELAYANAN LAPE", "19": "KANTOR CABANG UTAN",
        "20": "UNIT PELAYANAN PERNANG", "21": "WTP BERINGIN SILA", "22": "KANTOR CABANG ALAS",
        "23": "WTP MARENTEH", "24": "KANTOR CABANG ALAS BARAT", "25": "SB USAR MAPIN", "26": "INTAKE RIMAS"
    },
    golongan: {
        "01": "TANAH", "02": "PERALATAN DAN MESIN", "03": "GEDUNG DAN BANGUNAN",
        "04": "JALAN, JEMBATAN, IRIGASI, INSTALASI, DAN JARINGAN", "05": "ASET TETAP LAINNYA",
        "06": "KONSTRUKSI DALAM PENGERJAAN", "07": "ASET TAK BERWUJUD"
    },
    
    // -- KELOMPOK BAWAH --
    kelompok: {
        "01": "TANAH", "02": "HAK ATAS TANAH", "03": "KENDARAAN", "04": "PERALATAN ALAT KERJA",
        "05": "POMPA", "06": "MEUBEL", "07": "PERALATAN KANTOR/ ELEKTRONIK", "08": "JALAN DAN JEMBATAN",
        "09": "BANGUNAN AIR", "10": "INSTALASI", "11": "JARINGAN", "12": "BAHAN PERPUSTAKAAN",
        "13": "ASET TETAP DALAM RENOVASI", "14": "KONSTRUKSI DALAM PENGERJAAN", "15": "APLIKASI", "16": "GOOD WILL"
    },
    sub_kelompok: {
        "01": "TANAH", "02": "HAK ATAS TANAH", "03": "MOBIL", "04": "SEPEDA MOTOR", "05": "GENSET",
        "06": "MESIN LAS", "07": "KOMPRESOR", "08": "SENAI", "09": "MANOMETER", "10": "ARCO",
        "11": "GPS", "12": "PERALATAN K3", "13": "MESIN POMPA", "14": "POMPA SUBMERSIBLE",
        "15": "POMPA DOSING", "16": "MEJA", "17": "KURSI", "18": "LEMARI", "19": "TV",
        "20": "KOMPUTER", "21": "PRINTER", "22": "UPS", "23": "KULKAS", "24": "SOUND SYSTEM",
        "25": "PERANTI DAPUR", "26": "CCTV", "27": "AC", "28": "KIPAS ANGIN"
    },
    sub_sub_kelompok: {
        "01": "TANAH", "02": "HAK ATAS TANAH", "03": "TANGKI", "04": "MOBIL STATION", "05": "OPEN CUP",
        "06": "RODA TIGA", "07": "RODA DUA", "08": "GENSET BESAR", "09": "GENSET PORTABLE",
        "10": "MESIN LAS HDPE", "11": "MESIN LAS LISTRIK", "12": "KOMPRESOR", "13": "SENAI LISTRIK",
        "14": "MANOMETER", "15": "ARCO", "16": "GPS", "17": "ROMPI KERJA", "18": "SAFETY SHOES",
        "19": "HELM", "20": "KERUCUT RAIL", "21": "RANTAI PEMBATAS", "22": "MESIN POMPA",
        "23": "POMPA SUBMERSIBLE", "24": "POMPA DOSING", "25": "MEJA RAPAT", "26": "MEJA KERJA 1 BIRO",
        "27": "MEJA KERJA 1/2 BIRO", "28": "MEJA PINGPONG", "29": "MEJA TAMU", "30": "MEJA KASIR",
        "31": "KURSI DIREKTUR", "32": "KURSI TAMU", "33": "KURSI KERJA", "34": "KURSI TUNGGU",
        "35": "LEMARI KAYU", "36": "LEMARI BESI", "37": "LEMARI ARSIP", "38": "BRANKAS",
        "39": "LEMARI PLASTIK", "40": "LACI MEJA BESI PADESTAL", "41": "BOX PLASTIK",
        "42": "TV", "43": "BRACKET TV", "44": "MONITOR", "45": "KOMPUTER AIO", "46": "LAPTOP",
        "47": "PRINTER", "48": "PRINTER SCANNER", "49": "PRINTER THERMAL", "50": "PRINTER BARCODE",
        "51": "UPS", "52": "KULKAS 1 PINTU", "53": "KULKAS 2 PINTU", "54": "SPEAKER ACTIVE",
        "55": "MICROPHONE", "56": "MAGICCOM", "57": "PERALATAN DAPUR", "58": "CCTV",
        "59": "NVR 32 CHANEL", "60": "KAMERA 2MP COLOURVUE", "61": "SWITCH POE 16 PORT UNMANAGEABLE",
        "62": "MODEM GSM", "63": "WALLMOUNT RAK", "64": "BOX PANEL", "65": "CONVERTER FO 2 UTP",
        "66": "MIKROTIK", "67": "SWITCH MANAGEABLE 16 PORT", "68": "ACCESS POINT", "69": "AC GANTUNG",
        "70": "AC STANDING", "71": "KIPAS ANGIN GANTUNG", "72": "KIPAS ANGIN STANDING",
        "73": "DISPENSER", "74": "CPU", "75": "SWITCH POE 8 PORT UNMANAGEABLE"
    },

    // --- MAPPING LOGIKA FILTER ---

    // 1. Filter Lokasi Berdasarkan Bidang (Atas)
    lokasi_mapping: {
        "01": ["01", "02", "03", "04", "05"],                          
        "02": ["06", "07", "08", "09", "10", "11", "12", "13", "14"], 
        "03": ["15", "16"],                                            
        "04": ["17", "18"],                                            
        "05": ["19", "20", "21"],                                      
        "06": ["22", "23"],                                            
        "07": ["24", "25", "26"]                                       
    },

    // 2. Filter Sub Kelompok Berdasarkan Kelompok (Warna)
    sub_kelompok_mapping: {
        "01": ["01"],                                                  // Hijau Tua (Tanah)
        "02": ["02"],                                                  // Orange (Hak Atas Tanah)
        "03": ["03", "04"],                                            // Kuning (Kendaraan)
        "04": ["05", "06", "07", "08", "09", "10", "11", "12"],        // Biru (Alat Kerja)
        "05": ["13", "14", "15"],                                      // Hijau Muda (Pompa)
        "06": ["16", "17", "18"],                                      // Cyan (Meubel)
        "07": ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28"] // Merah (Elektronik)
    },

    // 3. Filter Sub-Sub Kelompok Berdasarkan Sub Kelompok
    sub_sub_kelompok_mapping: {
        "01": ["01"], 
        "02": ["02"], 
        "03": ["03", "04", "05"],                                      // Mobil
        "04": ["06", "07"],                                            // Motor
        "05": ["08", "09"],                                            // Genset
        "06": ["10", "11"],                                            // Mesin Las
        "07": ["12"],                                                  // Kompresor
        "08": ["13"],                                                  // Senai
        "09": ["14"],                                                  // Manometer
        "10": ["15"],                                                  // Arco
        "11": ["16"],                                                  // GPS
        "12": ["17", "18", "19", "20", "21"],                          // Peralatan K3
        "13": ["22"],                                                  // Mesin Pompa
        "14": ["23"],                                                  // Pompa Submersible
        "15": ["24"],                                                  // Pompa Dosing
        "16": ["25", "26", "27", "28", "29", "30"],                    // Meja
        "17": ["31", "32", "33", "34"],                                // Kursi
        "18": ["35", "36", "37", "38", "39", "40", "41"],              // Lemari & Box
        "19": ["42", "43"],                                            // TV
        "20": ["44", "45", "46", "61", "62", "63", "64", "65", "66", "67", "68", "74", "75"], // Komputer & Jaringan IT
        "21": ["47", "48", "49", "50"],                                // Printer
        "22": ["51"],                                                  // UPS
        "23": ["52", "53"],                                            // Kulkas
        "24": ["54", "55"],                                            // Sound System
        "25": ["56", "57", "73"],                                      // Peranti Dapur & Dispenser
        "26": ["58", "59", "60"],                                      // CCTV
        "27": ["69", "70"],                                            // AC
        "28": ["71", "72"]                                             // Kipas Angin
    }
};