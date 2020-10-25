import { callPostAPI, callGetAPI, callDeleteAPI } from '../libs/api';

//product actions for the pages

export const addProduct = async (product) => {
    await callPostAPI('product', product);
};

export const updateProduct = async (product_id, product) => {
    await callPostAPI(`product/${product_id}`, product);
};

export const deleteProduct = async (product_id) => {
    await callDeleteAPI(`product/${product_id}`);
};

export const getProducts = async () => {
    const products = await callGetAPI('product');
    return products;
};

export const getProduct = async (product_id) => {
    const product = await callGetAPI(`product/${product_id}`);
    return product;
};