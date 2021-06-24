const weatherAPIKey = "0a44599bef483c57540eed16fcddc18d";
const form = document.querySelector("form");
const weatherContainer = document.querySelector(".weather-hourly__container");
const hourlyWeatherContainer = document.querySelector(".weather-hourly");
const weather8DaysForecastContainer = document.querySelector(".weather .weather-8days-forecast");
const currentWeatherContainer = document.querySelector(".weather-current");

 
const currentWeatherNodes = {
    celciusToFahrenheitChangerBtn: document.querySelector(".weather-current__fahrenheit-btn"),
    fahrenheitToCelciusChangerBtn: document.querySelector(".weather-current__celcius-btn"),
    currentWeatherCity: document.querySelector(".weather__current-city"),
    updatedAtBox: document.querySelector(".weather-current__updated-time"),
    currentWeatherIcon: document.querySelector(".weather-current__weather-icon"),
    currentWeatherTemperature: document.querySelector(".weather-current__temperature"),
    currentWeatherCondition: document.querySelector(".weather-current__weather-condition"),
    currenWeatherFeelsLikeTemperature: document.querySelector(".weather__feels-like-temperature"),
    currenWeatherWindSpeed: document.querySelector(".weather__wind-speed"),
    currentVibility: document.querySelector(".weather__visibility"),
    currentWeatherHumidity: document.querySelector(".weather__humidity"),
    currentWeatherPressure: document.querySelector(".weather__pressure"),
    currentWeatherDewPoint: document.querySelector(".weather__dew-point"),
};

let currentCity = "";
let current;

let hours = [];
let days = [];

const capitalizeFirstLetter = (str)=>{
    return str.slice(0,1).toUpperCase() + str.slice(1);
}
const padZero = (time)=>{
    return time.toString().padStart(2, "0");
}
const convertToFahrenheit = (temp)=>{
    return (temp * 1.8 - 459.67).toFixed(0)
}
const convertFahrenheitToCelcius = (temp)=>{
    return Math.floor((temp - 32) / 1.8);
}
const convertCelciusToFahrenheit = (temp)=>{
    return Math.floor((temp * 1.8) + 32); 
}
const convertKelvinToCelcius = (temp)=>{
    return Math.round(temp - 273.15)
}
const calculateDewPoint = (temp)=>{
    return Math.round(((current.humidity/100)**(1/8)*(112+0.9* temp) )+(0.1* temp)-112);
}
const convertTimeStampToValidTime = (timstamp)=>{
    return new Date(timstamp * 1000).getHours() > 12 ? `${new Date(timstamp * 1000).getHours() - 12} PM` : `${new Date(timstamp * 1000).getHours()} AM`;
}

const updateCurrentCity = (current)=>{
    currentWeatherNodes.currentWeatherCity.textContent = capitalizeFirstLetter(currentCity);
}
const updateLastUpdatedAtText = (current)=>{
    const now = new Date(current.dt * 1000);
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const time = (now.getHours() === 12 && now.getMinutes() > 0 ) || (now.getHours() > 12) ? "PM" : "AM";
    currentWeatherNodes.updatedAtBox.textContent = `${padZero(hours)}:${padZero(now.getMinutes())} ${time}`;
}
const updateCurrentWeatherIcon = (current)=>{
    currentWeatherNodes.currentWeatherIcon.src = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    currentWeatherNodes.currentWeatherIcon.alt = current.weather[0].description;
}
const updateCurrentWeatherTemperature = (current)=>{
    currentWeatherNodes.currentWeatherTemperature.textContent = convertToFahrenheit(current.temp);
}
const updateWeatherCondition = (current)=>{
    currentWeatherNodes.currentWeatherCondition.textContent = capitalizeFirstLetter(current.weather[0].description);
}
const updateFeelsLikeTemperature = (current)=>{
    currentWeatherNodes.currenWeatherFeelsLikeTemperature.textContent = convertToFahrenheit(current.temp);
}
const updateWindSpeed = (current)=>{
  //  "237.3 × [ln(70/100) + ( (17.27×20) / (237.3+20) )]) / (17.27 - [ln(70/100) + ( (17.27×20) / (237.3+20) )])"
    const windDirection  = document.querySelector(".weather__wind-direction");
    windDirection.style = `transform: rotate(${current.wind_deg}deg)`;
    currentWeatherNodes.currenWeatherWindSpeed.textContent = `${Math.round(2.236937 * current.wind_speed)} mph`;
}
const updateHumidity = (current)=>{
    currentWeatherNodes.currentWeatherHumidity.textContent = `${current.humidity}%`
}
 
