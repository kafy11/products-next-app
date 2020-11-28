const sqlite3 = require('sqlite3').verbose();

const path = require('path')
const dbPath = path.resolve("..", "products.db");
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