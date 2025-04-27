// models/ImageRetrieval.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

// API Keys - These should be in your .env file
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX; // Custom Search Engine ID

/**
 * Retrieve image based on content type and query
 * @param {string} query - The search query
 * @param {string} type - The content type (movie, book, music, show, game, activity)
 * @returns {Promise<Array>} - Array of image results
 */
async function retrieveImage(query, type) {
  try {
    // Extract the actual search term without the type
    const searchTerm = query.replace(`+${type}`, '');
    
    console.log(`Searching for "${searchTerm}" of type "${type}"`);
    
    // Select API based on content type
    switch (type) {
      case 'movie':
      case 'show':
        return await getFromTMDB(searchTerm, type);
      case 'book':
        return await getBookCover(searchTerm);
      case 'music':
        return await getMusicCover(searchTerm);
      case 'game':
        return await getGameCover(searchTerm);
      default:
        // For 'activity', 'new', or any other type, fall back to Unsplash
        return await getFromUnsplash(searchTerm);
    }
  } catch (error) {
    console.error(`Error retrieving image for ${query}:`, error);
    
    // Return placeholder image based on content type
    if (['movie', 'show', 'book', 'game', 'music'].includes(type)) {
      return [createPlaceholderResult(type)];
    }
    
    // For other types, fall back to Unsplash
    try {
      return await getFromUnsplash(query);
    } catch (unsplashError) {
      console.error(`Unsplash fallback failed:`, unsplashError);
      // Return a generic placeholder as last resort
      return [createPlaceholderResult('generic')];
    }
  }
}

/**
 * Returns a placeholder image path for the specified content type
 * @param {string} type - The content type
 * @returns {string} - Placeholder image path
 */
function getPlaceholderPath(type) {
  const placeholders = {
    'movie': 'assets/images/movie-placeholder.jpg',
    'show': 'assets/images/show-placeholder.jpg',
    'book': 'assets/images/book-placeholder.jpg', 
    'game': 'assets/images/game-placeholder.jpg',
    'music': 'assets/images/music-placeholder.jpg',
    'generic': 'assets/images/placeholder.jpg'
  };
  
  return placeholders[type] || placeholders.generic;
}

/**
 * Creates a result object with the placeholder image path
 * @param {string} type - The content type
 * @returns {Object} - Result object with placeholder image
 */
function createPlaceholderResult(type) {
  const path = getPlaceholderPath(type);
  
  return {
    id: `placeholder-${type}`,
    description: `Placeholder image for ${type}`,
    urls: {
      raw: path,
      regular: path,
      thumb: path
    },
    isPlaceholder: true
  };
}

/**
 * Get movie or TV show images from TMDB
 */
async function getFromTMDB(query, type) {
  const endpoint = type === 'movie' ? 'movie' : 'tv';
  
  // First, search for the movie/show ID
  const searchUrl = `https://api.themoviedb.org/3/search/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  
  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error(`TMDB search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.results && data.results.length > 0) {
    const id = data.results[0].id;
    
    // Check if poster or backdrop path exists
    if (!data.results[0].poster_path && !data.results[0].backdrop_path) {
      throw new Error(`No image found for ${type}`);
    }
    
    // Then, get images for that specific movie/show
    const imagesUrl = `https://api.themoviedb.org/3/${endpoint}/${id}/images?api_key=${TMDB_API_KEY}`;
    const imagesResponse = await fetch(imagesUrl);
    
    if (!imagesResponse.ok) {
      throw new Error(`TMDB images fetch failed: ${imagesResponse.statusText}`);
    }
    
    const imagesData = await imagesResponse.json();
    
    // Format results to match Unsplash format for consistency
    return [{
      id: id.toString(),
      description: data.results[0].title || data.results[0].name,
      urls: {
        raw: `https://image.tmdb.org/t/p/original${data.results[0].poster_path || data.results[0].backdrop_path}`,
        regular: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path || data.results[0].backdrop_path}`,
        thumb: `https://image.tmdb.org/t/p/w200${data.results[0].poster_path || data.results[0].backdrop_path}`
      }
    }];
  }
  
  throw new Error(`No ${type} results found`);
}

/**
 * Get book cover from Open Library
 */
async function getBookCover(query) {
  // Search Open Library for the book
  const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`;
  
  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error(`Open Library search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.docs && data.docs.length > 0) {
    // Find the first result with a cover_i (cover ID)
    const book = data.docs.find(doc => doc.cover_i);
    
    if (book && book.cover_i) {
      // Format results to match Unsplash format
      return [{
        id: book.key,
        description: book.title,
        urls: {
          raw: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
          regular: `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`,
          thumb: `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
        }
      }];
    }
  }
  
  throw new Error('No book cover found');
}

/**
 * Get music album cover from Last.fm API
 */
async function getMusicCover(query) {
  // If you have a Last.fm API key
  if (process.env.LASTFM_API_KEY) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&api_key=${process.env.LASTFM_API_KEY}&format=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Last.fm search failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.albummatches && data.results.albummatches.album && data.results.albummatches.album.length > 0) {
      const album = data.results.albummatches.album[0];
      
      // Get the largest image
      const image = album.image.find(img => img.size === 'extralarge') || album.image[0];
      
      // Check if image URL exists and is valid
      if (!image || !image['#text'] || image['#text'] === '') {
        throw new Error('No music cover image found');
      }
      
      return [{
        id: album.mbid || album.url,
        description: `${album.name} by ${album.artist}`,
        urls: {
          raw: image['#text'],
          regular: image['#text'],
          thumb: image['#text']
        }
      }];
    }
  }
  
  // Fall back to Google image search for music
  try {
    return await getFromGoogle(`${query} album cover`);
  } catch (error) {
    throw new Error('No music cover found');
  }
}

/**
 * Get game cover using Google Custom Search API
 */
async function getGameCover(query) {
  try {
    return await getFromGoogle(`${query} video game cover`);
  } catch (error) {
    throw new Error('No game cover found');
  }
}

/**
 * Get images from Unsplash API
 */
async function getFromUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unsplash search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.results && data.results.length > 0) {
    return data.results;
  }
  
  throw new Error('No Unsplash results found');
}

/**
 * Get images from Google Custom Search API
 */
async function getFromGoogle(query) {
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    throw new Error('Google API credentials not configured');
  }
  
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&searchType=image&q=${encodeURIComponent(query)}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google search failed: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  if (data.items && data.items.length > 0) {
    // Format Google results to match Unsplash format
    return data.items.slice(0, 5).map(item => ({
      id: item.link,
      description: item.title,
      urls: {
        raw: item.link,
        regular: item.link,
        thumb: item.image.thumbnailLink
      }
    }));
  }
  
  throw new Error('No Google image results found');
}

module.exports = retrieveImage;