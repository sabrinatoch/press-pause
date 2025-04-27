// models/ImageRetrieval.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function retrieveImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`;

  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching from Unsplash');
    }
    const data = await response.json();
    return data.results; // returns an array of image objects
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = retrieveImage;
