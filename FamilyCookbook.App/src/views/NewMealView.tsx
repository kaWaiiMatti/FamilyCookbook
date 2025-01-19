import { SubmitHandler, useForm } from "react-hook-form";
import { NewMealRequest, Recipe } from "../interfaces.ts";
import { createMeal, getRecipes } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const NewMealView = () => {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<NewMealRequest>();

  useEffect(() => {
    getRecipes().then(result => setRecipes(result));
  }, []);

  const onSubmit: SubmitHandler<NewMealRequest> = (data) => {
    createMeal(data).then(created => {
      console.log(created);
      navigate("/meals");
    });
  };

  return <>
    <h1 className="title">New meal</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Date</label>
        <div className="control">
          <input type="date" className={`input ${errors.date ? 'is-danger' : ''}`} {...register("date", { required: true })} />
        </div>
        {errors.date && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="20" />
            <span>Breakfast</span>
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="40" />
            <span>Lunch</span>
          </label>
        </div>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="60" />
            <span>Dinner</span>
          </label>
        </div>
        {errors.type && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field">
        <label className="label">Recipe</label>
        <div className="control">
          <select
            className={`select ${errors.recipeId ? 'is-danger' : ''}`} {...register("recipeId", { required: true })}
            disabled={recipes === null}>
            {recipes && recipes.map((recipe) => <option key={recipe.id} value={recipe.id}>{recipe.name}</option>)}
          </select>
        </div>
        {errors.recipeId && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field">
        <label className="label">Freshness</label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="20" />
            Fresh made
          </label>
          <label className="radio">
            <input type="radio" name="type" value="40" />
            Fridge stored
          </label>
          <label className="radio">
            <input type="radio" name="type" value="60" />
            Freezer stored
          </label>
        </div>
        {errors.freshness && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field">
        <label className="label">Source</label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="20" />
            Self-made
          </label>
          <label className="radio">
            <input type="radio" name="type" value="40" />
            Made by others
          </label>
          <label className="radio">
            <input type="radio" name="type" value="60" />
            Ready-made
          </label>
          <label className="radio">
            <input type="radio" name="type" value="80" />
            Restaurant (pick-up)
          </label>
          <label className="radio">
            <input type="radio" name="type" value="100" />
            Restaurant (dine-in)
          </label>
        </div>
        {errors.source && <p className="help is-danger">This field is required</p>}
      </div>


      <div className="field">
        <label className="label">Status</label>
        <div className="control">
          <label className="radio">
            <input type="radio" name="type" value="20" />
            Planned
          </label>
          <label className="radio">
            <input type="radio" name="type" value="40" />
            Realized
          </label>
        </div>
        {errors.status && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Create</button>
        </div>
      </div>
    </form>
  </>;
};
