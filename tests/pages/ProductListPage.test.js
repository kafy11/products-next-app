import { shallow } from 'enzyme';
import ProductListPage, { getStaticProps } from '../../pages/index';
import products from '../fixtures/products';

const mockGetProductsReturn = products;
jest.mock('../../actions/product', () => ({
    getProducts: jest.fn(() => mockGetProductsReturn)
}));

describe('ProductListPage', () => {
    describe('Component', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ProductListPage products={products} />);
        });

        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
        
        it('should pass the products to the ProductTable', () => {
            const productsProp = wrapper.find('ProductTable').prop('products');
            expect(productsProp).toEqual(products);
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