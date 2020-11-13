import { shallow } from 'enzyme';
import ProductTable from '../../components/productList/ProductTable';
import products from '../fixtures/products';

let handleDelete, wrapper;

beforeEach(() => {
    handleDelete = jest.fn();
    wrapper = shallow(
        <ProductTable 
            products={products}
            onDeleteProduct={handleDelete} 
        />
    );
});

describe('ProductTable', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should handle onDeleteProduct', () => {
        const { product_id } = products[0];
        wrapper.find('ProductRow').first().prop('onDelete')(product_id);
        expect(handleDelete).toHaveBeenLastCalledWith(product_id);
    });
    
    it('should render a ProductRow for each product', () => {
        const rows = wrapper.find('ProductRow');
        expect(rows.length).toEqual(products.length);
    });
    
    it('should pass the product to the ProductRow', () => {
        const product = wrapper.find('ProductRow').first().prop('product');
        expect(product).toEqual(products[0]);
    });
});