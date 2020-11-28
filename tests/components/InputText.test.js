import React from 'react';
import { shallow } from 'enzyme';
import { expectToExist } from '../testHelpers';
import InputText from '../../components/InputText';

jest.mock('react', () => {
    const react = jest.requireActual('react');
    return {
        ...react,
        useRef: jest.fn()
    };
});

let handleChange, wrapper, mockUseRef;
const props = {
    label: "Preço",
    prepend: "$",
    append: ".00",
    value : "30",
    testProp: 2,
    className: 'test'
};

beforeEach(() => {
    mockUseRef = {
        current: {
            focus: jest.fn()
        }
    };
    React.useRef.mockReturnValue(mockUseRef);

    handleChange = jest.fn();
    wrapper = shallow(
        <InputText 
            {...props}
            onChange={handleChange}
        />
    );
});

describe('InputText', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should handle onChange', () => {
        const newValue = "40";
        wrapper.find('input').simulate('change', { target: { value: newValue } });
        expect(handleChange).toHaveBeenLastCalledWith(newValue);
    });
    
    it('should render the label correctly', () => {
        const labelText = wrapper.find('label').text();
        expect(labelText).toBe(props.label);
    });

    it('should handle the label click correctly', () => {
        wrapper.find('label').prop('onClick')();
        expect(mockUseRef.current.focus).toHaveBeenCalled();
    });
    
    it('should render the append correctly', () => {
        expectToExist(wrapper, '.input-group-append');
    });
    
    it('should render the prepend correctly', () => {
        expectToExist(wrapper, '.input-group-prepend');
    });
    
    it('should render the value correctly', () => {
        const value = wrapper.find('input').prop('value');
        expect(value).toBe(props.value);
    });
    
    it('should add the extra props to the input', () => {
        const testProp = wrapper.find('input').prop('testProp');
        expect(testProp).toBe(props.testProp);
    });

    it('should add the className prop and not replace the className set on the input',() => {
        const className = wrapper.find('input').prop('className');

        var regexCheck = new RegExp(props.className);
        expect(className).toMatch(regexCheck);
        expect(className).not.toBe(props.className);
    });
});