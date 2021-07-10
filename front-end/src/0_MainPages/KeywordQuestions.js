import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import react_photo from '../images/react_photo.png'
import './styles.css';
import { isLogged } from '../api';
import { createNotification } from '../createNotification';

function KeywordQuestions() {
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        isLogged()
        .then(() => {
            setLogged(true);
        })
        .catch(() => {
            ;
        })
    }, [])

    const redirect = (key) => {
        if (!logged) {
            createNotification('danger', 'Sorry', `You cannot visit keyword's ${key} page without an account.`);
        }
        else {
            window.location.href = `/keywords/${key}`;
        }
    }

    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={react_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>Keywords</Card.Title>
                <Card.Text>
                Are you looking for something special?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>redirect('analytics')}>Analytics</Button>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>redirect('statistics')}>Statistics</Button>
            </Card.ImgOverlay>
        </Card>

    )
}

export default KeywordQuestions;