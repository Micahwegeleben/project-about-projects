import './App.css';
import Button from '@mui/material/Button';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CardsContainer from './components/CardsContainer';
import shuffle from './components/shuffle';

function App() {
  const [selectedTitle, setSelectedTitle] = React.useState(null);
  const [selectedDefinition, setSelectedDefinition] = React.useState(null);
  const [boxes, setBoxes] = React.useState(undefined);
  const [score, setScore] = React.useState(0);
  const [popup, setPopup] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);

  const submitGuess = () => {
    if (
      selectedTitle === selectedDefinition &&
      selectedTitle !== null &&
      selectedDefinition !== null
    ) {
      setCorrect(true);
      setBoxes(shuffle(boxes));
      setSelectedTitle(null);
      setSelectedDefinition(null);
      setScore(score + 20);
    } else {
      setCorrect(false);
      setScore(score - 5);
      //if score is negative, set score to 0
      if (score < 5) {
        setScore(0);
      }
    }
    setPopup(true);
  };

  const buttonClickTitle = x => {
    console.log(x); //why is x equal to title??? where is x being set? what is x? who is x?
    setSelectedTitle(x === selectedTitle ? null : x);
  };
  const buttonClickDefinition = x => {
    console.log(x); //why is x equal to title??? where is x being set? what is x? who is x?
    setSelectedDefinition(x === selectedDefinition ? null : x);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPopup(false);
  };

  React.useEffect(() => {
    fetch('https://mud-sedate-regnosaurus.glitch.me/')
      .then(response => response.json())
      .then(boxes => setBoxes(shuffle(boxes)));
  }, []);

  const handleKeyDown = event => {
    const key = event.key.toUpperCase();
    if (['Q'].includes(key)) {
      buttonClickTitle(boxes[0].Word);
    }
    if (['W'].includes(key)) {
      buttonClickTitle(boxes[1].Word);
    }
    if (['E'].includes(key)) {
      buttonClickTitle(boxes[2].Word);
    }
    if (['I'].includes(key)) {
      buttonClickDefinition(boxes[2].Word);
    }
    if (['O'].includes(key)) {
      buttonClickDefinition(boxes[3].Word);
    }
    if (['P'].includes(key)) {
      buttonClickDefinition(boxes[4].Word);
    }
    if (['R'].includes(key)) {
      submitGuess();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTitle, selectedDefinition]);

  return (
    <div className="App">
      <p>Score: {score}</p>
      <Button
        variant="contained"
        onClick={() => {
          setBoxes([...shuffle(boxes)]);
        }}
      >
        {' '}
        Shuffle{' '}
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          submitGuess();
        }}
      >
        (R) Submit Guess
      </Button>

      <Snackbar open={popup} autoHideDuration={2200} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={correct ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {correct ? 'Correct! +20 points' : 'Incorrect! -5 points'}
        </Alert>
      </Snackbar>

      <div className="grid-container">
        {boxes === undefined ? (
          <p>Loading...</p>
        ) : (
          <>
            <CardsContainer
              boxes={boxes.slice(0, 3)}
              type={0}
              selectedThing={selectedTitle}
              buttonClickThing={buttonClickTitle}
            />
            <CardsContainer
              boxes={boxes.slice(2, 5)}
              type={1}
              selectedThing={selectedDefinition}
              buttonClickThing={buttonClickDefinition}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
