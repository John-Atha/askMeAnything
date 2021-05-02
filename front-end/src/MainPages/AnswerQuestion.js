import React from 'react';

import { isLogged } from '../api';
import { createNotification } from '../createNotification';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import answer_photo from '../images/karla-vidal-cn9KWcTseH0-unsplash.jpg'


function AnswerQuestion() {

    const answer = () => {
        isLogged()
        .then(response => {
            window.location.href=`#`;
        })
        .catch(err => {
            createNotification('danger', 'Sorry,', 'You cannot add an answer without an account');
        })
    }

    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={answer_photo} />
            <Card.Body style={{'marginTop': '50px'}}>
                <Card.Title>Answer a question</Card.Title>
                <Card.Text>
                Wanna help others?<br></br>
                Just try answering a question and contributing to our community.
                </Card.Text>
                <Button variant="primary" onClick={answer} >Find a question to answer</Button>
            </Card.Body>
        </Card>    
    )
}

export default AnswerQuestion;