const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c1cbb128f16f21142515934f5bb43a8e&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

  request({ url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      console.log(response.body.current);
      callback(undefined, {
        icon: response.body.current.weather_icons[0],
        desc: response.body.current.weather_descriptions[0],
        temperature: 'It\'s currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.',
        wind: 'The wind speed is ' + response.body.current.wind_speed + ' and direction ' + response.body.current.wind_dir + '.',
        humidity: 'The humidity is ' + response.body.current.humidity + '%.'
      })
    }
  })
}

module.exports = forecast