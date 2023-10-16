const express = require('express');
const logger = require('./logger'); // Mengimpor logger yang telah dikonfigurasi.

const app = express();

app.get('/', (req, res) => {
  logger.info('Permintaan GET ke halaman beranda');
  res.send('Halaman Beranda');
});

// Middleware untuk menangani kesalahan
app.use((err, req, res, next) => {
  logger.error('Kesalahan: ' + err.message);
  res.status(500).json({ error: 'Terjadi kesalahan' });
});

// ...

app.listen(3000, () => {
  logger.info('Server berjalan di port 3000');
});
