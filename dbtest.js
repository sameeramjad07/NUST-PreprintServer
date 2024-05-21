require('dotenv').config();
const mysql = require('mysql2/promise');



// Create the connection pool to the database
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL
});

async function alter(){
    try{
        const connection = await pool.getConnection();

        const alterQuery = `select * from papers`;
        const [results, fields] = await connection.execute(alterQuery);
        console.log(results, fields);
    }
    catch(error){
        console.error('Error connecting to database:', error);
    }
}

alter();