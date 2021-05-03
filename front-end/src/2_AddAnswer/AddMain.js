import React, { useEffect, useState } from 'react';
import { getOneQuestion, getQuestionKeywords } from '../api';
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

    useEffect(() => {
        console.log(`I will answer question ${id}.`);
        getOneQuestion(id)
        .then(response => {
            console.log(response);
            setTitle(response.data.title);
            setText(response.data.text);
            setQuestionError(false);
            setOwner(response.data.owner);
            setDate(response.data.updated_at);
            setUpvotes(response.data.upvotes);
        })
        .catch(err => {
            console.log(err);
            setQuestionError(true);
        })
    }, [id])

    return(
        <div className="margin-top-small container-width" style={{'padding': '10px', 'marginBottom': '200px', 'position': 'relative'}}>
            <OneQuestion title={title}
                         text={text}
                         id={id}
                         owner={owner}
                         date={date}
                         upvotes={upvotes}
                         answerChoice={false} />
            <AnswerField id={id} />
        </div>
    )
}

export default AddMain;