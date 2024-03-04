import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';

var visualKey = '';

function CardsContainer({ boxes, type, selectedThing, buttonClickThing }) {
  if (boxes === undefined) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid-container">
      {boxes.map((x, index) => (
        <div key={index} className="box" id={index}>
          <CardsCreate
            index={index}
            selectedThing={selectedThing}
            buttonClickThing={buttonClickThing}
            shownText={x}
            type={type}
          />
        </div>
      ))}
    </div>
  );
}

function CardsCreate(props) {
  if (props.index === 0) {
    props.type === 0 ? (visualKey = '(Q) ') : (visualKey = '(I) ');
  }
  if (props.index === 1) {
    props.type === 0 ? (visualKey = '(W) ') : (visualKey = '(O) ');
  }
  if (props.index === 2) {
    props.type === 0 ? (visualKey = '(E) ') : (visualKey = '(P) ');
  }

  const handleToggle = () => {
    props.buttonClickThing(props.shownText.Word);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      {props.type === 1 ? (
        <CardContent>{props.shownText.Definition}</CardContent>
      ) : (
        <CardContent>{props.shownText.Word}</CardContent>
      )}
      <Button
        variant="contained"
        color={
          props.selectedThing === props.shownText.Word
            ? 'error'
            : 'success'
        }
        onClick={handleToggle}
      >
        {visualKey}
        {props.selectedThing === props.shownText.Word
          ? 'Unselect'
          : 'Select'}
      </Button>
      <br />
      <br />
    </Card>
  );
}

export default CardsContainer;
