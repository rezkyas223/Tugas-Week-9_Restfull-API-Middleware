const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const app = express();

// Konfigurasi middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// Pengaturan strategi otentikasi Passport
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Implementasi otentikasi user di sini
    if (username === 'user' && password === 'password') {
      return done(null, { username: 'user' });
    }
    return done(null, false);
  }
));

// Fungsi pembuatan token JWT
function generateToken(user) {
  return jwt.sign(user, 'rahasia', { expiresIn: '1h' });
}

// Middleware otentikasi dengan Passport
function authenticate(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ message: 'Autentikasi gagal' });
      return;
    }
    const token = generateToken(user);
    res.json({ token });
  })(req, res, next);
}

// Endpoint untuk register user (POST)
app.post('/register', (req, res) => {
  // Implementasi registrasi user di sini
  res.status(201).json({ message: 'Registrasi sukses' });
});

// Endpoint untuk login user (POST)
app.post('/login', authenticate);

// Endpoint untuk GET users (Contoh data statis)
app.get('/users', (req, res) => {
  const users = [
    { username: 'user1' },
    { username: 'user2' },
    { username: 'user3' }
  ];
  res.json(users);
});

const swaggerSpec = require('./swaggerconfig.js');
// Endpoint untuk GET movies (Contoh data statis)
app.get('/movies', (req, res) => {
  const movies = [
    { title: 'Movie 1' },
    { title: 'Movie 2' },
    { title: 'Movie 3' }
  ];
  res.json(movies);
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});


