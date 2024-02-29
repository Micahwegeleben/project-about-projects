import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react"

function CardsContainer({ boxes, wordOrText, selectThing, setSelectThing }) {

    if (boxes === undefined) { return <p>Loading...</p>; }

    const handleButtonClick = (x) => {
      console.log(x) //why is x equal to title??? where is x being set? what is x? who is x?
      setSelectThing(x === selectThing ? null : x);
    };
  

  return (
      <div className="grid-container">
        {boxes.map((box, index) => (
          <div key={index} className="box">
            <CardsCreate
              isSelected={selectThing}
              clickButton={handleButtonClick}
              shownText={box}
              type={wordOrText}
            />
          </div>
        ))}
      </div>
  );
}

function CardsCreate(props) {
  const handleToggle = () => {
    props.clickButton(props.shownText.Word);
  };
  
  return (
      <Card sx={{ minWidth: 275 }}>
        {
          props.type === 1 ? <CardContent>{props.shownText.Definition}</CardContent> : <CardContent>{props.shownText.Word}</CardContent>
        }
        <Button
          variant="contained"
          color={props.isSelected === props.shownText.Word ? 'error' : 'success'}
          onClick={handleToggle}
        >
          {props.isSelected === props.shownText.Word ? 'Unselect' : 'Select'}
        </Button>
        <br />
        <br />
      </Card>
  );
}

export default CardsContainer;