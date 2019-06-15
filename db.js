const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "debian-sys-maint",
    password: "rgGdkHLvx0gHFgWH",
    database: "gql_test"
});
connection.connect();

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
