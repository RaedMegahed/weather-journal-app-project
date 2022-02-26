/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// added +1 here as getMonth method starts from 0
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = `f62df14ed0ecac83cd8eaa27cf770d84`;
// get generate btn by id
const generate = document.getElementById("generate");
// click event when we click on generate btn

generate.addEventListener("click", async (evt) => {
  // get the input by id
  const zipCode = document.getElementById("zip").value;
  // get text area by id
  const content = document.getElementById("feelings").value;

  try {
    // call getTemperature function
    const temperature = await getTemperature(zipCode);

    // create post requet
    await fetch("/postWeather", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: newDate,
        temperature: temperature,
        content: content,
      }),
    });

    //updateUI
    // make the data that stored in projectData to show to the user
    const res = await fetch("/getWeather");
    // make the data readable
    const data = await res.json();
    // get div of date by id and put it in date div
    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    // get div of temperature by id and put it in temperature div
    document.getElementById("temp").innerHTML = `Temp: ${data.temperature}`;
    // get div of content by id and put it in content div
    document.getElementById("content").innerHTML = `Feeling: ${data.content}`;
    console.log(data);
  } catch (err) {
    // if there is an error catch will console it
    console.log(err);
  }
});

// function to fetch the url and get temperature
async function getTemperature(zipCode) {
  // full url request by zip code
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  // send fetch to the url
  const response = await fetch(url);
  // add json to make the data readable for server
  const readableData = await response.json();
  // to reach the temperature form main
  const temperature = readableData.main.temp;
  return temperature;
}
