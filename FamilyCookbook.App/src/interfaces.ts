export interface Ingredient {
  id: number;
  amount: number;
  name: string;
  specifier: string | null
  recipeId: number
  unit: Unit;
}

export interface NewRecipeRequest {
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  abbreviation: string;
  name: string;
}
