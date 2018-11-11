# Weather Service
It's an API which will allow you to get averaged whether forecast for Lviv, Ukraine.
Calculation is based on following APIs: [darksky.net](https://darksky.net/forecast/40.7127,-74.0059/us12/en), 
[apixu.com](https://www.apixu.com/), [openweathermap.org](https://openweathermap.org/).


# Usage
/weather(/{source})/{days}

* source - particlar source of a forecast. Could be either darkSky, or apixu, or openWeather. If omitted, an average from all sources is returned.
* days - number from 1 to 5 indicating for how many days forward to query forecast

# Examples

`/weather/darkSky/3`

```json
{
  "source":"dark-sky",
  "daily": [
    {
      "date":"11/11/2018",
      "min_temp":3.47,
      "max_temp":11.17
      },
      {
        "date":"12/11/2018",
        "min_temp":4.65,
        "max_temp":10.08
      },
      {
        "date":"13/11/2018",
        "min_temp":6.58,
        "max_temp":8.62
      }
   ]
}
```

`/weather/3`

```json
{
  "source":"composite",
  "daily": [
    {
      "date":"12/11/2018",
      "min_temp":"3.45",
      "max_temp":"11.35"
    },
    {
      "date":"13/11/2018",
      "min_temp":"4.41",
      "max_temp":"9.50"
    },
    {
      "date":"14/11/2018",
      "min_temp":"5.61",
      "max_temp":"8.72"
    }
  ]
}
```
