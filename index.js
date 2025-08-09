const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/ImageRoutes.js')


const connectDB = require('./Database/connection.js')

// Load environment variables from .env
dotenv.config();
connectDB();


const app = express();
const port = process.env.PORT || 3013; // Fallback if PORT is undefined

// Middleware
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://image-generator-ten-iota.vercel.app/"
  ],
  credentials: true
}));
// Routes
app.get('/', (req, res) => {
    res.send('Hello Arslan!');
});
// Use routes with a base path
app.use('/api/users', userRoutes);
app.use('/api/image', imageRoutes);

// Start server 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
