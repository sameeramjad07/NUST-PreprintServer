const express = require('express')
const router = express.Router();

// fetches only name, as for now
router.get('/', async (req, res) => {
    try {
      const cmsId = req.query.cmsId;
      const response = await fetch(`${process.env.DATA_API}${cmsId}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;