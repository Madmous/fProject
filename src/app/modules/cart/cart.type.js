export type State = {
	ingredientsByDepartment: Object,
  numberOfRecipesByRecipe: Object,

  numberOfItemsInCart: number
};

type Ingredient = {
  display_index: number,
  name: String,
  department: String,
  quantity: number,
  unit: String
}

export type Recipe = {
  recipe_id: number,
  title: String,
  image_name: String,
  instructions: String,
  servings: number,
  ingredients: Array<Ingredient>
};

export type AddRecipeAction = {
  type: string;
  payload: Payload;
};

export type RemoveRecipeAction = {
  type: string;
  payload: Payload;
};