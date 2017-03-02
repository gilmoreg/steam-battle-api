require('dotenv').config();
const express = require('express')
const cors = require('cors');
const axios = require('axios');
let app = express();
app.use(cors());
const STEAM_API_KEY = process.env.STEAM_API_KEY;

app.get('/vanity/:url', (req,res) => {
    const vanity = req.params.url;
    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
    axios.get(url)
        .then(response=>{
            console.log(response);
            res.status(200).json( {"steamid": response.data.response.steamid} );
        })
        .catch(err=>{
            console.log(err);
            res.json( {'/vanity/:url error': err } );
        });
});

app.listen(process.env.PORT || 9000);

/*
vanity
playerSummaries
ownedGames
achievements
achievementPercents

*/