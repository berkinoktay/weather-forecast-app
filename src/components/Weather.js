import React from 'react';

function Weather({ weather, setHasData }) {
  return (
    <div>
      {weather.name}
      <button onClick={() => setHasData(false)}>DENEMEEE</button>
    </div>
  );
}

export default Weather;
