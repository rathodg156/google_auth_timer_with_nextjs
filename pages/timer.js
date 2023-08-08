import React, { useState, useEffect } from "react";

const Timer = ({ onLogout }) => {
  const [timeRemaining, setTimeRemaining] = useState(60);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // User has been logged out due to inactivity
      onLogout();
    }

    return () => clearInterval(timer);
  }, [timeRemaining, onLogout]);

  return <div>Time Remaining: {timeRemaining} seconds</div>;
};

export default Timer;

