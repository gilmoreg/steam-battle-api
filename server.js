const express = require('express')
const cors = require('cors');
const axios = require('axios');
let app = express();
app.use(cors());
const STEAM_API_KEY = process.env.STEAM_API_KEY || global.STEAM_API_KEY;

app.get('/vanity/:url', (req,res) => {
    const vanity = req.params.url;
    const url = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
    axios.get(url)
        .then(res=>{
            res.status(200).json( { "response": res }  );
        })
        .catch(err=>{
            res.json( { 'Error': err } );
        });
});

app.listen(8080);

/*
vanity
playerSummaries
ownedGames
achievements
achievementPercents

*/