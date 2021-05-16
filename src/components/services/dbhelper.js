/**
* Fetches the user information from the rest api server
*/
function getUsers () {
    return fetch('http://localhost:3001')
}

/**
* Sends a post request for a new user to the rest api server
*/
function createUser(email, username, password) {
    return fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, username, password}),
    })
}

/**
* Sends a delete user request to rest api server
* For testing purposes
*/
function deleteUser(username) {
    return fetch(`http://localhost:3001/deleteUser/${username}`, {
        method: 'DELETE',
    })
}

/**
* Fetches the cpu information from the rest api server for a given machine
*/
function getCpu (machineID) {
    return fetch(`http://localhost:3001/cpu/${machineID}`)
}

/**
* Fetches the machine UUID from the rest api server for a given machine
*/
function getMachine(username){
    return fetch(`http://localhost:3001/machineid/${username}`)
}

/**
* Fetches the disk information from the rest api server for a given machine
*/
function getDisk (machineID) {
    return fetch(`http://localhost:3001/disk/${machineID}`)
}

/**
* Fetches the memory information from the rest api server for a given machine
*/
function getMemory (machineID) {
    return fetch(`http://localhost:3001/memory/${machineID}`)
}

/**
* Fetches the gpu information from the rest api server for a given machine
*/
function getGpu(machineID) {
    return fetch(`http://localhost:3001/gpu/${machineID}`)
}

/**
* Fetches the machine information from the rest api server for a given machine
*/
function getMachineInfo(machineID) {
    return fetch(`http://localhost:3001/machineinfo/${machineID}`)
}



module.exports = {
    getUsers,
    createUser,
    deleteUser,
    getMachine,
    getCpu,
    getDisk,
    getMemory,
    getGpu,
    getMachineInfo
}
