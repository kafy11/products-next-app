import productsApi from '../../pages/api/product';
import generateProductDAO from '../../daos/productDAO';
import products from '../fixtures/products';

jest.mock('../../daos/productDAO', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('products api', () => {
    let mockRes,
        mockProductDAOReturn;
    beforeEach(() => {
        mockRes = {
            status: jest.fn(),
            json: jest.fn(),
            setHeader: jest.fn(),
            send: jest.fn()
        };
        //each function should return res again
        Object.keys(mockRes).forEach((key) => {
            mockRes[key].mockReturnValue(mockRes);
        });

        mockProductDAOReturn = {
            insertProduct: jest.fn(),
            getAllProducts: jest.fn(() => products)
        };
        generateProductDAO.mockReturnValue(mockProductDAOReturn);
    });

    describe('POST', () => {
        const mockReq = {
            method: 'POST',
            body: {
                name: 'Teste',
                price: 10,
                quantity: 1
            }
        };

        it('should call the DAO to insert the product', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockProductDAOReturn.insertProduct).toHaveBeenLastCalledWith(mockReq.body);
        });

        it('should return status 200', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(200);
        });

        it('should return success json response', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenLastCalledWith({ success: 1 });
        });
    });

    describe('GET', () => {
        const mockReq = {
            method: 'GET'
        };

        it('should call the DAO to get all products', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockProductDAOReturn.getAllProducts).toHaveBeenCalled();
        });

        it('should return status 200', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(200);
        });

        it('should send all the products as a json response', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenLastCalledWith(products);
        });
    });

    describe('DELETE', () => {
        const mockReq = {
            method: 'DELETE'
        };

        it('should return status 405', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(405);
        });

        it('should set Allow header correctly', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.setHeader).toHaveBeenLastCalledWith('Allow', 'POST, GET');
        });

        it('should send a not allowed message', async () => {
            await productsApi(mockReq, mockRes);
            expect(mockRes.send).toHaveBeenLastCalledWith('Not Allowed');
        });
    });
});