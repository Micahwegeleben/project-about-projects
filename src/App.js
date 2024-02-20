import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react"

function CardsCreate(props) {
  const handleToggle = () => {
    props.clickButton(props.number);
    console.log(props.shownText.Word)
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      {
        props.type === 1 ? <CardContent>{props.shownText.Word}</CardContent> : <CardContent>{props.shownText.Definition}</CardContent>
      }
      <Button
        variant="contained"
        color={props.isSelected ? 'error' : 'success'}
        onClick={handleToggle}
      >
        {props.isSelected ? 'Unselect' : 'Select'}
      </Button>
      <br />
      <br />
    </Card>
  );
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const [selectedTitle, setSelectedTitle] = React.useState(false);
  const [selectedDefinition, setSelectedDefinition] = React.useState(false);
  const [boxes, setBoxes] = React.useState(undefined)
  React.useEffect(() => {
    if (!boxes) {
      return;
    }
    setBoxes([...shuffle(boxes)]);
  }, []);
  React.useEffect(() => {
    fetch('https://mud-sedate-regnosaurus.glitch.me/')
      .then(response => response.json())
      .then(boxes => setBoxes(boxes))
  }, [])

  return (
    <div className="App">
      <Button variant="contained" onClick={() => {
        setBoxes([...shuffle(boxes)])
      }}> Shuffle </Button>
      <div className="grid-container">
        {boxes === undefined ? <p>Loading...</p> :
          //What do I put here to make it so I can signal whether to show word or definition?
          <>
            <CardsContainer boxes={boxes.slice(0, 3)} wordOrText={0} selectThing={selectedTitle} setSelectThing={setSelectedTitle} />
            <CardsContainer boxes={boxes.slice(2, 5)} wordOrText={1} selectThing={selectedDefinition} setSelectThing={setSelectedDefinition} />
          </>
        }
      </div>
      <Button variant="contained" onClick={() => {
        console.log(selectedTitle, selectedDefinition)
      }}> Submit Guess
      </Button>
    </div>
  );
}


function CardsContainer({ boxes, wordOrText, selectThing, setSelectThing }) {
  if (boxes === undefined) { return <p>Loading...</p>; }
  const handleButtonClick = (number) => {setSelectThing(number === selectThing ? null : number)};
  return (
    <div className="grid-container">
      {boxes.map((box, index) => (
        <div key={index} className="box">
          <CardsCreate
            number={index + 1}
            isSelected={selectThing === index + 1}
            clickButton={handleButtonClick}
            shownText={box}
            type={wordOrText}
          />
        </div>
      ))}
    </div>
  );
}

export default App;