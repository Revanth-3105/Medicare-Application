import express from "express";
import { dirname, join } from "path"; // Import join from path module
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const PORT = 3000;

app.use(express.static(join(__dirname, 'public'))); // Use join function from path module

// Define a route
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html")); // Use join function for the file path
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
