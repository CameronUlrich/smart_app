const fetch = require("node-fetch");

function registerMachine (id, manufacturer, os, model) {
    return fetch('http://localhost:3001/createMachine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, manufacturer, os, model}),
    })
}

function retrieveCPUMetrics (id, model, speed, percent, corecount) {
    return fetch('http://localhost:3001/cpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, percent, corecount}),
    })
}

function retrieveGPUMetrics (id, model, speed, temp, memory) {
    return fetch('http://localhost:3001/gpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, temp, memory}),
    })
}

function retrieveDiskMetrics (id, type, size, free, used) {
    return fetch('http://localhost:3001/diskMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, type, size, free, used}),
    })
}

function retrieveMemoryMetrics (id, size, free, used) {
    return fetch('http://localhost:3001/memoryMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, size, free, used}),
    })
}

module.exports = {
    registerMachine,
    retrieveCPUMetrics,
    retrieveGPUMetrics,
    retrieveDiskMetrics,
    retrieveMemoryMetrics
}
