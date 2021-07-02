import React from 'react';

import { isLogged } from '../api';
import { createNotification } from '../createNotification';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import answer_photo from '../images/karla-vidal-cn9KWcTseH0-unsplash.jpg'
import './styles.css';

function AnswerQuestion() {

    const answer = () => {
        isLogged()
        .then(response => {
            window.location.href=`/questions`;
        })
        .catch(err => {
            createNotification('danger', 'Sorry,', 'You cannot add an answer without an account');
        })
    }

    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={answer_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>Answer a question</Card.Title>
                <Card.Text>
                Wanna help others?
                </Card.Text>
                <Button variant="primary" onClick={answer} >Find a question to answer</Button>
            </Card.ImgOverlay>
        </Card>    
    )
}

export default AnswerQuestion;