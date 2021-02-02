const form = document.querySelector('form');
const display = document.querySelector('#display ul');
const timeDisplayer = document.querySelector('#time');
let items = [];

form.addEventListener('submit', getData);

// poppulate area with certain data
function poppulateDisplay(datas = [], displayArea) {
  display.textContent = ' ';
  items = [];
  datas.forEach((data, i) => {
    const li = document.createElement('li');
    li.classList.add(`data${i}`);
    li.textContent = data;
    return displayArea.appendChild(li);
  });
}

// get user input and manipulate
function getData(e) {
  e.preventDefault();
  let data = this.querySelector('input[type="text"]').value;
 apiCall(data);
  time.apiTimeCalc(data);
  this.reset();
}

// get current day
let Currentdate = new Date();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let today = weekday[Currentdate.getDay()];

// default unit fahrenhiet
async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=e633b5e1a805d4255ff03ca0b12e4a5f
`,
      { mode: 'cors' }
    );
    const data = await response.json();
    const temp = data.main.temp.toFixed(2) + 'F';
    const humidity = 'Humidity : ' + data.main.temp + ' %';
    const weatherGif = data.weather[0].main;
    const weather = 'Weather : ' + data.weather[0].main;
    const town = `${data.name},${today}`;
    const wind = 'Wind Speed : ' + data.wind.speed + ' knots';
    gif.getGif(weatherGif);
    return { town, temp, humidity, weather, wind };
  } catch (error) {
    console.log(error);
  }
}

// after getweather promise resolved we display every value returned
function apiCall(area) {
  return getWeather(area).then((value) => {
    const arrayValues = Object.values(value);
    arrayValues.forEach((i) => items.push(i));
    poppulateDisplay(items, display);
  });
}

// module which finds the time btw api calls
const time = (function () {
  function timeit(fn) {
    return async function (...params) {
      let beginApiCall = Date.now();
      const finishApiCall = await fn(...params);
      const duration = Date.now() - beginApiCall;
      return duration;
    };
  }

  function apiTimeCalc(area) {
    const timeCheck = timeit(getWeather);
    timeCheck(area).then((value) => {
      let timeTaken = value / 1000 + ' seconds to complete API Call';
      timeDisplayer.textContent = timeTaken;
    });
  }
  return { apiTimeCalc };
})();

// gif api module
const gif = (function () {
  let image = document.querySelector('#gifs img');
  async function getGif(name) {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=QXhoIwlip7tURXxbutmhutI7eiYVC9mT&s="${name}"&weirdness=10`,
        {
          mode: 'cors',
        }
      );
      const data = await response.json();
      image.src = '';
      image.src = data.data.images.original.url;
    } catch (error) {
      console.log(error);
      image.src = 'no_net.gif';
    }
  }
  return { getGif };
})();

apiCall('alappuzha');
