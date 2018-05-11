`use strict`;

const darkSkySource = require(`./dark-sky-source`);
const apixuSource = require(`./apixu-source`);
const openWeatherSource = require(`./open-wheather-source`);

function agregateDailyForecast(arr) {
    let sum = (val, total) => val + total;
    let min_temp = arr.map(a => a.min_temp).reduce(sum) / arr.length;
    let max_temp = arr.map(a => a.max_temp).reduce(sum) / arr.length;

    return {
        date: arr[0].date,
        min_temp: min_temp.toFixed(2),
        max_temp: max_temp.toFixed(2)
    }
}

async function compositeForecast(days) {
    let openWheatherForecast = await openWeatherSource.forecast(days);
    let darkSkyForecast = await darkSkySource.forecast(days);
    let apixuForecast = await apixuSource.forecast(days);

    let forecast = [];
    for (let i = 0; i < days; ++i) {
        let dailyForecast = agregateDailyForecast([openWheatherForecast.daily[i],
                                                   darkSkyForecast.daily[i],
                                                   apixuForecast.daily[i]]);
        forecast.push(dailyForecast);
    }

    return {
        source: "composite",
        daily: forecast
    };
}

module.exports = {
    dataSource: {
        darkSky: Symbol('darkSky'),
        openWeather: Symbol('openWeather'),
        apixu: Symbol('apixu'),
        composite: Symbol('composite')
    },

    async forecast(source, days = 3) {
        if (source === this.dataSource.darkSky) {
            return await darkSkySource.forecast(days);
        }
        else if (source === this.dataSource.openWeather) {
            return await openWeatherSource.forecast(days);
        }
        else if (source === this.dataSource.apixu) {
            return await apixuSource.forecast(days);
        }
        else if (source === this.dataSource.composite) {
            return await compositeForecast(days);
        }
        else {
            throw new Error("Unexpected dataSource value");
        }
    }
}