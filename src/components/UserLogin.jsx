import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { render } from 'react-dom';  // need to install react-dom on server
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

import './styles/Buttons.css';
import './styles/Titles.css';

import './styles/UserLogin.css';

export default class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            toLoadLogin: false
        };
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    updatePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    userLogin(username, password) {
        fetch('http://localhost:3001')
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(row => {
                if (row.username === username && row.password === password) {
                    // console.log(true);
                    // this.context.router.transitionTo('/home');
                    
                    this.state.toLoadLogin = true;
                    console.log(this.state.toLoadLogin)
                }
                // else{
                //     console.log(data);
                //     console.log(username);
                //     console.log(password);
                // }
            });
        });
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The button was clicked.');
        this.userLogin(this.state.username, this.state.password);
      }

    
    
    render() {
        
        const { navigate } = this.state.toLoadLogin;

        if (navigate === true) {
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
                <h2 className="welcome welcome2"> </h2>

                <input id="userName" type="text" placeholder="Username" value={this.state.username} onChange={e => this.updateUsername(e)}></input>

                <br></br>
                <br></br>
                

                <input id="password" type="text" placeholder="Password" value={this.state.password} onChange={e => this.updatePassword(e)}></input>
                
                <br></br>
                <br></br>
                <br></br>

                <button id="logInBtn" onClick={e => this.handleClick(e)}>Login</button>
                

            </div>

        );
    
    }
    
}

