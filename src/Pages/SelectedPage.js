import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import the Link and useNavigate

const SelectChart = ({}) => {
  const selectedDevice = useSelector((state) => state.selectedDevice);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleTemperatureClick = () => {
    if (selectedDevice) {
      //   setShowTemperature(true); // Set the state to show the TemperatureChart
      navigate("/temperature"); // Change the route path to /temperature
    }
  };
  const handleHumidityClick = () => {
    if (selectedDevice) {
      //   setShowHumidity(true); // Set the state to show the TemperatureChart
      navigate("/humidity"); // Change the route path to /temperature
    }
  };

  return (
    <>
      {selectedDevice && (
        <div
          className="container"
          style={{  
            display: "grid",
            gridTemplateColumns: "25% 25%",
            gap: "100px",
            padding: "10px", // Add some padding for spacing
            marginTop: "40px",
            marginLeft: "400px",
          }}
        >
          {/* Use the Link component to navigate to /temperature */}
          <div
            onClick={handleTemperatureClick}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h3 style={{ textAlign: "center", cursor: "pointer" }}>
              Temperature
            </h3>
          </div>
          <div
            onClick={handleHumidityClick}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <h3 style={{ textAlign: "center", cursor: "pointer" }}>Humidity</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectChart;
