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

                    <h1 id="diskUsedText" className="welcome">Used: 32%</h1>

                    <h1 id="diskTotalText" className="welcome">Total: 1000G</h1>

                    <h1 id="diskAvailText" className="welcome">Avail: 428G</h1>
                </div>

                <button id="refreshBtn">Refresh</button>

                <h1 id="dropDownText" htmlFor="dropDownText">Refresh Rate (in seconds): </h1>

                <select name="dropDownOptions" id="dropDownOptions" defaultValue={'5'}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <h1 id="processesText" className="welcome">Processes</h1>
                
            </div>
        );
        
    }
}

export default Home;