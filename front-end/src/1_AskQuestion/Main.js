import { React, useEffect, useState } from 'react';

import { getAllKeywords } from '../api';

import './styles.css'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'

function Main() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsErr, setSuggestionsErr] = useState(false);
    const [sugg, setSugg] = useState("");
    const [picked, setPicked] = useState([]);

    const clear = () => {
        setTitle("");
        setText("");
        setKeywords([]);
        setSuggestions(allSuggestions);
        setPicked([]);
    }

    useEffect(()=> {
        getAllKeywords()
        .then(response => {
            setSuggestions(response.data);
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
        console.log(suggestions);
        console.log(picked);
    }

    const buttonAdd = () => {
        if (suggestions.length) {
            add(0);
        }
    }

    const submit = () => {

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
                </div>
                <div style={{'width': '50%'}}>
                    <h5>Picked keywords</h5>
                    <div>
                        {picked.map((value, index) => {
                            return(
                                <button  key={index}
                                    href={`/keywords/${value.id}`} 
                                    className="keyword-pill">
                                    {value.name}
                                </button>
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