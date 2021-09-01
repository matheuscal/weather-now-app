const https = require('https');
const userModel = require('../models/userModel');

// Creates a weather card on the user document
module.exports.createWeatherCard = function(req, res){
    let weatherInfo = {};
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=c1310c6150d2185cdef3c052669b98ae`, (resp) => {
        resp.on('data', (chunk) => {
            weatherInfo = JSON.parse(chunk);
        });
        resp.on('end', async() => {
            if (weatherInfo.cod === 200) {
                const cardAlreadyExists = await userModel.findOne({_id: req.session.id, weatherCards: {$elemMatch: {id: weatherInfo.id}}});
                if (!cardAlreadyExists){
                    // Add new requested weather info to the user's card collection
                    await userModel.findByIdAndUpdate(req.session.id, {"$push": {"weatherCards": weatherInfo}});
                }
                res.send({});
            }
            else if (weatherInfo.cod == 404) {
                res.status(404).send({error: "Couldn't find a city by that name."});
            }
        });
        resp.on('error', (err) => { 
            console.log(err);
        });
    }); 
}

// Deletes a weather card on the user document
module.exports.deleteWeatherCard = async function(req, res){
    // cardId has to be a number for the userModel's method to match it correctly in the database.
    const cardId = Number(req.query.id);
    try {
        await userModel.updateOne({_id: req.session.id, weatherCards: {$elemMatch: {id: cardId}}}, {$unset: {'weatherCards.$': {id: cardId}}});
        await userModel.updateOne({_id: req.session.id}, {$pull: {weatherCards: null}});
        res.send({});
    }
    catch(err){
        console.log(err);
        res.status(500).send({});
    }
}
