const express = require("express");
const cors = require("cors");
const toolsRoutes = require("./routes/tools");
const favoritesRoutes = require("./routes/favorites");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root route for status check
app.get("/", (req, res) => {
  res.send("AI Tools API is running");
});

// API Routes
app.use("/api/tools", toolsRoutes);
app.use("/api/favorites", favoritesRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});