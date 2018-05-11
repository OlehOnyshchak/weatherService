`use strict`;

const axios = require(`axios`);

async function getRaw5DaysForecast() {
    const apiKey = `a768d514ca64f4c810940a87f646acf6`;
    const location = `Lviv,ua`;

    const req = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=${apiKey}`;
    const res = await axios.get(req);
    return res.data.list;
}

function parseDate(epochTime) {
    let date = new Date(epochTime * 1000);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function extractDailyForecast(forecast) {
    let res = [];
    let dates = new Set(forecast.map(a => a.date));
    
    dates.forEach(date => {
        let dailyForecast = forecast.filter(a => a.date === date);
        let temperatures = dailyForecast.map(a => a.temp);

        res.push({
            date,
            min_temp: Math.min(...temperatures),
            max_temp: Math.max(...temperatures)
        })
    });

    return res;
}

module.exports = {
    async forecast(days = 3) {
        let rawForecast = await getRaw5DaysForecast();

        let res = [];
        for (let i = 0; i < rawForecast.length; ++i) {
            res.push({
                date: parseDate(rawForecast[i].dt),
                temp: rawForecast[i].main.temp
            })
        }

        let dailyForecast = extractDailyForecast(res);

        return {
            source: "open-wheather-map",
            daily: dailyForecast.slice(0, days)
        };
    }
 }