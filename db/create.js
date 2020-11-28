const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(process.env.DB_PATH);
db.run(`
    CREATE TABLE product (
        product_id INTEGER PRIMARY KEY autoincrement,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL
    );
`);
db.close();