import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  projectData: "",
  selectedDevice: "",
  selectedGroup: "",
  selectedTruck: "",
  selectedContainer: "",
  selectedItem: "",
  temperatureData: "",
  humidityData: "",
};

// Define the async thunk action to fetch project data
export const fetchProjectData = createAsyncThunk(
  "project/fetchData",
  async () => {
    try {
      const response = await axios.get(
        "https://api.jsoneditoronline.org/v2/docs/5d82ba4c487f4793a9d1dfa7092fb7bf/data"
      );
      if (response.status === 200) {
        const data = response.data;

        // Return the data to be stored in the state
        return {
          projectData: data.projectDetails.project_selections,
          temperatureData: data.temperatureData,
          humidityData: data.humidityData,
        };
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error; // Rethrow the error for handling in components
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },
    setSelectedContainer: (state, action) => {
      state.selectedContainer = action.payload;
    },
    setSelectedTruck: (state, action) => {
      state.selectedTruck = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Handle the fulfilled action for fetchProjectData
    builder.addCase(fetchProjectData.fulfilled, (state, action) => {
      // Update the state with the fetched data
      state.projectData = action.payload.projectData;
      state.temperatureData = action.payload.temperatureData;
      state.humidityData = action.payload.humidityData;
    });
    // Handle the rejected action for fetchProjectData
    builder.addCase(fetchProjectData.rejected, (state, action) => {
      // Update the state to indicate an error occurred
      state.error = action.error.message;
      state.loading = false; // You can also set loading to false here if needed
    });
  },
});

export const {
  setSelectedDevice,
  setSelectedItem,
  setSelectedContainer,
  setSelectedTruck,
  setSelectedGroup,
} = projectSlice.actions;

export default projectSlice.reducer;
