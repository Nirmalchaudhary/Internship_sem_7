import React, { useState, useRef } from "react";
import "./Stopwatch.css"; // Import your CSS for styling

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    const newLap = formatTime(time);
    setLaps([...laps, newLap]);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds) +
      ":" +
      (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
  };

  return (
    <div className="main">
    <div className="stopwatch">
      <h1 className="stopwatch-title">Stopwatch</h1>
      <div className="stopwatch-display">
        <span className="stopwatch-time">{formatTime(time)}</span>
        <div className="stopwatch-laps">
          {laps.map((lap, index) => (
            <div key={index} className="stopwatch-lap">
              Lap {index + 1}: {lap}
            </div>
          ))}
        </div>
      </div>
      <div className="stopwatch-controls">
        {!isRunning ? (
          <button className="control-button" onClick={handleStart}>
            Start
          </button>
        ) : (
          <>
            <button className="control-button" onClick={handleStop}>
              Stop
            </button>
            <button className="control-button" onClick={handleLap}>
              Lap
            </button>
            <button className="control-button" onClick={handleReset}>
              Reset
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default Stopwatch;
