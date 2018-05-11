`use strict`;
const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

const dataSource = require(`./data-source`);

app.get('/weather/darkSky', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.darkSky);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather/apixu', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.apixu);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather/openWeather', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.openWeather);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather', (req, res, next) => {
    dataSource.forecast(dataSource.dataSource.composite)
    .then(data => {
        res.status(200);
        res.send(data);
    })
    .catch(next);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));