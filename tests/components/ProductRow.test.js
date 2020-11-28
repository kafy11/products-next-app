import { shallow } from 'enzyme';
import ProductRow from '../../components/productList/ProductRow';
import products from '../fixtures/products';

let handleDelete, wrapper;
const product = products[0];

beforeEach(() => {
    handleDelete = jest.fn();
    wrapper = shallow(
        <ProductRow 
            product={product}
            onDelete={handleDelete} 
        />
    );
});

describe('ProductRow', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should handle onDelete', () => {
        wrapper.find('.product-row__delete-button').prop('onClick')();
        expect(handleDelete).toHaveBeenLastCalledWith(product.product_id);
    });
});