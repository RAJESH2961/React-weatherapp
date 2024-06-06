import dayCloud from "./assets/day_cloud.png";
import clearIcon from "./assets/cloud.png";
import drizzle from "./assets/drizzle.png";
import humidityImg from "./assets/humidity.png";
import rain from "./assets/rain.png";
import windImg from "./assets/wind.png";
import snow from "./assets/snow.png";
import searchImg from "./assets/search.png";
import { useEffect, useState } from "react";

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind, error, loading, cityNotFound }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="" />
            </div>
            <div className="temp">{temp} °C</div>
            <div className="city">{city} </div>
            <div className="country">{country} </div>
            <div className="coordinates">
                <div>
                    <span className="lat">Latitude </span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="long">Longitude </span>
                    <span>{long}</span>
                </div>
            </div>
            <div className="data-container">
                {/* humidity percentage */}
                <div className="element">
                    <img src={humidityImg} alt="" />
                    <div className="humidity-percentage"></div>
                    <div className="text">{humidity}%</div>
                    <div className="humidity-text">Humidity</div>
                </div>

                {/* wind percentage */}
                <div className="element">
                    <img src={windImg} alt="" />
                    <div className="wind-percentage"></div>
                    <div className="text">{wind} kmph</div>
                    <div className="wind-text">Wind Speed</div>
                </div>
            </div>
            <div className="message-container">
                {loading && <div className="loading-message">Loading...</div>}
                {error && <div className="error">{error}</div>}
                {cityNotFound && <div className="city-not-found">City Not Found</div>}
                </div>
        </>
    );
}

function Weather() {
    const [icon, setIcon] = useState();
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const [text, setText] = useState("Delhi");

    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    //Handling error message in the div when user entered wrong city name
    const [error, setError] = useState(null);

    const weatherIconMap = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": dayCloud,
        "02n": dayCloud,
        "03d": drizzle,
        "03n": drizzle,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };

    const search = async () => {
        setLoading(true);
        let apiKey = "6973ebbfaff56f2c88b5ba89fbdd6a93";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
        try {
            let res = await fetch(url);
            let data = await res.json();
            if (data.cod == "404") {
                console.log("City Not found");
                setCityNotFound(true);
                setLoading(false);
                return;
            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp));
            setCity(data.name);
            setLat(data.coord.lat);
            setLong(data.coord.lon);
            setCountry(data.sys.country);
            const weatherCodeIcon = data.weather[0].icon;
            setIcon(weatherIconMap[weatherCodeIcon] || clearIcon);
            setCityNotFound(false);
            setError(null); // Reset error
        } catch (error) {
            console.log("Error while fetching data ", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCity = (event) => {
        setText(event.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    }

    //It will load the default values when visited website.
    useEffect(() => {
        search();
    }, []);

    return (
        <>
            <div className="container">
                <div className="input-container">
                    <input type="text" className="input-city" placeholder="Search city" onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
                    <div className="search-icon" onClick={() => search()}>
                        <img src={searchImg} alt="" />
                    </div>
                </div>
                {/* separate component which will display after Input search */}
                <WeatherDetails 
                    icon={icon} 
                    temp={temp} 
                    city={city} 
                    country={country} 
                    lat={lat} 
                    long={long} 
                    humidity={humidity} 
                    wind={wind} 
                    error={error} 
                    loading={loading} 
                    cityNotFound={cityNotFound} 
                />
            </div>
        </>
    );
}

export default Weather;
