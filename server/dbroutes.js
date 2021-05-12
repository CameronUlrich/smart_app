const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'smartdb.cupw72i7x6pa.us-east-1.rds.amazonaws.com',
  database: 'test',
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
    const { id, manufacturer, os, model } = body;
    pool.query('INSERT INTO "Machine" ("machineID", "machineMake", "machineOS", "machineModel", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, manufacturer,os , model, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })
}

const retrieveCPUMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, model, speed, percent, corecount } = body
    pool.query('INSERT INTO "CPU" ("machineID", "cpuModel", "cpuSpeed", "cpuPercent", "cpuCoreCount", "dateTime") VALUES ($1, $2, $3, $4, $5, to_timestamp($6/1000.0)) RETURNING *', [id, model, speed, percent, corecount, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const retrieveGPUMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, model, speed, temp, memorysize, memoryused } = body
    pool.query('INSERT INTO "GPU" ("machineID", "gpuModel", "gpuSpeed", "gpuTemp", "gpuMemorySize", "gpuMemoryUsed", "dateTime") VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7/1000.0)) RETURNING *', [id, model, speed, temp, memorysize, memoryused, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const retrieveDiskMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, type, size, free, used } = body;
    pool.query('INSERT INTO "Disk" ("machineID", "diskType", "diskSize", "diskFree", "diskUsed", "dateTime") VALUES ($1, $2, $3, $4, $5, to_timestamp($6/1000.0)) RETURNING *', [id, type, size, free, used, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const retrieveMemoryMetrics = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, size, free, used } = body;
    pool.query('INSERT INTO "Memory" ("machineID", "memorySize", "memoryFree", "memoryUsed", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, size, free, used, Date.now()], (error, results) => {
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
  retrieveDiskMetrics,
  retrieveMemoryMetrics,
  userExists,
  deleteUser,
}