import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { render } from 'react-dom';  // need to install react-dom on server
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

import './styles/Buttons.css';
import './styles/Titles.css';

import './styles/UserLogin.css';

class UserLogin extends Component {

    render() {
        /*

        if (this.state.toLoadLogin === true) {
            return <Redirect to='/loadlogin' />
        }
        */

        

        return (
            <div>
                <ToastContainer style={{fontSize: "20px", width: "450px", top: "100px" }} />

                <Helmet>
                    <style>{'body { background-color: #282c34; }'}</style>
                </Helmet>

                <br></br>
                <br></br>
                <br></br>

                <h1 className="welcome">Welcome to SMART!</h1>
                <h2 className="welcome welcome2"> </h2>

                <input id="userName" type="text" placeholder="Username" ></input>

                <br></br>
                <br></br>
                

                <input id="password" type="text" placeholder="Password" ></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="logInBtn">Login</button>

                
                

            </div>

        );

        
    
    }
}

export default UserLogin;