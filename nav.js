/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function stopAud() {
    document.getElementById("ship").stop();
}

function startAud() {
    document.getElementById("ship").play();
}

// weather block
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener("load", () => {
    /* Get location
    // if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    // lon = position.coords.longitude;
    // lat = position.coords.latitude;
    */

    // Hong Kong Location
    const lon = 114.1694;
    const lat = 22.3193;

    // API ID
    const api = "a4eb5f65cf6ec29987e2bb4c6b93a387";

    // API URL
    const base =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${lon}&appid=${api}`;

    // Calling the API
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            temperature.innerText = Math.floor(data.main.temp - kelvin) + "°C";
            summary.innerText = data.weather[0].description;
            loc.innerText = data.name + "," + data.sys.country;
            /* Set icon
            let icon1 = data.weather[0].icon;
            */
            icon.innerHTML = `<img src="icons/weather.svg" style= 'height:5rem'/>`;
        });
    // });
    // }
});
