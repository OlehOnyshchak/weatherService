`use strict`;

const axios = require(`axios`);

async function getRawWeekForecast() {
    const apiKey = `89e9d074cc995f330fcb920889b1876e`;
    const lvivLatitude = 49.839683;
    const lvivLongitude = 24.029717;

    const req = `https://api.darksky.net/forecast/${apiKey}/${lvivLatitude},${lvivLongitude}?exclude=currently,minutely,hourly,alerts,flags&units=ca`;
    const res = await axios.get(req);
    return res.data.daily.data;
}

function parseDate(epochTime) {
    let date = new Date(epochTime * 1000);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = {
    async forecast(days = 3) {
        let weekForecast = await getRawWeekForecast();

        let res = [];
        for (let i = 0; i < weekForecast.length; ++i) {
            res.push({
                date: parseDate(weekForecast[i].time),
                min_temp: weekForecast[i].temperatureLow,
                max_temp: weekForecast[i].temperatureHigh
            })
        }

        return {
            source: "dark-sky",
            daily: res.slice(0, days)
        };
    }
 }