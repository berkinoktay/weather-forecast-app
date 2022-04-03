import Form from './components/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
function App() {
  const [city, setCity] = useState('');
  const [currentPosition, setCurrentPosition] = useState({});
  const [status, setStatus] = useState({});
  const [weather, setWeather] = useState({});
  const [hasData, setHasData] = useState(null);
  const queryParams = {
    city: `?q=${city}`,
    latlon: `?lat=${currentPosition.lat}&lon=${currentPosition.lon}`,
  };
  const getWeatherData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&lang=tr&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        setWeather((prevState) => ({
          ...prevState,
          current: {
            temp: res.data.current.temp,
            feels_like: res.data.current.feels_like,
            humidity: res.data.current.humidity,
            sunrise: res.data.current.sunrise,
            sunset: res.data.current.sunset,
            wind_speed: res.data.current.wind_speed,
            wind_deg: res.data.current.wind_deg,
            weather: res.data.current.weather[0],
          },
          daily: res.data.daily,
        }));
        setHasData(true);
      });
  };
  useEffect(() => {
    if (!hasData) {
      setCity('');
      setWeather({});
      setStatus({});
      setCurrentPosition({});
    }
  }, [hasData]);
  useEffect(() => {
    if (city !== '' || (currentPosition.lat && currentPosition.lon)) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast${
            city ? queryParams.city : queryParams.latlon
          }&cnt=8&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((res) => {
          setWeather({
            name: res.data.city.name,
            country: res.data.city.country,
            hourlyList: res.data.list,
          });
          getWeatherData(res.data.city.coord.lat, res.data.city.coord.lon);
        })
        .catch(() => {
          setStatus({
            code: 'error',
            text: `${city} adlı şehir bulunamadı!`,
          });
          setCity('');
        });
    }
  }, [city, currentPosition]);
  return (
    <>
      {!hasData && (
        <Form
          setCity={setCity}
          setCurrentPosition={setCurrentPosition}
          status={status}
          setStatus={setStatus}
        />
      )}

      {hasData && <Weather weather={weather} setHasData={setHasData} />}
    </>
  );
}

export default App;
