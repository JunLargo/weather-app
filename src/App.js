import React, { useState } from "react";
import Moment from 'moment'
import './App.css'


//https://openweathermap.org/img/wn/04n@2x.png

const App = () => {
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")
  const [weatherIcon, setWeatherIcon] = useState()
  const [forecastData, setForecastData] = useState([])

  const getWeather = async (event) => {
    if (event.key === "Enter") {
      //get current weather data
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      const data = await res.json('');

      const resForecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      const dataForecast = await resForecast.json();

      setWeatherData(data)
      setCity('')

      const icon = data.weather[0].icon
      setWeatherIcon(icon)

      //getting forecast data
      

      setForecastData(dataForecast);


    }
  }

  const timeConverter = (weatherDate) => {
    let a = new Date(weatherDate * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  return (
    <div className="max-w-full mx-auto flex flex-col justify-center items-center mt-12 ml-px">
      <div>
      <h1 className="text-center text-white text-3xl ">Welcome to weather app</h1>
        <input 
          type="text" 
          className="bg-gray-100 mt-4 touch-none rounded border focus:outline-none focus:border-gray-200 w-96 px-3 py-3 placeholder:text-sm text-gray-900 text-sm drop-shadow-2xl" 
          placeholder="Enter your city name here ..."
          onChange={e => setCity(e.target.value)}
          value={city}
          onKeyPress = {getWeather}
        />
      </div>
      <div>
        {typeof weatherData.main === 'undefined' ? (
          <div className="text-center mt-5 text-xsm text-gray-200">
            {/* <p className="text-xsm text-gray-200 font-light">{weatherInfo}</p> */}
          </div>
        ) : (
          <>
            <div className="mt-5 text-center" >
              <h2 className="text-base text-white font-normal justify-center">{weatherData.name}, {weatherData.sys.country}</h2>
              <div className="flex mt-1 justify-center">
                <p className=" text-6xl text-white font-bold py-0">{Math.round(weatherData.main.temp)}<span className="align-top text-xs text-gray-100 font-normal">°c</span></p>
                <img className="-mt-2 -ml-2 text-base" src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png `} alt={weatherData.weather[0].description} height="50" width="50" />
              </div>
              <p className="-mt-1 capitalize text-white font-light">{weatherData.weather[0].description}</p>
              <div className='flex justify-center text-gray-300 text-base font-normal'>
                <p className='pr-1'>Sunrise: {Moment(timeConverter(weatherData.sys.sunrise)).format('LT')}</p>
                <p className='pl-1'>Sunset: {Moment(timeConverter(weatherData.sys.sunset)).format('LT')}</p>
              </div>
                {/* <h4 className='mt-2 text-white text-sm'>Forecast (every 3 hours)</h4> */}
                {/* //grid */}
                {/* <div className="grid gap-1 grid-cols-4 grid-rows-4 text-white text-xs font-thin mt-2">
                  <div className='text-center border-gray-800 border px-1 py-1'>
                    <p className='font-light text-xs'>{Moment(timeConverter(forecastData.hourly[3].dt)).format('LT')}</p>
                    <div className='flex justify-center'>
                      <p className='text-center text-l font-bold'>{Math.round(forecastData.hourly[3].temp)} 
                      <span><img className='-nt-2' src={`https://openweathermap.org/img/wn/${forecastData.hourly[3].weather[0].icon}@2x.png`} alt='one' height='30' width='30' /></span></p>
                    </div>
                    <p>{forecastData.hourly[3].weather[0].description}</p> 
                  </div>
                  <div className='text-center border-gray-800 border px-1 py-1'>
                    <p className='font-light'>{Moment(timeConverter(forecastData.hourly[6].dt)).format('LT')}</p>
                    <div className='flex justify-center'>
                      <p className='text-center text-l font-bold'>{Math.round(forecastData.hourly[6].temp)} 
                      <span><img src={`https://openweathermap.org/img/wn/${forecastData.hourly[6].weather[0].icon}@2x.png`} alt='two' height='30' width='30' /></span></p>
                    </div>
                    <p>{forecastData.hourly[6].weather[0].description}</p>
                  </div>
                  <div className='text-center border-gray-800 border px-1 py-1'>
                    <p className='font-light'>{Moment(timeConverter(forecastData.hourly[9].dt)).format('LT')}</p>
                    <div className='flex justify-center'>
                      <p className='text-center text-l font-bold'>{Math.round(forecastData.hourly[9].temp)} 
                      <span><img src={`https://openweathermap.org/img/wn/${forecastData.hourly[9].weather[0].icon}@2x.png`} alt='two' height='30' width='30' /></span></p>
                    </div>
                    <p>{forecastData.hourly[3].weather[0].description}</p>
                  </div>
                  <div className='text-center border-gray-800 border px-1 py-1'>
                    <p className='font-light'>{Moment(timeConverter(forecastData.hourly[12].dt)).format('LT')}</p>
                    <div className='flex justify-center'>
                      <p className='text-center text-l font-bold'>{Math.round(forecastData.hourly[12].temp)} 
                      <span><img src={`https://openweathermap.org/img/wn/${forecastData.hourly[12].weather[0].icon}@2x.png`} alt='two' height='30' width='30' /></span></p>
                    </div>
                    <p>{forecastData.hourly[12].weather[0].description}</p>
                  </div>
                </div> */}
            </div>
          </>
        )}
        {weatherData.cod === '404' ? (
          <p className="text-gray-400 text-sm">City not found, please try a different city or location.</p>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  );
}
 
export default App;
