async function getWeather() {
    const city = document.getElementById("dd").value.trim(); // trim is used to rempove extra space
    const apiKey = "ced5b16ab250286680fca22cbc181e94";//Needed to use OpenWeather API.
    const button = document.getElementById("ff");

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;//Builds the URL to fetch weather data for the city and meric is used for measurments

    button.innerText = "Loading...";// while pressing search it  changes will display loading
    button.disabled = true;//avoid double clicking

    try {
        const response = await fetch(url);
       // this line sends a request to OpenWeatherMap API using the url and waits (await) for the weather data
        if (!response.ok) throw new Error("City not found");//if u type a wrong name it will display 

        const data = await response.json();//Converts the API response into a readable JSON object.

       // Get the name of the city from the API response (e.g., "Delhi")
const cityName = data.name;

// Get the country code from the 'sys' object in the response (e.g., "IN" for India)
const country = data.sys.country;

// Get a detailed description of the weather condition (e.g., "light rain", "clear sky")
// data.weather is an array, so we access the first item using [0]
const conditionText = data.weather[0].description;

// Get the main weather condition (e.g., "Rain", "Clouds"), and convert it to lowercase
// This helps in comparing the value easily (used for setting background)
const mainCondition = data.weather[0].main.toLowerCase();


       // Display the city name and country from the API data
document.getElementById("cityName").innerText = `City: ${cityName}, ${country}`;

// Display the current temperature in Celsius
document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°C`;

// Display the weather description (like "clear sky", "rainy", etc.)
document.getElementById("condition").innerText = `Weather Condition: ${conditionText}`;


// Display the humidity percentage
document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;

// Display the wind speed in meters per second
document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const iconImg = document.getElementById("icon");
        iconImg.src = iconUrl;
        iconImg.style.display = "block";

        setBackground(mainCondition);//This function sets the background image based on the weather (e.g., sunny, rainy, etc.).
// why this catch block 
// Runs when there is an error (like city not found). Shows alert and resets the display. while 
// The city is wrong

// Internet is off

// Server fails to respond

    } catch (error) {
        alert("Error: " + error.message);
        resetDisplay();   // clear old info
        document.body.className = "default-bg";  // set default background
    } finally {
        button.innerText = "Search"; // Reset button text
        button.disabled = false; //Enable button again
    }
}
function setBackground(condition) {
    // Remove all previously set classes
    document.body.className = "";

    // Target the main content container with ID 'dha'
    const container = document.getElementById("dha");

    // Reset any previous styling
    container.style.color = "";
    container.style.fontFamily = "";

    switch (condition) {
        case "clear":
            document.body.className = "clear";
            container.style.color = "#222";
            container.style.fontFamily = "'Segoe UI', sans-serif";
            break;
        case "sunny":
            document.body.className = "sunny";
            container.style.color = "#f39c12";
            container.style.fontFamily = "'Trebuchet MS', sans-serif";
            break;
        case "clouds":
            document.body.className = "cloudy";
            container.style.color = "hsla(242, 29%, 24%, 1.00)";
            container.style.fontFamily = "'Arial', sans-serif";
            break;
        case "rain":
        case "drizzle":
        case "thunderstorm":
            document.body.className = "rainy";
            container.style.color = "#ffffff";
            container.style.fontFamily = "'Courier New', monospace";
            break;
        default:
            document.body.className = "default-bg";
            container.style.color = "#fff";
            container.style.fontFamily = "'Verdana', sans-serif";
            break;
    }
}





// Function to reset the weather display when error happens or before search
function resetDisplay() {
    document.getElementById("cityName").innerText = "City:";
    document.getElementById("temp").innerText = "Temperature:";
    document.getElementById("condition").innerText = "Weather Condition:";
    document.getElementById("humidity").innerText = "Humidity:";
    document.getElementById("wind").innerText = "Wind Speed:";
    document.getElementById("icon").style.display = "none";
}

document.getElementById("dd").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather(); // Call main weather fetching function
    }

});
