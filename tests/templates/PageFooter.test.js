import { shallow } from 'enzyme';
import PageFooter from '../../templates/PageFooter';

describe('PageFooter', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<PageFooter />);
        expect(wrapper).toMatchSnapshot();
    });
});