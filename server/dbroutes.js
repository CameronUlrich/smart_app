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

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, password, username } = body

    pool.query('INSERT INTO "User" ("email", "password", "username") VALUES ($1, $2, $3) RETURNING *', [email, password, username], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const createNewMachine = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, manufacturer, model } = body

    pool.query('INSERT INTO "Machine" ("machineID", "machineMake", "machineOS", "machineModel", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, manufacturer, model, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results);
      resolve(results.rows)
    })
  })
}

const retrieveCPUMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { machineid, model, speed, percent, corecount } = body

    pool.query('INSERT INTO "CPU" ("machineID", "cpuModel", "cpuSpeed", "cpuPercent", "cpuCoreCount", "dateTime") VALUES ($1, $2, $3, $4, $5, to_timestamp($6/1000.0)) RETURNING *', [machineid, model, speed, percent, corecount, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results);
      resolve(results.rows)
    })
  })
}

const retrieveGPUMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { machineid, gpumodel, gputemp, gpuspeed, gpupercent, gpumemory } = body

    pool.query('INSERT INTO "GPU" ("machineID", "gpuModel", "gpuTemp", "gpuSpeed", "gpuPercent", "gpuMemory") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [machineid, gpumodel, gputemp, gpuspeed, gpupercent, gpumemory], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
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
  createUser,
  createNewMachine,
  retrieveCPUMetrics,
  retrieveGPUMetrics,
  userExists,
  deleteUser,
}