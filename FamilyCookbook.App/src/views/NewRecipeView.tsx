import { SubmitHandler, useForm } from "react-hook-form";
import { NewRecipeRequest } from "../interfaces.ts";
import { createRecipe } from "../utils/apiClient.ts";

export const NewRecipeView = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<NewRecipeRequest>();
  const onSubmit: SubmitHandler<NewRecipeRequest> = async (data) => {
    const created = await createRecipe(data);

    // TODO: WHAT TO DO AFTER SUCCESS?
    console.log(created);
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
