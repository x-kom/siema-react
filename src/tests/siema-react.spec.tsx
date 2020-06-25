import React from 'react';
import Siema from '../lib/siema-react';
import { mount, ReactWrapper } from 'enzyme';

const ExampleChildren = ({ img, onClick }: { img: any; onClick?: () => void }) => <div onClick={onClick}><img src={img} alt="Siema image" /></div>;
const createExampleSlides = (images: string[]) => images.map((img, index) => <ExampleChildren key={index} img={img} />);
const findPortalsContaining = (component: ReactWrapper<any>, type) => component.find('Portal').filterWhere((n) => n.find(type).length > 0);

describe('Siema react', () => {
    let component: ReactWrapper;
    let handleChange: () => void;
    const images: string[] = ['http://via.placeholder.com/350x150/FFC0CB?text=1', 'http://via.placeholder.com/350x150/ADD8E6?text=2', 'http://via.placeholder.com/350x150/FFC0CB?text=3'];
    const defaultSiemaOptions = {
        duration: 200,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        overflowHidden: true,
        preventClickOnDrag: false,
        onInit: () => undefined,
        onChange: () => undefined,
    };

    beforeEach(() => {
        handleChange = jest.fn();

        component = mount(
            <Siema clickable={true} onChange={handleChange}>
                {createExampleSlides(images)}
            </Siema>
        );
    });

    it('should properly mount component with all given children inside SiemaWrapper for proper first render and SSR experience', () => {
        expect(component).toHaveLength(1);
        expect(component.find('SiemaWrapper').find(ExampleChildren)).toHaveLength(images.length);
    });

    it('should render all children into portals after mounting', () => {
        expect(findPortalsContaining(component, ExampleChildren)).toHaveLength(images.length);
    });

    it('should have default Siema props', () => {
        expect(component.instance()).toHaveProperty('siemaInstance');

        for (const property in defaultSiemaOptions) {
            if (defaultSiemaOptions.hasOwnProperty(property)) {
                expect(component.instance()['siemaInstance'].config).toHaveProperty(property);
            }
        }
    });

    it('should have default Siema navigation functions', () => {
        expect(component.instance()).toHaveProperty('prev');
        expect(component.instance()).toHaveProperty('next');
        expect(component.instance()).toHaveProperty('goTo');
    });

    it('should not add onClick method for children when clickable is not set', () => {
        component = mount(
            <Siema onChange={handleChange}>
                {createExampleSlides(images)}
            </Siema>);

        component.find(ExampleChildren).forEach((node) => expect(node).not.toHaveProperty('onClick'));
    });

    it('should have proper props', () => {
        expect(component.props()).toHaveProperty('clickable', true);
        expect(component.instance()['siemaInstance'].config).toHaveProperty('preventClickOnDrag', true);
        expect(component.props()).toHaveProperty('onChange', handleChange);
    });

    it('should handle change three times, when clicking every of three children', () => {
        expect(component.instance()['siemaInstance'].currentSlide).toEqual(0);

        for (let i = images.length - 1; i >= 0; i--) {
            component.find(ExampleChildren).at(i).simulate('click');
            expect(component.instance()['siemaInstance'].currentSlide).toEqual(i);
        }

        expect(handleChange).toHaveBeenCalledTimes(3);
    });

    it('should adjust to number of children change', () => {
        component.setProps({ children: createExampleSlides(images.slice(0, images.length - 1)) });
        expect(findPortalsContaining(component, ExampleChildren)).toHaveLength(images.length - 1);
        component.setProps({ children: createExampleSlides(images.concat(['http://via.placeholder.com/350x150/FFC0CB?text=X'])) });
        component.update(); // the component seems to works just fine but there is probably a bug in enzyme which causes it to not update the number of portals in this case, unless the `update()` is called on wrapper
        expect(findPortalsContaining(component, ExampleChildren)).toHaveLength(images.length + 1);
    });
});
