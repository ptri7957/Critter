const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

// Import Routes
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const post = require('./routes/api/post');
const profile = require('./routes/api/profile');

const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// Mount routes to server
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/post', post);
app.use('/api/profile', profile);

// Connect to MongoDB
connectDB();

app.use(express.static('client/build'));

if(process.env.NODE_ENV === 'production'){
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

let port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at ${port}`))