// e633b5e1a805d4255ff03ca0b12e4a5f
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=e633b5e1a805d4255ff03ca0b12e4a5f

let area = 'london';
let items = [];

const form = document.querySelector('form');
form.addEventListener('submit', getData);

const display = document.querySelector('#display ul');

function poppulateDisplay(datas = [], displayArea) {
  datas.forEach((data) => {
    const li = document.createElement('li');
    li.textContent = data;
    displayArea.appendChild(li);
  });
}

function getData(e) {
  e.preventDefault();
  let data = this.querySelector('input[type="text"]').value;
  area = data;
  this.reset();
}

let Currentdate = new Date();
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let today = weekday[Currentdate.getDay()];

// default fahrenhiet
async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=e633b5e1a805d4255ff03ca0b12e4a5f
`,
      { mode: 'cors' }
    );
    const data = await response.json();
    const temp = data.main.temp + ' Fahernhiet';
    const humidity = data.main.temp + ' %';
    const weather = data.weather[0].main;
    const town = data.name;
    const wind = data.wind.speed + ' knots';
    return { town, temp, humidity, weather, wind };
  } catch (error) {
    console.log(error);
  }
}

getWeather(area).then((value) => {
  console.log(value);
  items.push(value);
  poppulateDisplay(items, display);
});

function tempConverter(temp) {
  const celcius = (temp - 32) / 1.8;
  const fahernhiet = temp * 1.8 + 32;
}
