import { MealFreshness, MealSource, MealStatus, MealType } from "./enums.ts";

export interface Ingredient {
  id: number;
  amount: number;
  name: string;
  specifier: string | null
  recipeId: number
  unit: Unit;
}

export interface Meal extends NewMealRequest {
  id: number;
}

export interface NewMealRequest {
  date: Date;
  freshness: MealFreshness;
  recipeId: number;
  source: MealSource;
  status: MealStatus;
  type: MealType;
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
