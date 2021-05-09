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


const getCPUs = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "CPU" where "machineID = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  }) 
}

const getGPUs = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "GPU" where "machineID = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  }) 
}

const getDisks = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "Disk" where "machineID = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  }) 
}

const getMemory = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "Memory" where "machineID = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  }) 
}

const getNetwork = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM "Network" where "machineID = $1', [id], (error, results) => {
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

const createNewMachine = (body) => {
  return new Promise(function(resolve, reject) {
    const { make, os, model } = body

    pool.query('INSERT INTO "Machine" ("machineMake", "machineOS", "machineModel") VALUES ($1, $2, $3) RETURNING *', [make, os, model], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('new machine added!')
    })
  })
}

const retrieveCPUMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { machineid, cpumodel, cputemp, cpuspeed, cpupercent, cpucore } = body

    pool.query('INSERT INTO "CPU" ("machineID", "cpuModel", "cpuTemp", "cpuSpeed", "cpuPercent", "cpuCoreCount") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [machineid, cpumodel, cputemp, cpuspeed, cpupercent, cpucore], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('new metrics collected!')
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
  getCPUs,
  getGPUs,
  getDisks,
  getMemory,
  getNetwork,
  createNewMachine,
  retrieveCPUMetrics,
  userExists,
  deleteUser,
}