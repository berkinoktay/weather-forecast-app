import React from 'react';
import Sunrise from '../icons/sunrise.svg';
import Sunset from '../icons/sunset.svg';
import Moonrise from '../icons/moonrise.svg';
import Moonset from '../icons/moonset.svg';
import ColderTemp from '../icons/thermometer-colder.svg';
import WarmerTemp from '../icons/thermometer-warmer.svg';
import Humidity from '../icons/humidity.svg';
import PressureLow from '../icons/pressure-low.svg';
import PressureHigh from '../icons/pressure-high.svg';
import Clouds from '../icons/04d.svg';
import Wind from '../icons/wind.svg';
import Compass from '../icons/compass.svg';
import { IoMdArrowRoundBack } from 'react-icons/io';
function Weather({ weather, setHasData }) {
  const convertHours = (dt) => {
    return new Date(dt * 1000).toLocaleTimeString('tr', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const convertDay = (dt, weekday) => {
    return new Date(dt * 1000).toLocaleDateString('tr', {
      weekday: weekday,
    });
  };
  return (
    <div className="container">
      <div className="weather">
        <header>
          <button onClick={() => setHasData(null)}>
            <IoMdArrowRoundBack /> Geri Dön
          </button>
        </header>
        <main>
          <aside className="sidebar">
            <h1>
              {weather.name}, {weather.country}
            </h1>
            <div className="currentWeatherIcon">
              <img
                src={require(`../icons/${weather.current.weather.icon}.svg`)}
                alt=""
              />
            </div>
            <div className="currentWeather">
              <h2>{weather.current.weather.description}</h2>
            </div>
            <div className="currentTemp">
              <span>{Math.round(weather.current.temp)}</span>
              <span>°C</span>
            </div>
            <span className="feelsTemp">
              Hissedilen Sıcaklık: {Math.round(weather.current.feels_like)}°
            </span>
            <div className="currentDay">
              {convertDay(weather.current.dt, 'long')},
              <span> {convertHours(weather.current.dt)}</span>
            </div>
            <div className="seperator"></div>
            <div className="sunmoon">
              <div>
                <img src={Sunrise} alt="Gün Doğumu" />
                <span>
                  <strong>Gün Doğumu:</strong>

                  {convertHours(weather.daily[0].sunrise)}
                </span>
              </div>
              <div>
                <img src={Sunset} alt="Gün Batımı" />
                <span>
                  <strong>Gün Batımı:</strong>
                  {convertHours(weather.daily[0].sunset)}
                </span>
              </div>
              <div>
                <img src={Moonrise} alt="Ayın Doğuşu" />
                <span>
                  <strong>Ayın Doğumu:</strong>
                  {convertHours(weather.daily[0].moonrise)}
                </span>
              </div>
              <div>
                <img src={Moonset} alt="Ayın Batımı" />
                <span>
                  <strong>Ayın Batımı:</strong>
                  {convertHours(weather.daily[0].moonset)}
                </span>
              </div>
            </div>
          </aside>
          <div className="info">
            <h3>24 Saatlik Tahmin</h3>
            <ul className="weatherForecast">
              {weather.hourlyList.map((hour, index) => (
                <li key={index}>
                  <div className="day"> {convertDay(hour.dt, 'short')}</div>
                  <div className="hours"> {convertHours(hour.dt)}</div>
                  <img
                    src={require(`../icons/${hour.weather[0].icon}.svg`)}
                    alt={`${hour.weather[0].description}`}
                  />
                  <div className="temp">{Math.round(hour.main.temp)}°</div>
                </li>
              ))}
            </ul>
            <h3>Haftalık Tahmin</h3>
            <ul className="weatherForecast">
              {weather.daily.map((hour, index) => (
                <li key={index}>
                  <div className="day"> {convertDay(hour.dt, 'short')}</div>
                  <div className="hours"> {convertHours(hour.dt)}</div>
                  <img
                    src={require(`../icons/${hour.weather[0].icon}.svg`)}
                    alt={`${hour.weather[0].description}`}
                  />
                  <div className="temp">{Math.round(hour.temp.day)}°</div>
                </li>
              ))}
            </ul>
            <h3>Günün Diğer Değerleri</h3>
            <ul className="otherDetails">
              <li>
                <h4>Sıcaklıklar</h4>
                <div>
                  <img src={WarmerTemp} alt="Max Sıcaklık" />
                  <span>
                    <strong>Maksimum:</strong>
                    <br /> {Math.round(weather.daily[0].temp.max)}°
                  </span>
                </div>
                <div>
                  <img src={ColderTemp} alt="Min Sıcaklık" />
                  <span>
                    <strong>Minimum:</strong>
                    <br /> {Math.round(weather.daily[0].temp.min)}°
                  </span>
                </div>
              </li>
              <li>
                <h4>Nem & UV Endeksi</h4>
                <div>
                  <img src={Humidity} alt="Nem Oranı" />
                  <span>
                    <strong className="humidity">
                      {weather.current.humidity}
                    </strong>
                    %
                  </span>
                </div>
                <div>
                  <img
                    src={require(`../icons/uv-index-${
                      weather.daily[0].uvi >= 13
                        ? '0'
                        : Math.round(weather.daily[0].uvi)
                    }.svg`)}
                    alt="Nem Oranı"
                  />
                  <span>
                    <strong>UV: </strong>
                    {Math.round(weather.daily[0].uvi)}
                  </span>
                </div>
              </li>
              <li>
                <h4>Basınç & Bulut Oranı</h4>
                <div>
                  <img
                    src={
                      weather.daily[0].pressure >= 1013
                        ? PressureHigh
                        : PressureLow
                    }
                    alt="Basınç"
                  />
                  <span>
                    <strong>
                      {weather.daily[0].pressure >= 1013 ? 'Yüksek:' : 'Alçak:'}
                    </strong>
                    <br />
                    {weather.daily[0].pressure} mb
                  </span>
                </div>
                <div>
                  <img src={Clouds} alt="Bulut Oranı" />
                  <span>
                    <strong>Bulut Oranı:</strong>
                    <br />
                    {weather.daily[0].clouds} %
                  </span>
                </div>
              </li>
              <li>
                <h4>Rüzgar Bilgileri</h4>
                <div>
                  <img src={Wind} alt="Rüzgar Hızı" />
                  <span>
                    <strong>Rüzgar Hızı:</strong>
                    <br />
                    {(weather.current.wind_speed * 3.6).toFixed(1)} km/h
                  </span>
                </div>
                <div>
                  <img
                    src={Compass}
                    alt="Rüzgar Yönü"
                    style={{
                      transform: `rotate(${weather.current.wind_deg}deg)`,
                    }}
                  />
                  <span>
                    <strong>Rüzgar Yönü</strong>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Weather;
