const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'config', '.env') });

const connectDB = require('./config/db');

const app = express();

// Parse JSON
app.use(express.json());

// Configure CORS using FRONTEND url from env
const FRONTEND_URL = (process.env.FRONTEND_URL).replace(/\/$/, '');
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., curl, server-to-server)
      if (!origin) return callback(null, true);
      if (origin === FRONTEND_URL) return callback(null, true);
      // For easier local dev, also allow exact host without protocol/port edge cases
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URL;
if (!mongoUri) {
  console.error('Mongo_URL not set in .env (backend/config/.env)');
  process.exit(1);
}
connectDB(mongoUri);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'NoteNest backend is running' });
});

// Determine port from Backend_URL env if available, otherwise fallback to PORT or 5000
let port = process.env.PORT;
if (!port && process.env.Backend_URL) {
  try {
    const parsed = new URL(process.env.Backend_URL);
    port = parsed.port || 5000;
  } catch (e) {
    port = 5000;
  }
}
port = port || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
