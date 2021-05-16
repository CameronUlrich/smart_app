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

function retrieveGPUMetrics (id, model, speed, temp, memorysize, memoryused) {
    return fetch('http://localhost:3001/gpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, temp, memorysize, memoryused}),
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

function getUUID(){
    return fetch('http://localhost:3001/uuid')
}

function registerUserMachine(uid, mid){
    return fetch('http://localhost:3001/createUserMachine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid, mid}),
    })
}

function getUsers () {
    return fetch('http://localhost:3001')
}


module.exports = {
    registerMachine,
    retrieveCPUMetrics,
    retrieveGPUMetrics,
    retrieveDiskMetrics,
    retrieveMemoryMetrics,
    getUUID,
    getUsers,
    registerUserMachine
}
