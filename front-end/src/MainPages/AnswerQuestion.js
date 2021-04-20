import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import answer_photo from '../images/karla-vidal-cn9KWcTseH0-unsplash.jpg'


function AnswerQuestion() {
    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={answer_photo} />
            <Card.Body style={{'marginTop': '50px'}}>
                <Card.Title>Answer a question</Card.Title>
                <Card.Text>
                Wanna help others?<br></br>
                Just try answering a question and contributing to our community.
                </Card.Text>
                <Button variant="primary">Post Answer</Button>
            </Card.Body>
        </Card>    
    )
}

export default AnswerQuestion;