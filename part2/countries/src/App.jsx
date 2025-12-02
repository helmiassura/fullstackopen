import { useState, useEffect } from 'react';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry && selectedCountry.capital && selectedCountry.capital[0]) {
      const capital = selectedCountry.capital[0];
      const api_key = import.meta.env.VITE_WEATHER_API_KEY || 'fb98b08b2ff4fe03c8d3f7c30eac31c2';
      
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => response.json())
        .then(data => {
          if (data.main && data.wind && data.weather) {
            setWeather({
              temperature: data.main.temp,
              wind: data.wind.speed,
              icon: data.weather[0].icon
            });
          }
        })
        .catch(error => {
          console.error('Error fetching weather:', error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);

  const filteredCountries = search
    ? countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null);
    setWeather(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  const renderCountries = () => {
    if (!search) {
      return null;
    }

    const matchCount = filteredCountries.length;

    if (matchCount > 10) {
      return <div>Too many matches, specify another filter</div>;
    }

    if (matchCount === 1) {
      const country = filteredCountries[0];
      return <CountryDetails country={country} weather={weather} />;
    }

    if (matchCount > 1) {
      return (
        <div>
          {filteredCountries.map(country => (
            <div key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>
                show
              </button>
            </div>
          ))}
        </div>
      );
    }

    return <div>No matches found</div>;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} weather={weather} />
      ) : (
        renderCountries()
      )}
    </div>
  );
};

const CountryDetails = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      
      <div>Capital {country.capital ? country.capital[0] : 'N/A'}</div>
      <div>Area {country.area}</div>
      
      <h2>Languages</h2>
      <ul>
        {country.languages ? (
          Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))
        ) : (
          <li>No language data</li>
        )}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`}
        style={{ width: '200px', border: '1px solid #ccc' }}
      />

      {/* Weather information */}
      {weather && country.capital && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <div>Temperature {weather.temperature} Celsius</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="Weather icon"
          />
          <div>Wind {weather.wind} m/s</div>
        </div>
      )}
    </div>
  );
};

export default App;