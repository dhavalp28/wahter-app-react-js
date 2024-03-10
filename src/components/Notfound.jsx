import React from "react";
import warning from "../assests/warning.png"

const Notfound = () => {
  return (
    <>
      <div

      >
        <img src={warning} alt="warning" height="70" />
        <h2>Entered city's weather data not available</h2>
      </div>
    </>
  );
};

export default Notfound;
