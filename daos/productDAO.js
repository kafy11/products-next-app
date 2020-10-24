import sqlite from '../libs/sqlite';

export default () => {
    const db = sqlite();

    return {
        getProduct: async (product_id) => {
            const result = await db.select(`
                SELECT product_id, name, price, quantity 
                FROM product 
                WHERE product_id = ? 
            `, [product_id]);

            if(result[0]){
                return result[0]
            }
            throw "Product not found";
        },
        getAllProducts: () => db.select(`
            SELECT product_id, name, price, quantity 
            FROM product
        `),
        insertProduct: ({ name, price, quantity }) => db.run(`
            INSERT INTO product(name, price, quantity) 
            VALUES(?, ?, ?)
        `, [name, price, quantity]),
        updateProduct: ({ product_id, name, price, quantity }) => db.run(`
            UPDATE product 
            SET name = ?,
                price = ?,
                quantity = ?
            WHERE product_id = ?
        `, [name, price, quantity, product_id]),
        deleteProduct: (product_id) => db.run(`
            DELETE FROM product 
            WHERE product_id = ?
        `, [product_id])
    };
}