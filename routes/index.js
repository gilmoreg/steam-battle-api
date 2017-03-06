const express = require('express');
const Steam = require('../steam');

const router = express.Router();

router.get('/checkid/:id', (req, res, next) => {

});

/*
router.get('/vanity/:url', (req, res, next) => {
  if (!req.params.url) {
    res.status(500).send('Request must include Steam community name');
  }
  const vanity = req.params.url;
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${vanity}`;
  axios.get(url)
      .then((response) => {
          res.status(200).json( {"steamid": response.data.response.steamid} );
      })
      .catch(err=>{
          console.log(err);
          res.status(204).json( {'/vanity/:url error': err } );
      })
      .catch(next);
});

router.get('/player/:id', (req,res,next) => {
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

router.get('/owned/:id', (req,res,next) => {
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



*/

module.exports = router;
