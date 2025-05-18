# 25 + 5 Clock (Pomodoro Timer)

![25 + 5 Clock Screenshot](https://i.imgur.com/mXwJXxD.png)

## Overview

This project is a Pomodoro Timer application built with React. The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. This application allows users to set custom session and break lengths, and automatically cycles between them.

## Demo

You can view a live demo of this project at: [https://25--5-clock.freecodecamp.rocks](https://25--5-clock.freecodecamp.rocks)

## Features

- Customizable session and break lengths (1-60 minutes)
- Visual countdown timer with mm:ss format
- Audio notification when timer reaches zero
- Play/pause functionality to control the timer
- Reset button to restore default settings
- Automatic switching between session and break periods
- Responsive design for various screen sizes

## User Stories

This project fulfills the following user stories:

1. Timer display with session/break indicator
2. Adjustable session and break lengths (1-60 minutes)
3. Start, pause, and reset functionality
4. Audio notification when timer completes
5. Automatic switching between session and break periods

## Technologies Used

- **React**: Frontend library for building the user interface
- **React Hooks**: useState, useEffect, and useRef for state management and side effects
- **CSS**: Custom styling with responsive design
- **Font Awesome**: Icon library for UI elements
- **HTML5 Audio**: For the timer completion sound

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/25-clock.git
   cd 25-clock
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

- **Adjust Session/Break Length**: Use the up and down arrows to set your preferred session and break durations
- **Start Timer**: Click the play button to start the countdown
- **Pause Timer**: Click the pause button to temporarily stop the countdown
- **Reset Timer**: Click the reset button to restore default settings (25 min session, 5 min break)

## Code Structure

- **App.js**: Main component containing all the timer logic and UI components
- **App.css**: Styling for the entire application
- **index.js**: Entry point for the React application
- **index.html**: HTML template with Font Awesome and Google Fonts integration

## Key Implementation Details

### Timer Logic

The timer uses `setInterval` within a `useEffect` hook to create a countdown that updates every second. When the timer reaches zero, it automatically switches between session and break periods.

```javascript
useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft === 0) {
          // Play beep sound and switch modes
          beepSoundRef.current.play();
          
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
  }
  // Cleanup logic...
}, [isRunning, timerType, breakLength, sessionLength]);
```

### Audio Implementation

The application uses an HTML5 audio element with a reference to play a sound when the timer completes:

```javascript
<audio 
  id="beep" 
  ref={beepSoundRef}
  src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
/>
```

## Testing

This project includes the FreeCodeCamp test suite to verify that all user stories are correctly implemented. The test script is loaded in index.html and can be activated by clicking the hamburger menu in the top-left corner of the page.

## Future Enhancements

- Add task tracking functionality
- Implement a history of completed sessions
- Add customizable themes
- Create mobile app versions
- Add user accounts to save preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [FreeCodeCamp](https://www.freecodecamp.org/) for the project requirements and test suite
- [Font Awesome](https://fontawesome.com/) for the icons
- [Create React App](https://github.com/facebook/create-react-app) for the project setup
