const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userInterestsRoutes = require('./routes/userInterest');
app.use('/api/user-interest', userInterestsRoutes);

const imageRetrieval = require('./routes/ImageRetrieval');
app.use('/api/image-retrieval', imageRetrieval);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB', err));
app.get('/', (req, res) => {
  res.send('Hi :)');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
