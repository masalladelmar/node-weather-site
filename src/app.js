const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const viewPath = path.join(__dirname, '../views')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    
    forecast(latitude, longitude, (error, dataForecast) => {
      if (error) {
        return res.send({error})
      }
  
      res.send({
        forecast: dataForecast,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help'
  })
})

app.get('/products', (req, res) => {
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is up in port ' + port)
})