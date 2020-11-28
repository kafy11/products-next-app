import { shallow } from 'enzyme';
import { useRouter } from 'next/router';
import ProductListPage, { getStaticProps } from '../../pages/index';
import products from '../fixtures/products';
import { deleteProduct } from '../../actions/product.front';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

const mockGetProductsReturn = products;
jest.mock('../../actions/product.back', () => ({
    getProducts: jest.fn(() => mockGetProductsReturn)
}));

jest.mock('../../actions/product.front', () => ({
    deleteProduct: jest.fn()
}));

describe('ProductListPage', () => {
    describe('Component', () => {
        let wrapper, mockReload;
        beforeEach(() => {
            mockReload = jest.fn();
            useRouter.mockReturnValue({
                reload: mockReload
            });

            wrapper = shallow(<ProductListPage products={products} />);
        });

        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
        
        it('should pass the products to the ProductTable', () => {
            const productsProp = wrapper.find('ProductTable').prop('products');
            expect(productsProp).toEqual(products);
        });

        it('should call delete product action on delete', async () => {
            const { product_id } = products[0];
            await wrapper.find('ProductTable').prop('onDeleteProduct')(product_id);
            expect(deleteProduct).toHaveBeenLastCalledWith(product_id);
        });
    });

    it('should generate static props correctly', async () => {
        const props = await getStaticProps();
        expect(props).toEqual({
            props: {
                products
            }
        });
    });
});