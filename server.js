require('dotenv').config();
const express = require('express')
const cors = require('cors');
const axios = require('axios');
let app = express();
app.use(cors());
const STEAM_API_KEY = process.env.STEAM_API_KEY;

app.get('/vanity/:url', (req,res) => {
    if(!req.params.url) {
        res.status(500).send('Request must include Steam community name');
    }
    const vanity = req.params.url;
    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
    axios.get(url)
        .then(response=>{
            res.status(200).json( {"steamid": response.data.response.steamid} );
        })
        .catch(err=>{
            console.log(err);
            res.json( {'/vanity/:url error': err } );
        });
});

app.get('/players/:id1/:id2', (req,res) => {
    if(!req.params.id1 || !req.params.id2) {
        res.status(500).send('Request must include 64bit Steam IDs of two players');
    }
    const id1 = req.params.id1;
    const id2 = req.params.id2;
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${id1},${id2}`;
    axios.get(url)
        .then(response=>{
            res.status(200).json( {"players": response.data.response.players} );
        })
        .catch(err=>{
            console.log(err);
            res.json( {'/players/:id1/:id2 error': err } );
        });
});

app.get('/owned/:id', (req,res) => {
    if(!req.params.id) {
        res.status(500).send('Request must include 64bit Steam ID');
    }
    const id = req.params.id;
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${id}&format=json`;
    axios.get(url)
        .then(response => {
            console.log(response.data);
            res.status(200).json( {"players": response.data.response.games} );
        })
        .catch(err => {
            console.log(err);
            res.json( {'/owned/:id error': err } );
        });
});

app.get('/gameachievements/:id', (req,res) => {
    if(!req.params.id) {
        res.status(500).send('Request must include Steam Game ID');
    }
    const id = req.params.id;
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${id}&format=json`;
    axios.get(url)
        .then(response => {
            console.log(response.data.achievementpercentages.achievements);
            res.status(200).json( {"achievements": response.data.achievementpercentages.achievements} );
        })
        .catch(err => {
            console.log(err);
            res.json( {'/gameachievements/:id error': err } );
        });
});

app.listen(process.env.PORT || 9000);

/*

achievements
achievementPercents

*/