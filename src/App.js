import logo from './logo.svg';
import './App.css';
import React from 'react';
import './components/styles/Header.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import Home from './components/Home';
import UserLogin from './components/UserLogin';

const LoginPage = () => <UserLogin/>
const HomePage = () => <Home/>

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/home" component={HomePage}/>
        
        
          
          
          
        
      </div>
    </Router>
  );
}

export default App;
