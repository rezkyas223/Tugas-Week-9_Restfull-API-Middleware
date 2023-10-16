const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Koneksikan ke database MongoDB
mongoose.connect('mongodb://localhost/restful_api_example', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Model User
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Middleware untuk otorisasi
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Endpoint Register User
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  newUser.save((err) => {
    if (err) {
      return res.status(400).json({ message: 'Registration failed' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Endpoint Login User
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ username, password }, 'your_secret_key');
    res.json({ token });
  });
});


// Server Start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
