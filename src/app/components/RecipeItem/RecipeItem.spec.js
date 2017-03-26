import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import RecipeItem from './RecipeItem';

const setupShallow = () => {
  const props = {
    imageName: 'food.jpg'
  };

  const wrapper = shallow(<RecipeItem {...props} />);  

  return { wrapper };
};


describe('<Col />', () => { 
  xit('should call handleClick', () => {
    const { wrapper } = setupShallow();

    const component = wrapper.instance();

    var handleSubmitStub = sinon.stub(component, 'handleClick').callsFake(() => { });
    
    component.forceUpdate();
    wrapper.update();

    wrapper.find('.Recipe-Item').simulate('click');

    expect(handleSubmitStub.callCount).to.equal(1);
  })
})