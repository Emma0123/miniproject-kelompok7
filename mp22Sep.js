<!DOCTYPE html>
<html>
<head>
    Aplikasi Keuangan
</head>
<body>
  <h1> Aplikasi Keuangan</h1>
  <button onclick="tambahData()">Tambah Data</button>
  <button onclick="tampilkanData()">Tampilkan Data</button>
  <button onclick="perbaruiData()">Perbarui Data</button>
  <button onclick="hapusData()">Hapus Data</button>
  
<script>
  //Diatas ada button yang dibuat untuk memanggil fungsi fungsi yang ada dibawah

// Menambah data, yang perlu disimpan :
//     - id
//     - type : income / expence
//     - nominal
//     - note
//     - date (format : “yyyy-mm-dd”)

// Menampilkan data pengeluaran dan pemasukan dan menampilkan sisa uang terakhir

// Menampilkan data berdasarkan rentang tanggal mulai dan akhir yang diberikan

// Memperbarui data, yang bisa diperbarui :
//     - nominal
//     - note
//     - date
// Fungsi untuk memperbarui data keuangan
        function perbaruiData() {
            // Meminta input ID data yang akan diperbarui
            const idToUpdate = prompt("Masukkan ID data yang akan diperbarui:");
            // Meminta input filter tanggal untuk memfilter data
            const filterInput = prompt("Masukkan tanggal (format yyyy, yyyy-mm, atau yyyy-mm-dd) untuk memfilter data:");

            // Menggunakan filter untuk mendapatkan data yang sesuai dengan filter yang di inputkan user
            const filteredData = data.filter(item => {

                // Membuat objek Date dari properti 'date' pada setiap elemen 'item'
                const itemDate = new Date(item.date);

                // Membuat objek Date dari inputan 'filterInput' yang dimasukkan oleh user
                const filterDate = new Date(filterInput);

                // Memeriksa apakah objek tanggal 'itemDate' dan 'filterDate' valid
                if (!isNaN(itemDate.getTime()) && !isNaN(filterDate.getTime())) {

                    // Mengambil tahun, bulan, dan tanggal dari objek tanggal itemDate
                    const itemYear = itemDate.getFullYear(); // Mengambil tahun dari itemDate
                    const itemMonth = itemDate.getMonth(); // Mengambil bulan dari itemDate (0-11, 0=Januari, 11=Desember)
                    const itemDay = itemDate.getDate();

                     // Mengambil tahun, bulan, dan tanggal dari objek tanggal filterDate
                    const filterYear = filterDate.getFullYear(); // Mengambil tahun dari filterDate
                    const filterMonth = filterDate.getMonth(); // Mengambil bulan dari filterDate
                    const filterDay = filterDate.getDate(); // Mengambil tanggal dari filterDate

                    return (
                        // Memeriksa apakah ID data yang sedang diproses sama dengan ID yang akan diupdate oleh pengguna
                        item.id === idToUpdate &&

                        // Memeriksa tahun data yang sedang diproses sesuai dengan tahun filter yang di inputkan user
                        // atau jika filter tahun tidak digunakan (nilai -1), maka kondisi ini dilewati.
                        (filterYear === -1 || itemYear === filterYear) &&

                        // Memeriksa bulan data yang sedang diproses sesuai dengan bulan filter pengguna, 
                        // atau jika filter bulan tidak digunakan (nilai -1), maka kondisi ini dilewati.
                        (filterMonth === -1 || itemMonth === filterMonth) &&

                        // Memeriksa tanggal data yang sedang diproses sesuai dengan tanggal filter pengguna, 
                        // atau jika filter tanggal tidak digunakan (nilai -1), maka kondisi ini dilewati.
                        (filterDay === -1 || itemDay === filterDay)
                    );
                }
            // Jika objek tanggal tidak valid, maka data tidak cocok dengan kriteria
            return false;
        });

            if (filteredData.length === 0) {
                alert("Tidak ada data yang sesuai dengan kriteria yang dimasukkan.");
                return;
            }

            let dataToDisplay = "Data yang cocok dengan kriteria Anda:\n";
            for (let i = 0; i < filteredData.length; i++) {
                const item = filteredData[i];
                dataToDisplay += `${i + 1}. ID: ${item.id}, Type: ${item.type}, Nominal: ${formatRupiah(item.nominal)}, Catatan: ${item.note}, Tanggal: ${item.date}\n`;
            }

            // Meminta nomor data yang ingin diperbarui
            dataToDisplay += "\nMasukkan nomor data yang ingin diperbarui:";
            const dataToUpdateIndex = parseInt(prompt(dataToDisplay)) - 1;

            //Jika nomor data yang di inputkan user tidak valid 
            if (isNaN(dataToUpdateIndex) || dataToUpdateIndex < 0 || dataToUpdateIndex >= filteredData.length) {
                alert("Nomor data yang dimasukkan tidak valid.");
                return;
            }

            // Mengambil elemen dari array 'filteredData' berdasarkan indeks yang dipilih oleh pengguna.
            // 'dataToUpdateIndex' adalah indeks yang merepresentasikan elemen yang akan diubah.
            const itemToUpdate = filteredData[dataToUpdateIndex];

            // Meminta input ID, tanggal, nominal, dan catatan baru
            const newId = prompt(`ID baru (${itemToUpdate.id}):`) || itemToUpdate.id;

            const newDate = prompt(`Tanggal baru (${itemToUpdate.date}):`) || itemToUpdate.date;

            const newNominal = parseFloat(prompt(`Nominal baru (${formatRupiah(itemToUpdate.nominal)})\n *Inputkan angka saja`)) || itemToUpdate.nominal;

            const newNote = prompt(`Catatan baru (${itemToUpdate.note}):`) || itemToUpdate.note;

            // Mengupdate saldo sesuai dengan perubahan
            if (itemToUpdate.type === "Income") {
                saldo -= itemToUpdate.nominal;
                saldo += newNominal;
            } else {
                saldo += itemToUpdate.nominal;
                saldo -= newNominal;
            }

            // Mengupdate data dengan nilai yang baru
            itemToUpdate.id = newId;
            itemToUpdate.date = newDate;
            itemToUpdate.nominal = newNominal;
            itemToUpdate.note = newNote;

            alert("Data berhasil diperbarui.");
        }

