import React, { useEffect, useState } from 'react';
import AddMain from './AddMain';
import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import { getQuestions } from '../api';

function AddSkeleton(props) {

    const [id, setId] = useState(parseInt(props.id));
    const [questions, setQuestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    useEffect(() => {
        getQuestions()
        .then(response => {
            setQuestions(response.data);
        })
        .catch(err => {
            setQuestions([]);
        })
    }, [])

    return(
        <div className="all-page">
            <MyNavbar />
            <h4 className="margin-left margin-top-smaller">Answer a question</h4>
            <div className='flex-layout center-content'>
                <h5 className="margin-left margin-right margin-top-smaller">Select question</h5>
                <select 
                    style={{ 'padding': '7px' }}
                    value={id}
                    onChange={(event)=>{setId(event.target.value);}}>
                    {   questions.map((value, index) => {
                            return (
                                <option key={index} value={value.id}>({index+1}){value.title}</option>
                            )
                        })
                    }
                </select>
            </div>
            
            <AddMain id={ id }/>
            <Footer />
        </div>
    )
}

export default AddSkeleton;