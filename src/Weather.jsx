import dayCloud from "./assets/day_cloud.png" ;
import cloud from "./assets/cloud.png" ;
import drizzle from "./assets/drizzle.png" ;
import humidityImg from "./assets/humidity.png" ;
import rain from "./assets/rain.png" ;
import windImg from "./assets/wind.png" ;
import snow from "./assets/snow.png" ;
import searchImg from "./assets/search.png" ;
import { useState } from "react";


const WeatherDetails = ({icon, temp, city, country, lat, long, humidity, wind}) =>{
    return(
        <>
        <div className="image">
            <img src={dayCloud} alt="" />
        </div>
        <div className="temp">{temp} °C</div>
        <div className="city">{city} </div>
        <div className="country">{country} </div>
        <div className="coordinates">
            <div>
            <span className="lat">Latitude  </span>
            <span>{lat}</span>
            </div>
            <div>
            <span className="long">Longitude  </span>
            <span>{long}</span>
            </div>
        </div>
        <div className="data-container">
            {/* humidty percentage */}
            <div className="element">
                <img src={dayCloud} alt="" />
                <div className="humidity-percentage"></div>
                <div className="text">{humidity}°</div>
                <div className="humidity-text">Humidity Speed</div>
            </div>
            
            {/* wind percentage */}
            <div className="element">
                <img src={windImg} alt="" />
                <div className="wind-percentage"></div>
                <div className="text">{wind} kmph</div>
                <div className="wind-text">Wind Speed</div>
            </div>

        </div>
        </>
    );
}


function Weather(){
    const [icon, setIcon] = useState(snow);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("Chennai");
    const [country, setCountry] = useState("India");
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const [text, setText] = useState("chennai");

    const [cityNotFound, setCityNotFound]  = useState(false);
    const [loading, setLoading]  = useState(false);

    const search = async () =>{
        setLoading(true);
        let apiKey = "6973ebbfaff56f2c88b5ba89fbdd6a93";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
        try{
            let res = await fetch(url);
            let data = await res.json()//it returns data like code,city...
            if(data.cod == "404"){
                console.log("City Not found");
                setCityNotFound(true);//If the data not found it will set the use state to true
                setLoading(false);
                return;//it will exit

            }
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setLat(data.coord.lat)
            setLong(data.coord.lon)
            setCountry(data.sys.country)
            // console.log(data);

        }
        catch(error){
            console.log("Error while fetching data ", error.message);

        }
        finally{
            setLoading(false);
        }
    };

    const handleCity = (event) => {
        setText(event.target.value)
    }
    const handleKeyDown = (e) =>{
        if(e.key == 'Enter'){
            search();
        }
    }
    return(
        <>
        <div className="container">
            <div className="input-container">
                <input type="text" className="input-city" placeholder="Search city" onChange={handleCity} value={text} onKeyDown={handleKeyDown}/>
                <div className="search-icon" onClick={() => search()}>
                    <img src={searchImg} alt="" />
                </div>
                
            </div>
            {/* seperate component which will display affter Input search */}
            <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long= {long} humidity={humidity} wind={wind}/>
            <h1>Weather</h1>
            
        </div>

        </>
    );
}

export default Weather;