// Menghapus data yang dipilih
function hapusData() {
            // Meminta input ID data yang akan dihapus
            const idToDelete = prompt("Masukkan ID data yang akan dihapus:");
            // Meminta input filter tanggal untuk memfilter data
            const filterInput = prompt("Masukkan tanggal (format yyyy, yyyy-mm, atau yyyy-mm-dd) untuk memfilter data:");

            // Menggunakan filter untuk mendapatkan data yang sesuai dengan kriteria
            const filteredData = data.filter(item => {
                const itemDate = new Date(item.date);
                const filterDate = new Date(filterInput);

                if (!isNaN(itemDate.getTime()) && !isNaN(filterDate.getTime())) {
                    const itemYear = itemDate.getFullYear();
                    const itemMonth = itemDate.getMonth();
                    const itemDay = itemDate.getDate();

                    const filterYear = filterDate.getFullYear();
                    const filterMonth = filterDate.getMonth();
                    const filterDay = filterDate.getDate();

                    return (
                        item.id === idToDelete &&
                        (filterYear === -1 || itemYear === filterYear) &&
                        (filterMonth === -1 || itemMonth === filterMonth) &&
                        (filterDay === -1 || itemDay === filterDay)
                    );
                }

                return false;
            });

            if (filteredData.length === 0) {
                alert("Tidak ada data yang sesuai dengan kriteria yang dimasukkan.");
                return;
            }

            let dataToDisplay = "Data yang cocok dengan kriteria Anda:\n";
            for (let i = 0; i < filteredData.length; i++) {
                const item = filteredData[i];
                dataToDisplay += `${i + 1}. ID: ${item.id}, Type: ${item.type}, Nominal: ${formatRupiah(item.nominal)}, Catatan: ${item.note}, Tanggal: ${item.date}\n`;
            }

            // User mimilih data mana yang ingin dihapus
            dataToDisplay += "\nMasukkan nomor data yang ingin dihapus:";
            const dataToDeleteIndex = parseInt(prompt(dataToDisplay)) - 1;

            if (isNaN(dataToDeleteIndex) || dataToDeleteIndex < 0 || dataToDeleteIndex >= filteredData.length) {
                alert("Nomor data yang dimasukkan tidak valid.");
                return;
            }

            const deletedItem = data.splice(data.indexOf(filteredData[dataToDeleteIndex]), 1)[0];

            // Mengupdate saldo sesuai dengan data yang dihapus oleh user
            if (deletedItem.type === "Income") {
                saldo -= deletedItem.nominal;
            } else {
                saldo += deletedItem.nominal;
            }

            alert("Data berhasil dihapus.");
        }
</script>

</body>

</html>
