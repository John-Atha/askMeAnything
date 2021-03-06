import React, { useState, useEffect } from 'react';

import { questionIsUpvoted, questionUpvote, questionUnUpvote, getOneQuestion } from '../api';
import { createNotification } from '../createNotification';

import './styles.css';
import arrow1 from '../images/arrow1-big.png'
import arrow1_blue from '../images/arrow1-big-blue.png'

function QuestionUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [upvoteId, setUpvoteId] = useState(null);
    const [id, setId] = useState(props.id);
    useEffect(()=>{
        setId(props.id);
    }, [props.id])
    useEffect(() => {
        checkUpvoted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    useEffect(() => {
        setUpvotes(props.upvotes);
    }, [props.upvotes]);
    useEffect(() => {
        setIsUpvoted(props.isUpvoted);
    }, [props.isUpvoted]);
    useEffect(() => {
        setUpvoteId(props.upvoteId);
    }, [props.upvoteId]);

    const checkUpvoted = () => {
        questionIsUpvoted(props.id)
        .then(response => {
            //console.log(response);
            setIsUpvoted(response.data.upvoted);
            setUpvoteId(response.data.id);
        })
        .catch(err => {
            setIsUpvoted(false);
        })
    } 
    
    const upvote = () => {
        console.log("I am upvoting it.");
        questionUpvote(id)
        .then(response => {
            //console.log(response);
            getOneQuestion(props.id)
            .then(response => {
                setUpvotes(response.data.upvotesCount);
                checkUpvoted();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry', 'We could not post your upvote.');
        })
    }
    
    const unUpvote = () => {
        console.log("I am un-upvoting it.");
        questionUnUpvote(upvoteId)
        .then(response => {
            //console.log(response);
            getOneQuestion(props.id)
            .then(response => {
                setUpvotes(response.data.upvotesCount);
                checkUpvoted();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry', 'We could not update your upvote.');
        })
    }
    
    const updUpvote = () => {
        if (props.userId) {
            if (isUpvoted) {
                unUpvote();
            }
            else {
                upvote();
            }
        }
        else {
            createNotification('danger', 'Sorry', 'You cannot upvote a question without an account.');
        }
    }

    return(
        <div className="center-content">
            <input type='image' className="upvotes-icon" src={isUpvoted ? arrow1_blue : arrow1} alt="upvotes" style={{'border': 'none'}} onClick={updUpvote} />
            <div style={{'fontSize': '25px', 'color': (isUpvoted?'#1d98f5':'black')}} className="center-content">{upvotes}</div>
        </div>
    )
}

export default QuestionUpvotes;