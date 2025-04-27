const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Proper CORS setup
const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
const userInterestsRoutes = require('./routes/userInterest');
app.use('/api/user-interest', userInterestsRoutes);

const imageRetrieval = require('./routes/ImageRetrieval');
app.use('/api/image-retrieval', imageRetrieval);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Hi :)');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
