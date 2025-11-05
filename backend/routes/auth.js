const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Normalize URLs
const FRONTEND_URL = (process.env.FRONTEND_URL ).replace(/\/$/, '');
const BACKEND_URL = (process.env.BACKEND_URL ).replace(/\/$/, '');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${BACKEND_URL}/api/auth/google/callback`;

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!password || password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    if (!/[A-Z]/.test(password))
      return res.status(400).json({ message: 'Password must contain at least one uppercase letter' });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server error');
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err.message);
    res.status(500).send('Server error');
  }
});

// --- Google OAuth ---
// Step 1: Redirect to Google
router.get('/google', (req, res) => {
  if (!GOOGLE_CLIENT_ID) return res.status(500).send('Google OAuth not configured');

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
res.redirect(authUrl);

});

// Step 2: Callback from Google
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect(`${FRONTEND_URL}/login?error=missing_code`);

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info from Google
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, name, picture } = userResponse.data;
    if (!email) throw new Error('Email not found from Google');

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-12) + 'A';
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(randomPassword, salt);

      user = new User({
        name: name || email.split('@')[0],
        email,
        password: hashed,
        profileImage: picture || null,
      });

      await user.save();
    }

    // Create JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

    // Redirect frontend with token
    const redirectUrl = `${FRONTEND_URL}/login?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Google OAuth Error:', error.response?.data || error.message || error);
    res.redirect(`${FRONTEND_URL}/login?error=oauth_error`);
  }
});

module.exports = router;
