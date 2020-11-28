import { shallow } from 'enzyme';
import { useRouter } from 'next/router';
import EditProductPage, { getStaticPaths, getStaticProps } from '../../pages/product/[product_id]';
import products from '../fixtures/products';
import { updateProduct } from '../../actions/product.front';

const product = products[0];

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}));

const mockGetProductsReturn = products,
      mockGetProductReturn = product;
jest.mock('../../actions/product.back', () => ({
    getProducts: jest.fn(() => mockGetProductsReturn),
    getProduct: jest.fn(() => mockGetProductReturn)
}));

jest.mock('../../actions/product.front', () => ({
    updateProduct: jest.fn()
}));

let wrapper, mockPush;
beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
        push: mockPush
    });

    wrapper = shallow(<EditProductPage {...product} />);
});

describe('EditProductPage', () => {
    describe('Component', () => {
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

    it('should generate static props correctly', async () => {
        const { product_id } = product;
        const props = await getStaticProps({ params: { product_id }});
        expect(props).toEqual({
            props: {
                ...product,
            }
        });
    });

    it('should generate static paths correctly', async () => {
        const paths = products.map(({ product_id }) => `/product/${product_id}`);
        const result = await getStaticPaths();

        expect(result).toEqual({ paths, fallback: false });
    });
});