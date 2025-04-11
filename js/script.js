const APIKey = '59ac58906276549caab42ee872dffbc3';
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');
const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');
const weatherdataElement = document.querySelector('#weather-data')


const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

const showWeatherData = async (city) => {


    const cityData = await getWeatherData(city);

    if (cityData.cod == 404) {
        alert("Ops ! Cidade não encontrada verifique o nome e tente novamente.")
    }
    
    cityElement.innerHTML = cityData.name;
    tempElement.innerText = parseInt(cityData.main.temp);
    descElement.innerHTML = cityData.weather[0].description;
    weatherIconElement.setAttribute("src", `img/img${cityData.weather[0].icon}.png`);
    countryElement.setAttribute("src",`https://flagsapi.com/${cityData.sys.country}/flat/64.png`);
    umidityElement.innerText = `${cityData.main.humidity}%`;
    windElement.innerText = `${cityData.wind.speed}km/h`;
    weatherdataElement.classList.remove("hide");
};


searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
    
});

cityInput.addEventListener("keyuo", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city)
    }
});