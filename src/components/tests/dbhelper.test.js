const helper = require("../services/dbhelper");
const helperclient = require("../../../client/services/dbhelper")

const email = "test", username = "test", password = "test";

test("Testing adding a user to the Database.", () => {

    helper.createUser(email, username, password).then(response => { return response.json()}).then(data => {
        expect(email).toEqual(data.email);
        expect(username).toEqual(data.username);
        expect(password).toEqual(data.password);
        console.log(data);
    })
})

test("Test querying database.", () => {

    helper.getUsers().then(data => {
        expect(data.length).toBeGreaterThan(0);
    })
})

test("Test Deleting from 'User' table.", () => {
    helper.deleteUser(username).then(data => {
        expect(data).toEqual("user deleted");
    })
})

