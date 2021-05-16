const si = require('systeminformation');
const db = require('./services/dbhelper');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})


var answer = false;
readline.question(`What's your username?`, username => {
  readline.question(`What's your password?`, password => {

    console.log(username + password)
    registerMachine(username, password);
    
    readline.close()
  })
})

var round = 0;

// promises style - new since version 3
function retrieveMetrics(){
    si.cpu().then(data => {console.log(data)});
    si.graphics().then(data => {console.log(data)});
    si.cpuCurrentSpeed().then(data => {console.log(data)});

}

// registers a new machine
async function registerMachine(username, password) {
    try {
      isRegistered = false;
      isLoggedIn = false
      const machinedata = await si.system();
      const machineos = await si.osInfo();
      const response = await db.getUUID();
      const uuidjson = await response.json();
      const users = await db.getUsers();
      const userjson = await users.json();
      var round = 0;

      console.log(machinedata)
      console.log(uuidjson)
      console.log(round)
        
      uuidjson.forEach(row => {
        if(row.machineID === machinedata.uuid) {
          isRegistered = true
        }
      })
      
      console.log(isRegistered)
      if (!isRegistered){
        db.registerMachine(machinedata.uuid, 
          machinedata.manufacturer, 
          machineos.platform, 
          machinedata.model);
          //this.state.machineid = json.machineID;
        

        userjson.forEach(row => {
          if (username === row.username && password === row.password){
            console.log(row)
            db.registerUserMachine(row.userID, machinedata.uuid)
          }
          else {
            console.log("Username or passoword is incorrect, please try again.")
          }
        })
      }

      userjson.forEach(row => {
        if (username === row.username && password === row.password){
          isLoggedIn = true;
        }        
      })

      if(isLoggedIn){
        setInterval(function() {
          retrieveSystemMetrics(round);
          round++;
        }, 10000);
      }


      
    } catch (e) {
      console.log(e)
    }
  }
// retrieves all of the system information 
async function retrieveSystemMetrics(round) {
  try {
    const machinedata = await si.system();
    const cpudata = await si.cpu();
    const cpuload = await si.currentLoad();
    const gpudata = await si.graphics();
    const memorydata = await si.mem();
    const processdata = await si.processes();
    const servicedata = await si.services();
    const diskdata = await si.fsSize();
    const diskname = await si.diskLayout();

    console.log('================================================');
    console.log('===========Metric Collection Round ' + round +'============');
    console.log('================================================\n');

    console.log('Machine Information:');
    console.log('- machine id: ' + machinedata.uuid);
    console.log('- manufacturer: ' + machinedata.manufacturer);
    console.log('- model: ' + machinedata.model);
    console.log('...\n');


    db.retrieveCPUMetrics(machinedata.uuid, 
        cpudata.manufacturer + " " + cpudata.brand,  
        cpudata.speed, cpuload.currentLoad, 
        cpudata.physicalCores)
    console.log('CPU Information:');
    console.log('- manufacturer: ' + cpudata.manufacturer);
    console.log('- brand: ' + cpudata.brand);
    console.log('- speed: ' + cpudata.speed);
    console.log('- cores: ' + cpudata.cores);
    console.log('- percent: ' + cpuload.currentLoad);
    console.log('- physical cores: ' + cpudata.physicalCores);
    console.log('...\n');
    
    db.retrieveGPUMetrics(machinedata.uuid, 
        gpudata.controllers[0].model, 
        gpudata.controllers[0].clockCore/1.0, 
        gpudata.controllers[0].temperatureGpu/1.0, 
        gpudata.controllers[0].memoryTotal/1024.0,
        Math.round(gpudata.controllers[0].memoryUsed/1024.0 * 100) / 100);
    console.log('GPU Information:');
    console.log('- manufucturer: ' + gpudata.controllers[0].vendor);
    console.log('- model: ' + gpudata.controllers[0].model);
    console.log('- temp: ' + gpudata.controllers[0].temperatureGpu);
    console.log('- core clock: ' + gpudata.controllers[0].clockCore);
    console.log('- memory: ' + gpudata.controllers[0].memoryUsed + " GB");
    console.log('...\n');

    db.retrieveMemoryMetrics(machinedata.uuid,
        Math.round(memorydata.total/1073741824.0 * 100) / 100,
        Math.round(memorydata.free/1073741824.0 * 100) / 100,
        Math.round(memorydata.used/1073741824.0 * 100) / 100)
    console.log('Memory Information:');
    console.log('- total: ' + memorydata.total/1073741824.0 + " GB");
    console.log('- free: ' + memorydata.free/1073741824.0 + " GB");
    console.log('- used: ' + memorydata.used/1073741824.0 + " GB");
    console.log('...\n');

    for (var i = 0; i < diskdata.length; i ++){
        db.retrieveDiskMetrics(machinedata.uuid, 
            diskname[i].type, 
            Math.round(diskdata[i].size/1073741824.0 * 100) / 100, 
            Math.round(diskdata[i].free/1073741824.0 * 100) / 100, 
            Math.round(diskdata[i].used/1073741824.0 * 100) / 100);
        console.log('Disk ' + i  + ' Information:');
        console.log('- name: ' + diskname[i].name);
        console.log('- type: ' + diskname[i].type);
        console.log('- size: ' + diskdata[i].size/1073741824.0 + " GB");
        console.log('- free: ' + diskdata[i].available/1073741824.0 + " GB");
        console.log('- used: ' + diskdata[i].used/1073741824.0 + " GB");
        console.log('...\n');
    }
    

    // console.log('Network Information:');
    // console.log('- card: ' + networkdata[1].ifaceName);
    // console.log('- upload: ' + networkdata[1].operstate);
    // console.log('- download: ' + networkdata[1].speed);
    // console.log('...\n');

    // console.log('Process Information:');
    // var count = 0;
    // for (var i = 0; processdata.list.length; i++) {
    //     if(count < 15){
    //         if (processdata.list[i].cpu > 0.1) {
    //             console.log("- process " + count + ": name: " + processdata.list[i].name + 
    //                 " || cpu usage: " + processdata.list[i].cpu + " || memory usage: " + processdata.list[i].mem);
    //             count++;
    //         }
    //     }
    // }



    console.log('================================================');
    console.log('===========Metric Collection Round ' + round +'============');
    console.log('================================================\n');

    

  } catch (e) {
    console.log(e)
  }
}
