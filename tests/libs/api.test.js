import { apiUrl, callPostAPI, callGetAPI, callDeleteAPI } from '../../libs/api';
import products from '../fixtures/products';

const mockFetchReturn = { test: true };
global.fetch = jest.fn(() => ({
    json: () => mockFetchReturn
}));

const product = products[0],
      paramPath = 'test',
      apiPath = `${apiUrl}/${paramPath}`;

describe('Lib API', () => {
    describe('callPostAPI', () => {
        it('should call project post api correctly', () => {
            callPostAPI(paramPath, product);
            expect(global.fetch).toHaveBeenLastCalledWith(apiPath,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
        });
    });

    describe('callGetAPI', () => {
        it('should call project get api correctly', () => {
            callGetAPI(paramPath);
            expect(global.fetch).toHaveBeenLastCalledWith(apiPath);
        });

        it('should handle the api return correctly', async () => {
            const result = await callGetAPI(paramPath);
            expect(result).toEqual(mockFetchReturn);
        });
    });

    describe('callDeleteAPI', () => {
        it('should call project delete api correctly', () => {
            callDeleteAPI(paramPath);
            expect(global.fetch).toHaveBeenLastCalledWith(apiPath, {
                method: 'DELETE'
            });
        });
    });
});