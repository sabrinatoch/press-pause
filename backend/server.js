const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const imageRetrieval = require('./routes/ImageRetrieval');
app.use('/api/image-retrieval', imageRetrieval);
app.use(cors());
app.use(express.json());
app.use('/api/user-interest', userInterestsRoutes);

const userInterestsRoutes = require('./routes/userInterest');
const selectedPackageRoutes = require('./routes/SelectedPackage');

app.use('/api/user-interest', userInterestsRoutes);
app.use('/api/selected-packages', selectedPackageRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Error connecting to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Hi :)');
});

// user API endpoints
app.get('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// some endpoints for packages
app.get('/api/packages/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const packages = await getPackagesByUserEmail(email);
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/packages', async (req, res) => {
  try {
    const packageData = req.body;
    const newPackage = await addPackage(packageData);
    res.status(201).json(newPackage);
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(400).json({ message: 'Error adding package', error: error.message });
  }
});

app.post('/api/packages/:packageId/rate', async (req, res) => {
  try {
    const { packageId } = req.params;
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    
    const updatedPackage = await ratePackage(packageId, rating);
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Error rating package:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

async function getUserByEmail(email) {
  const User = mongoose.model('User');
  return await User.findOne({ email });
}

async function getPackagesByUserEmail(email) {
  const Package = mongoose.model('Package');
  const user = await getUserByEmail(email);
  if (!user) return [];
  return await Package.find({ userId: user._id });
}

async function addPackage(packageData) {

  const Package = mongoose.model('Package');
  const newPackage = new Package(packageData);
  return await newPackage.save();
}

async function ratePackage(packageId, rating) {

  const Package = mongoose.model('Package');
  return await Package.findByIdAndUpdate(
    packageId,
    { rating },
    { new: true } 
  )};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});