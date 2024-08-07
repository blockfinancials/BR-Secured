import React from "react";
import Lottie from "react-lottie";
import animationData from "..//assets/square.json"; // Update with your Lottie animation path

const SquareProgress = ({ size }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={size}
      width={size}
    />
  );
};

export default SquareProgress;
