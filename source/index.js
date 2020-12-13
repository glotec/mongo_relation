const express = require('express');

const mongoose =require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/mongo-relation')
    .then(() => console.log('Now connected to MongoDB'))
    .catch(err => console.log('Something went wrong', err));

const Publisher = mongoose.model('Publisher', new mongoose.Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
}));

const Game = mongoose.model('Game', new mongoose.Schema({
    title: String
}));

async function createPublisher(companyName, firstParty, website)
{
    const publisher = new Publisher({
        companyName,
        firstParty,
        website
    });

    const result = await publisher.save();
    console.log(result);
}


app.listen(port, () => console.log(`Server started on http://localhost:${port}`));