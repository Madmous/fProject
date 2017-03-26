import { shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';

import Home from './Home';

const setupShallow = () => {
  const props = {
    recipes: []
  };

  const wrapper = shallow(<Home {...props} />);  

  return { wrapper };
};


describe('<PageTitle />', () => { 
  it('should be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('PageTitle')).to.have.length(1);
  })
})

describe('.Recipes-Grid', () => {
  it('should not be defined', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.Recipes-Grid').children().length).to.equal(0);
  })

  it('should be defined', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({
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
              "display_index": 6,
              "name": "olive oil",
              "department": "Condiments",
              "quantity": 15,
              "unit": "ml"
          },
          {
              "display_index": 7,
              "name": "salt and freshly ground black pepper",
              "department": "Spices",
              "quantity": 0,
              "unit": ""
          }
        ]
      }]
    })

    chai.expect(wrapper.find('.Recipes-Grid').children().length).to.equal(1);
  })
})