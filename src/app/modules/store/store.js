import { recipes } from './recipes';

import State from './store.type';

const initialState: State = {
 recipes: recipes
}

export default function store(state: State = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}