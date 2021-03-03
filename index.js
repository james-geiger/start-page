document.addEventListener('DOMContentLoaded', ()=>{
    getUnsplashPhoto();
    getWx();
    getWxForecast();
    getFavorites();
})

function getWx() {
    const xhr = new XMLHttpRequest()
    const url = 'https://api.weather.gov/stations/koma/observations/latest'
    xhr.open('GET', url)
    xhr.setRequestHeader('accept', 'application/ld+json')
    xhr.responseType = 'json'
    xhr.onload = () => {
        document.getElementById('currentTemp').innerHTML = Math.round(xhr.response.temperature.value * 1.8 + 32)
        document.getElementById('currentWx').innerHTML = xhr.response.textDescription
    }
    xhr.send()
}

function getWxForecast() {
    const xhr = new XMLHttpRequest()
    const url = 'https://api.weather.gov/gridpoints/OAX/80,58/forecast'
    xhr.open('GET', url)
    xhr.setRequestHeader('accept', 'application/ld+json')
    xhr.responseType = 'json'
    xhr.onload = () => {
        appendWxForecast(xhr.response.periods)
    }
    xhr.send()
}

function appendWxForecast(forecast) {
    var fcasts = forecast.slice(0,6)
    var htmlstring = ""
    fcasts.forEach(el => {
        fcaststring = '<div class="column is-narrow"><div class="has-text-centered" style="width: 150px;color:white;">' + el.name + '<figure class="image is-64x64" style="margin:auto;border-radius: 5px;overflow: hidden;"><img src="' + el.icon + '"></figure><p>' + el.shortForecast + '</p><p>' +  el.temperature +  '°' + el.temperatureUnit + '</p></div></div>'
        htmlstring += fcaststring
    });
    document.getElementById('forecast').innerHTML = htmlstring;
}

function getFavorites() {
    getJSON('data.json').then(favorites => {
        var htmlstring = ""
        favorites.forEach(el => {
            var favstring = '<div class="tile is-parent is-3"><div class="tile is-child"><a href="' + el.url + '"><div class="box max-96x96"><figure class="image is-96x96"><img src="' + el.icon + '"></figure></div><h6 class="subtitle is-6 icon-title" style="text-align: center;">' + el.title + '</h6></a></div></div>'
            htmlstring += favstring
        });
        document.getElementById('favorites').innerHTML = htmlstring;
    });
}

async function getJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

function getUnsplashPhoto(){
    const clientId = 'SAJLia3T3WNfQZDjnYQqPUkk5pwcTv0rYROO9RRmDx0'
    const xhr = new XMLHttpRequest()
    const url = 'https://api.unsplash.com/photos/6OH5__bk6Qw'
    xhr.open('GET', url)
    xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId)
    xhr.responseType = 'json'
    xhr.onload = () => {
        document.getElementById('app').style.backgroundImage = 'url(' + xhr.response.urls.raw + 'fit=crop&w=1920&q=80)'
    }
    xhr.send()
}
