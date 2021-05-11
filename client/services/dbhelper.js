const fetch = require("node-fetch");

function registerMachine (id, manufacturer, os, model) {
    console.log(id);
    return fetch('http://localhost:3001/createMachine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, manufacturer, os, model}),
    })
}

function retrieveCPUMetrics (id, model, speed, percent, corecount) {
    console.log(id);
    return fetch('http://localhost:3001/cpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, percent, corecount}),
    })
}

function retrieveGPUMetrics (id, manufacturer, model) {
    console.log(id);
    return fetch('http://localhost:3001/gpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, manufacturer, model}),
    })
}

module.exports = {
    registerMachine,
    retrieveCPUMetrics,
    retrieveGPUMetrics
}
