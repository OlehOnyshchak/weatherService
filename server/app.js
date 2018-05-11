`use strict`;
const express = require('express');
const app = express();
var cors = require('cors');

app.use(cors());

const dataSource = require(`./data-source`);

app.get('/weather/darkSky/:days([0-9]+)', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.darkSky, req.params.days);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather/apixu/:days([0-9]+)', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.apixu, req.params.days);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather/openWeather/:days([0-9]+)', async (req, res, next) => {
    try {
        let result = await dataSource.forecast(dataSource.dataSource.openWeather, req.params.days);
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.get('/weather/:days([0-9]+)', (req, res, next) => {
    dataSource.forecast(dataSource.dataSource.composite, req.params.days)
    .then(data => {
        res.status(200);
        res.send(data);
    })
    .catch(next);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));