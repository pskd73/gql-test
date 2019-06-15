const mysql = require("mysql");

const config  = {
    host: "localhost",
    user: "debian-sys-maint",
    password: "rgGdkHLvx0gHFgWH",
    database: "gql_test"
}

const getConnection = () => {
    return mysql.createConnection(config);
}

connection = getConnection();

const runQuery = async (query, callback) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
   });
}



module.exports = {
    runQuery
}
