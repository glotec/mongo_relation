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

async function createGame (title, publisher) 
{
    const game = new Game({
        title,
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publisher'
        }
    });

    const result = await game.save();
    console.log(result);
}

// async function listGames()
// {
//     const games = await Game
//         .find()
//         .select('title');
//     console.log(games);
// }

async function listGames()
{
    const games = await Game
        .find()
        .populate('publisher', 'companyName')
        .select('title publisher');
    console.log(games);
}

listGames();
console.log('Pub');

// createPublisher('Glotec Game', true, 'https://www.glotec.com/');
// createGame('Glo Design', '5fd601263e4d7804d079fe34');


app.listen(port, () => console.log(`Server started on http://localhost:${port}`));