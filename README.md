# Surplus Driver App

Aplikasi mobile internal untuk driver Surplus yang memungkinkan penerimaan dan pengelolaan order jus keliling secara lebih terstruktur. Proyek ini dibuat sebagai bagian dari _Technical Test – Mobile Developer_.

---

## Fitur yang Telah Diimplementasikan

Saat ini, aplikasi sudah memiliki fungsionalitas _end-to-end_ yang berjalan sepenuhnya secara lokal (menggunakan data statis).

1.  **State Management Terpusat:**
    *   Menggunakan React Context (`OrderContext`) untuk mengelola semua data order di seluruh aplikasi.
    *   Menyediakan fungsi untuk membaca dan memperbarui data order yang tersimpan di memori.

2.  **Layar Login:**
    *   Form input untuk email dan password.
    *   Validasi dilakukan terhadap kredensial statis yang di-hardcode (`driver@surplus.com` dan `123456`).
    *   Navigasi ke halaman utama setelah login berhasil.

3.  **Navigasi Utama (Tab Navigator):**
    *   **Tab Daftar Order:** Menampilkan semua order yang statusnya *bukan* "Selesai".
    *   **Tab Riwayat:** Menampilkan semua order yang statusnya "Selesai".

4.  **Alur Kerja Order:**
    *   **Daftar Order:** Pengguna dapat melihat ringkasan order dan menekan salah satunya untuk melihat detail.
    *   **Detail Order:** Menampilkan informasi lengkap order. Terdapat tombol aksi untuk mengubah status order ke tahap selanjutnya (misal: dari `Diterima` menjadi `Dalam Perjalanan`).
    *   **Update Status:** Alur status yang diimplementasikan adalah `Menunggu` -> `Diterima` -> `Dalam Perjalanan` -> `Selesai`.
    *   **Visual Feedback:** Aplikasi menampilkan indikator loading saat status order sedang diperbarui.

---

## Asumsi dan Batasan (Scope)

Implementasi saat ini dibuat dengan beberapa asumsi dan batasan teknis:

1.  **Sumber Data Lokal:** Aplikasi sepenuhnya berjalan menggunakan data statis (mock data) dari file `src/data/orders.ts`. **Tidak ada koneksi ke backend atau database sungguhan.**
2.  **Data Tidak Persisten:** Karena tidak ada database, setiap perubahan (seperti update status order) hanya tersimpan di memori dan akan **hilang (reset)** jika aplikasi ditutup dan dibuka kembali.
3.  **Autentikasi Mock:** Proses login hanya berupa simulasi. Tidak ada sistem session, token, atau keamanan autentikasi yang sebenarnya.
4.  **Tidak Real-time:** Tidak ada mekanisme untuk menerima order baru secara real-time (misalnya via push notification atau WebSocket). Data order hanya ada sejak aplikasi pertama kali dimuat.
5.  **Fokus pada Fungsionalitas:** Pengembangan difokuskan untuk memenuhi semua alur fungsional yang diminta dalam `task.md`. Aspek seperti styling UI, optimasi performa, dan penanganan error yang mendalam belum menjadi prioritas utama.

---

## Cara Menjalankan Proyek

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Jalankan di Android**
    Pastikan Android Emulator sudah berjalan atau perangkat fisik sudah terhubung.
    ```bash
    npm run android
    ```
