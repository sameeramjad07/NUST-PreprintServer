const axios = require('axios');
require('dotenv').config();

async function getName(cmsId) { 
    const response = await axios.get(`${process.env.DATA_API}${cmsId}`);        
      
      // Extract JSON data from the response
      const jsonData = await response.data;

        // Access the "ric_expert_portal_faculty_json_data" array which contains the faculty data
      const facultyDataArray = jsonData.ric_expert_portal_faculty_json_data;

        // Assuming there's only one faculty member in the array, you can directly access the first element
      const faculty = facultyDataArray[0];

        // Access the "name" property of the faculty object
      const name = faculty.name;
      console.log(name)
      return name;
}

// Function to decode Base64
function decodeBase64(encodedStr) {
  const decodedBuffer = Buffer.from(encodedStr, 'base64');
  const decodedStr = decodedBuffer.toString('utf-8');
  return decodedStr;
}

async function getImage(cmsId) { 
  try {
    const response = await axios.get(`${process.env.DATA_API}${cmsId}`);
    const data = response.data;

    // Assuming the API response structure provided in the question
    const facultyData = data.ric_expert_portal_faculty_json_data;
    
    // Check if facultyData is not empty and contains image_128
    if (facultyData && facultyData.length > 0 && facultyData[0].image_128) {
        const image128 = facultyData[0].image_128;
        const image = decodeBase64(image128);
        console.log(image);
        return image;
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

module.exports = { getName, getImage };


