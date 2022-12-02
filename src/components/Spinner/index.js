import React from "react";
import { FlapperSpinner } from "react-spinners-kit";
import "./index.css";

function Spinner() {
  return (
    <div className="spinner">
      <FlapperSpinner size={30} color="#001529" />
      <div className="loading-text">Уншиж байна...</div>
    </div>
  );
}

export default Spinner;
