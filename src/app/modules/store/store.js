import {recipes } from './recipes';

const initialState = {
 recipes: recipes
}

export default function store(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}