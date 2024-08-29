const express = require('express');
const mongodb = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = '#'

// CONNECT to MongoDB
mongodb.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  
  //GET the database item/object;
  const db = client.db(); 
  
  // start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});


app.post('/users', (req, res) => {
    const userData = req.body; 
    db.collection('users').insertOne(userData, (err, result) => {
      if (err) {
        console.error('Failed to insert user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log('User inserted successfully:', result.ops[0]);
      res.status(201).send('User created successfully');
    });
  });

  
  // handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });
  
  // close MongoDB connection when Node.js server shuts down
  process.on('SIGINT', () => {
    client.close(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
  

//USING EXPRESS.JS SERVER

// Serve the sample page
app.get('/sample', (req, res) => {
    res.sendFile(__dirname + '/sample.html'); 
  });

  

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.querySelector('.overlay');
    const registrationForm = document.getElementById('registration-form');
    const signInForm = document.getElementById('sign-in-form');

    // SHOW overlay
    function showOverlay() {
        overlay.style.display = 'block';
    }

    // HIDE overlay
    function hideOverlay() {
        overlay.style.display = 'none';
    }

    // SHOW registration form on page load
    showOverlay();

    // HIDE overlay when user clicks outside the form
    window.addEventListener('click', function(event) {
        if (event.target === overlay) {
            hideOverlay();
        }
    });

    // SHOW sign-in form when "Sign In" button is clicked
  
    signInButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        signInForm.style.display = 'block';
        registrationForm.style.display = 'none';
    });

    // SHOW registration form when "Register" button is clicked
    
    registerButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        signInForm.style.display = 'none';
        registrationForm.style.display = 'block';
    });

    // FORM SUBMISSION ... (still working on it)
});
