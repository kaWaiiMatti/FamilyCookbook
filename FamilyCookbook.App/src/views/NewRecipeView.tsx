import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewRecipeRequest } from "../interfaces.ts";
import { createRecipe } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import { Input } from "../components/FormComponents.tsx";
import { RECIPE_NAME_MAX_LENGTH } from "../constants.ts";

const formName = "new-recipe";

export const NewRecipeView = () => {
  const navigate = useNavigate();
  const formMethods = useForm<NewRecipeRequest>();
  const { handleSubmit } = formMethods;
  const onSubmit: SubmitHandler<NewRecipeRequest> = (data) => {
    createRecipe(data).then(() => navigate("/recipes"));
  };

  return (
    <FormProvider {...formMethods}>
      <h1 className="title">New recipe</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input
            formName={formName}
            label="Name"
            maxLength={RECIPE_NAME_MAX_LENGTH}
            name="name"
            type="text"
            required
          />
        </div>

        <Row>
          <Col>
            <Button color="primary" type="submit">
              Create
            </Button>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};
