const express = require('express');
const cors = require('cors');
const Trie = require('./trie');
const mongoose = require('mongoose');
const Word = require('./wordModel');  

const trie = new Trie();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection and Trie loading
mongoose.connect('mongodb://127.0.0.1:27017/dictifyDB')
    .then(() => {
        console.log('MongoDB connected');

        Word.find().then(words => {
            words.forEach(item => {
                // console.log('Inserting into Trie:', item.word);  
                trie.insert(item.word);
            });

            console.log('Trie loaded with words from MongoDB');

            // Start server AFTER Trie is ready
            app.listen(5000, () => {
                console.log('Server running on http://localhost:5000');
            });
        });

    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.get('/', (req, res) => {
    res.send("Backend is working");
});

// API for autocompletion
app.get('/autocomplete/:prefix', (req, res) => {
    const prefix = req.params.prefix;
    const suggestions = trie.autocompletion(prefix);
    res.json(suggestions);
});
