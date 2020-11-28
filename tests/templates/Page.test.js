import { shallow } from 'enzyme';
import Page from '../../templates/Page';

const props = {
    title: 'Test',
    children: 'Children test',
    toolbarContent: 'Toolbar test'
};

let wrapper;
beforeEach(() => {
    wrapper = shallow(<Page {...props}/>);
});

describe('Page', () => {
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render the title correctly', () => {
        expect(wrapper.find('.page__title').text()).toBe(props.title);
    });
    
    it('should render the content correctly', () => {
        expect(wrapper.find('.page__content').text()).toBe(props.children);
    });
    
    it('should render the toolbar content correctly', () => {
        expect(wrapper.find('.page__toolbar').text()).toBe(props.toolbarContent);
    });
});