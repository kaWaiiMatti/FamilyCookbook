import { SubmitHandler, useForm } from "react-hook-form";
import { NewRecipeRequest } from "../interfaces.ts";
import { createRecipe } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";

export const NewRecipeView = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<NewRecipeRequest>();
  const onSubmit: SubmitHandler<NewRecipeRequest> = (data) => {
    createRecipe(data).then(created => {
      console.log(created);
      navigate("/recipes");
    });
  };

  return <>
    <h1 className="title">New recipe</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className={`input ${errors.name ? 'is-danger' : ''}`} {...register("name", { required: true })} />
        </div>
        {errors.name && <p className="help is-danger">This field is required</p>}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link">Create</button>
        </div>
      </div>
    </form>
  </>;
};
