import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateUnitRequest } from "../interfaces.ts";
import { getUnit, updateUnit } from "../utils/apiClient.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import {
  UNIT_ABBREVIATION_MAX_LENGTH,
  UNIT_NAME_MAX_LENGTH,
} from "../constants.ts";
import { Input } from "../components/FormComponents.tsx";
import { useEffect } from "react";

export const EditUnitView = () => {
  const { id } = useParams();
  const numberId = Number(id);

  const navigate = useNavigate();
  const formMethods = useForm<UpdateUnitRequest>();
  const { handleSubmit, reset } = formMethods;
  const onSubmit: SubmitHandler<UpdateUnitRequest> = (data) => {
    updateUnit(numberId, data).then(() => navigate("/units"));
  };

  useEffect(() => {
    if (Number.isInteger(numberId)) {
      getUnit(numberId).then((result) => reset({ ...result }));
    }
  }, [numberId]);

  return (
    <FormProvider {...formMethods}>
      <h1 className="title">Edit unit</h1>
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
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};
