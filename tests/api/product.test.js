import productApi from '../../pages/api/product/[product_id]';
import generateProductDAO from '../../daos/productDAO';
import products from '../fixtures/products';

jest.mock('../../daos/productDAO', () => ({
    __esModule: true,
    default: jest.fn()
}));

const product = products[0],
      { product_id } = product;
describe('product api', () => {
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
            updateProduct: jest.fn(),
            getProduct: jest.fn(() => product),
            deleteProduct: jest.fn()
        };
        generateProductDAO.mockReturnValue(mockProductDAOReturn);
    });

    describe('POST', () => {
        const mockReq = {
            method: 'POST',
            query: { product_id },
            body: {
                name: 'Teste',
                price: 10,
                quantity: 1
            }
        };

        it('should call the DAO to update the product', async () => {
            await productApi(mockReq, mockRes);
            expect(mockProductDAOReturn.updateProduct).toHaveBeenLastCalledWith({
                product_id,
                ...mockReq.body
            });
        });

        it('should return status 200', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(200);
        });

        it('should return success json response', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenLastCalledWith({ success: 1 });
        });
    });

    describe('GET', () => {
        const mockReq = {
            method: 'GET',
            query: { product_id },
        };

        it('should call the DAO to get the product', async () => {
            await productApi(mockReq, mockRes);
            expect(mockProductDAOReturn.getProduct).toHaveBeenCalled();
        });

        it('should return status 200', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(200);
        });

        it('should send the product as a json response', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenLastCalledWith(product);
        });
    });

    describe('DELETE', () => {
        const mockReq = {
            method: 'DELETE',
            query: { product_id }
        };

        it('should call the DAO to delete the product', async () => {
            await productApi(mockReq, mockRes);
            expect(mockProductDAOReturn.deleteProduct).toHaveBeenLastCalledWith(product_id);
        });

        it('should return status 200', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(200);
        });

        it('should return success json response', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.json).toHaveBeenLastCalledWith({ success: 1 });
        });
    });

    describe('PUT', () => {
        const mockReq = {
            method: 'PUT',
            query: { product_id }
        };

        it('should return status 405', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenLastCalledWith(405);
        });

        it('should set Allow header correctly', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.setHeader).toHaveBeenLastCalledWith('Allow', "POST, GET, DELETE");
        });

        it('should send a not allowed message', async () => {
            await productApi(mockReq, mockRes);
            expect(mockRes.send).toHaveBeenLastCalledWith('Not Allowed');
        });
    });
});