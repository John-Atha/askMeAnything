import { React, useState } from 'react';
import './styles.css'
import Button from 'react-bootstrap/Button';

function Main() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState([]);

    const clear = () => {
        setTitle("");
        setText("");
        setKeywords([]);
    }

    const submit = () => {

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
            <div className="margin-top-smaller container-width">
                <h5 className="question-specs-title" >Keywords</h5>
                <div className="question-specs-explanation">Adding relevant keywords helps us show your question to the most appropriate part of our community.</div>
                <textarea style={{'minHeight': '50px'}} className="bordered-input" name="keywords" value={keywords} onChange={(event)=>{setKeywords(event.target.value)}} />
            </div>
            <div className="flex-layout" style={{'position': 'absolute', 'right': '10px', 'bottom': '-60px'}}>
                <Button style={{'margin': '10px'}} variant="outline-primary" onClick={submit}>Submit</Button>
                <Button style={{'margin': '10px'}} variant="outline-danger" onClick={clear}>Clear</Button>
            </div>
        </div>
    )
}

export default Main;