import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CardsContainer from './components/CardsContainer.js';
import shuffle from './components/shuffle.js';



function App() {
  const [selectedTitle, setSelectedTitle] = React.useState(null);
  const [selectedDefinition, setSelectedDefinition] = React.useState(null);
  const [boxes, setBoxes] = React.useState(undefined)
  const [score, setScore] = React.useState(0)
  const [popup, setPopup] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);
  

  const handleClick = () => {setPopup(true)};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPopup(false);
  };
  React.useEffect(() => {
    fetch('http://54.200.189.210:5000/data.json')
      .then(response => response.json())
      .then(boxes => setBoxes(shuffle(boxes)))
  }, []);

  return (
    <div className="App">
      <p>Score: {score}</p>
      <Button variant="contained" onClick={() => {
        setBoxes([...shuffle(boxes)])
      }}> Shuffle </Button>
      <Button variant="contained" onClick={() => {
        if (selectedTitle === selectedDefinition && selectedTitle !== null && selectedDefinition !== null) {
          setCorrect(true);
          setBoxes([...shuffle(boxes)])
          setSelectedTitle(null)
          setSelectedDefinition(null)
          setScore(score + 20)
        }
        else {
          setCorrect(false);
          setScore(score - 5)
          //if score is negative, set score to 0
          if (score < 5) {
            setScore(0)
          }
        }
        handleClick()
      }}>Submit Guess
      </Button>

      <Snackbar open={popup} autoHideDuration={2200} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={correct ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {correct ? "Correct! +20 points" : "Incorrect! -5 points"}
        </Alert>
      </Snackbar>

      <div className="grid-container">
        {boxes === undefined ? <p>Loading...</p> :
          <>
            <CardsContainer boxes={boxes.slice(0, 3)} wordOrText={0} selectThing={selectedTitle} setSelectThing={setSelectedTitle} />
            <CardsContainer boxes={boxes.slice(2, 5)} wordOrText={1} selectThing={selectedDefinition} setSelectThing={setSelectedDefinition} />
          </>
        }
      </div>
    </div>
  );
}







export default App;