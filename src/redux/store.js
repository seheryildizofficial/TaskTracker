import jobSlice from "./slices/jobSlice";
import { configureStore } from "@reduxjs/toolkit";
export default configureStore({
  reducer: { jobSlice },
});
