import React from "react";
import './generalStyles.css'

function Title(props) {
    return(
        <h3 className={props.position==="home" ? "title-fixed bordered main-title-container" : "main-title-container margin-top-small"}>
            Ask me Anything
        </h3>
    )
}

export default Title;