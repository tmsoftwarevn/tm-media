import { useState, CSSProperties } from "react";
import { BounceLoader } from "react-spinners";
import "../../scss/loading.scss"
const Loading = () => {
  return (
    <div className="centered-container">
      <div className="sweet-loading">
        <BounceLoader
          color={"#f31212"}
          loading={true}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loading;
