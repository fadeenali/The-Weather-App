let api;
let apiKey = "dd81ee287018e30a9e7376c918566474";

let searchB = document.getElementById("search");
let crossBtn = document.getElementById("cross");
let locationbtn = document.getElementById("location");

let input = document.getElementById("input");
let allData = document.getElementById("all-data");

let select = document.getElementById("select");
// let selbtn = document.getElementsById("selbtn")

let getTime = document.getElementById("time");
let myText = document.getElementById('myText')

let forErr = document.getElementById("forErr")

// for tharmameter icon 
let tharmaMeter;

let wIcon


let hide = document.getElementById("hide")







// imp 



let temperature = document.getElementById("temp")
let humidity = document.getElementById("humidity")
let weather = document.getElementById("weath")
let windSpeed = document.getElementById("windSpeed")










// get value with search btn 

searchB.addEventListener('click', e => {
    if (input.value != "") {
        requeasApi(input.value);

        setTimeout(() => {

            hide.classList.add("hide911")

            allData.classList.add("weatherData")
        }, 1000);

        myText.classList.remove("beforText")

        myText.innerHTML = ""




    }


})



// input value with Enter btn ///
input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        requeasApi(input.value);

        setTimeout(() => {

            hide.classList.add("hide911")

            allData.classList.add("weatherData")
        }, 1000);
        myText.classList.remove("beforText")

        myText.innerHTML = ""



    }

})



// for backspace button 

input.addEventListener("keyup", e => {
    if (e.keyCode == 8 && input.value == "") {

        input.classList.remove("wrongInput")

        allData.classList.remove("weatherData")


        if (getTime.innerHTML != '') {
            getTime.innerHTML = ""

        } else if (tharmaMeter) {
            document.getElementById("tharma").classList.remove("fa-temperature-high");

        } else if (document.getElementById("city").innerHTML != "") {
            document.getElementById("city").innerHTML = "";

        } else if (temperature.innerHTML != "") {
            temperature.innerHTML = "";

        } else if (weather.innerHTML != "") {
            weather.innerHTML = '';

        } else if (humidity.innerHTML != "") {
            humidity.innerHTML = "";

        } else if (document.getElementById("windSpeed").innerHTML != "") {
            document.getElementById("windSpeed").innerHTML = "";

        }


    }
})






// clear btn 
crossBtn.addEventListener('click', () => {




    input.value = ""
    if (document.getElementById("city").innerHTML != '') {

        document.getElementById("city").innerHTML = ''
    }


    temperature.innerHTML = ''
    document.getElementById("weath").innerHTML = '';
    humidity.innerHTML = '';
    document.getElementById("windSpeed").innerHTML = "";
    getTime.innerHTML = "";

    forErr.innerHTML = "";


    input.classList.remove("wrongInput")
    allData.classList.remove("weatherData")

    hide.classList.remove("hide911")

    myText.classList.add("beforText")
    myText.innerHTML = "Weather-App"

    allData.classList.remove("onlyWeatherData")


})




// GET locationbtn 

locationbtn.addEventListener('click', function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        alert("your brauser not suported location api ")
    }

})


function onSuccess(position) {
    // console.log(position)

    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey} `

    fetchData();

    setTimeout(() => {
        allData.classList.add("weatherData")
    }, 1000);
    myText.classList.remove("beforText")
    myText.innerHTML = ""



}

function onError(error) {
    console.log(error, "not supported")
    allData.innerHTML = ` Your brouser isn't support  location api`

}












// fetch api 

function requeasApi(city) {
    // console.log(city)

    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData()

    // fetch(api).then(response => response.json()).then(result => weatherDetail(result));
}


