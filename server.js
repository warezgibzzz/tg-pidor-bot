"use strict";
require('dotenv').config();
const DiscordJS = require("discord.js");
const sqlite3 = require("sqlite3");
const DiscordClient = new DiscordJS.Client();
const ChatFunctions = require("./src/ChatFunctions");
const GamesRepository = require("./src/Repositories/GamesRepository");
const ParticipantRepository = require("./src/Repositories/ParticipantRepository");
const Game = require("./src/Game");
const DbAdapter = require("./src/DbAdapter");

const db = new sqlite3.Database('database.db3');
const dbAdapter = new DbAdapter(db);
const gamesRepository = new GamesRepository(dbAdapter);
const participantsRepository = new ParticipantRepository(dbAdapter);
const game = new Game(dbAdapter, participantsRepository, gamesRepository);

const express = require('express')
const bodyParser = require('body-parser')
const {
    Telegram
} = require('telegraf')
const tg = new Telegram(process.env.BOT_TOKEN)
let app = express()

app.use(bodyParser.json()) // for parsing application/json

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/run-pidor', function(req, res) {

    tg.sendMessage(process.env.GROUP_ID, "/pidor@SublimeBot")
    res.send('Pidor runned')
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

