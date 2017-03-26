import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Header from './Header';

const setupShallow = () => {
  const props = {
    numberOfItemsInCart: 0,
    recipes: []
  };

  const wrapper = shallow(<Header {...props} />);  

  return { wrapper };
};


describe('Header-Cart-Total', () => { 
  it('should not render the number of items in cart', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.Header-Cart-Total')).to.have.length(0);
  })

  it('should render the number of items in cart', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ 
      numberOfItemsInCart: 1,
    });

    chai.expect(wrapper.find('.Header-Cart-Total')).to.have.length(1);
  })
})