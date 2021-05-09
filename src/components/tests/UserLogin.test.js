import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserLogin from './../UserLogin';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><UserLogin></UserLogin></BrowserRouter>, div)
})