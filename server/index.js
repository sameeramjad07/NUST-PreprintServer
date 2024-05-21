require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const mainRouter = require('./routes/index')
const pool = require('./db')
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/v1', mainRouter)


app.listen(PORT, async () => {
    try {
        await pool.getConnection();
        console.log(`Server running on port ${PORT}`);
    } 
    catch (error) {
        console.error('Error connecting to database:', error);
    }
});