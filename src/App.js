import React, { useState } from "react";
//Importing Axios to easily use API
import axios from "axios";

function App() {
  const api = {
    url: "https://api.openweathermap.org/data/2.5/weather/?q=",
    key: "46e33ef1fc69cc04a849d09a36246b78",
  };
  //Dynamic storage of Data from API
  const [data, setData] = useState({});
  //Dynamic storage for Location to be searched
  const [location, setLocation] = useState("");
  //API LINK
  const apiLink = `${api.url}${location}&units=metric&appid=${api.key}`;
  //Function to get data from API on execution of an event
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(apiLink).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p>
                {data.weather[0].main.charAt(0).toUpperCase() +
                  data.weather[0].main.slice(1)}
              </p>
            ) : null}
          </div>
        </div>
        {/*Data in body would not display until a sucsessful response is gotten from the API */}
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
