// paperRoutes.js
const express = require('express');
const multer = require('multer');
const pool = require('../db');
const authenticateToken = require('../authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
    try {
      console.log("Starting with form Data");
      const { title, abstract, keywords, authors } = req.body;
      console.log("PASSED FORM DETAILS: ",title, abstract, keywords, authors);
      const filePath = req.file.path;
      console.log("FILE PATH: ",filePath);
      const userId = req.user.userId;
      console.log("this.USER_ID: ", userId);
      console.log("Done with form Data");
      await pool.execute(
        'INSERT INTO papers (title, abstract, keywords, file_path, user_id) VALUES (?, ?, ?, ?, ?)',
        [title, abstract, keywords, filePath, userId]
      );

      const [paper] = await pool.execute('SELECT LAST_INSERT_ID() as paperId');
      const paperId = paper[0].paperId;
  
      for (const author of authors) {
        await pool.execute(
          'INSERT INTO authors (name, affiliation, paper_id) VALUES (?, ?, ?)',
          [author.name, author.affiliation, paperId]
        );
      }
  
      res.status(201).json({ message: 'Paper submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Submission error', error });
    }
});

// Updated route to fetch papers for a specific user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Fetch user ID from token

    // Fetch papers with their associated authors
    const [papers] = await pool.execute(`
      SELECT 
        p.id AS paperId, 
        p.title, 
        p.abstract, 
        p.keywords, 
        p.file_path, 
        p.published_date,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'name', a.name,
            'affiliation', a.affiliation
          )
        ) AS authors
      FROM papers p
      LEFT JOIN authors a ON p.id = a.paper_id
      WHERE p.user_id = ?
      GROUP BY p.id
    `, [userId]);

    // Parse authors JSON
    // const formattedPapers = papers.map(paper => ({
    //   ...paper,
    //   authors: JSON.parse(paper.authors)
    // }));

    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Fetch error', error });
  }
});

module.exports = router;
