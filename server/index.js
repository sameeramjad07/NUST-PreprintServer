require('dotenv').config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const mainRouter = require('./api/index')
const pool = require('./db')
const PORT = process.env.PORT || 3001;

const app = express();

const ProdOrigin = process.env.ORIGIN
const devOrigin = ['http://localhost:5173',]
const allowdOrigin = process.env.NODE_ENV === 'production' ? ProdOrigin : devOrigin
app.use(cors({
    origin: (origin, callback) => {
        if(allowdOrigin.includes(origin) || !origin){
            console.log('Origin:', origin, "AllowedOrigin: ", allowdOrigin);
            callback(null, true)
        }
        else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



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