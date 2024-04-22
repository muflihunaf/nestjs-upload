1. Start

2. User Authentication:
   - Pengguna melakukan otentikasi dengan sistem menggunakan nama pengguna (username) dan kata sandi (password).
   - Sistem memeriksa kecocokan informasi otentikasi yang diberikan dengan data yang disimpan dalam basis data.

3. Frontend Interface:
   - Setelah berhasil login, pengguna berinteraksi dengan antarmuka pengguna yang disediakan oleh aplikasi.

4. Document Upload:
   - Pengguna mengunggah dokumen yang ingin mereka simpan atau bagikan melalui antarmuka.

5. File Validation:
   - Sistem memvalidasi file yang diunggah untuk memastikan format dan ukuran file sesuai dengan persyaratan aplikasi.
   - Jika valid, proses akan berlanjut; jika tidak, pengguna akan diberi tahu untuk mengunggah ulang dengan file yang sesuai.

6. Store Metadata in Database:
   - Setelah validasi, metadata dari dokumen (seperti judul, deskripsi, dan tanggal unggah) disimpan dalam basis data.

7. Store File in Storage:
   - Dokumen itu sendiri disimpan di sistem penyimpanan yang sesuai (misalnya: sistem file atau penyimpanan awan) dan lokasi penyimpanannya diidentifikasi oleh path file.

8. Document Management:
   - Pengguna dapat mengelola dokumen yang diunggah, seperti menambahkan informasi tambahan, mengatur tag, atau menghapus dokumen.

9. Share Document:
   - Pengguna dapat membagikan dokumen yang diunggah dengan pengguna lain dengan menentukan tingkat akses (misalnya: baca saja atau tulis).

10. Access Control:
    - Sistem memeriksa izin akses pengguna yang meminta akses ke dokumen yang dibagikan.
    - Akses diberikan atau ditolak berdasarkan izin yang ditetapkan oleh pemilik dokumen.

11. Download/Delete/Edit Document:
    - Pengguna yang memiliki akses yang sesuai dapat mengunduh, menghapus, atau mengedit dokumen sesuai kebutuhan.

12. End
