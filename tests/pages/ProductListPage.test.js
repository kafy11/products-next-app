import { shallow } from 'enzyme';
import ProductListPage from '../../pages/index';
import products from '../fixtures/products';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<ProductListPage products={products} />);
});

describe('ProductListPage', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should pass the products to the ProductTable', () => {
        const productsProp = wrapper.find('ProductTable').prop('products');
        expect(productsProp).toEqual(products);
    });
});