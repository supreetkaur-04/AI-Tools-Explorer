// favoritesController.js

const tools = require('../data.json');
let favorites = [];

const addFavorite = (req, res) => {
  try {
    const { toolId } = req.body;
    
    // Validate request
    if (toolId === undefined || toolId === null) {
      return res.status(400).json({ error: "Missing toolId" });
    }
    
    // Convert to number since IDs are numeric
    const id = Number(toolId);
    
    // Check if tool exists
    const tool = tools.find(t => t.id === id);
    if (!tool) return res.status(404).json({ error: "Tool not found" });
    
    // Prevent duplicates
    if (favorites.includes(id)) {
      return res.status(409).json({ error: "Tool already favorited" });
    }
    
    favorites.push(id);
    res.status(201).json({ message: "Added to favorites", id: id });
  } catch (error) {
    res.status(500).json({ error: "Failed to save favorite" });
  }
};

const getFavorites = (req, res) => {
  try {
    const favTools = favorites.map(id => 
      tools.find(tool => tool.id === id)
    ).filter(Boolean); // Remove any undefined entries
    
    res.json(favTools);
  } catch (error) {
    res.status(500).json({ error: "Failed to get favorites" });
  }
};

// NEW: Remove favorite endpoint
const removeFavorite = (req, res) => {
  try {
    const { toolId } = req.body;
    
    if (toolId === undefined || toolId === null) {
      return res.status(400).json({ error: "Missing toolId" });
    }
    
    const id = Number(toolId);
    
    if (!favorites.includes(id)) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    
    favorites = favorites.filter(favId => favId !== id);
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };