import { callPostAPI, callGetAPI, callDeleteAPI } from '../../libs/api';
import { addProduct, updateProduct, deleteProduct, getProducts, getProduct } from '../../actions/product';
import products from '../fixtures/products';

const mockGetAPIReturn = 'Test';
jest.mock('../../libs/api', () => ({
    callPostAPI: jest.fn(), 
    callGetAPI: jest.fn(() => mockGetAPIReturn),
    callDeleteAPI: jest.fn()
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
        it('should call product get api', async () => {
            const result = await getProducts();
            expect(callGetAPI).toHaveBeenLastCalledWith(allProductsAPIPath);
            expect(result).toBe(mockGetAPIReturn);
        });
    });

    describe('getProduct', () => {
        it('should call product get api', async () => {
            const result = await getProduct(product_id);
            expect(callGetAPI).toHaveBeenLastCalledWith(productAPIPath);
            expect(result).toBe(mockGetAPIReturn);
        });
    });
});