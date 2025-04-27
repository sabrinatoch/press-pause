const express = require('express');
const router = express.Router();
const UserSelectedPackage = require('../models/UserSelectedPackage');
const UserInterest = require('../models/UserInterest');


router.post('/', async (req, res) => {
  try {
    const { item, category } = req.body;
    
    // User id will be 1 for now for default
    let userId = "1";
    
    // Once the authentication is set up, you can fetch the userId from the request or session
    // const userInterest = await UserInterest.findOne().sort({ createdAt: -1 });
    // if (userInterest) {
    //   userId = userInterest.userId;
    // }
    
    const selectedPackage = new UserSelectedPackage({
      userId,
      item,
      category,
    });
    
    await selectedPackage.save();
    
    res.status(201).json({ 
      message: 'Package item saved successfully!', 
      selectedPackage 
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error saving selected package', error });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId || "1";
    const selectedPackages = await UserSelectedPackage.find({ userId })
                                   .sort({ selectedDate: -1 });
    
    res.status(200).json(selectedPackages);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error fetching selected packages', error });
  }
});

module.exports = router;