const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine & views
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


//Setup del directorio público de contenido estático
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Carlos Cabrera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Página acerca de...',
        name: 'Carlos Cabrera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Página de ayuda',
        msg: 'Mensaje de ayuda',
        name: 'Carlos Cabrera'
    })
})

//endpoint para obtener el clima
app.get('/weather', (req,res) =>{
    //validación de que existe una dirección
    if(!req.query.address){
        //sino existe termina la ejecución y devuelve mensaje de error
        return res.send({
            error: 'Se requiere el parámetro "address"'
        })
    }else{//si existe devuele el clima
        geocode(req.query.address, (error, geocodeData)=> {
            if(error){
                return res.send({ error })
            }
            forecast(geocodeData, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location: geocodeData.location,
                    address: req.query.address
                })
            })

        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'se debe proveer search'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        msg: 'Article not found',
        name: 'Carlos Cabrera'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        msg: 'Page not found.',
        name: 'Carlos Cabrera'
    })
})

app.listen(3000, () => {
    console.log('Servidor operando...')
})