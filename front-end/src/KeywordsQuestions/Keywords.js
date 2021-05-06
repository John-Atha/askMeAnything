import React, { useState, useEffect } from 'react';

import { getAllKeywords } from '../api';

import KeywordQuestions from '../KeywordQuestions/KeywordQuestions';

import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'


function Keywords() {
    const [current, setCurrent] = useState(null);
    const [currentName, setCurrentName] = useState('');
    const [all, setAll] = useState([]);
    const [error, setError] = useState(false);
    const [sugg, setSugg] = useState('');
    const [show, setShow] = useState(false);

    const getAll = () => {
        getAllKeywords()
        .then(response=> {
            console.log(response);
            setAll(response.data);
            setError(!response.data.length);
            setCurrent(response.data[0].id);
            setCurrentName(response.data[0].name);
        })
        .catch(err => {
            setError(true);
        }) 
    }

    useEffect(()=> {
        getAll();
    }, [])

    const match = (s) => {
        if (sugg) {
            return( s.startsWith(sugg.charAt(0).toUpperCase()+sugg.slice(1)) ||
                    s.startsWith(sugg.charAt(0).toLowerCase()+sugg.slice(1)));
        }
        else {
            return true;
        }
    }

    const choose = (index) => {
        setCurrent(all[index].id);
        setCurrentName(all[index].name)
    }

    const buttonAdd = () => {
        if (all.length) {
            for (let i=0; i<all.length; i++) {
                if (match(all[i].name)) {
                    choose(i);
                    setSugg(all[i].name);
                    break;
                }
            }
            setShow(false);
        }
    }

    return(
        <div className="main-page margin-top-small center-content">
            
            <h3>Questions per keyword</h3>
                <div className="margin-top-small" style={{'marginLeft': 'auto', 'marginRight': 'auto', 'width': '350px'}}>
                    <Form onSubmit={(event) => {event.preventDefault(); buttonAdd();}} className="flex-layout marign-top-smaller">
                        <FormControl 
                            style={{'width': '250px'}}
                            type='text'
                            placeholder='Seacrh for a keyword'
                            value={sugg}
                            className="mr-sm-2"
                            onChange={(event) => {setSugg(event.target.value); setShow(true);}}
                            onFocus={()=>{setShow(true)}}
                            onBlur={()=>{setShow(false)}}
                        />
                        <Button 
                            variant='outline-dark'
                            onClick={buttonAdd}>
                                Search
                        </Button>
                    </Form>
                    { error &&
                        <div className="margin-top-smaller error-message">No keywords found.</div>
                    }
                    { !error && show &&
                        <div id="suggestions-box">
                            {all.map((value, index) => {
                                if (match(value.name)) {
                                    return(
                                        <button 
                                            className="button-as-link"
                                            key={index}
                                            onClick={()=>{choose(index)}}>
                                                {value.name}
                                        </button>
                                    )
                                }
                            })}
                        </div>
                    }
                </div>

            <KeywordQuestions id={current} name={currentName} />
        </div>
    )
}

export default Keywords;