const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// חיבור ל-MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas מחובר בהצלחה'))
.catch((err) => console.error('שגיאה בחיבור ל-MongoDB:', err));

// Routes
app.use('/api/children', require('./routes/children'));
app.use('/api/lessons', require('./routes/lessons'));
app.use('/api/chat-sessions', require('./routes/chatSessions'));
app.use('/api/messages', require('./routes/messages'));

// נתיב בסיסי
app.get('/', (req, res) => {
  res.json({ message: 'AI Lesson Backend API' });
});

// מטפל בשגיאות
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'משהו השתבש!' });
});

// מטפל בנתיבים שלא נמצאו
app.use('*', (req, res) => {
  res.status(404).json({ error: 'נתיב לא נמצא' });
});

app.listen(PORT, () => {
  console.log(`Server רץ על פורט ${PORT}`);
});