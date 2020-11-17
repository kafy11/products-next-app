import { shallow } from 'enzyme';
import { useRouter } from 'next/router';
import AddProductPage from '../../pages/add';
import { addProduct } from '../../actions/product';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

jest.mock('../../actions/product', () => ({
    addProduct: jest.fn(),
}));

let wrapper, mockPush;
beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
        push: mockPush
    });

    wrapper = shallow(<AddProductPage />);
});

describe('AddProductPage', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render the ProductFormPage without product info', () => {
        const formWrapper = wrapper.find('ProductFormPage');
    
        expect(formWrapper.prop('name')).toBe(undefined);
        expect(formWrapper.prop('price')).toBe(undefined);
    });
    
    it('should add the product and redirect to the list when submitting form', async () => {
        const product = {
            name: 'TV',
            price: 200
        };
        await wrapper.find('ProductFormPage').prop('onSubmit')(product);
    
        expect(addProduct).toHaveBeenLastCalledWith(product);
        expect(mockPush).toHaveBeenLastCalledWith('/');
    });
});