import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateMealRequest } from "../interfaces.ts";
import { getMeal, updateMeal } from "../utils/apiClient.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import {
  UNIT_ABBREVIATION_MAX_LENGTH,
  UNIT_NAME_MAX_LENGTH,
} from "../constants.ts";
import { Input } from "../components/FormComponents.tsx";
import { useEffect } from "react";

// TODO: THIS FILE IS JUST A COPY-PASTE

export const EditMealView = () => {
  const { id } = useParams();
  const numberId = Number(id);

  const navigate = useNavigate();
  const formMethods = useForm<UpdateMealRequest>();
  const { handleSubmit, reset } = formMethods;
  const onSubmit: SubmitHandler<UpdateMealRequest> = (data) => {
    updateMeal(numberId, data).then(() => navigate("/meals"));
  };

  useEffect(() => {
    if (Number.isInteger(numberId)) {
      getMeal(numberId).then((result) => reset({ ...result }));
    }
  }, [numberId]);

  return (
    <FormProvider {...formMethods}>
      <h1 className="title">Edit meal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input
            formName="new-meal"
            label="Name"
            maxLength={UNIT_NAME_MAX_LENGTH}
            name="name"
            type="text"
            required
          />
        </div>

        <div className="mb-3">
          <Input
            formName="new-meal"
            label="Abbreviation"
            maxLength={UNIT_ABBREVIATION_MAX_LENGTH}
            name="abbreviation"
            type="text"
            required
          />
        </div>

        <Row>
          <Col>
            <Button color="primary" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};
