import React, { Component } from 'react';
import { withRouter} from 'react-router-dom'
import { render } from 'react-dom';  // need to install react-dom on server
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

import './styles/Buttons.css';
import './styles/Titles.css';

import './styles/UserRegister.css';

class UserRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            exists: false
        };
    }


    /**
    * Changes the state of the input field being modified
    */
    changeState(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    /**
    * Returns user to login page
    */
    registerUser = () => {
        this.props.history.push('/');
    }

    /**
    * On click registers a new user
    */
    handleClick(e) {
        this.userRegister(this.state.email, this.state.username, this.state.password);
    }

    /**
    * Registers a new user and checks to make sure they don't already have an account
    * or if another user has already created an account with that username
    */
    userRegister(email, username, password) {
        fetch('http://localhost:3001')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(row => {
                // checks to see if the email exists in the database
                if (row.email === email) {
                    alert("Email is already registered under another account. Please choose another.");
                    this.state.exists = true;
                }
                // checks to see if the username exists in the database
                else if (row.username === username){
                    alert("Username is already registered under another account. Please choose another.");
                    this.state.exists = true;
                }
                else {
                    this.state.exists = false;
                }
            })
        })
        if (!this.state.exists){
            fetch('http://localhost:3001/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password}),
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.registerUser();
            });
        }
    }
    
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

                <h1 id="registerText" className="welcome">Register</h1>

                <label id="userText">Email: </label>
                

                <input id="email" type="text" placeholder="Email" value={this.state.email} onChange={e => this.changeState(e)}></input>

                <br></br>
                <br></br>
                
                <label id="userText">Username: </label>
                

                <input id="username" type="text" placeholder="Username" value={this.state.username} onChange={e => this.changeState(e)}></input>

                <br></br>
                <br></br>

                <label id="passText">Password:  </label>
                
                
                <input id="password" type="password" placeholder="Password" value={this.state.password} onChange={e => this.changeState(e)}></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="createBtn" onClick={e => this.handleClick(e)}>Create account</button>


            </div>

        );
    
    }
}

export default withRouter(UserRegister);