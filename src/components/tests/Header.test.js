import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<BrowserRouter><Header></Header></BrowserRouter>, div)
})