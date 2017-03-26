import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import App from './AppContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    store: {
      recipes: []
    },
    cart: {
      numberOfItemsInCart: 0
    }
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <App />
    </Provider>
  ); 
};


describe('App', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('App')).to.have.length(1);
    chai.expect(wrapper.find('App').props().recipes.length).to.equal(0);
    chai.expect(wrapper.find('App').props().numberOfItemsInCart).to.equal(0);
  })
})