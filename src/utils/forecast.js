const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c1cbb128f16f21142515934f5bb43a8e&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

  request({ url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, response.body.current.weather_descriptions[0] +  '. It\'s currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
    }
  })
}

module.exports = forecast