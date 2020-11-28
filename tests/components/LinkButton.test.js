import { shallow } from 'enzyme';
import LinkButton from '../../components/LinkButton';

let wrapper;
const props = {
    children: "Clique",
    href: "localhost:3000",
    className: "testClass",
    title: "Clique aqui",
};

beforeEach(() => {
    wrapper = shallow(<LinkButton {...props} />);
});

describe('LinkButton', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render the children correctly', () => {
        const children = wrapper.find('LinkNext').prop('children');
        expect(children).toBe(props.children);
    });
    
    it('should render the href correctly', () => {
        const href = wrapper.find('LinkNext').prop('href');
        expect(href).toBe(props.href);
    });
    
    it('should render the title correctly', () => {
        const title = wrapper.find('LinkNext').prop('title');
        expect(title).toBe(props.title);
    });
    
    it('should add the className', () => {
        const hasClass = wrapper.find('LinkNext').hasClass(props.className);
        expect(hasClass).toBe(true);
    });
});