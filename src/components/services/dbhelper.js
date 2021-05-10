
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

module.exports = {
    getUsers,
    createUser,
    deleteUser
}
