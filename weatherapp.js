

const weatherForm = document.querySelector('.weatherForm');
const cityInput =document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey ="gBCq66izLoXgGxbcVdWv0g==7zoJUFnt71SAc7ot";

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();

    const city = cityInput.value;

    if(city) {
           try{
              const weatherData = await getWeatherData()
              displayWeatherInfo(weatherData)
           }
           catch (error){
               console.error(error);
               DisplayError(error);
           }
    }
    else{
        DisplayError("please enter a city")
    }
});


async function getWeatherData (city) {

     
    if(!cityInput.value) {
        alert ('please enter a city')
        return;
    }
    
    
    const apiUrl = await fetch (`https://api.api-ninjas.com/v1/weather?city=${city}`, {
      
        method: 'GET',

        headers: {
         'X-Api-Key': apiKey,
        contentType: 'application/json'},
    })


    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("could not fetch weather data");
    }

    return await response.json();

};



function displayWeatherInfo (data) {
     
   const { name: city,
     main: {temp, humidity}, 
     weather: [{description, id}]} =data;

     card.textContent = "";
     card.style.display = "flex";

     const cityDisplay = document.createElement("h2")
     const tempDisplay = document.createElement("p")
     const humidityDisplay = document.createElement("p")
     const descDisplay = document.createElement("p")
     const weatherEmoji = document.createElement("p")

     cityDisplay.textContent = city,
     tempDisplay.textContent =`${(temp-273.15).toFixed(1)}`;
     humidityDisplay.textContent =`humidity: ${humidity}%`;
     descDisplay.textContent =description;
     weatherEmoji.textContent = getWeatherEmoji(id)



     cityDisplay.classList.add("cityDisplay");
     tempDisplay.classList.add("tempDisplay")
     humidityDisplay.classList.add("humidityDisplay")
     descDisplay.classList.add("descDisplay")
     weatherEmoji.classList.add("weatherEmoji")


     card.appendChild(cityDisplay)
     card.appendChild(tempDisplay)
     card.appendChild(humidityDisplay)
     card.appendChild(descDisplay)
     card.appendChild(weatherEmoji)
};

function getWeatherEmoji (weatherId) {

    switch (true){
        case (weatherId >= 200 && weatherId < 300),
        return "🌩";

        case (weatherId >= 300 && weatherId < 400),
        return "☁";

        case (weatherId >= 500 && weatherId < 600),
        return "☁";

        case (weatherId >= 600 && weatherId < 700),
        return "🌟";

        case (weatherId >= 700 && weatherId < 800),
        return "🌫";

        case (weatherId >= 800 && weatherId < 810),
        return "🌤";

        case (weatherId >= 8100 && weatherId < 850),
        return "☁";

        default:
            return "?";
    }
};

function DisplayError (message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add ("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild (errorDisplay)
};
