const fetch = require("node-fetch");

/**
* Sends a post request to rest api server to register a new machine
*/
function registerMachine (id) {
    return fetch('http://localhost:3001/createMachine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
    })
}

// function registerMachine (id, manufacturer, os, model) {
//     return fetch('http://localhost:3001/createMachine', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({id, manufacturer, os, model}),
//     })
// }

/**
* Sends a post request to rest api server to upload newly collected cpu metrics
*/
function retrieveCPUMetrics (id, model, speed, percent, corecount) {
    return fetch('http://localhost:3001/cpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, percent, corecount}),
    })
}

/**
* Sends a post request to rest api server to upload newly collected gpu metrics
*/
function retrieveGPUMetrics (id, model, speed, temp, memorysize, memoryused) {
    return fetch('http://localhost:3001/gpuMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, model, speed, temp, memorysize, memoryused}),
    })
}

/**
* Sends a post request to rest api server to upload newly collected disk metrics
*/
function retrieveDiskMetrics (id, type, size, free, used) {
    return fetch('http://localhost:3001/diskMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, type, size, free, used}),
    })
}

/**
* Sends a post request to rest api server to upload newly collected memory metrics
*/
function retrieveMemoryMetrics (id, size, free, used) {
    return fetch('http://localhost:3001/memoryMetrics', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, size, free, used}),
    })
}

/**
* Fetches the UUIS of every machine to see if it's already registered
*/
function getUUID(){
    return fetch('http://localhost:3001/uuid')
}

/**
* Registers a new machine to a user
*/
function registerUserMachine(uid, mid){
    return fetch('http://localhost:3001/createUserMachine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({uid, mid}),
    })
}

/**
* Registers a new machine to a user
*/
function retrieveActiveProcesses(id, name, cpu, mem){
    return fetch('http://localhost:3001/processes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id, name, cpu, mem}),
    })
}

function deleteActiveProcesses(id) {
    return fetch(`http://localhost:3001/deleteprocesses/${id}`, {
        method: 'DELETE'
    })
}

/**
* Make sure the user exists in the database
*/
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
    registerUserMachine,
    retrieveActiveProcesses,
    deleteActiveProcesses
}
