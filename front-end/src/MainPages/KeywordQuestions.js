import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import react_photo from '../images/react_photo.png'

function KeywordQuestions() {
    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={react_photo} />
            <Card.Body style={{'marginTop': '130px'}}>
                <Card.Title>Keywords</Card.Title>
                <Card.Text>
                Are you looking for a question of a certain category?<br></br>
                Want to see the trends?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/keywords'}}>Questions per keyword</Button>
                <Button variant="primary" style={{'margin': '2px'}}>Keywords statistics</Button>
            </Card.Body>
        </Card>

    )
}

export default KeywordQuestions;