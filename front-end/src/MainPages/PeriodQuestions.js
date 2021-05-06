import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import period_photo from '../images/markus-winkler-IrRbSND5EUc-unsplash.jpg'

function PeriodQuestions() {
    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={period_photo} />
            <Card.Body style={{'marginTop': '50px'}}>
                <Card.Title>Questions per period</Card.Title>
                <Card.Text>
                Want to see the content organised in a more practical way?<br></br>
                This category suits you.
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/questions'}} >See analytics</Button>
                <Button variant="primary" style={{'margin': '2px'}}>See statistics</Button>
            </Card.Body>
        </Card>
    )
}

export default PeriodQuestions;