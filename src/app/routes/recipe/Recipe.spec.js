import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import chai from 'chai';

import Recipe from './Recipe';

const setupShallow = () => {
  let addRecipe = sinon.spy();

  const props = {
    params: {
      id: 1
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
      addRecipe
    }
  };

  const wrapper = shallow(<Recipe {...props} />);  

  return { 
    addRecipe,
    wrapper 
  };
};

describe('.Recipe-Informations-Texts', () => {
  it('should have a recipe name', () => {
    const { wrapper } = setupShallow();
    
    chai.expect(
      wrapper
        .find('.Recipe-Informations-Texts h1')
        .props().children
    ).to.equal('Tomato Cucumber Avocado Salad');
  })

  it('should call addRecipe when add to cart is clicked', () => {
    const { addRecipe, wrapper } = setupShallow();

    wrapper.find('.Recipe-Informations-Texts button').simulate('click');

    chai.expect(addRecipe.calledOnce).to.be.true;
  })

  it('should have a list of ingredients', () => {
    const { wrapper } = setupShallow();

    chai.expect(wrapper.find('.Recipe-Ingredients').children().length).to.equal(2);
  })

  it('should display the ingredient name, the quantity and the unit', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper.find('.Recipe-Ingredients').children().get(0).props.children
    ).to.equal('cherry tomatoes _ 237.00 ml');
  })

  it('should only display the ingredient name if the quantity is 0', () => {
    const { wrapper } = setupShallow();

    chai.expect(
      wrapper.find('.Recipe-Ingredients').children().get(1).props.children
    ).to.equal('salt and freshly ground black pepper');
  })
})

describe('<img />', () => {
  it('should have a src and alt name', () => {
    const { wrapper } = setupShallow();
    
    chai.expect(
      wrapper
        .find('img')
        .props().src
    ).to.equal('/img/tomato-cucumber-avocado-salad.jpg');

    chai.expect(
      wrapper
        .find('img')
        .props().alt
    ).to.equal('tomato-cucumber-avocado-salad');
  })
})

describe('.Recipe-Instructions', () => {
  it('should be defined', () => {
    const { wrapper } = setupShallow();
    
    chai.expect(wrapper.find('.Recipe-Instructions ol').children().length).to.equal(3);
  })
})