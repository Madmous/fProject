import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import PageTitle from './PageTitle';

const setupShallow = () => {
  const props = {
    title: '',
  };

  const wrapper = shallow(<PageTitle {...props} />);  

  return { wrapper };
};


describe('<h1 />', () => { 
  it('should render the name it is given', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({ 
      title: 'Recipe',
    });

    chai.expect(wrapper.find('h1').props().children).to.equal('Recipe');
  })
})