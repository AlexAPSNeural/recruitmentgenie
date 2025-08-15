Creating an AI-powered recruitment management tool involves several components, including AI algorithms for resume parsing and candidate evaluation, a database for storing job postings and candidate information, and an API to handle client-server communication. Below is a simple example of how you might set up an Express.js server for this system. This code is a starter template and should be extended with more detailed business logic, security features, and error handling before deploying in a production environment.

### Prerequisites

Before setting up the code, ensure you have Node.js and npm (Node Package Manager) installed on your system.

### Express.js Server Code

Create a new directory for your project and initialize it with:

```bash
mkdir ai-recruitment-tool
cd ai-recruitment-tool
npm init -y
```

Then, install the required packages:

```bash
npm install express mongoose dotenv cors body-parser
```

Create a new file `server.js` with the following content:

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/recruitment_tool';
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB:', error));

// Sample Candidate Model
const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: [String],
    experience: Number,
    resume: String  // URL to the resume file
});

const Candidate = mongoose.model('Candidate', candidateSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the AI Recruitment Management Tool API');
});

// Add a new candidate
app.post('/candidates', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(201).send({ message: 'Candidate added successfully', candidate });
    } catch (error) {
        res.status(400).send({ error: `Error adding candidate: ${error.message}` });
    }
});

// Get all candidates
app.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).send(candidates);
    } catch (error) {
        res.status(500).send({ error: `Error fetching candidates: ${error.message}` });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Environment Variables

Create a `.env` file to manage environment-specific variables:

```
DATABASE_URL=mongodb://localhost:27017/recruitment_tool
PORT=5000
```

### Database Setup

Ensure MongoDB is running on your system or a remote database is accessible. Update your `DATABASE_URL` in `.env` with your credentials if using a hosted MongoDB instance.

### Running the Server

Start your server with:

```bash
node server.js
```

### Further Steps

1. **Authentication**: Secure your endpoints (e.g., using JWT or OAuth).
2. **AI Algorithms**: Integrate AI model APIs for parsing and evaluating resumes.
3. **Advanced Queries**: Implement filtering and sorting options in `GET` routes.
4. **Error Handling**: Enhance error handling and logging for better monitoring.
5. **Deployment**: Consider deploying with services like Heroku, AWS Elastic Beanstalk, or Vercel with a CI/CD pipeline.

This basic setup should help you get started with building a recruitment management tool using Express.js.