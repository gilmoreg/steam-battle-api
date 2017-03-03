require('dotenv').config();
const express = require('express')
const cors = require('cors');
const axios = require('axios');
let app = express();
app.use(cors());
const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Since heroku sleeps, this can be called to try and "wake" the server
app.get('/', (req,res) => {
    res.status(200);
});

app.get('/vanity/:url', (req,res,next) => {
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
            res.status(204).json( {'/vanity/:url error': err } );
        })
        .catch(next);
});

app.get('/player/:id', (req,res,next) => {
    if(!req.params.id) {
        res.status(500).send('Request must include 64bit Steam ID');
    }
    const id = req.params.id;
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${id}`;
    axios.get(url)
        .then(response=>{
            const player = response.data.response.players
                .map( p => {
                    return {
                        'steamid':p.steamid,
                        'personaname':p.personaname,
                        'profileurl':p.profileurl,
                        'avatarfull':p.avatarfull
                    }
                })
            res.status(200).json( {"player": player } );
        })
        .catch(err=>{
            console.log(err);
            res.status(204).json( {'/players/:id1/:id2 error': err } );
        })
        .catch(next);
});

app.get('/owned/:id', (req,res,next) => {
    if(!req.params.id) {
        res.status(500).send('Request must include 64bit Steam ID');
    }
    const id = req.params.id;
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${id}&format=json`;
    axios.get(url)
        .then(response => {
            res.status(200).json( {"games": response.data.response.games} );
        })
        .catch(err => {
            console.log(err);
            res.status(204).json( {'/owned/:id error': err } );
        })
        .catch(next);
});

app.get('/gameachievements/:id', (req,res,next) => {
    if(!req.params.id) {
        res.status(500).send('Request must include Steam Game ID');
    }
    const id = req.params.id;
    const url = `http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=${id}&format=json`;
    axios.get(url)
        .then(response => {
            res.status(200).json( {"achievements": response.data.achievementpercentages.achievements} );
        })
        .catch(err => {
            console.log(err);
            res.status(204).json( {'/gameachievements/:id error': err } );
        })
        .catch(next);
});

app.get('/playerachievements/:id/:game', (req,res,next) => {
    if(!req.params.id || !req.params.game) {
        res.status(500).send('Request must include 64bit Steam Player ID and Steam Game ID');
    }
    const id = req.params.id;
    const game = req.params.game;
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${game}&key=${STEAM_API_KEY}&steamid=${id}`;
    axios.get(url)
        .then(response => {
            const achievements = response.data.playerstats.achievements
                .filter( a => { return a.achieved })
                .map(a => { return a.apiname });
            //res.status(200).json( {"achievements": achievements} );
            res.status(200).json( {"achievements": achievements.length } );
        })
        .catch(err => {
            res.status(204).json( JSON.stringify(err.response.data) );
        })
        .catch(next);
});

app.listen(process.env.PORT || 9000);