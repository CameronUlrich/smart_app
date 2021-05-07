const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'smartdb.cupw72i7x6pa.us-east-1.rds.amazonaws.com',
  database: 'smart',
  password: 'zachary510',
  port: 5432,
});

const getUsers = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "User"', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  }) 
}

const userExists = (body) => {
  return new Promise(function(resolve, reject) {
    const { username, password } = body

    pool.query('SELECT exists(SELECT 1 FROM "User" WHERE "username" = $1 and "password" = $2', [username, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

const deleteUser = (userId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(userId)

    pool.query('DELETE FROM "User" WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

module.exports = {
  getUsers,
  userExists,
  deleteUser,
}