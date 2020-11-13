import { shallow } from 'enzyme';
import Button from '../../components/Button';

describe('Button', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Button />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should handle onClick', () => {
        const handleClick = jest.fn();
        const wrapper = shallow(<Button onClick={handleClick} />);
    
        wrapper.find('.btn').prop('onClick')();
        expect(handleClick).toHaveBeenCalled();
    });
    
    it('should add the right color class', () => {
        const wrapper = shallow(<Button color="secondary" />);
    
        const hasClass = wrapper.find('.btn').hasClass('btn-secondary');
        expect(hasClass).toBe(true);
    });
    
    it('should add the primary color class as default', () => {
        const wrapper = shallow(<Button />);
    
        const hasClass = wrapper.find('.btn').hasClass('btn-primary');
        expect(hasClass).toBe(true);
    });
    
    it('should render a submit button', () => {
        const wrapper = shallow(<Button submit/>);
    
        const typeProp = wrapper.find('.btn').prop('type');
        expect(typeProp).toBe('submit');
    });
});