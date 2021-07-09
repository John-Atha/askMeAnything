import React from 'react';

import '../generalStyles.css';
import './styles.css';

import MyNavbar from '../Navbar/MyNavbar';
import Footer from '../Footer/Footer';
import Button from 'react-bootstrap/Button';

function AboutText() {
    const usingSOA = !localStorage.getItem('api') || localStorage.getItem('api')==='soa';

    const updateArch = () => {
        localStorage.clear();
        localStorage.setItem('api', usingSOA ? 'microservices' : 'soa');
        setTimeout(() => {
            window.location.href='/';
        }, 200);
    }

    return(
        <div className='center-content about-container margin-top'>
        <p>
            Hello, my name is John Athanasiou. <br/>
            This is my final project for the Software as a Service 2020-2021 course<br/>
            of the Electrical and Computer Engineering department of National Technical University of Athens.
        </p>
        <p>
            I have built a web app like Stack Overflow using two different back-end architectures.<br/>
            I have used the SOA and the microservices architecture.
        </p>
        <p>
            { usingSOA && 
                <p>
                    By default, the front-end uses the SOA back-end.
                </p>
            }
            { !usingSOA &&
                <p>
                    Right now, you are using the microservices back-end.
                </p>
            }
            If you would like to test the { usingSOA ? 'microservices architecture' : 'SOA' }, click on the following button.<br/>
            Note: <br/>
            The two versions use different databases,<br/>
            so don't expect to find the same questions and answers, or use the same account.
        </p>
        <Button variant='outline-primary' onClick={updateArch}>
            Turn to { usingSOA ? 'microservices' : 'SOA' }
        </Button>
    </div>
    )
}


function About() {
    return(
        <div className="home-container">
            <MyNavbar />
            <div style={{'paddingTop': '70px'}} />
            <AboutText />
            <div style={{'paddingBottom': '100px'}} />
            <Footer />
        </div>
    )
}

export default About;