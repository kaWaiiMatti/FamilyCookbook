import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewMealRequest, Recipe } from "../interfaces.ts";
import { createMeal, getRecipes } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Input,
  RadioSelect,
  Select,
  SelectOption,
} from "../components/FormComponents.tsx";
import { Button, Col, Row } from "reactstrap";
import {
  MEAL_FRESHNESS_OPTIONS,
  MEAL_SOURCE_OPTIONS,
  MEAL_STATUS_OPTIONS,
  MEAL_TYPE_OPTIONS,
} from "../constants.ts";

const formName = "new-meal";
const spacing = "mb-4";

export const NewMealView = () => {
  const navigate = useNavigate();
  const formMethods = useForm<NewMealRequest>();
  const { handleSubmit } = formMethods;
  const onSubmit: SubmitHandler<NewMealRequest> = (data) => {
    createMeal(data).then(() => navigate("/meals"));
  };

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    getRecipes().then((data) => {
      setRecipes(data);
    });
  }, []);

  return (
    <FormProvider {...formMethods}>
      <h1 className="title">New meal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={spacing}>
          <Input
            formName={formName}
            label="Date"
            name="date"
            type="date"
            required
          />
        </div>

        <div className={spacing}>
          <RadioSelect
            formName={formName}
            label="Type"
            name="type"
            options={MEAL_TYPE_OPTIONS}
          />
        </div>

        <div className={spacing}>
          <Select
            formName={formName}
            label="Recipe"
            name="recipeId"
            options={recipes.map(
              (recipe) =>
                ({
                  label: recipe.name,
                  value: `${recipe.id}`,
                } satisfies SelectOption)
            )}
          />
        </div>

        <div className={spacing}>
          <RadioSelect
            formName={formName}
            label="Freshness"
            name="freshness"
            options={MEAL_FRESHNESS_OPTIONS}
          />
        </div>

        <div className={spacing}>
          <RadioSelect
            formName={formName}
            label="Source"
            name="source"
            options={MEAL_SOURCE_OPTIONS}
          />
        </div>

        <div className={spacing}>
          <RadioSelect
            formName={formName}
            label="Status"
            name="status"
            options={MEAL_STATUS_OPTIONS}
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
