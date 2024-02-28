import React, { useState, useEffect } from 'react';

const ToggleButton = ({ label, hotkey, active, onClick }) => {
  const buttonStyle = {
    backgroundColor: active ? 'green' : 'gray',
    color: 'white',
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={buttonStyle} onClick={onClick}>
      {label} ({hotkey})
    </div>
  );
};

const App = () => {

  const [selectedTitle, setSelectedTitle] = useState([]);
  
  const [selectedDescription, setSelectedDescription] = useState([]);

  const handleButtonClick = (hotkey) => {
    if (selectedTitle.includes(hotkey)) {
      setSelectedTitle((prevselectedTitle) =>
        prevselectedTitle.filter((button) => button !== hotkey)
      );
    } else {
      if (
        selectedTitle.length < 2 &&
        ((hotkey === 'Q' || hotkey === 'W' || hotkey === 'E'))
      ) {
        const sameSetButton = selectedTitle.find(
          (button) => (button === 'Q' || button === 'W' || button === 'E') === (hotkey === 'Q' || hotkey === 'W' || hotkey === 'E')
        );
        if (sameSetButton) {
          setSelectedTitle((prevselectedTitle) =>
            prevselectedTitle.filter((button) => button !== sameSetButton)
          );
        }
        setSelectedTitle((prevselectedTitle) => [...prevselectedTitle, hotkey]);
      }
    }
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
        <h3>Set 1:</h3>
        <ToggleButton
          label="Button Q"
          hotkey="Q"
          active={selectedTitle.includes('Q')}
          onClick={() => handleButtonClick('Q')}
        />
        <ToggleButton
          label="Button W"
          hotkey="W"
          active={selectedTitle.includes('W')}
          onClick={() => handleButtonClick('W')}
        />
        <ToggleButton
          label="Button E"
          hotkey="E"
          active={selectedTitle.includes('E')}
          onClick={() => handleButtonClick('E')}
        />
      </div>
    </div>
  );
};

export default App;
