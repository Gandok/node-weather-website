const request = require('postman-request')

const geocode = (direccion, callback) =>{
    const key = "pk.eyJ1IjoiZ2FuZG9rIiwiYSI6ImNraDhiNjFpZjBjb20yc283OW52OHNzaTkifQ.bH__0HeMQ5GLkgrHHf5ENA"
    const base = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const lugar = `${encodeURIComponent(direccion)}.json?access_token=`
    const query = "&limit=1"
    const url = base + lugar + key + query
    
    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('No es posible conectar', undefined)
        }else if(body.message){
            callback(body.message,undefined)
        }else {
            callback(undefined, {
                latitud: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 
}

//Exporta las funciones de este archivo.
module.exports = geocode