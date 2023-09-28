import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchProjectData } from "../../Features/Slice";
import { useSelector } from "react-redux";
import ProjectData from "../../Pages/Form";
import SelectChart from "../../Pages/SelectedPage";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const HumidityChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Humidity",
        data: [],
        borderColor: "black",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const humidityData = useSelector((state) => state.humidityData);
  const selectedDevice = useSelector((state) => state.selectedDevice);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if there's no selectedDevice and navigate to the /user route
    if (!selectedDevice) {
      navigate("/user");
    }
  }, [selectedDevice]);

  useEffect(() => {
    // Use the humidityData from the Redux store to update the chart data
    if (humidityData.length > 0 && selectedDevice) {
      const labels = humidityData.map((entry) => entry.createdAt);
      const humidityValues = humidityData.map((entry) =>
        parseFloat(entry.humidity)
      );

      const newData = {
        labels: labels,
        datasets: [
          {
            label: "Humidity",
            data: humidityValues,
            borderColor: "#27005D",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setChartData(newData);
    }
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <ProjectData />
      <SelectChart />
      {selectedDevice && <Line options={options} data={chartData} />}
    </div>
  );
};

export default HumidityChart;
