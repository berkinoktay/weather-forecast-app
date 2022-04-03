import React from 'react';
import Sunrise from '../icons/sunrise.svg';
import Sunset from '../icons/sunset.svg';
import Moonrise from '../icons/moonrise.svg';
import Moonset from '../icons/moonset.svg';
import { IoMdArrowRoundBack } from 'react-icons/io';
function Weather({ weather, setHasData }) {
  console.log(weather);
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
            <div className="seperator"></div>
            <div className="sunmoon">
              <div>
                <img src={Sunrise} alt="Gün Doğumu" />
                <span>
                  <strong>Gün Doğumu:</strong>
                  {new Date(weather.daily[0].sunrise * 1000).toLocaleTimeString(
                    'tr',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
              <div>
                <img src={Sunset} alt="Gün Batımı" />
                <span>
                  <strong>Gün Batımı:</strong>
                  {new Date(weather.daily[0].sunset * 1000).toLocaleTimeString(
                    'tr',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
              <div>
                <img src={Moonrise} alt="Ayın Doğuşu" />
                <span>
                  <strong>Ayın Doğumu:</strong>
                  {new Date(
                    weather.daily[0].moonrise * 1000
                  ).toLocaleTimeString('tr', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div>
                <img src={Moonset} alt="Ayın Batımı" />
                <span>
                  <strong>Ayın Batımı:</strong>
                  {new Date(weather.daily[0].moonset * 1000).toLocaleTimeString(
                    'tr',
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </span>
              </div>
            </div>
          </aside>
          <div className="info">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            deserunt ratione, odio porro eveniet, nam rerum quae maxime
            aspernatur minima sunt animi officia totam dolores. Accusamus est
            quia nam nesciunt. Maxime odit eligendi atque nisi doloremque porro
            saepe amet consequuntur qui cupiditate voluptates dignissimos,
            molestiae quae officia corrupti vitae quidem commodi, cumque
            corporis dicta non. Reiciendis numquam atque sequi omnis? Distinctio
            tempora non ipsa dolores excepturi. Reiciendis omnis ipsa eum
            adipisci rem quasi quisquam ratione deserunt! Aperiam dolor est
            dolorum quam harum sequi quas ut blanditiis doloribus asperiores.
            Ab, esse!
          </div>
        </main>
      </div>
    </div>
  );
}

export default Weather;
