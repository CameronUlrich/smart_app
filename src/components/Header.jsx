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

/*
[1] Machine Information:
[1] - machine id: 00000000-0000-0000-0000-4ccc6affa6b4
[1] - manudacturer: MSI
[1] - model: MS-7A70
[1] ...
*/


class Header extends Component {

    /* istanbul ignore next */
    resetCookies = () => {
        cookie.save('_is_logged_in', false, {path: '/'});
        //cookie.remove('_user_email', {path: '/'});
        
    }

    render() {
        return(
            <div>
                <div className="topnav">
                    <ul>
                        

                        <Link to="/home" id= "smartText" className="homeText">SMART</Link>


                        <h1 id="machineInfo">Hello ! <u>Machine ID:</u> <u>Manufacturer:</u> <u>Model:</u></h1>


                        <Link to="/" className="logOutBtn">Log Out</Link>
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default Header;