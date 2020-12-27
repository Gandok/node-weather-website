const request = require('postman-request')

//obtiene las condiciones climaticas para una latitud y longitud
const forecast = ({latitud, longitud}, callback) =>{
    const key = "cdf2db22a0ec20e32217461edd481471"
    const base = "http://api.weatherstack.com/current?access_key="
    const query = `&query=${latitud},${longitud}`
    const url = base + key + query
    console.log(url)

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('No es posible conectar', undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else {
            const description= `${body.current.weather_descriptions[0]}. `
            const temperature = `It is currently ${body.current.temperature} degress out. `
            const precip = `There is ${body.current.precip}% chance of rain. `
            const humidity = `The humidity is ${body.current.humidity}%`
            callback(undefined, description + temperature + precip + humidity)
        }        
    })
}

module.exports = forecast