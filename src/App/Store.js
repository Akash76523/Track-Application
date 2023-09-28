import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import ProjectReducer from "../Features/Slice";

const store = configureStore({
  reducer: ProjectReducer, // Use ProjectReducer here
  middleware: [thunk],
});

export default store;
