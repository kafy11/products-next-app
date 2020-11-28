import sqlite3 from 'sqlite3';

export const dbPath = ':memory:';

//connects to the database 
//returns an object with functions to get and run queries in the database as promises
export default () => {
    let db = new sqlite3.Database(dbPath);

    return {
        select: (sql, params) => new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        }),
        run: (sql, params) => new Promise((resolve, reject) => {
            db.run(sql, params, function(err) {
                if (err) {
                  reject(err);
                }
                
                resolve(this);
            });
        }),
        close: () => db.close()
    }
};