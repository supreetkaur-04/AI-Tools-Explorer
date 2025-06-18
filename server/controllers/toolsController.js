// toolsController.js

const tools = require('../data.json');

const getTools = (req, res) => {
  try {
    const { category } = req.query;
    
    if (category) {
      // Case-insensitive filter
      const filtered = tools.filter(tool => 
        tool.category.toLowerCase().includes(category.toLowerCase())
      );
      return res.json(filtered);
    }
    
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tools" });
  }
};

module.exports = { getTools };