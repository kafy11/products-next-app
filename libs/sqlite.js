const sqlite3 = require('sqlite3').verbose();

export default () => {
    let db = new sqlite3.Database('./db/products.db');

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