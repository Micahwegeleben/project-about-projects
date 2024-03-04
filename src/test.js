import React, { useState, useEffect } from 'react';

const ToggleButton = ({ hotkey, active, onClick }) => {
  const buttonStyle = {
    backgroundColor: active ? 'green' : 'gray',
    color: 'white',
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={buttonStyle} onClick={onClick}>
      Button: {hotkey} ({hotkey})
    </div>
  );
};

const App = () => {
  const [selectedTitle, setSelectedTitle] = useState([]);

  const handleButtonClick = (x) => {
    setSelectedTitle(x === selectedTitle ? '' : x); 
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    if (['Q', 'W', 'E'].includes(key)) {
      handleButtonClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTitle]);


  return (
    <div>
      <div>
        <h3>Set 1: {selectedTitle}</h3>
        <ToggleButton
          hotkey="Q"
          active={selectedTitle === 'Q'}
          onClick={() => handleButtonClick('Q')}
        />
        <ToggleButton
          hotkey="W"
          active={selectedTitle === 'W'}
          onClick={() => handleButtonClick('W')}
        />
        <ToggleButton
          hotkey="E"
          active={selectedTitle === 'E'}
          onClick={() => handleButtonClick('E')}
        />
      </div>
    </div>
  );
};

export default App;
