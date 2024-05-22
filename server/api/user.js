const express = require('express');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authenticateToken = require('../authMiddleware');
const { getName, getImage } = require('../getHandlers/apiHandles');

const router = express.Router();

// Define the schema for user sign-up request body
const signupSchema = zod.object({
  cmsId: zod.string().length(11),
  password: zod.string().min(8),
});

// Define the schema for user login request body
const loginSchema = zod.object({
  cmsId: zod.string().length(11),
  password: zod.string().min(8),
});

// User sign-up route
router.post('/signup', async (req, res) => {
  try {
    // Validate request body against the schema
    const { cmsId, password } = signupSchema.parse(req.body);

    // Check if the user already exists
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE cmsId = ?', [cmsId]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    // Fetch user details from API using the provided CMS ID
    const userImage_url = await getImage(cmsId);
    const userName = await getName(cmsId);
    const userDetails = { name: userName, image_url: userImage_url };
    // Check if userDetails contains valid user data
    if (!userDetails || !userDetails.name) {
      return res.status(404).json({ message: 'User not found or invalid CMS ID' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await pool.execute(
      'INSERT INTO users (cmsId, password, name, image_url) VALUES (?, ?, ?, ?)',
      [cmsId, hashedPassword, userName, userImage_url]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Validate request body against the schema
    const { cmsId, password } = loginSchema.parse(req.body);

    // Find the user by cmsId
    const [users] = await pool.execute('SELECT * FROM users WHERE cmsId = ?', [cmsId]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log("User found: ", user)
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    console.log("Token generated: ", token)
    console.log("User ID: ", user.id)
    console.log("User CMS ID: ", user.cmsId)
    console.log("User Name: ", user.name)
    console.log("User Password: ", user.password, password)
    console.log("Now sending response...")
    // Return token and user ID
    res.status(200).json({ message: 'Login successful', token, userId: user.id });

  } catch (error) {
    console.error(error);
    if (error instanceof zod.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Extract user ID from authenticated token
    const userId = req.user.userId;

    // Fetch user details from the database
    const [userData] = await pool.execute('SELECT name, image_url FROM users WHERE id = ?', [userId]);

    // Check if user data exists
    if (userData.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData[0];

    // Return user's name and image URL
    res.json({ name: user.name, image_url: user.image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
