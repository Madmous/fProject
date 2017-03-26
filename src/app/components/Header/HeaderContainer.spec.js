import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Header from './HeaderContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    cart: {
      numberOfItemsInCart: 0
    }
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <Header />
    </Provider>
  ); 
};


describe('Header', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('Header')).to.have.length(1);
    chai.expect(wrapper.find('Header').props().numberOfItemsInCart).to.equal(0);
  })
})