let searchB = document.getElementById("search");
let crossBtn = document.getElementById("cross");
let input = document.getElementById("input");
let apiKey = "dd81ee287018e30a9e7376c918566474";
let locationbtn = document.getElementById("location");
let getTime = document.getElementById("time");
let wIcon = document.getElementById("");

let allData = document.getElementById("all-data");

// let select = document.getElementById("select");
let api;




let myText = document.getElementById('myText')



// search btn 
// searchB.addEventListener('click', e => {
//     if (input.value != "") {
//         requeasApi(input.value);

//     }
// })



searchB.addEventListener('click', e => {
    if (input.value != "") {
        requeasApi(input.value);
        allData.classList.add("weatherData")
        myText.classList.remove("beforText")

        myText.innerHTML = ""
    }


})



// input value with Enter btn ///
input.addEventListener("keyup", e => {
    if (e.key == "Enter" && input.value != "") {
        requeasApi(input.value);
        allData.classList.add("weatherData")
        myText.classList.remove("beforText")

        myText.innerHTML = ""
    }

})


input.addEventListener("keyup", e => {
    if (e.keyCode == 8 && input.value == "") {

        input.classList.remove("wrongInput")

    }
})



// clear btn 
crossBtn.addEventListener('click', () => {

    input.value = ""

    document.getElementById("city").innerHTML = ''
    document.getElementById("temp").innerHTML = ''
    document.getElementById("weath").innerHTML = '';
    document.getElementById("humidity").innerHTML = '';
    document.getElementById("windSpeed").innerHTML = "";
    getTime.innerHTML = "";


    input.classList.remove("wrongInput")
    allData.classList.remove("weatherData")

    myText.classList.add("beforText")
    myText.innerHTML = "Weather-App"


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
    allData.classList.add("weatherData")
    myText.classList.remove("beforText")
    myText.innerHTML = ""



}

function onError(error) {
    console.log(error, "not supported")
    allData.innerHTML = `<h1> Your brouser isn't support  location api</h1>`

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

function weatherDetail(info) {

    if (info.cod == "404") {
        input.value = "not valid : try again"
        input.classList.add("wrongInput")
    } else {



        let time = new Date();

        getTime.innerHTML = `${time.toLocaleString("en-IN")} `



        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;
        const { speed } = info.wind;

        let tharmaMeter = `<i class="fas fa-temperature-high  red"></i> `

        document.getElementById("city").innerHTML = `${city} , ${country}`
        document.getElementById("temp").innerHTML = `  ${tharmaMeter} ${Math.floor(temp)}°C`;
        document.getElementById("weath").innerHTML = description;
        document.getElementById("humidity").innerHTML = `${humidity}% humidity`;
        document.getElementById("windSpeed").innerHTML = `wind-speed : ${Math.floor(speed)} kph `;


        // console.log(info)
    }

}