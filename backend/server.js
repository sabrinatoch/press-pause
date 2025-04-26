const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const userInterestsRoutes = require('./routes/userInterest');
app.use('/api/user-interest', userInterestsRoutes);

mongoose.connect('mongodb+srv://1822590:kneQqbtSZjuGywLB@press-pause.kr6utif.mongodb.net/', {
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
