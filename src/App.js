import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setWdetails] = useState();
  const [isLoad, setIsLoad] = useState(false);

  const getData = async(event) => {
    setIsLoad(true);
    event.preventDefault();
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`;
    
    try{
      let data= await fetch(url);

      if(data.status===404)
      {
        alert("City not found ,Please enter a valid city");
        console.log("City not found");
        setWdetails(undefined);
        setIsLoad(false)
        return;
      }
      if (!data.ok) {
        throw new Error("Network response was not ok");
      }
    let parsedData=await data.json();
    setWdetails(parsedData);
    setIsLoad(false);
    }
     catch (error) {
     console.error("Error fetching weather data:", error);
     alert("An error occurred while fetching the weather data. Please try again later.");
  }
    setCity("");
   
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-300 via-blue-200 to-teal-200 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-8">
          <span className="text-indigo-600">Weather</span> Forecast
          <span className="block text-xl font-medium text-gray-600">
            Get Your Local Weather Insights
          </span>
        </h1>

        <form onSubmit={getData} className="flex flex-col items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-80 h-12 px-4 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 transition-transform transform hover:scale-105"
            placeholder="Enter City Name"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
          >
            Search
          </button>
        </form>

        <div className="w-80 mx-auto mt-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 relative">
          {isLoad && (
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
              alt="Loading"
              width={80}
              className="absolute inset-x-1/2 transform -translate-x-1/2 top-4"
            />
          )}
          {wDetails !== undefined ? (
            <>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {wDetails.name}{" "}
                <span className="bg-yellow-300 text-gray-800 p-1 rounded">
                  {wDetails.sys.country}
                </span>
              </h3>
              <h2 className="text-6xl font-bold text-gray-800 mb-2">
                {wDetails.main.temp}°C
              </h2>
              <img
                src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
                alt={wDetails.weather[0].description}
                className="mx-auto mb-2"
              />
              <p className="text-gray-600 text-xl">
                {wDetails.weather[0].description}
              </p>
            </>
          ) : (
            <p className="text-gray-600 text-xl">No Data Available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
