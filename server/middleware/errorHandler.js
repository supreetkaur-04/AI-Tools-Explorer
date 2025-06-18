// errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error("Server error:", err);
  
  // Handle specific errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  
  // Handle duplicate favorite error
  if (err.message && err.message.includes("duplicate")) {
    return res.status(409).json({ error: "Tool already favorited" });
  }
  
  // Generic error response
  res.status(500).json({ 
    error: "An unexpected error occurred" 
  });
};

module.exports = errorHandler;