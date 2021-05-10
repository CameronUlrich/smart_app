import React, { Component } from 'react';
import Header from './Header';
import './styles/Home.css';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';


class Home extends Component {
    render() {
        return(
            <div>
                <Header />

                <ToastContainer style={{fontSize: "20px", width: "450px", top: "100px" }} />

                <Helmet>
                    <style>{'body { background-color: #282c34; }'}</style>
                </Helmet>

                <div id="cpuDiv">
                    <h1 id="cpuText" className="welcome">CPU</h1>

                    <h1 id="cpuCurrentText" className="welcome">Current: 32%</h1>

                    <h1 id="cpuPeakText" className="welcome">Peak: 64%</h1>

                    


                </div>

                <div id="memoryDiv">
                    <h1 id="memoryText" className="welcome">Memory</h1>

                    <h1 id="memoryCurrentText" className="welcome">Current: 32%</h1>

                    <h1 id="memoryPeakText" className="welcome">Peak: 64%</h1>


                </div>

                <div id="gpuDiv">
                    <h1 id="gpuText" className="welcome">GPU</h1>

                    <h1 id="gpuCurrentText" className="welcome">Current: 32%</h1>

                    <h1 id="gpuPeakText" className="welcome">Peak: 64%</h1>


                </div>

                <div id="diskDiv">
                    <h1 id="diskText" className="welcome">Disk</h1>

                    <h1 id="diskCurrentText" className="welcome">Current: 32%</h1>

                    <h1 id="diskPeakText" className="welcome">Peak: 64%</h1>
                </div>

                <button id="refreshBtn" >Refresh</button>
                
            </div>
        );
        
    }
}

export default Home;