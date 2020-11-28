import { shallow } from 'enzyme';
import ProductFormPage from '../../templates/ProductFormPage';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));

//function to help test preventDefault block on key press
const expectKeyPress = (field, mockEvent, expectedToBlock) => {
    wrapper.find('.product-form-page__'+field).prop('onKeyPress')(mockEvent);
    
    if(expectedToBlock){
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    } else {
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    }
};

//function to help test every cases of key press
const expectOnlyNumber = (field) => {
    const testCases = [
        { keyCode: 69, key: 'e', expectedToBlock: true },
        { keyCode: 49, key: '1', expectedToBlock: false },
        { keyCode: 9, key: 'Tab', expectedToBlock: false },
        { keyCode: 8, key: 'Backspace', expectedToBlock: false }
    ];

    testCases.forEach(({ expectedToBlock, ...rest }) => {
        expectKeyPress(field, {
            ...rest,
            preventDefault: jest.fn()
        }, expectedToBlock);
    });
};

//function to help test input value
const expectFieldHasValue = (field, value) => {
    expect(wrapper.find('.product-form-page__'+field).prop('value')).toBe(value);
};

//function to help test input onChange event
const expectChangeValue = (field, value) => {
    wrapper.find('.product-form-page__'+field).prop('onChange')(value);
    expectFieldHasValue(field, value);
};

const props = {
    title: 'Product Form',
    name: 'Test',
    price: '10',
    quantity: '1',
};

let wrapper, handleSubmit;
beforeEach(() => {
    handleSubmit = jest.fn();
    wrapper = shallow(<ProductFormPage {...props} onSubmit={handleSubmit} />);
});

describe('ProductFormPage', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('name field', () => {
        const field = 'name';
        it('should render the value correctly', () => {
            expectFieldHasValue(field, props.name);
        });

        it('should update value when onChange is called', () => {
            expectChangeValue(field, 'Produto 1');
        });
    });
    
    describe('price field', () => {
        const field = 'price';
        it('should render the value correctly', () => {
            expectFieldHasValue(field, props.price);
        });

        it('should allow only number, tab and backspace', () => {
            expectOnlyNumber(field);
        });

        it('should update value when onChange is called', () => {
            expectChangeValue(field, '299');
        });
    });
    
    describe('quantity field', () => {
        const field = 'quantity';
        it('should render the value correctly', () => {
            expectFieldHasValue(field, props.quantity);
        });

        it('should allow only number, tab and backspace', () => {
            expectOnlyNumber(field);
        });

        it('should update value when onChange is called', () => {
            expectChangeValue(field, '2');
        });
    });
    
    it('should pass the title prop to the Page component', () => {
        expect(wrapper.find('Page').prop('title')).toBe(props.title);
    });
    
    it('should go back to the list when cancel is clicked', () => {
        wrapper.find('.product-form-page__cancel-button').prop('onClick')()
        expect(mockPush).toHaveBeenLastCalledWith('/');
    });
    
    it('should prevent default submit action and call onSubmit when form is submitted', () => {
        const mockEvent = {
            preventDefault: jest.fn()
        };
        wrapper.find('form').prop('onSubmit')(mockEvent);
    
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(handleSubmit).toHaveBeenLastCalledWith({
            name: props.name,
            price: props.price,
            quantity: props.quantity
        });
    });
});