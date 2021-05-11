const si = require('systeminformation');
const db = require('./services/dbhelper');

// promises style - new since version 3
function retrieveMetrics(){
    si.cpu().then(data => {console.log(data)});
    si.graphics().then(data => {console.log(data)});
    si.cpuCurrentSpeed().then(data => {console.log(data)});

}

// registers a new machine
async function registerMachine() {
    try {
      const machinedata = await si.system();
      const machineos = await si.osInfo();
      const register = await db.registerMachine(machinedata.uuid, machinedata.manufacturer, machineos.platform, machinedata.model);
      console.log(register);
  
    } catch (e) {
      console.log(e)
    }
  }


async function retrieveSystemMetrics() {
  try {
    const machinedata = await si.system();
    const cpudata = await si.cpu();
    const cpuload = await si.currentLoad();
    const gpudata = await si.graphics();
    const memorydata = await si.mem();
    const processdata = await si.processes();
    const servicedata = await si.services();
    const diskdata = await si.fsSize();
    const networkdata = await si.networkInterfaces();

    console.log('================================================');
    console.log('=============Metric Collection Begin============');
    console.log('================================================\n');

    console.log('Machine Information:');
    console.log('- machine id: ' + machinedata.uuid);
    console.log('- manudacturer: ' + machinedata.manufacturer);
    console.log('- model: ' + machinedata.model);
    console.log('...\n');


    const retrieveCPU = db.retrieveCPUMetrics(machinedata.uuid, cpudata.manufacturer + " " + cpudata.brand,  cpudata.speed, cpuload.currentLoad, cpudata.physicalCores)
    console.log(retrieveCPU);
    console.log('CPU Information:');
    console.log('- manufacturer: ' + cpudata.manufacturer);
    console.log('- brand: ' + cpudata.brand);
    console.log('- speed: ' + cpudata.speed);
    console.log('- cores: ' + cpudata.cores);
    console.log('- percent: ' + cpuload.currentLoad);
    console.log('- physical cores: ' + cpudata.physicalCores);
    console.log('...\n');
    

    console.log('GPU Information:');
    console.log('- manufucturer: ' + gpudata.controllers[0].vendor);
    console.log('- model: ' + gpudata.controllers[0].model);
    console.log('- temp: ' + gpudata.controllers[0].temperatureGpu);
    console.log('- speed: ' + gpudata.controllers[0].clockCore);
    console.log('- memory: ' + gpudata.controllers[0].memoryUsed);
    console.log('...\n');

    console.log('Memory Information:');
    console.log('- total: ' + memorydata.total/1073741824.0 + " GB");
    console.log('- free: ' + memorydata.free/1073741824.0 + " GB");
    console.log('- used: ' + memorydata.used/1073741824.0 + " GB");
    console.log('- cached: ' + memorydata.cached);
    console.log('...\n');

    for (var i = 0; i < diskdata.length; i ++){
        console.log('Disk ' + i  + ' Information:');
        console.log('- type: ' + diskdata[i].type);
        console.log('- size: ' + diskdata[i].size/1073741824.0 + " GB");
        console.log('- free: ' + diskdata[i].available/1073741824.0 + " GB");
        console.log('- used: ' + diskdata[i].used/1073741824.0 + " GB");
        console.log('...\n');
    }

    console.log('Network Information:');
    console.log('- card: ' + networkdata[1].ifaceName);
    console.log('- upload: ' + networkdata[1].operstate);
    console.log('- download: ' + networkdata[1].speed);
    console.log('...\n');


    console.log('================================================');
    console.log('==============Metric Collection End=============');
    console.log('================================================\n');

    

  } catch (e) {
    console.log(e)
  }
}

registerMachine();
setInterval(function() {
    retrieveSystemMetrics();
  }, 10000);