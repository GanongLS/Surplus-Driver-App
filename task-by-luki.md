Upgrade Fitur dari task.md yang di buat oleh luki subandi:
Fitur dari task.md hampir benar dikerjakan tapi masih ada beberapa asumsi yang perlu kita upgrade:
1. Login Driver (done)
    • Driver login menggunakan:
        ◦ Nomor HP + PIN atau
        ◦ Email + Password
    • Asumsikan driver sudah terdaftar di sistem 

[Upgrade: disini driver bisa login dengan dua cara, masing-masing belum terimplementasi dengan penuh. kita harus bisa membuat driver bisa memilih mau login menggunakan Nomor HP atau mau menggunakan email. artinya kita harus memiliki dua jenis authentikasi, dampaknya kita harus memiliki list mockup user login data. dan harus implemen semua logic ini di login screen. 

Jadi cara menghandle dua login ini adalah dengan cara melihat apakah user input email di textinput field pertama atau user menginput nomor hape, jika seluruh input adalah nomor maka kita menggunakan login input nomor hape, jika terlihat pola email kita menggunakan metode input email. 

jika perlu kita bisa implementasi regex untuk mengecheck login apakah valid email (regex standard valid email) atau valid nomer hape (barisan angka dengan angka 0 diawal dan berjumlah minimal 9 digit)

Pada login screen belum ada title pada setiap input field (walau sepertinya tidak masalah, karena user bisa melihat apa yang harus ditulis pada placeholder, jadi ini skip saja dulu), tapi mari hiraukan, karena hanya ada dua field bukan screen register yang harus mengisi lebih dari 4 field sehingga setiap field harus diberi nama. Tapi pada kolom password atau pin, user tidak bisa melihat password atau pin yang sudah dimasukkan. tolong buatkan toggle untuk bisa melihat pin atau password yang telah dimasukkan. ](done)

2. Daftar Order (done)
    • Menampilkan list order yang tersedia untuk driver
    • Informasi minimum:
        ◦ Nama customer
        ◦ Lokasi customer (alamat atau koordinat)
        ◦ Jenis jus
        ◦ Jumlah
        ◦ Waktu order 

[ Upgrade kita tambah list order pada data dummy pada src/data/orders.ts. kita generate minimal ada 20 order, lalu minimal ada 4 order dengan keadaan yang berbeda mulai dari "Diterima", "Dalam Perjalanan", "Selesai". Sisanya buat menjadi "menunggu".

lalu pada halaman Orders ubah titlenya menjadi Daftar Pesanan, ubah card order agar menjadi view card kiri nama field, kanan nilai field, misal nama Budi, alamat Jl.Merdeka No 10. pesanan Jus alpukat, jumlah pesanan 1 gelas, dan seterusnya.

Jenis jus dan jumlah jus dipisah dalam dua field yang berbeda (contoh). 
Pesanan Jus Alpukat
Jumlah 2 gelas ](done)

3. Detail Order (not done yet)
    • Menampilkan detail lengkap order
    • Tombol aksi:
        ◦ Terima Order
        ◦ Tolak Order (opsional, dengan alasan)

upgrade pada src/screens/DetailOrderScreen.tsx kita tidak menemui button aksi tolak order dan terima order. ketika status masih menunggu, driver bisa menerima order atau menolaknya. 