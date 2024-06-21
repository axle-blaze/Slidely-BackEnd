import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Path to the JSON file
const dbPath = path.join(__dirname, 'db.json');

// Check server status
app.get('/ping', (req, res) => {
  res.send('True');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;

  if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
    return res.status(400).send('Missing required fields');
  }

  const newEntry = { Name, Email, Phone, GithubLink, StopwatchTime };

  // Read the current data
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading database');
    }

    const db = JSON.parse(data);
    db.push(newEntry);

    // Write the updated data back to the file
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving to database');
      }

      res.send('Submission saved');
    });
  });
});

// Read a specific submission by index
app.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);

  if (isNaN(index)) {
    return res.status(400).send('Invalid index');
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading database');
    }

    const db = JSON.parse(data);

    if (index < 0 || index >= db.length) {
      return res.status(404).send('Entry not found');
    }

    res.json(db[index]);
  });
});

// Search for a submission by email
app.get('/search', (req, res) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).send('Email query parameter is required');
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading database');
    }

    const db = JSON.parse(data);
    const entry = db.find((entry: { Email: string }) => entry.Email === email);

    if (!entry) {
      return res.status(404).send('Entry not found');
    }

    res.json(entry);
  });
});

// Delete a specific submission by index
app.delete('/delete', (req, res) => {
  const index = parseInt(req.query.index as string, 10);

  if (isNaN(index)) {
    return res.status(400).send('Invalid index');
  }

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading database');
    }

    const db = JSON.parse(data);

    if (index < 0 || index >= db.length) {
      return res.status(404).send('Entry not found');
    }

    // Remove the entry at the specified index
    db.splice(index, 1);

    // Write the updated data back to the file
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving to database');
      }

      res.send('Entry deleted');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
