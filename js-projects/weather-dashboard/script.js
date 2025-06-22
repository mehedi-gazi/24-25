class WeatherDashboard {
  constructor() {
    // OpenWeatherMap API key - You'll need to get your own free API key
    this.API_KEY = "https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&start_date=2025-06-06&end_date=2025-06-20&hourly=temperature_2m" // Replace with your actual API key
    this.BASE_URL = "https://api.openweathermap.org/data/2.5"

    // For demo purposes, we'll use mock data when API key is not available
    this.USE_MOCK_DATA = this.API_KEY === "YOUR_API_KEY_HERE"

    this.currentCity = ""
    this.isDarkMode = localStorage.getItem("darkMode") === "true"

    this.elements = {
      searchInput: document.getElementById("search-input"),
      searchBtn: document.getElementById("search-btn"),
      themeToggle: document.getElementById("theme-toggle"),
      locationBtn: document.getElementById("location-btn"),
      retryBtn: document.getElementById("retry-btn"),

      loading: document.getElementById("loading"),
      error: document.getElementById("error"),
      errorMessage: document.getElementById("error-message"),
      welcome: document.getElementById("welcome"),
      weatherContent: document.getElementById("weather-content"),

      currentCity: document.getElementById("current-city"),
      currentDate: document.getElementById("current-date"),
      currentTemp: document.getElementById("current-temp"),
      currentCondition: document.getElementById("current-condition"),
      feelsLike: document.getElementById("feels-like"),
      currentIcon: document.getElementById("current-icon"),

      windSpeed: document.getElementById("wind-speed"),
      humidity: document.getElementById("humidity"),
      visibility: document.getElementById("visibility"),
      pressure: document.getElementById("pressure"),

      forecastContainer: document.getElementById("forecast-container"),
    }

    this.init()
  }

  init() {
    this.setupTheme()
    this.bindEvents()
    this.showWelcome()

    // Show demo data if no API key
    if (this.USE_MOCK_DATA) {
      setTimeout(() => {
        this.loadMockData()
      }, 1000)
    }
  }

  bindEvents() {
    // Search functionality
    this.elements.searchBtn.addEventListener("click", () => this.handleSearch())
    this.elements.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch()
    })

    // Theme toggle
    this.elements.themeToggle.addEventListener("click", () => this.toggleTheme())

    // Location button
    this.elements.locationBtn.addEventListener("click", () => this.getCurrentLocation())

    // Retry button
    this.elements.retryBtn.addEventListener("click", () => this.retryLastSearch())

    // Auto-complete on input
    this.elements.searchInput.addEventListener("input", () => {
      // Could implement autocomplete here
    })
  }

  setupTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark")
      this.elements.themeToggle.textContent = "☀️"
    } else {
      document.documentElement.removeAttribute("data-theme")
      this.elements.themeToggle.textContent = "🌙"
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    localStorage.setItem("darkMode", this.isDarkMode)
    this.setupTheme()
  }

  showState(state) {
    // Hide all states
    this.elements.loading.classList.add("hidden")
    this.elements.error.classList.add("hidden")
    this.elements.welcome.classList.add("hidden")
    this.elements.weatherContent.classList.add("hidden")

    // Show requested state
    this.elements[state].classList.remove("hidden")
  }

  showWelcome() {
    this.showState("welcome")
  }

  showLoading() {
    this.showState("loading")
  }

  showError(message) {
    this.elements.errorMessage.textContent = message
    this.showState("error")
  }

  showWeather() {
    this.showState("weatherContent")
  }

  async handleSearch() {
    const city = this.elements.searchInput.value.trim()
    if (!city) return

    this.currentCity = city
    this.showLoading()

    try {
      if (this.USE_MOCK_DATA) {
        await this.loadMockData(city)
      } else {
        await this.fetchWeatherData(city)
      }
    } catch (error) {
      this.showError(`Unable to find weather data for "${city}". Please check the city name and try again.`)
    }
  }

  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.showError("Geolocation is not supported by this browser.")
      return
    }

    this.showLoading()

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          if (this.USE_MOCK_DATA) {
            await this.loadMockData("Your Location")
          } else {
            await this.fetchWeatherByCoords(latitude, longitude)
          }
        } catch (error) {
          this.showError("Unable to fetch weather for your location.")
        }
      },
      () => {
        this.showError("Unable to retrieve your location. Please search for a city instead.")
      },
    )
  }

  async fetchWeatherData(city) {
    const currentWeatherUrl = `${this.BASE_URL}/weather?q=${city}&appid=${this.API_KEY}&units=metric`
    const forecastUrl = `${this.BASE_URL}/forecast?q=${city}&appid=${this.API_KEY}&units=metric`

    const [currentResponse, forecastResponse] = await Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)])

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data not found")
    }

    const currentData = await currentResponse.json()
    const forecastData = await forecastResponse.json()

    this.updateWeatherDisplay(currentData, forecastData)
    this.showWeather()
  }

  async fetchWeatherByCoords(lat, lon) {
    const currentWeatherUrl = `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
    const forecastUrl = `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`

    const [currentResponse, forecastResponse] = await Promise.all([fetch(currentWeatherUrl), fetch(forecastUrl)])

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data not found")
    }

    const currentData = await currentResponse.json()
    const forecastData = await forecastResponse.json()

    this.updateWeatherDisplay(currentData, forecastData)
    this.showWeather()
  }

  async loadMockData(city = "Demo City") {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockCurrentData = {
      name: city,
      main: {
        temp: 22,
        feels_like: 25,
        humidity: 65,
        pressure: 1013,
      },
      weather: [
        {
          main: "Clear",
          description: "Clear sky",
          icon: "01d",
        },
      ],
      wind: {
        speed: 3.5,
      },
      visibility: 10000,
    }

    const mockForecastData = {
      list: [
        {
          dt: Date.now() / 1000 + 86400,
          main: { temp_max: 25, temp_min: 18 },
          weather: [{ main: "Sunny", icon: "01d" }],
        },
        {
          dt: Date.now() / 1000 + 172800,
          main: { temp_max: 23, temp_min: 16 },
          weather: [{ main: "Cloudy", icon: "03d" }],
        },
        {
          dt: Date.now() / 1000 + 259200,
          main: { temp_max: 20, temp_min: 14 },
          weather: [{ main: "Rain", icon: "10d" }],
        },
        {
          dt: Date.now() / 1000 + 345600,
          main: { temp_max: 24, temp_min: 17 },
          weather: [{ main: "Partly Cloudy", icon: "02d" }],
        },
        {
          dt: Date.now() / 1000 + 432000,
          main: { temp_max: 26, temp_min: 19 },
          weather: [{ main: "Sunny", icon: "01d" }],
        },
      ],
    }

    this.updateWeatherDisplay(mockCurrentData, mockForecastData)
    this.showWeather()
  }

  updateWeatherDisplay(currentData, forecastData) {
    // Update current weather
    this.elements.currentCity.textContent = currentData.name
    this.elements.currentDate.textContent = this.formatDate(new Date())
    this.elements.currentTemp.textContent = `${Math.round(currentData.main.temp)}°`
    this.elements.currentCondition.textContent = currentData.weather[0].description
    this.elements.feelsLike.textContent = `Feels like ${Math.round(currentData.main.feels_like)}°`
    this.elements.currentIcon.textContent = this.getWeatherIcon(currentData.weather[0].icon)

    // Update stats
    this.elements.windSpeed.textContent = `${Math.round(currentData.wind.speed * 3.6)} km/h`
    this.elements.humidity.textContent = `${currentData.main.humidity}%`
    this.elements.visibility.textContent = `${Math.round(currentData.visibility / 1000)} km`
    this.elements.pressure.textContent = `${currentData.main.pressure} hPa`

    // Update forecast
    this.updateForecast(forecastData)
  }

  updateForecast(forecastData) {
    this.elements.forecastContainer.innerHTML = ""

    // Get daily forecasts (every 8th item for daily data)
    const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 5)

    dailyForecasts.forEach((forecast, index) => {
      const forecastItem = document.createElement("div")
      forecastItem.className = "forecast-item"

      const date = new Date(forecast.dt * 1000)
      const dayName = index === 0 ? "Today" : this.getDayName(date)

      forecastItem.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <div class="forecast-icon">${this.getWeatherIcon(forecast.weather[0].icon)}</div>
        <div class="forecast-temps">
          <span class="forecast-high">${Math.round(forecast.main.temp_max)}°</span>
          <span class="forecast-low">${Math.round(forecast.main.temp_min)}°</span>
        </div>
        <div class="forecast-condition">${forecast.weather[0].main}</div>
      `

      this.elements.forecastContainer.appendChild(forecastItem)
    })
  }

  getWeatherIcon(iconCode) {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    }
    return iconMap[iconCode] || "🌤️"
  }

  formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  getDayName(date) {
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  retryLastSearch() {
    if (this.currentCity) {
      this.handleSearch()
    } else {
      this.showWelcome()
    }
  }
}

// Initialize the Weather Dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.weatherDashboard = new WeatherDashboard()
})

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = WeatherDashboard
}
