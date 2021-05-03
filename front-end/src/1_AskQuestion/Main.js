import { React, useEffect, useState } from 'react';

import { isLogged, getAllKeywords, postQuestion, attachKeyword } from '../api';
import { createNotification } from '../createNotification';
import './styles.css'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'

function Main() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsErr, setSuggestionsErr] = useState(false);
    const [sugg, setSugg] = useState("");
    const [picked, setPicked] = useState([]);

    const clear = () => {
        setTitle("");
        setText("");
        setSuggestions(allSuggestions);
        setPicked([]);
        setSugg("");
    }

    useEffect(()=> {
        getAllKeywords()
        .then(response => {
            setSuggestions(response.data)
            //.then(suggestionsReOrder())
            setAllSuggestions(response.data);
            setSuggestionsErr(false);
            
        })
        .catch(err => {
            console.log(err);
            setSuggestionsErr(true);
        })
    }, [])

    const add = (index) => {
        const obj = suggestions[index];
        console.log('Picked:')
        console.log(obj);
        setSuggestions(suggestions.slice(0, index).concat(suggestions.slice(index+1, suggestions.length)));
        setPicked(picked.concat(obj));
        console.log('Suggestions after:')
        console.log(suggestions);
        console.log('Picked after:')
        setTimeout(()=>{console.log(picked)}, 100);
    }
    const buttonAdd = () => {
        if (suggestions.length) {
            add(0);
        }
    }
    const removePicked = (index) => {
        const obj = picked[index];
        setPicked(picked.slice(0, index).concat(picked.slice(index+1, picked.length)));
        setSuggestions(suggestions.concat(obj));
        //setTimeout(()=>{suggestionsReOrder()}, 300);
    }
    const suggestionsReOrder = () => {
        console.log(suggestions);
        const copy = [];
        suggestions.forEach(obj => {
            copy.push(obj)
        });
        setSuggestions(copy.sort((a, b) => (a.name.charAt(0).toLowerCase()+a.name.slice(1)>b.name.charAt(0).toLowerCase()+b.name.slice(1)) ? 1 : -1));
        console.log(suggestions);
    }

    const submit = () => {
        isLogged()
        .then(response => {
            const user = response.data;
            if (title.length===0 || text.length===0) {
                createNotification('danger', 'Sorry,', 'Title & text fields are compulsory.');
            }
            else {
                console.log(`User ${user.id} submitted a question.`);
                postQuestion(title, text)
                .then(response => {
                    console.log(response);
                    const id = response.data.id;
                    picked.forEach(obj => {
                        const keyword_id = obj.id;
                        attachKeyword(id, keyword_id)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    });
                    createNotification('success', 'Hello,', 'Question posted successfully.');
                })
                .catch(err => {
                    console.log(err);
                    createNotification('danger', 'Sorry', 'We could not post your question.');
                })
            }
        })
        .catch(err => {
            createNotification('danger', 'Sorry,', 'You cannot ask a question without an account');
        })
    }

    const match = (s) => {
        if (sugg) {
            return( s.startsWith(sugg.charAt(0).toUpperCase()+sugg.slice(1)) ||
                    s.startsWith(sugg.charAt(0).toLowerCase()+sugg.slice(1)));
        }
        else {
            return true;
        }
    }

    return(
        <div className="margin-top-small bordered-input container-width" style={{'padding': '10px 0px', 'marginBottom': '200px', 'position': 'relative'}}>
            <div className="container-width">
                <h5 className="question-specs-title" >Title</h5>
                <div className="question-specs-explanation">You should be as specific as possible to help other devs spot your question.</div>
                <input style={{'height': '40px', 'textAlign': 'left'}} className="bordered-input" name="title" value={title} onChange={(event)=>{setTitle(event.target.value)}} />
            </div>
            <div className="margin-top-smaller container-width">
                <h5 className="question-specs-title" >Body</h5>
                <div className="question-specs-explanation">Try to cover all the necessary details.</div>
                <textarea style={{'height': '300px'}} className="bordered-input" name="text" value={text} onChange={(event)=>{setText(event.target.value)}} />
            </div>
            <h5 className="question-specs-title container-width">Keywords</h5>
            <div className="flex-layout container-width">
                <div style={{'width': '50%', 'padding': '10px'}}>
                    <div className="margin-top-smaller flex-layout">
                        <FormControl 
                            style={{'width': '250px'}}
                            type='text'
                            placeholder='Search for a keyword'
                            value={sugg}
                            className="mr-sm-2"
                            onChange={(event)=>{setSugg(event.target.value)}}        
                        />
                        <Button variant='outline-dark' 
                                onClick={buttonAdd}>
                            Add
                        </Button>
                    </div>
                    {suggestionsErr &&
                        <div className="error-message">No keywords found.</div>
                    }
                    {!suggestionsErr &&
                        <div id="suggestions-box">
                            {suggestions.map((value, index) => {
                                if (match(value.name)) {
                                    return (
                                        <button className="button-as-link"
                                                key={index}
                                                onClick={()=>add(index)}>
                                                {value.name}
                                        </button>
                                    )
                                }
                            })}
                        </div>
                
                    }
                </div>
                <div style={{'width': '50%'}}>
                    <h5 className="center-content">Picked keywords</h5>
                    <div className="flex-layout">
                        {picked.map((value, index) => {
                            return(
                                <div className="flex-layout">
                                    <button key={index}
                                            href={`/keywords/${value.id}`} 
                                            className="keyword-pill">
                                        {value.name}
                                    </button>
                                    <button 
                                        key={"0"+index.toString()}
                                        className="remove-button"
                                        onClick={()=>{removePicked(index)}}>
                                        x
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex-layout" style={{'position': 'absolute', 'right': '10px', 'bottom': '-60px'}}>
                <Button style={{'margin': '10px'}} variant="outline-primary" onClick={submit}>Submit</Button>
                <Button style={{'margin': '10px'}} variant="outline-danger" onClick={clear}>Clear</Button>
            </div>
        </div>
    )
}

export default Main;