import { FaSearchLocation } from 'react-icons/fa';
import { useState } from 'react';
function Form({ setCity, setCurrentPosition, status, setStatus }) {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === '') return alert('Lütfen bir şehir ismi giriniz!');
    setStatus({
      code: 'pending',
      text: 'Hava durumu bilgisi alınıyor...',
    });
    setCity(search);
  };
  const getLocation = () => {
    if (navigator.geolocation) {
      setStatus({
        code: 'pending',
        text: 'Hava durumu bilgisi alınıyor...',
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setCurrentPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          if (
            error.message === 'User has not allowed access to system location.'
          ) {
            setStatus({
              code: 'error',
              text: 'Sistem tarafından konum erişimine izin vermeniz gerekmektedir!',
            });
          } else if (error.message === 'User denied Geolocation') {
            setStatus({
              code: 'error',
              text: 'Konum erişimi iptal edildi!',
            });
          }
        }
      );
    } else {
      alert('Coğrafi konum bu tarayıcı tarafından desteklenmiyor.');
    }
  };
  return (
    <div className="locationForm">
      <h1>Hava Durumu Uygulaması</h1>
      <div className="container">
        {status.text && (
          <div className={`status ${status.code === 'error' ? 'error' : ''}`}>
            {status.text}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Şehir adı giriniz.. (örn: İstanbul)"
            onChange={(e) => setSearch(e.target.value)}
            required
            value={search}
          />
          <button type="submit">
            <FaSearchLocation />
          </button>
        </form>
        <div className="seperator"></div>
        <button
          className="getLocation"
          disabled={status.code === 'pending'}
          onClick={getLocation}
        >
          Cihaz Konumunu Al
        </button>
      </div>
    </div>
  );
}

export default Form;
