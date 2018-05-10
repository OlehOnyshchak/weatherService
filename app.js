`use strict`;
const express = require('express');
const app = express();

const darkSkySource = require(`./dark-sky-source`);
const apixuSource = require(`./apixu-source`);
const openWeatherSource = require(`./open-wheather-source`);

app.get('/', async (req, res, next) => {
    try {
        let result = []
        result.push(await openWeatherSource.forecast());
        result.push(await darkSkySource.forecast());
        result.push(await apixuSource.forecast());
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));