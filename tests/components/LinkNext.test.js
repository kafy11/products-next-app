import { shallow } from 'enzyme';
import LinkNext from '../../components/LinkNext';

let wrapper;
const props = {
    children: "Clique",
    href: "localhost:3000",
    testProp: 9,
};

beforeEach(() => {
    wrapper = shallow(<LinkNext {...props} />);
});

describe('LinkNext', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render the children correctly', () => {
        const children = wrapper.find('a').prop('children');
        expect(children).toBe(props.children);
    });
    
    it('should render the href correctly', () => {
        const href = wrapper.find('Link').prop('href');
        expect(href).toBe(props.href);
    });
    
    it('should add the extra props to the "a" tag', () => {
        const testProp = wrapper.find('a').prop('testProp');
        expect(testProp).toBe(props.testProp);
    });
});