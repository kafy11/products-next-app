import generateProductDAO from '../daos/productDAO';

//product actions exclusive for the back-end

export const getProducts = async () => {
    const { getAllProducts } = generateProductDAO();
    return await getAllProducts();
};

export const getProduct = async (product_id) => {
    const { getProduct } = generateProductDAO();
    return await getProduct(product_id);
};