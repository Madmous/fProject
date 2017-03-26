import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import RecipeItem from './RecipeItemContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    store: {
      recipes: []
    }
  };

  const props = {
    imageName: 'food.jpg'
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <RecipeItem {...props} />
    </Provider>
  ); 
};


describe('Recipe', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('RecipeItem')).to.have.length(1);
    chai.expect(wrapper.find('RecipeItem').props().recipes.length).to.equal(0);
  })
})