function fetchData() {
    fetch(api).then(response => response.json()).then(result => weatherDetail(result));

}







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function weatherDetail(info) {

    if (info.cod == "404") {


        input.value = "not found : try again"
        input.classList.add("wrongInput")

        // for clear the allData 

        if (getTime.innerHTML != '') {
            getTime.innerHTML = ""

        } else if (tharmaMeter) {
            document.getElementById("tharma").classList.remove("fa-temperature-high");

        } else if (document.getElementById("city").innerHTML != "") {
            document.getElementById("city").innerHTML = "";

        } else if (temperature.innerHTML != "") {
            temperature.innerHTML = "";

        } else if (weather.innerHTML != "") {
            weather.innerHTML = '';

        } else if (humidity.innerHTML != "") {
            humidity.innerHTML = "";

        } else if (windSpeed.innerHTML != "") {
            windSpeed.innerHTML = "";

        }


        setTimeout(() => {

            forErr.innerHTML = "not found : try again"
        }, 300);


        // allData.classList.add("error")

    } else if (select.value == 'weatheronly') {




        allData.classList.add("onlyWeatherData")




        // // for icon 


        // if (id == 800) {

        //     // clear 

        //     wIcon = "fas fa-sun"

        // } else if (id >= 200 && id <= 232) {

        //     // strom 
        //     wIcon = "fas fa-bolt"

        // } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {

        //     // rain  //////
        //     wIcon = "fas fa-cloud-rain"

        // } else if (id >= 600 && id <= 622) {


        //     // snow 
        //     wIcon = "fas fa-snowflake"

        // } else if (id >= 701 && id <= 781) {

        //     // haze 
        //     wIcon = "fas fa-smog"

        // } else if (id >= 801 && id <= 804) {

        //     // cloud 
        //     wIcon = "fas fa-cloud"
        // }




        console.log("weather")
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];

        setTimeout(() => {
            document.getElementById("city").innerHTML = `${city} , ${country}`
            weather.innerHTML = `${description} <i class = "fas fa-cloud" > `
        }, 800);

    } else if (select.value == "temp") {

        allData.classList.add("onlyWeatherData")

        // console.log("tempretur");

        const { temp } = info.main;
        const city = info.name;
        const country = info.sys.country;

        setTimeout(() => {

            document.getElementById("city").innerHTML = `${city} , ${country}`
            temperature.innerHTML = `  temp : ${Math.floor(temp)}°C`;

        }, 1000);

    } else if (select.value == "humidity") {

        allData.classList.add("onlyWeatherData")

        // console.log("humidity");

        const city = info.name;
        const country = info.sys.country;
        const { humidity } = info.main;


        setTimeout(() => {
            document.getElementById("city").innerHTML = `${city} , ${country}`
            document.getElementById("humidity").innerHTML = `${humidity}% humidity`;
        }, 1000);

    } else if (select.value == "speed") {

        allData.classList.add("onlyWeatherData")

        // console.log("speed");

        const city = info.name;
        const country = info.sys.country;
        const { speed } = info.wind;

        setTimeout(() => {
            document.getElementById("city").innerHTML = `${city} , ${country}`
            windSpeed.innerHTML = `wind-speed : ${Math.floor(speed)} kph `;
        }, 1000);

    } else {



        let time = new Date();
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        const { speed } = info.wind;




        // using coustom  weather icon for weather ...


        if (id == 800) {

            // clear 

            wIcon = "fas fa-sun"

        } else if (id >= 200 && id <= 232) {

            // strom 
            wIcon = "fas fa-bolt"

        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {

            // rain  //////
            wIcon = "fas fa-cloud-rain"

        } else if (id >= 600 && id <= 622) {


            // snow 
            wIcon = "fas fa-snowflake"

        } else if (id >= 701 && id <= 781) {

            // haze 
            wIcon = "fas fa-smog"

        } else if (id >= 801 && id <= 804) {

            // cloud 
            wIcon = "fas fa-cloud"
        }














        setTimeout(() => {

            getTime.innerHTML = `${time.toLocaleString("en-IN")} `

            tharmaMeter = `<i class="fas fa-temperature-high  red"></i> `

            document.getElementById("city").innerHTML = `${city} , ${country}`
            temperature.innerHTML = `  ${tharmaMeter} ${Math.floor(temp)}°C`;

            temperature.classList.add("temp1")

            weather.innerHTML = `${description} <i class = "${wIcon}" > `;

            document.getElementById("humidity").innerHTML = `${humidity}% humidity`;
            windSpeed.innerHTML = `wind-speed : ${Math.floor(speed)} kph `;

        }, 1000);



        console.log(info)
    }

}