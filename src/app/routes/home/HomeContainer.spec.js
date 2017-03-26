import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Home from './HomeContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    store: {
      recipes: []
    }
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <Home />
    </Provider>
  ); 
};


describe('Home', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('Home')).to.have.length(1);
    chai.expect(wrapper.find('Home').props().recipes.length).to.equal(0);
  })
})