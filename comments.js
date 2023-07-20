// Create a web server

// Import the express module
const express = require('express');

// Import the body-parser module
const bodyParser = require('body-parser');

// Import the mongoose module
const mongoose = require('mongoose');

// Import the Comments model
const Comments = require('../models/comments');

// Create the router
const router = express.Router();

// Configure router to use body-parser
router.use(bodyParser.json());

// Configure router to use body-parser
router.use(bodyParser.urlencoded({ extended: true }));

// Configure the router to support cross-origin resource sharing (CORS)
router.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');

  // Set the Access-Control-Allow-Headers to allow the client to send the following headers:
  // Origin, X-Requested-With, Content-Type, Accept, Authorization
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }

  // Set the Access-Control-Allow-Methods header to allow the client to send the following methods:
  // GET, POST, PUT, DELETE, OPTIONS
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }

  // Pass the control to the next handler
  next();
});

// Create the GET method for the /comments endpoint
router.get('/', (req, res) => {
  // Return all the comments
  Comments.find({}, (err, comments) => {
    if (err) {
      // Return the error message
      return res.json({ success: false, error: err });
    }

    // Return the comments
    return res.json({ success: true, comments });
  });
});

// Create the POST method for the /comments endpoint
router.post('/', (req, res) => {
  // Create a new comment
  const comment = new Comments();

  // Set the comment properties
  comment.author = req.body.author;
  comment.text = req.body.text;

  // Save the comment
  comment.save((err) => {
    if (err) {
      // Return the error message
      return res.json({ success: false, error: err });
    }

    // Return a success message
    return res.json({ success: true, message: 'Comment added successfully.' });
  });
});
