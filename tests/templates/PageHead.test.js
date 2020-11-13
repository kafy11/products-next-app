import { shallow } from 'enzyme';
import PageHead, { defaultFavicon } from '../../templates/PageHead';

const title = "Test";

//function to help test favicon href
const expectFaviconHref = (wrapper, href) => {
    expect(wrapper.find('.page-head__favicon').prop('href')).toBe(href);
};

describe('PageHead', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<PageHead title={title} />);
        expect(wrapper).toMatchSnapshot();
    });
    
    it('should render the title correctly', () => {
        const wrapper = shallow(<PageHead title={title} />);
        expect(wrapper.find('title').text()).toBe(title);
    });
    
    it('should render the favicon correctly', () => {
        const favicon = "Icone teste";
        const wrapper = shallow(<PageHead title={title} favicon={favicon} />);
        expectFaviconHref(wrapper, favicon);
    });
    
    it('should render the default favicon correctly', () => {
        const wrapper = shallow(<PageHead title={title} />);
        expectFaviconHref(wrapper, defaultFavicon);
    });
});