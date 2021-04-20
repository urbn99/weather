import React, {useState, useRef} from 'react'
import data from '../data/data.js'

const WeatherActual = () => {

    
    const inputEl = useRef(null);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [temp, setTemp] = useState('');
    const [feels, setFeels] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherDetails, setWeatherDetails] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [wind, setWind] = useState('');
    const [humidity, setHumidity] = useState('')
    

    //default settings
    if(city === ''){

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=warsaw&appid=60a20a7a257275ca2f37980349e6f2c9`)
            //success
            .then(res => {
                if (res.ok) {
                    return res
                }
                throw Error('coś jest nie tak');

            })
            .then(res => res.json())
            .then(data => {

                setCity(data.name)
                setCountry(data.sys.country)
                setTemp(data.main.temp)
                setFeels(data.main.feels_like)
                setWeather(data.weather[0].main)
                setWeatherDetails(data.weather[0].description)
                setWeatherIcon(data.weather[0].icon)
                setWind(data.wind.speed)
                setHumidity(data.main.humidity)
                
            })

            //error
            .catch(err => {
                console.log('error')
            })
        
        
    }
    
    
    const handleInputChange = () => {
        
        const result = inputEl.current.value;
        console.log(result);

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=60a20a7a257275ca2f37980349e6f2c9`)
            //success
            .then(res => {
                if (res.ok) {
                    return res
                }
                throw Error('coś jest nie tak');
                
            })
            .then(res => res.json())
            .then(data => 
                {
                    setCity(data.name)
                    setCountry(data.sys.country)
                    setTemp(data.main.temp)
                    setFeels(data.main.feels_like)
                    setWeather(data.weather[0].main)
                    setWeatherDetails(data.weather[0].description)
                    setWeatherIcon(data.weather[0].icon)
                    setWind(data.wind.speed)
                    setHumidity(data.main.humidity)

                })

            //error
            .catch(err => {
                console.log('error')
            });
    
        
    }

    
    function weatherStatus() {
        
        switch (weatherIcon) {
            case "01d":
                return <img src={data[0].img1} alt="" />

            case "01n":
                 return <img src={data[1].img2} alt=""/>

            case "02d":
                 return <img src={data[2].img3} alt=""/>

            case "02n":
                 return <img src={data[3].img4} alt=""/>

            case "03d":
                 return <img src={data[4].img5} alt=""/>

            case "03n":
                 return <img src={data[4].img5} alt=""/>

            case "04d":
                return <img src={data[5].img6} alt=""/>

            case "04n":
                return <img src={data[5].img6} alt=""/>

            case "09d":
                 return <img src={data[6].img7} alt=""/>

            case "09n":
                 return <img src={data[6].img7} alt=""/>

            case "10d":
                return <img src={data[7].img8} alt="" />

            case "10n":
                return <img src={data[8].img9} alt="" />

            case "11d":
                return <img src={data[9].img10} alt="" />

            case "11n":
                return <img src={data[9].img10} alt="" />

            case "13d":
                return <img src={data[10].img11} alt="" />

            case "13n":
                return <img src={data[10].img11} alt="" />

            case "50d" :
                return <img src={data[11].img12} alt="" />

            case "50n" :
                return <img src={data[11].img12} alt="" />
            
            default:
                return 'error'
        }
    }
    
    
    return (
        <div className={`container`}>
            
            <input 
                className='input-search'
                type="text"
                onChange={handleInputChange}
                ref={inputEl}
                placeholder='Change location...'
                
            />

            <div className='main-info'>
                <h3>{city}, {country} </h3>
                <h3>{Math.floor(temp - 273.15)}°C</h3>
            </div>

            <div className='weather-status'>
                {weatherStatus()}
            </div>

            <p className='weather-item'>{weather} - {weatherDetails}</p>
            <p className='weather-item'>Feels Like:  {Math.floor(feels - 273.15)}°C</p>
            <p className='weather-item'>Wind:  {Math.floor( wind * 3.6)} Km/h</p>
            <p className='weather-item'>Humidity:  {humidity} %</p>

        </div>
    )
}

export default WeatherActual
