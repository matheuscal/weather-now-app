const router = require('express').Router();
const {createWeatherCard, deleteWeatherCard} = require('../controls/weatherControl');

router.get('/api/weather', createWeatherCard);
router.delete('/api/weather', deleteWeatherCard);

module.exports = router;