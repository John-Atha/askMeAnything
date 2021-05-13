import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import chart_photo from '../images/pie-chart-1569175_1920.jpg'

function MyContributions(props) {
    return(
        <Card style={{ width: '300px' }} className="margin">
            <Card.Img className="card-image" variant="top" src={chart_photo} />
            <Card.Body>
                <Card.Title>My contributions</Card.Title>
                <Card.Text>
                Want to see your engagement statistics?
                </Card.Text>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href='/ranking'}} >My Ranking</Button>
                <Button variant="primary" style={{'margin': '2px'}} onClick={()=>{window.location.href=`/users/${props.id}/stats`}} >Statistics</Button>
            </Card.Body>
        </Card>    
    )
}

export default MyContributions;