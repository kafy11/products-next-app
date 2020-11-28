import { callPostAPI, callDeleteAPI } from '../../libs/api';
import generateProductDAO from '../../daos/productDAO';
import { addProduct, updateProduct, deleteProduct, getProducts, getProduct } from '../../actions/product';
import products from '../fixtures/products';

jest.mock('../../libs/api', () => ({
    callPostAPI: jest.fn(), 
    callDeleteAPI: jest.fn()
}));

jest.mock('../../daos/productDAO', () => ({
    __esModule: true,
    default: jest.fn()
}));

const product = products[0],
      { product_id, ...productData } = product,
      allProductsAPIPath = 'product',
      productAPIPath = `product/${product_id}`; 

describe('Product Actions', () => {
    describe('addProduct', () => {
        it('should call product post api', () => {
            addProduct(product);
            expect(callPostAPI).toHaveBeenLastCalledWith(allProductsAPIPath, product);
        });
    });

    describe('updateProduct', () => {
        it('should call product/[product_id] post api', () => {
            updateProduct(product_id, productData);
            expect(callPostAPI).toHaveBeenLastCalledWith(productAPIPath, productData);
        });
    });

    describe('deleteProduct', () => {
        it('should call product/[product_id] delete api', () => {
            deleteProduct(product_id);
            expect(callDeleteAPI).toHaveBeenLastCalledWith(productAPIPath);
        });
    });

    describe('getProducts', () => {
        it('should call product dao to fetch the products', async () => {
            const mockProductDAOReturn = {
                getAllProducts: jest.fn(() => products)
            };
            generateProductDAO.mockReturnValue(mockProductDAOReturn);

            const result = await getProducts();
            expect(mockProductDAOReturn.getAllProducts).toHaveBeenCalled();
            expect(result).toBe(products);
        });
    });

    describe('getProduct', () => {
        it('should call product dao to fetch the product', async () => {
            const mockProductDAOReturn = {
                getProduct: jest.fn(() => product)
            };
            generateProductDAO.mockReturnValue(mockProductDAOReturn);

            const result = await getProduct(product_id);
            expect(mockProductDAOReturn.getProduct).toHaveBeenLastCalledWith(product_id);
            expect(result).toBe(product);
        });
    });
});