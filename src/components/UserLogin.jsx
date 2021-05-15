import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { render } from 'react-dom';  // need to install react-dom on server
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

import '../globals.js';

import './styles/Buttons.css';
import './styles/Titles.css';

import './styles/UserLogin.css';

//let isRegister = false;


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isRegister: false,
            toLoadLogin: false,
        };
    }

    saveUsername = () =>{
        cookie.save('username', this.state.username, { path: '/' });
        //__username__ = this.state.username;
    
    }

    loggedInCookie = () =>{
        cookie.save('is_logged_in', true, { path: '/' });
    }

    /* istanbul ignore next */
    registerUser = () => {
        this.state.isRegister = true;
    }

    // updates the password with whatever is in the password field
    /* istanbul ignore next */
    changeState(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    // checks to see if user exists in db
    /* istanbul ignore next */
    userLogin(username, password) {
        fetch('http://localhost:3001')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(row => {
                if (row.username === username && row.password === password) {
                    this.loginUser();
                    this.state.toLoadLogin = true;
                    console.log(this.state.toLoadLogin)
                }
            });
            if (!this.state.toLoadLogin){
                alert("Wrong username or password. Please try again.");
            }
        });
    }

    /* istanbul ignore next */
    handleClick(e) {
        console.log('The button was clicked.');
        this.userLogin(this.state.username, this.state.password);
    }

    /* istanbul ignore next */
    loginUser = () => {
        this.saveUsername();
        this.loggedInCookie();
        this.props.history.push('/home');
    }

    /* istanbul ignore next */
    render() {
        

        return (
            <div>
                <ToastContainer style={{fontSize: "20px", width: "450px", top: "100px" }} />

                <Helmet>
                    <style>{'body { background-color: #282c34; }'}</style>
                </Helmet>

                <br></br>
                <br></br>
                <br></br>

                <h1 id="welcomeText" className="welcome">Welcome to SMART!</h1>
                

                <input id="username" type="text" placeholder="Username" value={this.state.username} onChange={e => this.changeState(e)}></input>

                <br></br>
                <br></br>
                
                <input id="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.changeState(e)}></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="logInBtn" onClick={e => this.handleClick(e)}>Login</button>

                <h4 id="dontHaveText" className="welcome welcome2">Don't have an account?</h4>

                

                {/*<button id="registerBtn" onClick={this.registerUser}>Register</button>*/}

                <Link to="/register" id="registerBtn">Sign up</Link>

                
                
                

            </div>

        );
    
    }
    
}

export default withRouter(UserLogin);
