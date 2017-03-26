import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import Cart from './Cart';

const setupShallow = () => {
  let removeRecipe = sinon.spy();
  let addRecipe = sinon.spy();

  const props = {
    numberOfItemsInCart: 1,

    numberOfRecipesByRecipe: {
      1: 1
    },

    ingredientsByDepartment: {
      Produce: [{
        "display_index": 0,
        "name": "cherry tomatoes",
        "department": "Produce",
        "quantity": 237,
        "unit": "ml"
      }],

      Spices: [{
        "display_index": 1,
        "name": "salt and freshly ground black pepper",
        "department": "Spices",
        "quantity": 0,
        "unit": ""
      }]
    },

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
    }],

    cartActions: {
      removeRecipe,
      addRecipe
    }
  };

  const wrapper = shallow(<Cart {...props} />);  

  return {
    removeRecipe,
    addRecipe,

    wrapper 
  };
};

describe('.Cart-Empty', () => {
  it('should have 2 children', () => {
    const { wrapper } = setupShallow();

    wrapper.setProps({
      numberOfItemsInCart: 0,

      numberOfRecipesByRecipe: {},
      ingredientsByDepartment: {}
    })
    
    chai.expect(wrapper.find('.Cart-Empty Col').children().length).to.equal(2);
  })
})

describe('.Cart-Image', () => {
  it('should have an image', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper
        .find('.Cart-Image img')
        .props().src
    ).to.equal('/img/tomato-cucumber-avocado-salad.jpg');

    chai.expect(
      wrapper
        .find('.Cart-Image img')
        .props().alt
    ).to.equal('tomato-cucumber-avocado-salad');
  })
})

describe('.Cart-Description', () => {
  it('should have a recipe title', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper
        .find('.Cart-Description-Title')
        .props().children
    ).to.equal('Tomato Cucumber Avocado Salad');
  })

  it('should have a quantity', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper
        .find('.Cart-Description-Quantity')
        .props().children.length
    ).to.equal(2);
  })

  it('should add the recipe to the cart', () => {
    const { 
      addRecipe,
      wrapper 
    } = setupShallow();

    wrapper.find('.Cart-Description-Update').simulate('click')

    chai.expect(addRecipe.calledOnce).to.be.true;
  })

  it('should remove the recipe from the cart', () => {
    const { 
      removeRecipe,
      wrapper 
    } = setupShallow();

    wrapper.find('.Cart-Description-Delete').simulate('click')

    chai.expect(removeRecipe.calledOnce).to.be.true;
  })
})

describe('.Cart-Ingredients', () => {
  it('should have a list of ingredients', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper
        .find('.Cart-Ingredients ul')
        .children().length
    ).to.equal(2);
  })
})