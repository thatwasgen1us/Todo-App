import { useState, useEffect, useRef } from "react";

const Timer = ({ minutes = 0, seconds = 0 }) => {
  const [newSeconds, setNewSeconds] = useState(minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    setNewSeconds(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      timerId.current = setInterval(() => {
        setNewSeconds((prevSeconds) => {
          if (minutes || seconds) {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              clearTimer();
              return 0; 
            }
          } else {
            return prevSeconds + 1
          }

        });
      }, 1000);
    }
    return () => clearTimer();
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const clearTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  };

  const padZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={startTimer} disabled={isRunning}></button>
      <button className="icon icon-pause" onClick={pauseTimer} disabled={!isRunning}></button>
      {formatTime(newSeconds)}
    </span>
  );
};

export default Timer;


