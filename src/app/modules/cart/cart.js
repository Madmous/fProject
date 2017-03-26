// @flow

import _ from 'lodash';

import * as cartTypes from './cart.type';

const {
	RemoveRecipeAction,
	AddRecipeAction,
	Ingredient,
	Recipe,
	State
} = cartTypes;

const ADD_RECIPE: string = 'ADD_RECIPE';
const REMOVE_RECIPE: string = 'REMOVE_RECIPE';

const initialState: State = {
  ingredientsByDepartment: {},
  numberOfRecipesByRecipe: {},

  numberOfItemsInCart: 0
}

export function addRecipe(payload: Recipe): AddRecipeAction {
  return {
    type: ADD_RECIPE,
    payload
  };
}

export function removeRecipe(payload: Recipe): RemoveRecipeAction {
  return {
    type: REMOVE_RECIPE,
    payload
  };
}

export default function cart(state: State = initialState, action: Recipe): State {
  switch (action.type) {
    case ADD_RECIPE: 
      return handleAddRecipe(state, action);
    case REMOVE_RECIPE: 
      return handleRemoveRecipe(state, action);
    default: 
      return state;
  }
}

function handleAddRecipe(state: State, action: Recipe): State {
  let { numberOfItemsInCart } = state;
  numberOfItemsInCart++;

  let recipe = action.payload;

  let numberOfRecipesByRecipe = fillNumberOfRecipesByRecipe(state, recipe.recipe_id);

  let ingredientsByDepartment = fillIngredientsByDepartment(state, recipe);


  return {
    ...state,
    numberOfRecipesByRecipe,
    ingredientsByDepartment,
		numberOfItemsInCart
  };
}

function fillNumberOfRecipesByRecipe(state: State, recipeId: number): number {
  let numberOfRecipesByRecipe = {...state.numberOfRecipesByRecipe};

	if (!numberOfRecipesByRecipe[recipeId]) {
		numberOfRecipesByRecipe[recipeId] = 1;
  } else {
		let numberOfRecipes = numberOfRecipesByRecipe[recipeId];
		numberOfRecipes++;

		numberOfRecipesByRecipe[recipeId] = numberOfRecipes;
	}

  return numberOfRecipesByRecipe;
}

function fillIngredientsByDepartment(state: State, recipe: Recipe): Object {
  let ingredientsByDepartment = {...state.ingredientsByDepartment};

	recipe.ingredients.forEach(ingredient => {
		const ingredientCopy = {...ingredient};

		if (!ingredientsByDepartment[ingredientCopy.department]) {
			ingredientsByDepartment[ingredientCopy.department] = [];
		}

		let department = ingredientsByDepartment[ingredientCopy.department];

		addIngredientsOrUpdateQuantities(department, ingredientCopy);
	})

  return ingredientsByDepartment;
}

function addIngredientsOrUpdateQuantities(department: Array<Ingredient>, ingredient: Ingredient) {
  const ingredientIndex = _.findIndex(department, { name: ingredient.name });

	if (ingredientIndex === -1) {
		if (ingredient.department === 'Spices') {
			ingredient.quantity++;
		}

		department.push(ingredient);
	} else if (ingredient.department === 'Spices') {
		department[ingredientIndex].quantity++;
	} else {
		department[ingredientIndex].quantity += ingredient.quantity;
	}
}

function handleRemoveRecipe(state: State, action: RemoveRecipeAction): State {
  let numberOfRecipesByRecipe = {...state.numberOfRecipesByRecipe};
  let ingredientsByDepartment = {...state.ingredientsByDepartment};
	let recipe = action.payload;

	let numberOfRecipes = numberOfRecipesByRecipe[recipe.recipe_id];

	if (numberOfRecipes && numberOfRecipes > 0) {
		recipe.ingredients.forEach(ingredient => {
			let department = ingredientsByDepartment[ingredient.department];

			if (department && department.length > 0) {
				const ingredientIndex = _.findIndex(department, { name: ingredient.name });

				updateQuantityIfIngredientPresent(department, ingredient, ingredientIndex);

				removeIngredientIfQuantityZero(department, ingredientIndex);

				removeDepartmentIfEmpty(department, ingredient, ingredientsByDepartment);
			}
		})

		state.numberOfItemsInCart--;
		numberOfRecipes--;

		if (numberOfRecipes === 0) {
			delete numberOfRecipesByRecipe[recipe.recipe_id];
		} else {
			numberOfRecipesByRecipe[recipe.recipe_id] = numberOfRecipes;
		}
	}

  return {
    ...state,
    numberOfRecipesByRecipe,
    ingredientsByDepartment,
  };
}

function updateQuantityIfIngredientPresent(department: Array<Ingredient>, ingredient: Ingredient, ingredientIndex: number) {
	if (ingredientIndex !== -1) {
		if (ingredient.department === 'Spices') {
			department[ingredientIndex].quantity -= 1;
		} else {
			department[ingredientIndex].quantity -= ingredient.quantity;
		}
	}
}

function removeIngredientIfQuantityZero(department: Array<Ingredient>, ingredientIndex: number) {
	const ingredientDepartment = department[ingredientIndex];

	if (ingredientDepartment && ingredientDepartment.quantity === 0 ) {
		department.splice(ingredientIndex, 1);
	}
}

function removeDepartmentIfEmpty(department: Array<Ingredient>, ingredient: Ingredient, ingredientsByDepartment: Object) {
	if (department.length === 0) {
		delete ingredientsByDepartment[ingredient.department];
	}
}