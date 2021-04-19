import React, { useState } from "react";

import './styles.css'
import '../generalStyles.css'

function RegisterBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    return(
        <div className="register-box margin-top-small">
            I am register box.
        </div>
    )
}

export default RegisterBox;