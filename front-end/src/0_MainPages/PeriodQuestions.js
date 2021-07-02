import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import period_photo from '../images/markus-winkler-IrRbSND5EUc-unsplash.jpg'
import './styles.css';

function PeriodQuestions(props) {
    return(
        <Card className="margin card-width">
            <Card.Img className="card-image" variant="top" src={period_photo} />
            <Card.ImgOverlay style={{'color': 'black'}}>
                <Card.Title>Questions per period</Card.Title>
                <Card.Text>
                Want to see the content organised in a more practical way?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/questions'}} >Analytics</Button>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href=`/questions/stats`}}>Statistics</Button>
            </Card.ImgOverlay>
        </Card>
    )
}

export default PeriodQuestions;