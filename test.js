// require('dotenv').config();
// const mysql = require('mysql2/promise');



// // Create the connection pool to the database
// const pool = mysql.createPool({
//   uri: process.env.DATABASE_URL
// });

// async function alter(){
//     try{
//         const connection = await pool.getConnection();

//         const alterQuery = `select * from users;`;

//         const res = await connection.execute(alterQuery);
//         console.log(res);
//     }
//     catch(error){
//         console.error('Error connecting to database:', error);
//     }
// }

// alter();

// Function to decode Base64
function decodeBase64(encodedStr) {
    const decodedBuffer = Buffer.from(encodedStr, 'base64');
    const decodedStr = decodedBuffer.toString('utf-8');
    return decodedStr;
  }
  
async function getImage(cmsId) { 
      const response = await fetch(`${process.env.DATA_API}${cmsId}`);        
        
        // Extract JSON data from the response
        const jsonData = await response.json();
  
          // Access the "ric_expert_portal_faculty_json_data" array which contains the faculty data
        const facultyDataArray = jsonData.ric_expert_portal_faculty_json_data;
  
          // Assuming there's only one faculty member in the array, you can directly access the first element
        const faculty = facultyDataArray[0];
  
          // Access the "name" property of the faculty object
        const encodedImage = faculty.image_128;
        const image = decodeBase64(encodedImage);
        console.log(image)
        return image;
  }

//   getImage("00000003557");

require('dotenv').config();
const { default: axios } = require('axios');
  
async function getName(cmsId) { 
    try {
        const response = await axios.get(`${process.env.DATA_API}${cmsId}`);
        const data = response.data;
        console.log(data);

        // Assuming the API response structure provided in the question
        const facultyData = data.ric_expert_portal_faculty_json_data;
        
        // Check if facultyData is not empty and contains image_128
        if (facultyData && facultyData.length > 0 && facultyData[0].image_128) {
            const image128 = facultyData[0].image_128;
            console.log(image128);
            return image128;
        } else {
            // Handle case where image_128 is not found
            return "Image not found";
        }
    } catch (error) {
        // Handle error
        console.error("Error fetching image:", error);
        return "Error fetching image";
    }
}
const res = getName("00000003557");
console.log(res);