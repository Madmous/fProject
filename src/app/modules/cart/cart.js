import _ from 'lodash';

const ADD_RECIPE = 'ADD_RECIPE';
const REMOVE_RECIPE = 'REMOVE_RECIPE';

const initialState = {
  ingredientsByDepartment: {},
  numberOfRecipesByRecipe: {},

  numberOfItemsInCart: 0
}

export function addRecipe(payload) {
  return {
    type: ADD_RECIPE,
    payload
  };
}

export function removeRecipe(payload) {
  return {
    type: REMOVE_RECIPE,
    payload
  };
}

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_RECIPE: 
      return handleAddRecipe(state, action);
    case REMOVE_RECIPE: 
      return handleRemoveRecipe(state, action);
    default: 
      return state;
  }
}

function handleAddRecipe(state, action) {
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

function fillNumberOfRecipesByRecipe(state, recipeId) {
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

function fillIngredientsByDepartment(state, recipe) {
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

function addIngredientsOrUpdateQuantities(department, ingredient) {
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

function handleRemoveRecipe(state, action) {
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

function updateQuantityIfIngredientPresent(department, ingredient, ingredientIndex) {
	if (ingredientIndex !== -1) {
		if (ingredient.department === 'Spices') {
			department[ingredientIndex].quantity -= 1;
		} else {
			department[ingredientIndex].quantity -= ingredient.quantity;
		}
	}
}

function removeIngredientIfQuantityZero(department, ingredientIndex) {
	const ingredientDepartment = department[ingredientIndex];

	if (ingredientDepartment && ingredientDepartment.quantity === 0 ) {
		department.splice(ingredientIndex, 1);
	}
}

function removeDepartmentIfEmpty(department, ingredient, ingredientsByDepartment) {
	if (department.length === 0) {
		delete ingredientsByDepartment[ingredient.department];
	}
}