import React, { useEffect, useState } from 'react';
import { getOneQuestion, isLogged } from '../api';
import OneQuestion from '../1_Questions/OneQuestion';
import AnswerField from './AnswerField';

function AddMain(props) {
    const [id, setId] = useState(props.id);
    const [title, setTitle] = useState('Loading');
    const [text, setText] = useState("");
    const [owner, setOwner] = useState({username: 'Loading'});
    const [date, setDate] = useState("");
    const [upvotes, setUpvotes] = useState(0);
    const [questionError, setQuestionError] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        setId(props.id);
    }, [props.id])

    useEffect(() => {
        console.log(`I will answer question ${id}.`);
        getOneQuestion(id)
        .then(response => {
            console.log(response);
            setTitle(response.data.title);
            setText(response.data.text);
            setQuestionError(false);
            setOwner(response.data.owner);
            setDate(response.data.created_at);
            setUpvotes(response.data.upvotes);
        })
        .catch(err => {
            console.log(err);
            setQuestionError(true);
        })
    }, [id])

    useEffect(()=> {
        isLogged()
        .then(response => {
            console.log(response);
            setUserId(response.data.id);
        })
        .catch(err => {
            console.log(err);
            setUserId(null)
        })
    }, [])

    return(
        <div className="margin-top-small container-width" style={{'padding': '10px', 'marginBottom': '200px', 'position': 'relative'}}>
            <OneQuestion title={title}
                         text={text}
                         id={parseInt(id)}
                         owner={owner}
                         date={date}
                         upvotes={upvotes}
                         answerChoice={false}
                         userId={userId} />
            <AnswerField id={parseInt(id)} userId={userId} />
        </div>
    )
}

export default AddMain;