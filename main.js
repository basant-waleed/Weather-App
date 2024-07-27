//search input
const searchInput = document.getElementById('search');
// today-variables
let todayName = document.getElementById('today')
let todayDate = document.getElementById('today-date')
let locationCountry = document.getElementById('location-country')
let todayTemp = document.getElementById('degree-today')
let todayStatus = document.getElementById('today-status')
let todayImage = document.getElementById('image-today')
let todayWindImage = document.getElementById('image-wind')
let todayWindNo = document.getElementById('no-wind')
let todayHumidityImage = document.getElementById('image-humedity')
let todayHumidityNo = document.getElementById('no-humidity')
let windder = document.getElementById('windder')
let todaymonth = document.getElementById('today-month')

// nextt days variables
let maxtemp = document.getElementsByClassName('next-max-temp') 
let mintemp = document.getElementsByClassName('next-min-temp')
let nextcondition = document.getElementsByClassName('next-condition')
let nextimage = document.getElementsByClassName('next-image')
let nextDay = document.getElementsByClassName('next-date')

// fitch api 
async function getweatherData(cityname){
let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2508d1dd89c64052ba1163450241607&q=${cityname}&days=3`)
let weatherData = await weatherResponse.json()
return weatherData
}

// display today
 function displayToday(data){
let todayinfo = new Date()
   todayName.innerHTML = todayinfo.toLocaleDateString("en-us",{weekday:"long"})
   todayDate.innerHTML = todayinfo.getDate()
   todaymonth.innerHTML = todayinfo.toLocaleDateString("en-us",{month:"long"})
   locationCountry.innerHTML = data.location.name 
  todayTemp.innerHTML = data.current.temp_c
  todayStatus.innerHTML = data.current.condition.text
  todayImage.setAttribute("src",data.current.condition.icon) 
  todayWindNo.innerHTML = data.current.wind_kph +"km/h"
  todayHumidityNo.innerHTML = data.current.humidity
  windder.innerHTML = data.current.wind_dir


}
// next 
function displayNext(data){
    for(let i=0; i<2; i++){
        let nextDate = new Date(data.forecast.forecastday[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us",{weekday:"long"})
        maxtemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        mintemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextcondition[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
        nextimage[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon)
    }
}

// call function
 async function startApp(city='cairo'){
    let weatherdata = await getweatherData(city)
   if(!weatherdata.error){
    displayToday(weatherdata)
    displayNext(weatherdata)
   }
   
   
}
startApp()

// search

searchInput.addEventListener('input',function(){
    let searchValue = searchInput.value
  startApp(searchValue)
})