import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom'
import { render } from 'react-dom';  // need to install react-dom on server
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

import './styles/Buttons.css';
import './styles/Titles.css';

import './styles/UserLogin.css';

//let isRegister = false;

class UserLogin extends Component {

    state = {
        isRegister: false,
    }

    

    
    

    registerUser = () => {
        this.state.isRegister = true;


    }

    render() {
        if(this.state.isRegister == true){
            return <Redirect to='/register' />
        }
        


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
                

                <input id="userName" type="text" placeholder="Username" ></input>

                <br></br>
                <br></br>
                

                <input id="password" type="password" placeholder="Password" ></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="logInBtn">Login</button>

                <h4 className="welcome welcome2">Don't have an account?</h4>

                

                {/*<button id="registerBtn" onClick={this.registerUser}>Register</button>*/}

                <Link to="/register" id="registerBtn">Sign up</Link>

                
                

            </div>

        );

        
    
    }
}

export default UserLogin;