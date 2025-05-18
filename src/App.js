import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // State variables
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('Session'); // 'Session' or 'Break'
  
  // Refs
  const beepSoundRef = useRef(null);
  const intervalRef = useRef(null);

  // Format time in mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Handle break decrement
  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(breakLength - 1);
    }
  };

  // Handle break increment
  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(breakLength + 1);
    }
  };

  // Handle session decrement
  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(sessionLength - 1);
      if (timerType === 'Session') {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  // Handle session increment
  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(sessionLength + 1);
      if (timerType === 'Session') {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  // Handle start/stop
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // Handle reset
  const handleReset = () => {
    // Clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Reset all states to default
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel('Session');
    setTimerType('Session');
    setIsRunning(false);
    
    // Stop and rewind audio
    if (beepSoundRef.current) {
      beepSoundRef.current.pause();
      beepSoundRef.current.currentTime = 0;
    }
  };

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft === 0) {
            // Play beep sound
            beepSoundRef.current.play();
            
            // Switch between Session and Break
            if (timerType === 'Session') {
              setTimerType('Break');
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              setTimerType('Session');
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, timerType, breakLength, sessionLength]);

  return (
    <div className="container">
      <h1 className="title">25 + 5 Clock</h1>
      
      <div className="length-controls">
        <div className="break-controls">
          <div id="break-label">Break Length</div>
          <div className="controls">
            <button id="break-decrement" onClick={handleBreakDecrement}>
              <i className="fas fa-arrow-down"></i>
            </button>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment" onClick={handleBreakIncrement}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
        
        <div className="session-controls">
          <div id="session-label">Session Length</div>
          <div className="controls">
            <button id="session-decrement" onClick={handleSessionDecrement}>
              <i className="fas fa-arrow-down"></i>
            </button>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment" onClick={handleSessionIncrement}>
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="timer">
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formatTime(timeLeft)}</div>
      </div>
      
      <div className="timer-controls">
        <button id="start_stop" onClick={handleStartStop}>
          <i className={`fas ${isRunning ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button id="reset" onClick={handleReset}>
          <i className="fas fa-sync"></i>
        </button>
      </div>
      
      <audio 
        id="beep" 
        ref={beepSoundRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
