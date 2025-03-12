console.log('Hey JS !');

//* Séléction des éléments
const loader = document.querySelector('.loader-container');
const errorInformation = document.querySelector('.error-information');

//* Création d'une fonction asynchrone pour récupérer les données
async function getWeatherData() {
    try {
        const response = await fetch(
            `http://api.airvisual.com/v2/nearest_city?key=a35355f3-9884-4b7c-988b-899d925ac8ea`
        );

        const responseData = await response.json();

        const data = {
            country: responseData.data.country,
            city: responseData.data.city,
            temp: responseData.data.current.weather.tp,
            iconId: responseData.data.current.weather.ic,
        };

        console.log('Data => ', data);

        populateUI(data);
    } catch (error) {
        console.log(error);
        loader.classList.remove('active');
        errorInformation.textContent = error.message;
    }
}
getWeatherData();

//* Séléction des éléments
const cityName = document.querySelector('.city-name');
const countryName = document.querySelector('.country-name');
const temperature = document.querySelector('.temperature-data');
const infoIcon = document.querySelector('.icon');

//* Envoi des données sur la page
function populateUI(data) {
    cityName.textContent = data.city;
    countryName.textContent = data.country;
    temperature.textContent = `${data.temp} °C`;
    loader.classList.remove('active');
    infoIcon.src = `./ressources/icons/${data.iconId}.svg`;
    infoIcon.style.width = '150px';
}
