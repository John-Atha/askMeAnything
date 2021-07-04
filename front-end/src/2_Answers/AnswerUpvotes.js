import React, { useState, useEffect } from 'react';

import { getOneAnswer, answerIsUpvoted, answerUnUpvote, answerUpvote } from '../api';
import { createNotification } from '../createNotification';

import './styles.css';
import arrow1 from '../images/arrow1-small.png';
import arrow1_blue from '../images/arrow1-small-blue.png';

function AnswerUpvotes(props) {
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [upvoteId, setUpvoteId] = useState(null);
    const [id, setId] = useState(props.id);

    const checkUpvoted = () => {
        if (id !== undefined) {
            answerIsUpvoted(id)
            .then(response => {
                //console.log(response);
                setIsUpvoted(response.data.upvoted);
                setUpvoteId(response.data.id);
            })
            .catch(err => {
                console.log(err);
                setIsUpvoted(false);
                setUpvoteId(null);
            })    
        }
        else {
            setIsUpvoted(false);
            setUpvoteId(null);
        }
    }

    const upvote = () => {
        answerUpvote(id)
        .then(response => {
            //console.log(response);
            getOneAnswer(id)
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
            //console.log(response);
            getOneAnswer(id)
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

    useEffect(() => {
        setId(props.id);
    }, [props.id])

    useEffect(()=>{
        checkUpvoted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

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