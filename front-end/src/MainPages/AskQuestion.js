import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import question_photo from '../images/ilkka-karkkainen-yn8aHOdNLZo-unsplash.jpg'

function AskQuestion() {

    const redirect = () => {
        window.location.href="/ask";
    }

    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={question_photo} />
            <Card.Body>
                <Card.Title>Ask a question</Card.Title>
                <Card.Text>
                Is there anything you want to know?<br></br>
                Just post it and our extremely active community will help you really soon.
                </Card.Text>
                <Button variant="primary" onClick={redirect}>Create Question</Button>
            </Card.Body>
        </Card>
    )
}

export default AskQuestion;