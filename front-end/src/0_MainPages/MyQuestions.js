import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import my_analytics_photo from '../images/jack-hodges-rbVqlz8H5Sg-unsplash.jpg'

function MyQuestions(props) {
    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={my_analytics_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>My analytics</Card.Title>
                <Card.Text>
                Want to see your questions and your answers so far?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href=`/users/${props.id}/questions`}} >My Questions</Button>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href=`/users/${props.id}/answers`}}>My Answers</Button>
            </Card.ImgOverlay>
        </Card>    
    )
}

export default MyQuestions;