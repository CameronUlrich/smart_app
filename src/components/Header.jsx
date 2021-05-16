import React, { Component } from 'react';
//import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'; // need to install reactstrap on server
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import './styles/Header.css';
import cookie from 'react-cookies';
import UserLogin from './UserLogin';
import __username__ from '../globals.js';

const db = require('./services/dbhelper')

/*
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add( faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt )
*/

/*
[1] Machine Information:
[1] - machine id: 00000000-0000-0000-0000-4ccc6affa6b4
[1] - manudacturer: MSI
[1] - model: MS-7A70
[1] ...
*/


class Header extends Component {

    /**
    * Initializing values for each of our metrics to be displayed
    */
    constructor(props) {
        super(props);
        this.state = {
            machineID: '',
            machineMan: '',
            machineModel: ''
        };
    }

    resetCookies = () => {
        cookie.save('is_logged_in', false, {path: '/'});
        cookie.remove('username', {path: '/'});
        
    }

    logOut = () => {
        cookie.remove('username');
        cookie.save('is_logged_in', false, {path: '/'});
        console.log("logged out");
    }

    /**
    * On load of a page, it gets the users machine information
    */
    async componentDidMount(){
        const machine = await db.getMachine(cookie.load("username"));
        const userjson = await machine.json();

        const machineinfo = await db.getMachineInfo(userjson[0].machineID)
        const machinejson = await machineinfo.json();

        console.log(machinejson[0].machineID)
        console.log(machinejson)

        this.state.machineID = machinejson[0].machineID
        this.state.machineMan = machinejson[0].machineMake
        this.state.machineModel =  machinejson[0].machineModel

        this.changeMachineState()
        console.log(this.state.machineID)
    }

    /**
    * Sets the machine data for the page
    */
    changeMachineState(){
        this.setState({"machineInfo": this.state.machineID})
        this.setState({"machineInfo": this.state.machineModel})
        this.setState({"machineInfo": this.state.machineMan})
        console.log(this.state.machineID)
    }

    

    render() {
        
        return(
            <div>
                <div className="topnav">
                    <ul>
                        

                        <Link to="/home" id= "smartText" className="homeText">SMART</Link>


                        <h1 id="machineInfo">Hello {cookie.load("username")}! <u>Machine ID:</u> {this.state.machineID} {/*<u>Manufacturer:</u> {this.state.machineMan} <u>Model:</u> {this.state.machineModel}*/}</h1>


                        <Link to="/" className="logOutBtn" onClick={this.resetCookies}>Log Out</Link>
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;