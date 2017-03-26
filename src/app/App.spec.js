import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import App from './App';

const setupShallow = () => {
  const props = {
    numberOfItemsInCart: 0,
    recipes: []
  };

  const wrapper = shallow(<App {...props} />);  

  return { wrapper };
};


describe('<Header  />', () => { 
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('Connect(Header)')).to.have.length(1);
  })
})

describe('<Navigation />', () => {
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('Navigation')).to.have.length(1);
  })
})