import React from 'react';

import { isLogged } from '../api';
import { createNotification } from '../createNotification';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import question_photo from '../images/ilkka-karkkainen-yn8aHOdNLZo-unsplash.jpg'
import './styles.css';

function AskQuestion() {

    const redirect = () => {
        isLogged()
        .then(response => {
            window.location.href="/ask";
        })
        .catch(err => {
            createNotification('danger', 'Sorry,', 'You cannot ask a question without an account');
        })
    }

    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={question_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>Ask a question</Card.Title>
                <Card.Text>
                Is there anything you want to know?
                </Card.Text>
                <Button variant="primary" onClick={redirect}>Create Question</Button>
            </Card.ImgOverlay>
        </Card>
    )
}

export default AskQuestion;