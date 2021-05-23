const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'smartdb.cupw72i7x6pa.us-east-1.rds.amazonaws.com',
  database: 'test',
  password: 'zachary510',
  port: 5432,
});

/**
* Queries the database for users
*/
const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "User"', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for a machines UUID
*/
const getUUID = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT "machineID" FROM "Machine"', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for a machineID based on a username
*/
const getMachineID = (username) => {
  return new Promise(function (resolve, reject) {
    pool.query(`SELECT "machineID" FROM "User" u, "UserMachine" um WHERE u.username = $1 and u."userID" = um."userID"`, [username], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for Machine information based on a machine id
*/
const getMachineInfo = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "Machine" m WHERE "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for CPU information based on a machine id
*/
const getCPUs = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "CPU" cpu1 WHERE "dateTime" = (SELECT MAX("dateTime") FROM "CPU" cpu2 WHERE cpu1."machineID" = cpu2."machineID") and "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for GPU information based on a machine id
*/
const getGPUs = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "GPU" gpu1 WHERE "dateTime" = (SELECT MAX("dateTime") FROM "GPU" gpu2 WHERE gpu1."machineID" = gpu2."machineID") and "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for Disks information based on a machine id
*/
const getDisks = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "Disk" disk1 WHERE  "machineID" = $1 ORDER BY "diskSize" ASC', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for Disks information based on a machine id
*/
// const getDisks = (id) => {
//   return new Promise(function (resolve, reject) {
//     pool.query('SELECT * FROM "Disk" disk1 WHERE "dateTime" = (SELECT MAX("dateTime") FROM "Disk" disk2 WHERE disk1."machineID" = disk2."machineID") and "machineID" = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows)
//     })
//   })
// }


/**
* Queries the database for Memory information based on a machine id
*/
const getMemory = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "Memory" mem1 WHERE "dateTime" = (SELECT MAX("dateTime") FROM "Memory" mem2 WHERE mem1."machineID" = mem2."machineID") and "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for Network information based on a machine id
* Currently Unused
*/
const getNetwork = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "Network" where "machineID = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Queries the database for Active Processes information based on a machine id
* Currently Unused
*/
const getActivePrcoesses = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM "ActiveProcesses" act1 WHERE "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}



/**
* Queries the database for Active Processes information based on a machine id
* Currently Unused
*/
// const getActivePrcoesses = (id) => {
//   return new Promise(function(resolve, reject) {
//     pool.query('SELECT * FROM "ActiveProcesses" act1 WHERE "dateTime" = (SELECT MAX("dateTime") FROM "ActiveProcesses" act2 WHERE act1."machineID" = act2."machineID") and "machineID" = $1', [id], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows)
//     })
//   }) 
// }

/**
* Queries the database to see if a specific user exists
* Currently Unused
*/
const userExists = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, password } = body

    pool.query('SELECT exists(SELECT 1 FROM "User" WHERE "username" = $1 and "password" = $2', [username, password], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  })
}

/**
* Inserts a new user based on a given email, password and username
*/
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, password, username } = body

    pool.query('INSERT INTO "User" ("email", "password", "username") VALUES ($1, $2, $3) RETURNING *', [email, password, username], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Inserts a new user to machine relation tying a machine to a specific user
*/
const createUserMachine = (body) => {
  return new Promise(function (resolve, reject) {
    const { uid, mid } = body

    pool.query('INSERT INTO "UserMachine" ("userID", "machineID", "dateTime") VALUES ($1, $2, to_timestamp($3/1000.0)) RETURNING *', [uid, mid, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Creates a new machines using a specific UUID
*/
const createNewMachine = (body) => {
  return new Promise(function (resolve, reject) {
    const { id } = body;
    pool.query('INSERT INTO "Machine" ("machineID", "dateTime") VALUES ($1,  to_timestamp($2/1000.0)) RETURNING *', [id, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Creates a new machines using a specific UUID, make, model, and os
* Currently Unused do to a bug with metric collection
*/
// const createNewMachine = (body) => {
//   return new Promise(function(resolve, reject) {
//     const { id, manufacturer, os, model } = body;
//     pool.query('INSERT INTO "Machine" ("machineID", "machineMake", "machineOS", "machineModel", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, manufacturer,os , model, Date.now()], (error, results) => {
//       if (error) {
//         reject(error)
//       }
//       resolve(results.rows)
//     })
//   })
// }

/**
* Inserts new cpu metrics to database
*/
const retrieveCPUMetrics = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, model, speed, percent, corecount } = body
    pool.query('INSERT INTO "CPU" ("machineID", "cpuModel", "cpuSpeed", "cpuPercent", "cpuCoreCount", "dateTime") VALUES ($1, $2, $3, $4, $5, to_timestamp($6/1000.0)) RETURNING *', [id, model, speed, percent, corecount, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Inserts new gpu metrics to database
*/
const retrieveGPUMetrics = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, model, speed, temp, memorysize, memoryused } = body
    pool.query('INSERT INTO "GPU" ("machineID", "gpuModel", "gpuSpeed", "gpuTemp", "gpuMemorySize", "gpuMemoryUsed", "dateTime") VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7/1000.0)) RETURNING *', [id, model, speed, temp, memorysize, memoryused, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Inserts new disk metrics to database
*/
const retrieveDiskMetrics = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, type, size, free, used } = body;
    pool.query('INSERT INTO "Disk" ("machineID", "diskType", "diskSize", "diskFree", "diskUsed", "dateTime") VALUES ($1, $2, $3, $4, $5, to_timestamp($6/1000.0)) RETURNING *', [id, type, size, free, used, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Inserts new memory metrics to database
*/
const retrieveMemoryMetrics = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, size, free, used } = body;
    pool.query('INSERT INTO "Memory" ("machineID", "memorySize", "memoryFree", "memoryUsed", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, size, free, used, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const retrieveActiveProcesses = (body) => {
  return new Promise(function (resolve, reject) {
    const { id, name, cpu, mem } = body;
    pool.query('INSERT INTO "ActiveProcesses" ("machineID", "processName", "cpuPercent", "memoryPecent", "dateTime") VALUES ($1, $2, $3, $4, to_timestamp($5/1000.0)) RETURNING *', [id, name, cpu, mem, Date.now()], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

/**
* Deletes processes from the database
* For testing purposes
*/
const deleteProcesses = (id) => {
  return new Promise(function (resolve, reject) {

    pool.query('DELETE FROM "ActiveProcesses" WHERE "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })
}

const deleteMetrics = (id) => {
  return new Promise(function (resolve, reject) {

    pool.query('DELETE FROM "Disk" WHERE "machineID" = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
    })
  })
}

/**
* Deletes a user from the database
* For testing purposes
*/
const deleteUser = (userId) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(userId)

    pool.query('DELETE FROM "User" WHERE "userID" = $1', [id], (error, results) => {
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
  createUserMachine,
  getUUID,
  getMachineID,
  getMachineInfo,
  retrieveActiveProcesses,
  getActivePrcoesses,
  deleteProcesses,
  deleteMetrics
}