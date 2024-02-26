import Widget from "@/components/custom/Widget";
import { WeatherIcon as Icon } from "@/icons/icons";
import { fetchWeatherApi } from "openmeteo";
import { h, Component } from "preact";

const DEFAULT_LATITUDE = 22.836989;
const DEFAULT_LONGITUDE = 89.533239;

interface WeatherData {
  temperature: number | null;
  weatherDescription: string | null;
  weatherCode: number | null;
  lastUpdate: number | null;
}

interface WidgetProps {
  enabled: boolean;
}

export default class WeatherWidget extends Component<WidgetProps> {
  state: WeatherData = {
    temperature: null,
    weatherDescription: null,
    weatherCode: null,
    lastUpdate: null,
  };

  async componentDidMount(): Promise<void> {
    const { enabled } = this.props;
    if (!enabled) return;
    this.getLocation();
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getWeatherData,
        this.handleLocationError,
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  getWeatherData = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    await this.fetchWeather(latitude, longitude);
  };

  fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const params = {
        latitude: [latitude],
        longitude: [longitude],
        current:
          "temperature_2m,weather_code,wind_speed_10m,wind_direction_10m",
        hourly: "temperature_2m,precipitation",
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const current = response.current();

      const temperature = current?.variables(0)?.value() ?? null;
      const weatherCode = current?.variables(1)?.value() ?? null;

      let weatherDescription = "Real-time Weather";
      if (temperature !== null) {
        if (temperature < 5) weatherDescription = "Cold";
        else if (temperature < 15) weatherDescription = "Cool";
        else if (temperature < 25) weatherDescription = "Moderate";
        else weatherDescription = "Warm";
      }

      const weatherData: WeatherData = {
        temperature,
        weatherDescription,
        weatherCode,
        lastUpdate: Date.now(),
      };

      localStorage.setItem("weatherData", JSON.stringify(weatherData));
      this.setState(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.setState({
        temperature: null,
        weatherDescription:
          "Failed to fetch weather data. Please check your internet connection.",
        weatherCode: null,
        lastUpdate: null,
      });
    }
  };

  handleLocationError = (error: GeolocationPositionError) => {
    console.error("An error occurred while getting user location:", error);
    this.fetchWeather(DEFAULT_LATITUDE, DEFAULT_LONGITUDE);
  };

  render(): h.JSX.Element | null {
    const { temperature, weatherDescription } = this.state;
    const { enabled } = this.props;

    if (!enabled) return null;

    return (
      <Widget title="Current Weather" icon={<Icon />}>
        <div className="text-4xl font-bold">
          {temperature !== null ? `${temperature.toFixed(1)}°C` : "N/A"}
        </div>
        <p className="pt-2 text-[15px] text-muted-foreground">
          {weatherDescription !== null ? `Feels ${weatherDescription}` : "N/A"}
        </p>
      </Widget>
    );
  }
}
