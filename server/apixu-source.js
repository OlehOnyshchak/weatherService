`use strict`;

const axios = require(`axios`);

async function getRawForecast(days) {
    const apiKey = `38d851748e82477294e185528181005`;
    const location = `Lviv`;

    const req = `http://api.apixu.com/v1/forecast.json?q=${location}&days=${days}&key=${apiKey}`;
    const res = await axios.get(req);
    return res.data.forecast.forecastday;
}

function parseDate(epochTime) {
    let date = new Date(epochTime * 1000);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = {
    async forecast(days = 3) {
        let weekForecast = await getRawForecast(days);

        let res = [];
        for (let i = 0; i < weekForecast.length; ++i) {
            res.push({
                date: parseDate(weekForecast[i].date_epoch),
                min_temp: weekForecast[i].day.mintemp_c,
                max_temp: weekForecast[i].day.maxtemp_c
            })
        }

        return {
            source: "apixu",
            daily: res.slice(0, days)
        };
    }
 }