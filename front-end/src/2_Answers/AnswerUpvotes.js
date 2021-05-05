import React, { useState, useEffect } from 'react';

import { getOneAnswer, answerIsUpvoted, answerUnUpvote, answerUpvote } from '../api';
import { createNotification } from '../createNotification';

import './styles.css';
import arrow1 from '../images/arrow1.png';
import arrow1_blue from '../images/arrow1_blue.png';

function AnswerUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [upvoteId, setUpvoteId] = useState(null);

    const checkUpvoted = () => {
        answerIsUpvoted(props.id)
        .then(response => {
            console.log(response);
            setIsUpvoted(response.data.upvoted);
            setUpvoteId(response.data.id);
        })
        .catch(err => {
            console.log(err);
            setIsUpvoted(false);
            setUpvoteId(null);
        })
    }

    const upvote = () => {
        answerUpvote(props.id)
        .then(response => {
            console.log(response);
            getOneAnswer(props.id)
            .then(response => {
                console.log(response);
                setUpvotes(response.data.upvotesCount);
                checkUpvoted();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry,', 'We could not post your upvote.');
        })
    }

    const unUpvote = () => {
        answerUnUpvote(upvoteId)
        .then(response => {
            console.log(response);
            getOneAnswer(props.id)
            .then(response => {
                console.log(response);
                setUpvotes(response.data.upvotesCount);
                checkUpvoted();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry,', 'We could not update your upvote');
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
            createNotification('danger', 'Sorry', 'You cannot upvote a question without an account')
        }
    }

    useEffect(()=>{
        checkUpvoted();
    }, [props.id])

    return(
        <div className="center-content">
            <input type='image' 
                   className="upvotes-icon-small"
                   src={ isUpvoted ? arrow1_blue : arrow1}
                   alt="upvotes"
                   style={{'border': 'none'}}
                   onClick={updUpvote} />
            <div style={{'fontSize': '20px', 'color': (isUpvoted ? '#1d98f5' : 'black')}}
                 className="center-content">{upvotes}</div>
        </div>
    )
}

export default AnswerUpvotes;