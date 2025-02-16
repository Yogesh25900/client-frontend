import React, { useState, useEffect } from 'react';
import { Sun, Cloud, Wind, RefreshCw, MapPin,Eye } from 'lucide-react'; // Import specific icons
import './WeatherCard.css';
import { useLocation } from '../utils/useLocation'; // Import the custom hook for location
import { getWeather } from '../api/AuthService'; // Import the API call function

const WeatherSearchCard = () => {
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [resetLocation, setResetLocation] = useState(false); // Manage location reset state
  const [weatherData, setWeatherData] = useState(null); // Store weather data
  const [loading, setLoading] = useState(false); // Loading state for weather data

  // Use custom hook for location and pass the reset flag to it
  const { location, error, isLoading } = useLocation(resetLocation);

  useEffect(() => {
    // Ensure location is available and contains the necessary properties before fetching weather data
    if (location && location.latitude && location.longitude) {
      const fetchWeather = async () => {
        setLoading(true);
        try {
          const data = await getWeather(location.latitude, location.longitude);
          setWeatherData(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
        setLoading(false);
      };

      fetchWeather();
    }
  }, [location]); // Fetch weather data when location changes

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSyncClick = () => {
    setIsSyncing(true);
    setResetLocation(true); // Trigger location reset when sync button is clicked

    // Simulate fetching weather data or updating the weather
    setTimeout(() => {
      setIsSyncing(false); // Stop syncing after 2 seconds (simulated fetch)
      setResetLocation(false); // Stop resetting location after it starts fetching again
    }, 2000);
  };

  // If location or weather data is loading, show loading state
  if (isLoading || loading) {
    return <div>Loading weather data...</div>;
  }

  // If there is an error with location, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If weatherData is not available, show unavailable message
  if (!weatherData) {
    return <div>Weather data unavailable</div>;
  }

  return (
    <div className="weather-card">
                    <h3>Weather Information</h3>

      <div className={`sync-icon ${isSyncing ? 'syncing' : ''}`}
        onClick={handleSyncClick}>

        <RefreshCw size={24} />
      </div>
      <div className="weather-condition">
            <img src={weatherData.current.condition.icon} alt="Weather Icon" />
            <h4>{weatherData.current.condition.text}</h4>
          </div>
      {/* Display location information */}
      <div className="location-info">
      <MapPin size={18} className="pin-icon" color="#CCCCCC" />
      <span>
        {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
      </span>
    
      <div className="coordinates">
        <span>Lat: {location.latitude}</span> | <span>Lon: {location.longitude}</span>
      </div>
    </div>
    
      

      {/* Display weather data if available */}
      {weatherData && weatherData.current ? (
        <div className="weather-info">
         

          <div className="weather-stats">
            <div className="stat-item">
              <span className="stat-label">Temperature:</span>
              <span>{weatherData.current.temp_c}°C | {weatherData.current.temp_f}°F</span>
              <Sun size={16} />
            </div>

            <div className="stat-item">
              <span className="stat-label">Wind Speed:</span>
              <span>{weatherData.current.wind_mph} mph</span>
              <Wind size={16} />
            </div>

            <div className="stat-item">
              <span className="stat-label">Humidity:</span>
              <span>{weatherData.current.humidity}%</span>
              <Cloud size={16} />
            </div>

            <div className="stat-item">
              <span className="stat-label">Visibility:</span>
              <span>{weatherData.current.vis_km} km</span>
              <Eye size={16} />
            </div>
          </div>
        </div>
      ) : (
        <p>Weather data unavailable</p>
      )}

      {/* Sync Icon in the top-right corner */}
    
    </div>
  );
};

export default WeatherSearchCard;
