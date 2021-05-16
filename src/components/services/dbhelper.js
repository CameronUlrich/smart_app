
function getUsers () {
    return fetch('http://localhost:3001')
}

function createUser(email, username, password) {
    return fetch('http://localhost:3001/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, username, password}),
    })
}

function deleteUser(username) {
    return fetch(`http://localhost:3001/deleteUser/${username}`, {
        method: 'DELETE',
    })
}

function getCpu (machineID) {
    return fetch(`http://localhost:3001/cpu/${machineID}`)
}

function getMachine(username){
    return fetch(`http://localhost:3001/machineid/${username}`)
}

function getDisk (machineID) {
    return fetch(`http://localhost:3001/disk/${machineID}`)
}

function getMemory (machineID) {
    return fetch(`http://localhost:3001/memory/${machineID}`)
}

function getGpu(machineID) {
    return fetch(`http://localhost:3001/gpu/${machineID}`)
}



module.exports = {
    getUsers,
    createUser,
    deleteUser,
    getMachine,
    getCpu,
    getDisk,
    getMemory,
    getGpu

}
