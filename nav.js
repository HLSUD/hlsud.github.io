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

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("img_display");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    //   let dots = document.getElementsByClassName("dot");
    //   for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    //   }
    //   dots[slideIndex-1].className += " active";
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
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

    // API URL
    const base =
        "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";

    // Calling the API
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            temperature.innerText =
                Math.floor(data.temperature.data[16].value) + "°C";
            summary.innerText = data.warningMessage[0];
            loc.innerText = data.temperature.data[16].place;
            // Set icon
            let icon1 = data.icon[0];

            icon.innerHTML = `<img src="https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon1}.png" style= 'height:5rem'/>`;
        });
    // });
    // }
});
