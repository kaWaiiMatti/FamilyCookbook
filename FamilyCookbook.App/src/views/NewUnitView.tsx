import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewUnitRequest } from "../interfaces.ts";
import { createUnit } from "../utils/apiClient.ts";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import {
  UNIT_ABBREVIATION_MAX_LENGTH,
  UNIT_NAME_MAX_LENGTH,
} from "../constants.ts";
import { Input } from "../components/FormComponents.tsx";

export const NewUnitView = () => {
  const navigate = useNavigate();
  const formMethods = useForm<NewUnitRequest>();
  const { handleSubmit } = formMethods;
  const onSubmit: SubmitHandler<NewUnitRequest> = (data) => {
    createUnit(data).then((created) => {
      console.log(created);
      navigate("/units");
    });
  };

  return (
    <FormProvider {...formMethods}>
      <h1 className="title">New unit</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input
            formName="new-unit"
            label="Name"
            maxLength={UNIT_NAME_MAX_LENGTH}
            name="name"
            type="text"
            required
          />
        </div>

        <div className="mb-3">
          <Input
            formName="new-unit"
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
              Create
            </Button>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};
