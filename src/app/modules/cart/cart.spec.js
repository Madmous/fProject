import * as cartActions from './cart';
import cart from './cart';

let initialState = {
  ingredientsByDepartment: {},
  numberOfRecipesByRecipe: {},

  numberOfItemsInCart: 0,
}

describe('cart reducer', () => {
  it('should return the initial state', () => {
    expect(
      cart(undefined, {})
    ).toEqual(initialState)
  })
})

describe('cart actions', () => {

  const payload = {
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
  };

  const secondPayload = {
    "recipe_id": 2,
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
  };

  describe('ADD_RECIPE', () => {
    it('should create addRecipe action', () => {      
      const expectedAction = {
        type: 'ADD_RECIPE',
        payload
      };

      expect(cartActions.addRecipe(payload)).toEqual(expectedAction);
    })

    it('should handle ADD_RECIPE when cart is empty', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {},

          numberOfItemsInCart: 0
        }, {
          type: 'ADD_RECIPE',
          payload
        })
      ).toEqual({
          numberOfItemsInCart: 1,

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 15, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 237, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 1,
              unit: ''
            }]
          },

          numberOfRecipesByRecipe: {
            1: 1
          }
        })
    })

    it('should handle ADD_RECIPE when cart is filled with a recipe', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {
            1: 1
          },

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 15, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 237, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 1,
              unit: ''
            }]
          },

          numberOfItemsInCart: 1
        }, {
          type: 'ADD_RECIPE',
          payload
        })
      ).toEqual({
          numberOfItemsInCart: 2,

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 30, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 474, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 2,
              unit: ''
            }]
          },

          numberOfRecipesByRecipe: {
            1: 2
          }
        })
    })

    it('should handle ADD_RECIPE when cart is filled with a different recipe', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {
            1: 1
          },

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 15, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 237, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 1,
              unit: ''
            }]
          },

          numberOfItemsInCart: 1
        }, {
          type: 'ADD_RECIPE',
          payload: secondPayload
        })
      ).toEqual({
          numberOfItemsInCart: 2,

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 30, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 474, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 2,
              unit: ''
            }]
          },

          numberOfRecipesByRecipe: {
            1: 1,
            2: 1
          }
        })
    })
  })

  describe('REMOVE_RECIPE', () => {
    it('should create removeRecipe action', () => {      
      const expectedAction = {
        type: 'REMOVE_RECIPE',
        payload
      };

      expect(cartActions.removeRecipe(payload)).toEqual(expectedAction);
    })

    it('should handle REMOVE_RECIPE when cart is empty', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {},
          ingredientsByDepartment: {},

          numberOfItemsInCart: 0
        }, {
          type: 'REMOVE_RECIPE',
          payload
        })
      ).toEqual({
          ingredientsByDepartment: {},
          numberOfRecipesByRecipe: {},

          numberOfItemsInCart: 0
        })
    })

    it('should handle REMOVE_RECIPE when cart is filled with a recipe', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {
            1: 1
          },

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 15, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 237, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 1,
              unit: ''
            }]
          },

          numberOfItemsInCart: 1
        }, {
          type: 'REMOVE_RECIPE',
          payload
        })
      ).toEqual({
          numberOfItemsInCart: 0,

          ingredientsByDepartment: {},
          numberOfRecipesByRecipe: {}
        })
    })

    it('should handle REMOVE_RECIPE when cart is filled with a different recipe', () => {
      expect(
        cart({
          numberOfRecipesByRecipe: {
            1: 1,
            2: 1
          },

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 30, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 474, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 2,
              unit: ''
            }]
          },

          numberOfItemsInCart: 2
        }, {
          type: 'REMOVE_RECIPE',
          payload: secondPayload
        })
      ).toEqual({
          numberOfItemsInCart: 1,

          ingredientsByDepartment: {
            Condiments: [{
              department: 'Condiments', 
              display_index: 6, 
              name: 'olive oil', 
              quantity: 15, 
              unit: 'ml'
            }],
            Produce: [{
              department: 'Produce',
              display_index: 0,
              name: 'cherry tomatoes',
              quantity: 237, 
              unit: 'ml'
            }], 
            Spices: [{
              department: 'Spices',
              display_index: 7,
              name: 'salt and freshly ground black pepper',
              quantity: 1,
              unit: ''
            }]
          },

          numberOfRecipesByRecipe: {
            1: 1
          }
        })
    })
  })
})