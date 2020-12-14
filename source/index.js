const express = require('express');

const mongoose =require('mongoose');



const app = express();
const port = process.env.PORT || 5000;

// mongoose.connect('mongodb://localhost/mongo-relation')
//     .then(() => console.log('Now connected to MongoDB'))
//     .catch(err => console.log('Something went wrong', err));

// const Publisher = mongoose.model('Publisher', new mongoose.Schema({
//     companyName: String,
//     firstParty: Boolean,
//     website: String
// }));

// const Game = mongoose.model('Game', new mongoose.Schema({
//     title: String,
//     publisher: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Publisher'
//     }
// }));

// async function createPublisher(companyName, firstParty, website)
// {
//     const publisher = new Publisher({
//         companyName,
//         firstParty,
//         website
//     });

//     const result = await publisher.save();
//     console.log(result);
// }

// async function createGame (title, publisher) 
// {
//     const game = new Game({
//         title,
//         publisher
//     });

//     const result = await game.save();
//     console.log(result);
// }

// async function listGames()
// {
//     const games = await Game
//         .find()
//         .select('title');
//     console.log(games);
// // }

// async function listGames()
// {
//     const games = await Game
//         .find()
//         .populate('publisher', 'companyName')
//         .select('title publisher');
//     console.log(games);
// }

// async function listGames()
// {
//     const games = await Game
//         .find()
//         .populate('publisher', 'companyName-_id')
//         .select('title publisher');
//     console.log(games);
// }

// listGames();
// console.log('Pub');

// createPublisher('Glotec', true, 'https://www.glotec.com/');
// createGame('Glo1 Design', '5fd71b6858827c132076ff72');


//now embedding the publisherSchema right inside of the gameSchema
//Publisher Schema
const publisherSchema = new mongoose.Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
});

//Publisher Model
const Publisher = mongoose.model('Publisher', publisherSchema);

//Game Schema
const gameSchema = new mongoose.Schema({
    title: String,
    publisher: publisherSchema
});

//Game Model
const Game = mongoose.model('Game', gameSchema);

//create a new game and embed a publisher in one shot.
async function createGame(title, publisher)
{
    const game = new Game({
        title,
        publisher
    });

    const result = await game.save();
    console.log(result);
}

createGame('Rayman', new Publisher({ companyName: 'Ubisoft', firstParty: false, website: 'https://www.ubisoft.com/' }));

async function updatePublisher(gameId) {
    const game = await Game.findById(gameId);
    game.publisher.companyName = 'Epic Games';
    game.publisher.website = 'https://epicgames.com/';
    game.save();
}
 
updatePublisher('5b2bf100e588f40958a9b6e7');

async function updatePublisher(gameId) {
    const game = await Game.update({ _id: gameId }, {
        $set: {
            'publisher.companyName': 'Bethesda Softworks',
            'publisher.website': 'https://bethesda.net/'
        }
    });
}
 
updatePublisher('5b2bf100e588f40958a9b6e7');

async function updatePublisher(gameId) {
    const game = await Game.update({ _id: gameId }, {
        $unset: {
            'publisher': ''
        }
    });
}
 
updatePublisher('5b2bf100e588f40958a9b6e7');

app.listen(port, 
    () => console.log(`Server started on http://localhost:${port}`));