import React, { Component } from 'react';
import Header from './Header';
import './styles/Home.css';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import '../globals.js';
import cookie from 'react-cookies';
import { Redirect, Route } from 'react-router-dom';

const db = require('./services/dbhelper')

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

    /**
    * Initializing values for each of our metrics to be collected
    */
    constructor(props) {
        super(props);
        this.state = {
            manufacturer: '',
            speed: 0,
            core: 0,
            physicalcores: 0,
            current: 0.0,
            gpuMan: '',
            gputemp: 0,
            gpucoreclock: 0,
            gpuMemory: 0,
            memoryTotal: 0,
            memoryFree: 0,
            memoryUsed: 0,
            disk: []
        };
    }

    
    /**
    * Calls the database for all the metrics associated with the users machine
    */
    async onRefresh(){
        const machine = await db.getMachine(cookie.load("username"));
        const userjson = await machine.json();
        
        const cpu = await db.getCpu(userjson[0].machineID)
        const cpujson = await cpu.json();

        const gpu = await db.getGpu(userjson[0].machineID)
        const gpujson = await gpu.json();

        const disk = await db.getDisk(userjson[0].machineID)
        const diskjson = await disk.json();

        const memory = await db.getMemory(userjson[0].machineID)
        const memoryjson = await memory.json()

        this.state.manufacturer = cpujson[0].cpuModel
        this.state.speed = cpujson[0].cpuSpeed
        this.state.core = cpujson[0].cpuCoreCount
        this.state.current = cpujson[0].cpuPercent

        this.state.gpuMan = gpujson[0].gpuModel
        this.state.gputemp = gpujson[0].gpuTemp
        this.state.gpucoreclock = gpujson[0].gpuSpeed
        this.state.gpuMemory = gpujson[0].gpuMemoryUsed

        this.state.memoryTotal = memoryjson[0].memorySize
        this.state.memoryFree = memoryjson[0].memoryFree
        this.state.memoryUsed = memoryjson[0].memoryUsed

        this.setState({disk: diskjson})


        this.changeCPUState()
        this.changeGPUState()
        this.changeMemoryState()
     }

    /**
    * On loading of page this function calls the onRefresh function and begins retrieving metrics from database 
    * on an interval.
    */
     async componentDidMount() {
        this.onRefresh()
        const thisBoundedRefresh = this.onRefresh.bind(this);
        this.interval = setInterval(thisBoundedRefresh, 5000);
     }

    /**
    * On unload of a page clears the interval refresh
    */
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    /**
    * Changes state of cpu values on refresh
    */
    changeCPUState(){
        this.setState({"cpuManText": this.state.manufacturer})
        this.setState({"cpuSpeedText": this.state.speed})
        this.setState({"cpuPhysCoreText": this.state.core})
        this.setState({"cpuCurrentText": this.state.current})
    }

    /**
    * Changes state of gpu values on refresh
    */
    changeGPUState(){
        this.setState({"gpuManText": this.state.gpuMan})
        this.setState({"gpuTempText": this.state.gputemp})
        this.setState({"gpuCoreText": this.state.gpucoreclock})
        this.setState({"gpuMemoryText": this.state.gpuMemory})
    }

    /**
    * Changes state of memory values on refresh
    */
    changeMemoryState(){
        this.setState({"memoryTotalText": this.state.memorySize})
        this.setState({"memoryFreeText": this.state.memoryFree})
        this.setState({"memoryUsedText": this.state.gpucoreclock})
    }

    
    /**
    * On click of the refresh button, refreshes the page
    */
    handleClick(e) {
        this.onRefresh();
    }



    render() {

        if (cookie.load('is_logged_in') === 'false' || cookie.load('is_logged_in') === undefined) {
            
            return <Redirect to='/' />
        }
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

                    <h1 id="cpuManText" className="welcome"><u>Manufacturer:</u> {this.state.manufacturer}</h1>

                    <h1 id="cpuSpeedText" className="welcome"><u>Speed:</u> {this.state.speed} GHz</h1>

                    <h1 id="cpuPhysCoreText" className="welcome"><u>Physical Cores:</u> {this.state.core}</h1>

                    <h1 id="cpuCurrentText" className="welcome"><u>Current Load:</u> {this.state.current}%</h1>

                                       


                </div>

                {/*[1] Memory Information:
                    [1] - total: 15.964290618896484 GB
                    [1] - free: 3.533428192138672 GB
                    [1] - used: 12.430862426757812 GB
                    [1] ...*/}

                <div id="memoryDiv">
                    <h1 id="memoryText" className="welcome">Memory</h1>

                    <h1 id="memoryTotalText" className="welcome"><u>Total:</u> {this.state.memoryTotal} GB</h1>

                    <h1 id="memoryFreeText" className="welcome"><u>Free:</u> {this.state.memoryFree} GB</h1>

                    <h1 id="memoryUsedText" className="welcome"><u>Used:</u> {this.state.memoryUsed} GB</h1>


                </div>


                {/* [1] GPU Information:
                    [1] - manufucturer: NVIDIA
                    [1] - model: NVIDIA GeForce GTX 1080 Ti
                    [1] - temp: 32
                    [1] - core clock: 405
                    [1] - memory: 782 GB*/}

                <div id="gpuDiv">
                    <h1 id="gpuText" className="welcome">GPU</h1>

                    <h1 id="gpuManText" className="welcome"><u>Manufacturer:</u> {this.state.gpuMan}</h1>

                    <h1 id="gpuTempText" className="welcome"><u>Temperature:</u> {this.state.gputemp} °C</h1>

                    <h1 id="gpuCoreText" className="welcome"><u>Core Clock:</u> {this.state.gpucoreclock}</h1>

                    <h1 id="gpuMemoryText" className="welcome"><u>Memory:</u> {this.state.gpuMemory} GB</h1>


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
                    
                <ol>
                    {
                        this.state.disk.map((item, key) => {
                            return <li id="diskList" key={key}><h1 id="diskMap"><u>Disk Size:</u> {item.diskSize} GB <br></br> <u>Disk Used:</u> {item.diskUsed} GB <hr id="diskLine"/> </h1></li>
                        })
                    }
                </ol>

                    

                </div>

                <button id="refreshBtn" onClick={e => this.handleClick(e)}>Refresh</button>

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