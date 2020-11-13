import { shallow } from 'enzyme';
import EditProductPage from '../../pages/product/[product_id]';
import products from '../fixtures/products';
import { updateProduct } from '../../actions/product';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));

jest.mock('../../actions/product', () => ({
    updateProduct: jest.fn(),
}));

const product = products[0];

let wrapper;
beforeEach(() => {
    wrapper = shallow(<EditProductPage {...product} />);
});

describe('EditProductPage', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should pass the product info to the ProductFormPage', () => {
        const formWrapper = wrapper.find('ProductFormPage');
    
        expect(formWrapper.prop('name')).toBe(product.name);
        expect(formWrapper.prop('price')).toBe(product.price);
        expect(formWrapper.prop('quantity')).toBe(product.quantity);
    });
    
    it('should update the product and redirect to the list when submitting form', async () => {
        const { product_id, ...rest } = product;
        await wrapper.find('ProductFormPage').prop('onSubmit')(rest);
    
        expect(updateProduct).toHaveBeenLastCalledWith(product_id, rest);
        expect(mockPush).toHaveBeenLastCalledWith('/');
    });
});