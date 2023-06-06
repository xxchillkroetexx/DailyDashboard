import { useState, useEffect } from 'react';

interface WeatherData {
  hourly: {
    temperature_2m: number[];
    relativehumidity_2m: number[];
    apparent_temperature: number[];
    rain: number[];
  };
}

const WeatherPanel = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }, (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        setCity('Mannheim');
        setLatitude(49.4875);
        setLongitude(8.4660);
      }
    });
  }, []);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    // Ersetzen Sie 'YOUR_OPENCAGE_API_KEY' durch Ihren tatsächlichen OpenCage API-Schlüssel
    const reverseGeocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d36c33c26c204456bef7770d58567a90`;

    fetch(reverseGeocodingUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.results[0].components.city;
        setCity(location);
      })
      .catch(error => console.error('Fehler:', error));
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude === null || longitude === null) {
      return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,rain`;

    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Fehler:', error));
  }, [latitude, longitude]);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  
    // Ersetzen Sie 'YOUR_OPENCAGE_API_KEY' durch Ihren tatsächlichen OpenCage API-Schlüssel
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${event.target.value}&key=d36c33c26c204456bef7770d58567a90`;
  
    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        const location = data.results[0].geometry;
        setLatitude(location.lat);
        setLongitude(location.lng);
      })
      .catch(error => console.error('Fehler:', error));
  };
  

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="text" value={city} onChange={handleCityChange} />
      <h2>Wettervorhersage für {city}</h2>
      <p>Temperatur: {weatherData.hourly.temperature_2m[0]}°C</p>
      <p>Relative Luftfeuchtigkeit: {weatherData.hourly.relativehumidity_2m[0]}%</p>
      <p>Gefühlte Temperatur: {weatherData.hourly.apparent_temperature[0]}°C</p>
      <p>Niederschlag: {weatherData.hourly.rain[0]} mm</p>
    </div>
  );
};

export default WeatherPanel;
