import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import react_photo from '../images/react_photo.png'
import './styles.css';

function KeywordQuestions() {
    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={react_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>Keywords</Card.Title>
                <Card.Text>
                Are you looking for a question of a certain category?<br></br>
                Want to see the trends?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/keywords/analytics'}}>Questions per keyword</Button>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/keywords/statistics'}}>Keywords statistics</Button>
            </Card.ImgOverlay>
        </Card>

    )
}

export default KeywordQuestions;