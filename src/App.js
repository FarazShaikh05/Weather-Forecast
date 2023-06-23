import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
      //  Time
      const [time, setTime] = useState(new Date());
    
      useEffect(() => {
        const timerID = setInterval(() => {
          setTime(new Date());
        }, 1000);
      
        return () => {
          clearInterval(timerID);
        };
      }, []);
    
      const formatTime = (date) => {
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
      
        // Convert to 12-hour format
        let period = h < 12 ? 'AM' : 'PM';
        h = h % 12 || 12;
      
        // Add leading zeros if necessary
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
      
        return h + ':' + m + ':' + s + ' ' + period;
      };
    
    // Date
    let x = new Date();
    let daysinweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let dayinnumber = x.getDay();
    let day = daysinweek[dayinnumber];
    let date = x.getDate();
    let month = x.toLocaleString('default',{month:'long'});
    let year = x.getFullYear();
   

      const apikey = "5e5e4d862f1539c5a3d0d0ef52c71a38";
       const [data , setData ] = useState({temp:'',
       weather:'',
       humidity:'',
        visibility:'',
        wind:'',
        name:'',
        country:''});


      // Weather Function
      const getWeatherDetails = (cityName) => {
        if(!cityName) return;
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey;
        axios.get(apiURL).then((res) => {
          console.log("respone",res.data)
          setData({temp:res.data.main.temp,
            humidity:res.data.main.humidity,
            visibility:res.data.visibility,
            wind:res.data.wind.speed,
            weather:res.data.weather[0],
            name:res.data.name,
            country:res.data.sys.country})
        }).catch((err) => {
          console.log("err",err)
        })
      }

      useEffect(() => {
        getWeatherDetails("Mumbai")
      },[])

      const [city , setCity] = useState("");

      const handleInput = (e) => {
        setCity(e.target.value)
      }

      const handleSearch = () => {
        getWeatherDetails(city);
      }
  return (
    <div >
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12' id='Container-div'  >
            <div id='weather-div' >
              <div className='row'>
                <div className='col-md-7' id="weather-div1" >
                  <h4 className='text-center '>Weather Forcast</h4>
                  <div className='d-grid col-6 mx-auto' >
                    <input className='form-control mt-3' value={city} onChange={handleInput} id='CityName' placeholder='Enter City'></input>
                  </div>
                  <div className='d-flex justify-content-center mb-5'>
                    <button type='button' onClick={handleSearch} className='btn btn-primary my-3 btn-sm '>Search</button>
                  </div>
                  <h3 className='text-center '>{data.name}</h3>
                  <h6 className='text-center ms-5 ps-4'>{data.country}</h6>

                  <div className='row mt-5 pt- '>
                    <div className='col-7  text-center'>
                    <h6>{formatTime(time)}</h6>
                      <h6>{day} {date} {month} {year}</h6>
                    </div>
                    <div className='col-5 text-center  '>
                      <h3 id='temp-font-size' >{((data.temp) - 273.15).toFixed(0)}<span>°C</span></h3>
                    </div>
                  </div>
                </div>
                <div className='col-md-5' id="weather-div2" >
                  {/* <h5 className='mt-4 text-center'>Weather Details</h5> */}
                  <img src='.\Image\weathericon.png' alt='icon' id='weather-icon' className='img-fluid d-grid mx-auto mt-5' ></img>
                  <h5 className='text-center mt-4 ' >{data.weather.main}</h5>

                  <div id='temp-details' className='mt-4'>
                    <div className='key-div ms-3'>
                    <h6 >Temperature</h6>
                    <hr></hr>
                    <h6 >Humidity</h6>
                    <hr></hr>
                    <h6>Visibility</h6>
                    <hr></hr>
                    <h6>Wind speed</h6>
                    </div>
                    <div id='value-div' className='text-end' >
                      <h6 >{((data.temp) - 273.15).toFixed(2)}°C</h6>
                      <hr></hr>
                      <h6 >{data.humidity} %</h6>
                      <hr></hr>
                      <h6>{data.visibility}(m)</h6>
                      <hr></hr>
                      <h6 >{data.wind}(m/s)</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
