// TemperatureChart.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDevice } from "../../Features/Slice";
import ProjectData from "../../Pages/Form";
import SelectChart from "../../Pages/SelectedPage";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const TemperatureChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Min Temperature",
        data: [],
        borderColor: "rgb(0, 255, 0)",
        type: "line",
        fill: false,
      },
      {
        label: "Max Temperature",
        data: [],
        borderColor: "rgb(0, 0, 255)",
        type: "line",
        fill: false,
      },
    ],
  });

  const temperatureData = useSelector((state) => state.temperatureData);
  const selectedDevice = useSelector((state) => state.selectedDevice);
  const navigate = useNavigate()
  useEffect(() => {
    // Check if there's no selectedDevice and navigate to the /user route
    if (!selectedDevice) {
      navigate("/user");
    }
  }, [selectedDevice]);

  const dispatch = useDispatch();

  useEffect(() => {
    // Use the temperatureData from the Redux store to update the chart data
    if (temperatureData.length > 0) {
      const labels = temperatureData.map((entry) => entry.createdAt);
      const temperatureValues = temperatureData.map((entry) =>
        parseFloat(entry.temperature)
      );
      const minTemperatures = temperatureData.map((entry) =>
        parseFloat(entry.minTemperature)
      );
      const maxTemperatures = temperatureData.map((entry) =>
        parseFloat(entry.maxTemperature)
      );

      const newData = {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatureValues,
            borderColor: "#088395",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Min Temperature",
            data: minTemperatures,
            borderColor: "rgb(0, 255, 0)",
            type: "line",
            fill: false,
          },
          {
            label: "Max Temperature",
            data: maxTemperatures,
            borderColor: "rgb(0, 0, 255)",
            type: "line",
            fill: false,
          },
        ],
      };

      setChartData(newData);
    }
  }, [temperatureData]);

  return (
    <div style={{ width: "100%" }}>
      <ProjectData />
      <SelectChart />
      {selectedDevice && <Line options={options} data={chartData} />}
    </div>
  );
};

export default TemperatureChart;
