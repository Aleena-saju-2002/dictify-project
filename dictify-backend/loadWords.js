const mongoose = require('mongoose');
const fs = require('fs');
const Word = require('./wordModel'); 

mongoose.connect('mongodb://127.0.0.1:27017/dictifyDB')
.then(async () => {
    console.log('MongoDB connected');
   
    const wordsData = JSON.parse(fs.readFileSync('./dataset/words_dictionary.json', 'utf-8'));
    const wordsArray = Object.keys(wordsData).map(word => ({ word }));

    console.log('Total words to insert:', wordsArray.length);

    await Word.deleteMany();
    await Word.insertMany(wordsArray);

    console.log('All words inserted into MongoDB');
    process.exit();
})
.catch(err => {
    console.error('Error:', err);
});
