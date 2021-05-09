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
        toLoadLogin: false
    }

    registerUser = () => {
        this.state.isRegister = true;
    }

    loginUser = () => {
        this.state.toLoadLogin = true;
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    // updates the username with whatever is in the username field
    updateUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    // updates the password with whatever is in the password field
    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    // checks to see if user exists in db
    userLogin(username, password) {
        fetch('http://localhost:3001')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(row => {
                if (row.username === username && row.password === password) {
                    this.loginUser();
                    console.log(this.state.toLoadLogin)
                }
            });
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The button was clicked.');
        this.userLogin(this.state.username, this.state.password);
      }

    render() {
        if(this.state.isRegister == true){
            return <Redirect to='/register' />
        }

        if (this.state.toLoadLogin === true) {
            console.log(true);
            return <Redirect to='/home' />
        }
        
        

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
                

                <input id="userName" type="text" placeholder="Username" value={this.state.username} onChange={e => this.updateUsername(e)}></input>

                <br></br>
                <br></br>
                
                <input id="password" type="text" placeholder="Password" value={this.state.password} onChange={e => this.updatePassword(e)}></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="logInBtn" onClick={e => this.handleClick(e)}>Login</button>

                <h4 className="welcome welcome2">Don't have an account?</h4>

                

                {/*<button id="registerBtn" onClick={this.registerUser}>Register</button>*/}

                <Link to="/register" id="registerBtn">Sign up</Link>

                
                
                

            </div>

        );
    
    }
    
}

export default UserLogin;