const updateCurrentWeatherPressure = (current)=>{
    currentWeatherNodes.currentWeatherPressure.textContent = `${Math.round(current.pressure / 27.84496017704118)} in`;
}
const convertDewPointInFahrenheit = (current)=>{
    currentWeatherNodes.currentWeatherDewPoint.innerHTML = `${calculateDewPoint(convertToFahrenheit(current.temp))}<sup>o</sup>`
}
const convertDewPointInCelcius = (current)=>{
    currentWeatherNodes.currentWeatherDewPoint.innerHTML = `${calculateDewPoint(convertKelvinToCelcius(current.temp))}<sup>o</sup>`
}
const updateMinutelyWeatherForecast = ()=>{
    if(!minutes.length) return;
    weatherContainer.innerHTML = "";
    const html = minutes.forEach(minute =>{
        console.log(minutes, minutes.length)
    })

}
const updateHourlyWeatherForecast = ()=>{
    if(!hours.length) return;
    weatherContainer.innerHTML = "";
    const html = hours.map(hour =>{
        
        return `
        <article class="card-hourly weather-hourly__card-hourly">
        <div class="card-hourly__top">
            <header class="card-hourly">
                <h5 class="card-hourly__title">
                    ${convertTimeStampToValidTime(hour.dt)}
                </h5>
            </header>
            <figure class="card-hourly__icon-box">
                <img src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png" alt="" class="card-hourly__icon">
                <figcaption class="card-hourly__weather-description">
                    ${hour.weather[0].description}
                </figcaption>
            </figure>
        </div>
        <div class="card-hourly__bottom">
            <span class="card-hourly__temperature weather__temperature">
                ${convertToFahrenheit(hour.temp)}
                 
            </span>
            <!-- <figure class="card__precipitation-box">
                <svg width="10" height="10" viewBox="0 0 6 8" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.27344 4.55469C5.42448 4.85156 5.5 5.16667 5.5 5.5C5.5 5.72917 5.47005 5.95052 5.41016 6.16406C5.35026 6.3776 5.26562 6.57682 5.15625 6.76172C5.04948 6.94661 4.91927 7.11589 4.76562 7.26953C4.61458 7.42057 4.44661 7.55078 4.26172 7.66016C4.07682 7.76693 3.8776 7.85026 3.66406 7.91016C3.45052 7.97005 3.22917 8 3 8C2.77083 8 2.54948 7.97005 2.33594 7.91016C2.1224 7.85026 1.92318 7.76693 1.73828 7.66016C1.55339 7.55078 1.38411 7.42057 1.23047 7.26953C1.07943 7.11589 0.949219 6.94661 0.839844 6.76172C0.733073 6.57682 0.64974 6.3776 0.589844 6.16406C0.529948 5.95052 0.5 5.72917 0.5 5.5C0.5 5.16927 0.572917 4.85547 0.71875 4.55859L2.98047 0L5.27344 4.55469Z" fill="white"/>
                </svg>   
                <span class="card__precipitation">
                    25%
                </span>                             
            </figure> -->
        </div>
    </article>
        `;
    }).join("");
    weatherContainer.innerHTML = html;
}
const updateWeeklyWeatherForecast = ()=>{
    if(!days.length) return;
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyWeatherForecastContainer = document.querySelector(".weather-8days-forecast__container");
    weeklyWeatherForecastContainer.innerHTML = "";
    const html = days.map(day =>{          
        return `
        <article class="card weather-8days-forecast__card">
        <header class="card__header">
            <h4 class="card__title">
                ${new Date(day.dt * 1000).getDate() === new Date().getDate() ? "Today": `${weekDays[new Date(day.dt * 1000).getDay()] + ' ' + new Date(day.dt * 1000).getDate()}`}
            </h4>
        </header>
        
        <figure class="card__weather-icon-box">
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icon" class="card__weather-icon">
            <!-- <figure class="card__precipitation-box">
                <svg width="10" height="10" viewBox="0 0 6 8" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.27344 4.55469C5.42448 4.85156 5.5 5.16667 5.5 5.5C5.5 5.72917 5.47005 5.95052 5.41016 6.16406C5.35026 6.3776 5.26562 6.57682 5.15625 6.76172C5.04948 6.94661 4.91927 7.11589 4.76562 7.26953C4.61458 7.42057 4.44661 7.55078 4.26172 7.66016C4.07682 7.76693 3.8776 7.85026 3.66406 7.91016C3.45052 7.97005 3.22917 8 3 8C2.77083 8 2.54948 7.97005 2.33594 7.91016C2.1224 7.85026 1.92318 7.76693 1.73828 7.66016C1.55339 7.55078 1.38411 7.42057 1.23047 7.26953C1.07943 7.11589 0.949219 6.94661 0.839844 6.76172C0.733073 6.57682 0.64974 6.3776 0.589844 6.16406C0.529948 5.95052 0.5 5.72917 0.5 5.5C0.5 5.16927 0.572917 4.85547 0.71875 4.55859L2.98047 0L5.27344 4.55469Z" fill="white"/>
                </svg>   
                <span class="card__precipitation">
                    25%
                </span>                             
            </figure> -->
        </figure>
        <div class="card__temperature-box">
            <span class="card__temperature weather__temperature">
                ${convertToFahrenheit(day.temp.max)}
               
            </span>
            <span class="card__temperature weather__temperature">
                ${convertToFahrenheit(day.temp.min)}
               
            </span>
        </div>
    </article>
        `;
    }).join("");
    weeklyWeatherForecastContainer.innerHTML = html;
}

