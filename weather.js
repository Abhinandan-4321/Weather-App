//Complete the Weather API Backend part using openweathermap api

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.
const API_Key = "449ebf6df2fcf6aba713fbac65092246";

function fetchTheCityName(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_Key}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      fetchingLatLon(data[0].lat, data[0].lon)
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// const hello = "solan";
// fetchTheCityName(hello);

function fetchingLatLon(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Key}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data)
        allData(data)
    })
    .catch((error)=>{
        console.log("Error Fetching Data: ", error)
    })
}

function allData(data){
    let temp = data.main.feels_like;
    temp -= 273.15;
    // For Rounding the decimal till 2 values after decimal
    let alteredTemp = Math.round(temp*100)/100
    let place = data.name;
    let countryCode = data.sys.country
    let humidity = data.main.humidity
    let description = data.weather["0"].description
    forDate();

    const name = document.getElementById("cityName")
    name.innerHTML = place

    const code = document.getElementById("code")
    code.innerHTML = countryCode

    const humPer = document.getElementById("humidPercend")
    humPer.innerHTML = humidity
    
    const thisTemp = document.getElementById("temp-degree")
    thisTemp.innerHTML = alteredTemp

    const desc = document.getElementById("description")
    desc.innerHTML = description
}

let monthArray = ["Jan", "Feb" , "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function forDate(){
    const todayDate = new Date();
    let date = todayDate.getDate(); 
    let year = todayDate.getFullYear();

    let month = monthArray[todayDate.getMonth()]
    console.log(month)

    let numDate = document.getElementById("date-number")
    let monthText = document.getElementById("date-month")
    let numYear = document.getElementById("date-year")

    numDate.innerHTML = date;
    monthText.innerHTML = month;
    numYear.innerHTML = year;

}

let weatherPage = document.getElementById("weather-page")
let startPage = document.getElementById("start-page-container")

let searchButton = document.getElementById("search-btn")
searchButton.addEventListener("click", () => {
    weatherPage.style.display = "flex";
    startPage.style.display = "none";

    const inputField = document.getElementById("input");
    let value = inputField.value;
    if (value == "") {
        alert("Please Enter Some Place")
    } else {
        fetchTheCityName(value);
    }
});


let again = document.getElementById("search-again-btn")
again.addEventListener("click",()=>{
    location.href = "./index.html"
})