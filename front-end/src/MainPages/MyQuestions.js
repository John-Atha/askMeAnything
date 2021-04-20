import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import my_analytics_photo from '../images/jack-hodges-rbVqlz8H5Sg-unsplash.jpg'

function MyQuestions() {
    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={my_analytics_photo} />
            <Card.Body style={{'marginTop': '50px'}}>
                <Card.Title>My analytics</Card.Title>
                <Card.Text>
                Want to see your questions and your answers so far?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} >My Questions</Button>
                <Button variant="primary" style={{'margin': '2px'}} >My Answers</Button>
            </Card.Body>
        </Card>    
    )
}

export default MyQuestions;