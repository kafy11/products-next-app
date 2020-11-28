const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, 'product.db');

console.log(dbPath);

let db = new sqlite3.Database(dbPath);
db.run(`
    CREATE TABLE product (
        product_id INTEGER PRIMARY KEY autoincrement,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL
    );
`);
db.close();