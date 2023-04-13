const inputbtn = document.querySelector('.search');
const cityName = document.querySelector('.name');
const button = document.querySelector('button');


const temperature = document.querySelector('.temp');
const winds = document.querySelector('.wind');
const data = document.querySelector('.data');
const time = document.querySelector('.time');
const humidity = document.querySelector('.humidity');
const weather = document.querySelector('.condition');
const cloudy = document.querySelector('.cloudy')
const photo = document.querySelector('.icon')
const cityItems = document.querySelectorAll('.city');

const API_KEY = '&appid=db4ec88d903467c5b9dde56be249c059'
const API_LINK ='https://api.openweathermap.org/data/2.5/weather?q='
const API_UNITS = '&units=metric'

const getWeather = () => {
    const city = inputbtn.value || 'Polska'
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res => {
        console.log(res.data)
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const windSpeed = res.data.wind.speed
        const feelsLike = res.data.main.feels_like
        const status = Object.assign({}, ...res.data.weather)


        

        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + ' °C'
        humidity.textContent = hum + '%'
        weather.textContent = status.main
        winds.textContent = windSpeed + ' km/H'
        cloudy.textContent = Math.floor(feelsLike) + ' °C'

        if (status.id >= 200 && status.id < 300) {
            photo.setAttribute('src', './files/stormIcon.png')
        } else if (status.id >= 300 && status.id <400){
            photo.setAttribute('src', './files/drizzle.png')
        } else if (status.id >= 500 && status.id < 600) {
            photo.setAttribute('src', './files/rainCloud.png')
        } else if (status.id >= 600 && status.id < 700) {
            photo.setAttribute('src', './files/ice.png')
        } else if (status.id >= 700 && status.id < 800) {
            photo.setAttribute('src', './files/fog.png')
        } else if (status.id === 800) {
            photo.setAttribute('src', './files/sunCloud.png')
        }  else if (status.id > 800 && status.id < 900) {
            photo.setAttribute('src', './files/cloud.png')
        } else {
            photo.setAttribute('src', './files/unk.png')
        }
        
        
    })
}



document.getElementById('locationInput').addEventListener('submit', (event) => {
    event.preventDefault();
    getWeather();
    inputbtn.value = ''
});

cityItems.forEach(city => {
    city.addEventListener('click', () => {
      inputbtn.value = city.textContent;
    });
});



const citiesList = document.querySelectorAll('.city');
const locationInput = document.getElementById('locationInput');

const handleCityClick = (e) => {
  const city = e.target.textContent;
  inputbtn.value = city;
  getWeather();
};

citiesList.forEach(city => {
  city.addEventListener('click', handleCityClick);
});


