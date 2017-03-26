import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Recipe from './RecipeContainer';

const store = configureMockStore()({});

const setupMount = () => {
  const initialState = {
    store: {
      recipes: [{
        "recipe_id": 1,
        "title": "Tomato Cucumber Avocado Salad",
        "image_name": "tomato-cucumber-avocado-salad.jpg",
        "instructions": "Add cherry tomatoes, cucumber, avocado, red onion and garlic in a medium salad bowl.\r\n\r\nSprinkle minced parsley. Pour olive oil over salad, and season with salt and pepper.\r\n\r\nNote: Add avocado right before serving if you are planning to refrigerate the salad.",
        "servings": 4,
        "ingredients": [
          {
            "display_index": 0,
            "name": "cherry tomatoes",
            "department": "Produce",
            "quantity": 237,
            "unit": "ml"
          },
          {
              "display_index": 1,
              "name": "salt and freshly ground black pepper",
              "department": "Spices",
              "quantity": 0,
              "unit": ""
          }
        ]
      }]
    }
  };

  const props = {
    params: {
      id: 1
    }
  };

  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  
  return mount(
    <Provider store={ store }>
      <Recipe {...props} />
    </Provider>
  ); 
};


describe('Recipe', () => {
  it('should pass down props', () => {
    const wrapper = setupMount();

    chai.expect(wrapper.find('Recipe').props().recipes.length).to.equal(1);
  })

  it('should create addRecipe action', () => {
    const wrapper = setupMount();
    const expectedAction = { type: 'ADD_RECIPE', payload: {} };

    expect(wrapper.find('Recipe').props().cartActions.addRecipe({})).toEqual(expectedAction);
  })
})