const updateCurrenWeatherDOM = (current)=>{
    if(!current)return;  
    updateCurrentCity(current);
    updateLastUpdatedAtText(current);
    updateCurrentWeatherIcon(current);
    updateCurrentWeatherTemperature(current);
    updateWeatherCondition(current);
    updateFeelsLikeTemperature(current);
    updateWindSpeed(current);
    updateHumidity(current);
    updateCurrentWeatherPressure(current);
    convertDewPointInFahrenheit(current);
    updateWeeklyWeatherForecast();
    updateHourlyWeatherForecast();
}

const copyAPIData = (data)=>{
    current = data.current;
    hours = [...data.hourly.slice(0, 24)];
    days = [...data.daily]; 
    updateCurrenWeatherDOM(current);
}

const constvertWindSpeedToKmph = ()=>{
    currentWeatherNodes.currenWeatherWindSpeed.textContent = `${Math.round(current.wind_speed * 3.6)} km/h`;
}
const convertPressureToMb = ()=>{
    currentWeatherNodes.currentWeatherPressure.textContent = `${current.pressure} mb`;
}
const convertTemperature = (e)=>{
    const temperatures = document.querySelectorAll(".weather__temperature");
    const temperatureType = e.target.dataset.temp;
    if(temperatureType === "celcius"){
        e.target.classList.add("active");
        e.target.disabled= true;
        e.target.previousElementSibling.classList.remove("active");
        e.target.previousElementSibling.disabled = false;
        constvertWindSpeedToKmph();
        convertPressureToMb();
        convertDewPointInCelcius(current);
        temperatures.forEach(temperature =>{
           temperature.textContent = convertFahrenheitToCelcius(temperature.textContent.trim());
        })
    } else {
        e.target.classList.add("active");  
        e.target.disabled = true;  
        e.target.nextElementSibling.classList.remove("active");
        e.target.nextElementSibling.disabled = false;
        updateCurrentWeatherPressure(current)
        updateWindSpeed(current);
        convertDewPointInFahrenheit(current);
        temperatures.forEach(temperature =>{
            temperature.textContent = convertCelciusToFahrenheit(temperature.textContent.trim());
            
         })
    }
}
const hideNode = (node)=>{
    node.style.display = "none";
}
const displayNode = (node)=>{
    node.style.display = "block";
}
const getCityWeather = (data)=>{
    const city = form.querySelector("input").value;
    const xml = new XMLHttpRequest();
    xml.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${weatherAPIKey}`);

    xml.onload = function(){
        if(this.status === 200){            
            const data = JSON.parse(this.response);
            copyAPIData(data)
            hideNode(progressNode.progress);
            displayNode(hourlyWeatherContainer);
            displayNode(weather8DaysForecastContainer);
            displayNode(currentWeatherContainer);
            
            const btns = document.querySelectorAll(".weather-current__temperature-changer-btn");
            btns.forEach(btn =>{
                btn.addEventListener("click", convertTemperature);
            })
        }
    }
     
    xml.send();
}
const errorMessageNodes = {
    errorMessageContainer:document.querySelector(".error-message-box"),
    errorMessage: document.querySelector(".error-message-box h2"),
}
const progressNode = {
    progress: document.querySelector(".progress"),
}
const getCityCoorDinates = (e)=>{
    e.preventDefault();
    console.log(e.target)
    const city = form.querySelector("input").value;
    const xml = new XMLHttpRequest();
    xml.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}`);

    xml.onload = function(){
        if(this.status === 200){            
            const data = JSON.parse(this.response);
            hideNode(errorMessageNodes.errorMessageContainer)
            getCityWeather(data);
            currentCity = city;       
        } else {
            hideNode(progressNode.progress)
            displayNode(errorMessageNodes.errorMessageContainer);
            errorMessageNodes.errorMessage.textContent = `${this.status} ${this.statusText}`;
            
        }
    }
    xml.onprogress = function(){  
        hideNode(hourlyWeatherContainer);
        hideNode(weather8DaysForecastContainer);
        hideNode(currentWeatherContainer);
        displayNode(progressNode.progress);    
    }
    xml.onerror = function(){
        errorMessageNodes.errorMessage.textContent = `${this.status} ${this.statusText}`;
        displayNode(errorMessageNodes.errorMessageContainer);
    }   
    e.target.reset();
    xml.send();
}




form.addEventListener("submit", getCityCoorDinates);
