import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Cart from './CartContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    store: {
      recipes: []
    },

    cart: {
      numberOfRecipesByRecipe: {},
      ingredientsByDepartment: {},
      numberOfItemsInCart: 0
    }
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <Cart />
    </Provider>
  ); 
};


describe('Cart', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('Cart')).to.have.length(1);
    chai.expect(wrapper.find('Cart').props().recipes.length).to.equal(0);
    chai.expect(wrapper.find('Cart').props().numberOfItemsInCart).to.equal(0);
    chai.expect(Object.keys(wrapper.find('Cart').props().numberOfRecipesByRecipe).length).to.equal(0);
    chai.expect(Object.keys(wrapper.find('Cart').props().ingredientsByDepartment).length).to.equal(0);
  })

  it('should create addRecipe action', () => {
    const wrapper = setupMount();
    const expectedAction = { type: 'ADD_RECIPE', payload: {} };

    expect(wrapper.find('Cart').props().cartActions.addRecipe({})).toEqual(expectedAction);
  })

  it('should create removeRecipe action', () => {
    const wrapper = setupMount();
    const expectedAction = { type: 'REMOVE_RECIPE', payload: {} };

    expect(wrapper.find('Cart').props().cartActions.removeRecipe({})).toEqual(expectedAction);
  })
})