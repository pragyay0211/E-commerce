import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./dataExtraction/apis";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.dataSlice);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const renderContent = () => {
    if (tickets) {
      return (
        <div>
          <Navbar />
          <Dashboard />
        </div>
      );
    } else {
      console.error("Something went wrong");
      return null;
    }
  };

  return renderContent();
};

export default App;
