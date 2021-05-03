import React, { Component } from 'react';
//import { Navbar, Nav, NavItem, NavLink } from 'reactstrap'; // need to install reactstrap on server
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import './styles/Header.css';
import cookie from 'react-cookies';

/*
import { library } from '@fortawesome/fontawesome-svg-core'
//import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add( faUser, faUsers, faUserFriends, faCog, faUserShield, faHome, faSignOutAlt )
*/




class Header extends Component {

    resetCookies = () => {
        cookie.save('_is_logged_in', false, {path: '/'});
        //cookie.remove('_user_email', {path: '/'});
        
    }

    render() {
        return(
            <div>
                <div className="topnav">
                    <ul>
                        

                        <Link to="/home" className="homeText">SMART</Link>
                        <Link to="/" className="logOutBtn">Log Out</Link>
                        
                    </ul>
                </div>
            </div>
        );
        
    }
}

export default Header;