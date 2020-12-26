const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherMsg = document.querySelector('#weather-msg')
const errorMsg = document.querySelector('#error-msg')

const getWeather = location => {
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error){
            weatherMsg.textContent = ''
            return errorMsg.textContent = data.error
        }
        weatherMsg.textContent = `${data.location}. \n ${data.forecast}`
    })
})
}
 


weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value

    errorMsg.textContent = ''
    weatherMsg.textContent = 'Obteniendo el clima...'
    const weather = getWeather(location)
})