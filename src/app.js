const express = require('express')
const path = require("path")
const hbs = require("hbs")
const app = express()
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

//Define paths
const puclibDirectory = path.join(__dirname,'..','public')
const viewsDirectory = path.join(__dirname,"..","templates/views")
const partialsDirectory = path.join(__dirname,"..","templates/partials")


//Setup handlebars engine and view location
app.set('view engine','hbs') //set the view engine to be hbs type - for dynamic pages
app.set("views",viewsDirectory)
hbs.registerPartials(partialsDirectory) //register partials

//Setup static directory to serve
app.use(express.static(puclibDirectory)) //use the static html files. give the path to them

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guy'
    }) //render go to views and convert the file ther to html and send it to the client
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Guy'
    }) //render go to views and convert the file ther to html and send it to the client
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Guy',
        msg: 'For any problem send message to guy250189@gmail.com'
    }) //render go to views and convert the file ther to html and send it to the client
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error : "please provide address"
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error,weatherData)=>{
            if (error){
                return res.send({error})
            }
            weatherData.location = location
            return res.send(weatherData)
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philedaphia',
    //     address : req.query.address
    // })
})




app.get('/help/*', (req,res) => {
    res.render('error', {
        error : "Help article not found."
    }) //
})


app.get('*', (req,res) => {
    res.render('error', {
        error : "Page note found."
    }) //
})
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

