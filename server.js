// Dependencies
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const db = mongoose.connection
const cors = require('cors');
const Litty = require('./models/litty.js');
const littyData = require('./utilities/littyData');

// Environment Variables
const app = express();
const mongoURI = process.env.MONGO_URI
const PORT = process.env.PORT || 3001

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Middleware
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json()); //use .json(), not .urlencoded()
app.use(express.static('public')) // we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(cors())

// Routes
const littyController = require('./controllers/litty.js');

app.use('/litty', littyController);
app.get('/seed', async (req, res) => {
  await Litty.deleteMany({});
  await Litty.insertMany(littyData);
  res.send('done!');
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
  })