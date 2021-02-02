// e633b5e1a805d4255ff03ca0b12e4a5f
// https://api.openweathermap.org/data/2.5/weather?q=London&APPID=e633b5e1a805d4255ff03ca0b12e4a5f

let area = 'london';
let unit = 'metric';

async function getWeather(location, temperatureUnit = 'imperial') {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${temperatureUnit}&APPID=e633b5e1a805d4255ff03ca0b12e4a5f
`,
    { mode: 'cors' }
  );
  const data = await response.json();
  console.log(data);
}
getWeather(area, unit);
