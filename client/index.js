const express = require('express')
const app = express()
const port = 3002
const si = require('systeminformation');
const db = require('./services/dbhelper');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.post('/', (req, res) => {
  const { username, password } = req.body
  console.log(req.body)
  registerMachine(username, password)
})


/**
* Asks for the users username and password before their metrics begin to be collected
*/
// readline.question(`What's your username?`, username => {
//   readline.question(`What's your password?`, password => {

//     registerMachine(username, password)
//     //   setInterval(() => {
//     //     test();
//     // }, 5000);

//     readline.close()
//   })
// })

async function test() {
  try {
    const processdata = await si.processes();
    const machinedata = await si.system();



    console.log("collecting")
    for (var i = 0; i < processdata.all; i++) {
      if (processdata.list[i].cpu > 0) {
        db.retrieveActiveProcesses(machinedata.uuid,
          processdata.list[i].name,
          Math.round(processdata.list[i].cpu * 100) / 100,
          Math.round(processdata.list[i].mem * 100) / 100)
      }
    }
  }
  catch (e) {
    console.log(e)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* Registers a new machine based on a given username and password or if already registered 
* begins collecting new metrics for the device
*/
async function registerMachine(username, password) {
  try {
    isRegistered = false;
    isLoggedIn = false
    const machinedata = await si.system();
    const response = await db.getUUID();
    const uuidjson = await response.json();
    const users = await db.getUsers();
    const userjson = await users.json();
    var round = 0;

    await sleep(2000)
    uuidjson.forEach(row => {
      if (row.machineID === machinedata.uuid) {
        isRegistered = true
      }
    })

    if (!isRegistered) {
      db.registerMachine(machinedata.uuid);
      //this.state.machineid = json.machineID;

      await sleep(2000)
      userjson.forEach(row => {
        console.log(row)
        console.log(machinedata.uuid)

        if (username === row.username && password === row.password) {
          db.registerUserMachine(row.userID, machinedata.uuid)
        }

      })
    }

    await sleep(1000)

    userjson.forEach(row => {
      if (username === row.username && password === row.password) {
        isLoggedIn = true;
        console.log("Logged in! Metrics will begin collection!")
      }
    })

    if (isLoggedIn) {
      retrieveSystemMetrics(round);
      setInterval(function () {
        round++;
        retrieveSystemMetrics(round);
      }, 5000);
    }

  } catch (e) {
    console.log(e)
  }
}

/**
* Retrieves all the system information and sends it up to the database
*/
async function retrieveSystemMetrics(round) {
  try {
    const machinedata = await si.system();
    const cpudata = await si.cpu();
    const cpuload = await si.currentLoad();
    const gpudata = await si.graphics();
    const memorydata = await si.mem();
    const processdata = await si.processes();
    const diskdata = await si.fsSize();
    const diskname = await si.diskLayout();

    console.log('================================================');
    console.log('===========Metric Collection Round ' + round + '============');
    console.log('================================================\n');

    console.log('Machine Information:');
    console.log('- machine id: ' + machinedata.uuid);
    console.log('- manufacturer: ' + machinedata.manufacturer);
    console.log('- model: ' + machinedata.model);
    console.log('...\n');


    db.retrieveCPUMetrics(machinedata.uuid,
      cpudata.manufacturer + " " + cpudata.brand,
      cpudata.speed, Math.round(cpuload.currentLoad * 100) / 100,
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
      gpudata.controllers[0].clockCore / 1.0,
      gpudata.controllers[0].temperatureGpu / 1.0,
      gpudata.controllers[0].memoryTotal / 1024.0,
      Math.round(gpudata.controllers[0].memoryUsed / 1024.0 * 100) / 100);
    console.log('GPU Information:');
    console.log('- manufucturer: ' + gpudata.controllers[0].vendor);
    console.log('- model: ' + gpudata.controllers[0].model);
    console.log('- temp: ' + gpudata.controllers[0].temperatureGpu);
    console.log('- core clock: ' + gpudata.controllers[0].clockCore);
    console.log('- memory: ' + gpudata.controllers[0].memoryUsed + " GB");
    console.log('...\n');

    db.retrieveMemoryMetrics(machinedata.uuid,
      Math.round(memorydata.total / 1073741824.0 * 100) / 100,
      Math.round(memorydata.free / 1073741824.0 * 100) / 100,
      Math.round(memorydata.used / 1073741824.0 * 100) / 100)
    console.log('Memory Information:');
    console.log('- total: ' + memorydata.total / 1073741824.0 + " GB");
    console.log('- free: ' + memorydata.free / 1073741824.0 + " GB");
    console.log('- used: ' + memorydata.used / 1073741824.0 + " GB");
    console.log('...\n');

    db.deleteDiskMetrics(machinedata.uuid)
    for (var i = 0; i < diskdata.length; i++) {
      db.retrieveDiskMetrics(machinedata.uuid,
        diskname[i].type,
        Math.round(diskdata[i].size / 1073741824.0 * 100) / 100,
        Math.round(diskdata[i].free / 1073741824.0 * 100) / 100,
        Math.round(diskdata[i].used / 1073741824.0 * 100) / 100);
      console.log('Disk ' + i + ' Information:');
      console.log('- name: ' + diskname[i].name);
      console.log('- type: ' + diskname[i].type);
      console.log('- size: ' + diskdata[i].size / 1073741824.0 + " GB");
      console.log('- free: ' + diskdata[i].available / 1073741824.0 + " GB");
      console.log('- used: ' + diskdata[i].used / 1073741824.0 + " GB");
      console.log('...\n');
    }

    db.deleteActiveProcesses(machinedata.uuid)

    for (var i = 0; i < processdata.all; i++) {
      if (processdata.list[i].cpu > 0) {
        db.retrieveActiveProcesses(machinedata.uuid,
          processdata.list[i].name,
          Math.round(processdata.list[i].cpu * 100) / 100,
          Math.round(processdata.list[i].mem * 100) / 100)
      }
    }


    console.log('================================================');
    console.log('===========Metric Collection Round ' + round + '============');
    console.log('================================================\n');



  } catch (e) {
    console.log(e)
  }
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
