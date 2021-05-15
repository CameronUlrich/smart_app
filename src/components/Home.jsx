import React, { Component } from 'react';
import Header from './Header';
import './styles/Home.css';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import '../globals.js';

/*
[1] ================================================
[1] =============Metric Collection Begin============
[1] ================================================
[1]
[1] Machine Information:
[1] - machine id: 00000000-0000-0000-0000-4ccc6affa6b4
[1] - manudacturer: MSI
[1] - model: MS-7A70
[1] ...
[1]
[1] CPU Information:
[1] - manufacturer: Intel®
[1] - brand: Core™ i7-7700K
[1] - speed: 4.2
[1] - cores: 8
[1] - percent: 5.520995279878921
[1] - physical cores: 4
[1] ...
[1]
[1] GPU Information:
[1] - manufucturer: NVIDIA
[1] - model: NVIDIA GeForce GTX 1080 Ti
[1] - temp: 32
[1] - core clock: 405
[1] - memory: 782 GB
[1] ...
[1]
[1] Memory Information:
[1] - total: 15.964290618896484 GB
[1] - free: 3.533428192138672 GB
[1] - used: 12.430862426757812 GB
[1] ...
[1]
[1] Disk 0 Information:
[1] - type: ssd
[1] - size: 111.18651962280273 GB
[1] - free: 10.817230224609375 GB
[1] - used: 100.36928939819336 GB
[1] ...
[1]
[1] Disk 1 Information:
[1] - type: hdd
[1] - size: 931.3867149353027 GB
[1] - free: 57.03184127807617 GB
[1] - used: 874.3548736572266 GB
[1] ...
[1]
[1] Disk 2 Information:
[1] - type: hdd
[1] - size: 3726.0058555603027 GB
[1] - free: 2994.9268646240234 GB
[1] - used: 731.0789909362793 GB
[1] ...
[1]
[1] ================================================
[1] ==============Metric Collection End=============
[1] ================================================

*/


class Home extends Component {

    render() {
        return(
            <div>
                <Header />

                <ToastContainer style={{fontSize: "20px", width: "450px", top: "100px" }} />

                <Helmet>
                    <style>{'body { background-color: #282c34; }'}</style>
                </Helmet>

                {/* [1] CPU Information:
                    [1] - manufacturer: Intel®
                    [1] - brand: Core™ i7-7700K
                    [1] - speed: 4.2
                    [1] - cores: 8
                    [1] - percent: 5.520995279878921
                    [1] - physical cores: 4
                    [1] ...*/}

                

                <div id="cpuDiv">
                    <h1 id="cpuText" className="welcome">CPU</h1>

                    <h1 id="cpuManText" className="welcome"><u>Manufacturer:</u></h1>

                    <h1 id="cpuBrandText" className="welcome"><u>Brand:</u></h1>

                    <h1 id="cpuSpeedText" className="welcome"><u>Speed:</u></h1>

                    <h1 id="cpuCoreText" className="welcome"><u>Core:</u></h1>

                    <h1 id="cpuPhysCoreText" className="welcome"><u>Physical Cores:</u></h1>

                    <h1 id="cpuCurrentText" className="welcome"><u>Current:</u></h1>

                                       


                </div>

                {/*[1] Memory Information:
                    [1] - total: 15.964290618896484 GB
                    [1] - free: 3.533428192138672 GB
                    [1] - used: 12.430862426757812 GB
                    [1] ...*/}

                <div id="memoryDiv">
                    <h1 id="memoryText" className="welcome">Memory</h1>

                    <h1 id="memoryTotalText" className="welcome"><u>Total:</u></h1>

                    <h1 id="memoryFreeText" className="welcome"><u>Free:</u></h1>

                    <h1 id="memoryUsedText" className="welcome"><u>Used:</u></h1>


                </div>


                {/* [1] GPU Information:
                    [1] - manufucturer: NVIDIA
                    [1] - model: NVIDIA GeForce GTX 1080 Ti
                    [1] - temp: 32
                    [1] - core clock: 405
                    [1] - memory: 782 GB*/}

                <div id="gpuDiv">
                    <h1 id="gpuText" className="welcome">GPU</h1>

                    <h1 id="gpuManText" className="welcome"><u>Manufacturer:</u></h1>

                    <h1 id="gpuModelText" className="welcome"><u>Model:</u></h1>

                    <h1 id="gpuTempText" className="welcome"><u>Temperature:</u></h1>

                    <h1 id="gpuCoreText" className="welcome"><u>Core Clock:</u></h1>

                    <h1 id="gpuMemoryText" className="welcome"><u>Memory:</u></h1>


                </div>

                {/*[1] Disk 0 Information:
                    [1] - type: ssd
                    [1] - size: 111.18651962280273 GB
                    [1] - free: 10.817230224609375 GB
                    [1] - used: 100.36928939819336 GB*/ }

                <div id="diskTextDiv">

                    <h1 id="diskText" className="welcome">Disks</h1>
                </div>

                <div id="diskDiv" class="line">
                    

                    <h1 id="disk0TypeText" className="welcome"><u>Type:</u></h1>

                    <h1 id="disk0SizeText" className="welcome"><u>Size:</u></h1>

                    <h1 id="disk0FreeText" className="welcome"><u>Free:</u></h1>

                    <h1 id="disk0UsedText" className="welcome"><u>Used:</u></h1>

                    <hr id="diskLine"/>

                    <h1 id="disk1TypeText" className="welcome"><u>Type:</u></h1>

                    <h1 id="disk1SizeText" className="welcome"><u>Size:</u></h1>

                    <h1 id="disk1FreeText" className="welcome"><u>Free:</u></h1>

                    <h1 id="disk1UsedText" className="welcome"><u>Used:</u></h1>

                    <hr id="diskLine"/>

                    <h1 id="disk2TypeText" className="welcome"><u>Type:</u></h1>

                    <h1 id="disk2SizeText" className="welcome"><u>Size:</u></h1>

                    <h1 id="disk2FreeText" className="welcome"><u>Free:</u></h1>

                    <h1 id="disk2UsedText" className="welcome"><u>Used:</u></h1>

                    <hr id="diskLine"/>

                    <h1 id="disk3TypeText" className="welcome"><u>Type:</u></h1>

                    <h1 id="disk3SizeText" className="welcome"><u>Size:</u></h1>

                    <h1 id="disk3FreeText" className="welcome"><u>Free:</u></h1>

                    <h1 id="disk3UsedText" className="welcome"><u>Used:</u></h1>

                </div>

                <button id="refreshBtn">Refresh</button>

                <div id="refreshDiv">

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
                </div>

                <div id="processDiv">

                    <h1 id="processesText" className="welcome">Processes</h1>
                </div>
                
            </div>
        );
        
    }
}

export default Home;