const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Enable CORS for frontend to communicate
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, JS)
app.use(express.static('public'));

// In-memory database (can be replaced with actual DB later)
const posts = {
  music: [],
  video: [],
  blog: []
};

// Get all posts
app.get('/posts/:type', (req, res) => {
  const { type } = req.params;
  if (posts[type]) {
    res.json(posts[type]);
  } else {
    res.status(404).send('Type not found');
  }
});

// Add a post (for music, video, blog)
app.post('/posts/:type', (req, res) => {
  const { type } = req.params;
  const { key, content } = req.body;
  
  if (key !== 'BLAZZYCRONOSCHAINBLOCK119') {
    return res.status(403).send('Incorrect key');
  }

  if (posts[type]) {
    const newPost = { content, date: new Date() };
    posts[type].push(newPost);
    res.status(201).json(newPost);
  } else {
    res.status(404).send('Type not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
