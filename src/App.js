import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
// import MyLocation from './components/Mylocation';
import Data from "./components/Data";
import Loader from "./components/Loader";
import axios from "axios";
import Notfound from "./components/Notfound";
import backgroundImage from "./assests/background.png"
import night from "./assests/night.png"

const App = () => {
  const [search, setSearch] = useState("Ahmedabad");
  const [datas, setDatas] = useState();
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //key expire after 24-03-2024
  const API_KEY="fad9a4c56c6f497882d23530241003";

  useEffect(() => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setLoading(true);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          let locationName;
          try {

            const address = response.data.address;
            locationName = address.village || address.city || address.city || address.hamlet;
            setSearch(locationName);
          } catch (err) {
            setError(true);
          } finally {
            handleSubmit();
          }
        });
      } else if (result.state === 'prompt') {
        // The user will be prompted, you might not want to automatically start geolocation in this case
      } else if (result.state === 'denied') {
        // The user has denied geolocation
        setError(true);
      }
    }).catch((err) => {
      console.error(err);
      // Handle errors or browsers that do not support navigator.permissions (e.g., Safari)
    });

    const time = new Date();
    const hour = time.getHours();

    if (hour > 18 || hour < 5) {
      const body = document.getElementById("body");
      body.style.backgroundImage = `url(${night})`;
      body.style.backgroundSize = 'cover';
    } else {
      const body = document.getElementById("body");
      body.style.backgroundImage = `url(${backgroundImage})`;
      body.style.backgroundSize = 'cover';
    }
  }, []);

  const handleSubmit = async (e = 1) => {
    if (e !== 1) e.preventDefault();
    if (search == "") {
      alert('done');
    } else {
      setLoading(true);

      const options = {
        method: 'GET',
        url: `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&aqi=no&q=${search}`,
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setLoading(false);
        setError(false);
        if (response.status == 404) {
          setDatas(response);
        }
        else if (response.status == 200) {
          // alert("Found");
          setDatas(response);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <>
      <div id="body">
        
        <div className="back">
          <div className="formcontrol">
            <SearchBar
              search={search}
              setSearch={setSearch}
              handleSubmit={handleSubmit}
            />
          </div>
          {/* <MyLocation city={city}/> */}
          {loading ? (
            <Loader />
          ) : (
            datas && !error && <Data datas={datas} />
          )}
          {error && <Notfound />}
        </div>
      </div>
    </>
  );
};

export default App;
