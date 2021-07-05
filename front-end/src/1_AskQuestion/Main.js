import { React, useEffect, useState } from 'react';

import { isLogged, getAllKeywords, postQuestion, attachKeyword, createKeyword } from '../api';
import { createNotification } from '../createNotification';
import { getErrMessageFromObj } from '../getErrMessage';
import './styles.css'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

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
        console.log('I am add');
        const obj = suggestions[index];
        console.log('Picked:')
        console.log(obj);
        const tempSugg = suggestions;
        setSuggestions([]);
        setTimeout(() => {
            setSuggestions(tempSugg.slice(0, index).concat(tempSugg.slice(index+1, tempSugg.length)));
            setPicked(picked.concat(obj));
            setTimeout(() => {
                console.log('Suggestions after:')
                console.log(suggestions);
                console.log('Picked after:')
                console.log(picked)
                },
            100);        
        }, 0
        );
    }
    const buttonAdd = () => {
        console.log('I am button-add');
        console.log(suggestions);
        let found = false;
        for (let i=0; i<suggestions.length; i++) {
            if (match(suggestions[i].name)) {
                add(i);
                found = true;
                break;
            }
        }
        if (!found && sugg.length) {
            for (let obj of picked) {
                if (obj.name===sugg) {
                    setSugg("");
                    return;
                }
            }
            console.log(picked);
            console.log(sugg);
            const newObj = {
                name: sugg,
                id: null,
                new: true,
            }
            setPicked(picked.concat(newObj));                
        }
        setSugg("");
    }
    const removePicked = (index) => {
        const obj = picked[index];
        setPicked(picked.slice(0, index).concat(picked.slice(index+1, picked.length)));
        if (!obj.new) {
            setSuggestions(suggestions.concat(obj));            
        }
        //setTimeout(()=>{suggestionsReOrder()}, 300);
    }

    const checkIfLastKeyword = (l, index, id) => {
        console.log(index);
        console.log(l-1);
        if (index === l-1) {
            createNotification('success', 'Hello,', 'Question posted successfully.');
            setTimeout(()=>{window.location.href=`/questions/${id}`}, 1000);                
        }
    }

    const createKeywordAndAttach = async (obj, l, index, id) => {
        return createKeyword(obj.name)
        .then(async (response) => {
            const newId = response.data.id;
            return justAttachKeyword(obj, l, index, id, newId);
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry,', getErrMessageFromObj(err.response.data.message));
            checkIfLastKeyword(l, index, id);
        })
    }

    const justAttachKeyword = async (obj, l , index, id, keyword_id) => {
        return attachKeyword(id, keyword_id)
        .then(response => {
            console.log(response);
            checkIfLastKeyword(l, index, id);
        })
        .catch(err => {
            console.log(err);
            createNotification('danger', 'Sorry,', `We could not attach keyword '${obj.name}'.`);
            checkIfLastKeyword(l, index, id);
        })
    }

    const submit = async () => {
        createNotification('success', 'Thanks', 'Wait for us to publish your question')
        return isLogged()
        .then(response => {
            const user = response.data;
            if (title.length===0 || text.length===0) {
                createNotification('danger', 'Sorry,', 'Title & text fields are compulsory.');
            }
            else {
                console.log(`User ${user.id} submitted a question.`);
                return postQuestion(title, text)
                .then(async (response) => {
                    console.log(response);
                    const id = response.data.id;
                    const l = picked.length;
                    let index = 0;
                    for (let i=0; i<picked.length; i++) {
                        const obj = picked[i];
                        if (obj.new) {
                            await createKeywordAndAttach(obj, l, index, id);
                        }
                        else {
                            const keyword_id = obj.id;
                            await justAttachKeyword(obj, l, index, id, keyword_id);                            
                        }
                        index++;
                    }
                })
                .catch(err => {
                    console.log(err);
                    createNotification('danger', 'Sorry', getErrMessageFromObj(err.response.data.message));
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
            <h5 className="question-specs-title container-width margin-top-smaller">Keywords</h5>
            <div className="flex-layout container-width">
                <Form style={{'width': '100%', 'padding': '10px'}} onSubmit={(event)=>{event.preventDefault(); buttonAdd();}}>
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
                                                key={value.id}
                                                onClick={()=>add(index)}>
                                                {value.name}
                                        </button>
                                    )
                                }
                                else {
                                    return null;
                                }
                            })}
                        </div>
                
                    }
                </Form>
                <div style={{'width': '100%'}}>
                    <h5>Picked keywords</h5>
                    <div className="flex-layout">
                        {picked.map((value, index) => {
                            return(
                                <div className="flex-layout">
                                    <button key={index}
                                            href={ value.id ? `/keywords/${value.id}` : '#' } 
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