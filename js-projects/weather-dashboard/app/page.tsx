"use client"

import type React from "react"

import { useState, useEffect } from "react"

export default function WeatherDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentState, setCurrentState] = useState("welcome") // welcome, loading, error, weather
  const [searchTerm, setSearchTerm] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  // Mock weather data for demo
  const mockWeatherData = {
    city: "Demo City",
    date: "Monday, Dec 25",
    temp: 22,
    condition: "Clear sky",
    feelsLike: 25,
    icon: "☀️",
    stats: {
      windSpeed: "12 km/h",
      humidity: "65%",
      visibility: "10 km",
      pressure: "1013 hPa",
    },
    forecast: [
      { day: "Today", icon: "☀️", high: 25, low: 18, condition: "Sunny" },
      { day: "Tue", icon: "⛅", high: 23, low: 16, condition: "Cloudy" },
      { day: "Wed", icon: "🌧️", high: 20, low: 14, condition: "Rain" },
      { day: "Thu", icon: "🌦️", high: 24, low: 17, condition: "Partly Cloudy" },
      { day: "Fri", icon: "☀️", high: 26, low: 19, condition: "Sunny" },
    ],
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme === "true") {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString())
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
    }
  }, [isDarkMode])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setCurrentState("loading")

    // Simulate API call
    setTimeout(() => {
      setWeatherData({
        ...mockWeatherData,
        city: searchTerm,
      })
      setCurrentState("weather")
    }, 1000)
  }

  const handleLocationClick = () => {
    setCurrentState("loading")
    setTimeout(() => {
      setWeatherData({
        ...mockWeatherData,
        city: "Your Location",
      })
      setCurrentState("weather")
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="weather-app">
      <style jsx global>{`
        :root {
          --bg-primary: #f8fafc;
          --bg-card: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --text-muted: #94a3b8;
          --border-color: #e2e8f0;
          --accent-color: #3b82f6;
          --accent-hover: #2563eb;
          --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        [data-theme="dark"] {
          --bg-primary: #0f172a;
          --bg-card: #1e293b;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --border-color: #334155;
          --shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        .weather-app {
          min-height: 100vh;
          background: var(--bg-primary);
          transition: all 0.3s ease;
        }

        .header {
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        .header-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .logo {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .search-container {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          padding-right: 3rem;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .search-btn {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .search-btn:hover {
          color: var(--accent-color);
          background: rgba(59, 130, 246, 0.1);
        }

        .theme-toggle {
          background: none;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 1.1rem;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .theme-toggle:hover {
          border-color: var(--accent-color);
          color: var(--accent-color);
        }

        .content {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .loading {
          text-align: center;
          padding: 4rem 1rem;
          color: var(--text-secondary);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--accent-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .welcome {
          text-align: center;
          padding: 4rem 1rem;
        }

        .welcome-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .welcome h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .welcome p {
          margin-bottom: 2rem;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
        }

        .location-btn {
          background: var(--accent-color);
          border: none;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }

        .location-btn:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .current-weather {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow);
        }

        .current-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .location-info h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .location-info p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .weather-icon {
          font-size: 3rem;
          opacity: 0.9;
        }

        .temperature-section {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .current-temp {
          font-size: 3.5rem;
          font-weight: 300;
          color: var(--text-primary);
          line-height: 1;
        }

        .temp-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .temp-details p {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .weather-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .stat-icon {
          font-size: 1.5rem;
          opacity: 0.8;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.125rem;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .forecast {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: var(--shadow);
        }

        .forecast-title {
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .forecast-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
        }

        .forecast-item {
          text-align: center;
          padding: 1rem 0.75rem;
          border-radius: 10px;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .forecast-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }

        .forecast-day {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-size: 0.85rem;
        }

        .forecast-icon {
          font-size: 1.75rem;
          margin: 0.5rem 0;
        }

        .forecast-temps {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }

        .forecast-high {
          font-weight: 600;
          color: var(--text-primary);
        }

        .forecast-low {
          color: var(--text-secondary);
        }

        .forecast-condition {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        @media (max-width: 640px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .search-container {
            max-width: none;
            width: 100%;
          }

          .content {
            padding: 1.5rem 1rem;
          }

          .current-weather {
            padding: 1.5rem;
          }

          .current-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }

          .temperature-section {
            justify-content: center;
            text-align: center;
          }

          .current-temp {
            font-size: 3rem;
          }

          .weather-stats {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          }

          .stat-card {
            padding: 1rem;
          }

          .forecast-container {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }
        }

        .weather-content {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <header className="header">
        <div className="header-content">
          <h1 className="logo">🌤️ Weather</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search city..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)} title="Toggle theme">
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className="content">
        {currentState === "welcome" && (
          <div className="welcome">
            <div className="welcome-icon">🌍</div>
            <h2>Weather Dashboard</h2>
            <p>Search for any city to get current weather conditions and forecast</p>
            <button className="location-btn" onClick={handleLocationClick}>
              📍 Use My Location
            </button>
          </div>
        )}

        {currentState === "loading" && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {currentState === "weather" && weatherData && (
          <div className="weather-content">
            <section className="current-weather">
              <div className="current-header">
                <div className="location-info">
                  <h2>{weatherData.city}</h2>
                  <p>{weatherData.date}</p>
                </div>
                <div className="weather-icon">
                  <span>{weatherData.icon}</span>
                </div>
              </div>

              <div className="temperature-section">
                <span className="current-temp">{weatherData.temp}°</span>
                <div className="temp-details">
                  <p>{weatherData.condition}</p>
                  <p>Feels like {weatherData.feelsLike}°</p>
                </div>
              </div>
            </section>

            <section className="weather-stats">
              <div className="stat-card">
                <div className="stat-icon">💨</div>
                <div className="stat-info">
                  <span className="stat-label">Wind</span>
                  <span className="stat-value">{weatherData.stats.windSpeed}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💧</div>
                <div className="stat-info">
                  <span className="stat-label">Humidity</span>
                  <span className="stat-value">{weatherData.stats.humidity}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👁️</div>
                <div className="stat-info">
                  <span className="stat-label">Visibility</span>
                  <span className="stat-value">{weatherData.stats.visibility}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌡️</div>
                <div className="stat-info">
                  <span className="stat-label">Pressure</span>
                  <span className="stat-value">{weatherData.stats.pressure}</span>
                </div>
              </div>
            </section>

            <section className="forecast">
              <h3 className="forecast-title">5-Day Forecast</h3>
              <div className="forecast-container">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <div className="forecast-day">{day.day}</div>
                    <div className="forecast-icon">{day.icon}</div>
                    <div className="forecast-temps">
                      <span className="forecast-high">{day.high}°</span>
                      <span className="forecast-low">{day.low}°</span>
                    </div>
                    <div className="forecast-condition">{day.condition}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
