import { useFormContext } from "react-hook-form";
import {
  MaxLengthValidationMessage,
  MinLengthValidationMessage,
  RequiredValidationMessage,
} from "./validation/Validation";
import { useEffect } from "react";

const labelClassName = "form-label";
const inputClassName = "form-control";

export type InputProps = {
  formName: string;
  label: string;
  name: string;
  maxLength?: number;
  minLength?: number;
  type: "text";
  required?: boolean;
};

export const Input = ({
  formName,
  label,
  name,
  maxLength,
  minLength,
  required,
  type,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const relatedErrors = errors[name];

  useEffect(() => {
    console.log("required", {
      formName,
      label,
      name,
      required,
      errors,
      relatedErrors,
    });
  }, [required, errors]);

  return (
    <>
      <label className={labelClassName} htmlFor={`${formName}-${name}`}>
        {label}
      </label>
      <input
        className={`${inputClassName} ${relatedErrors ? "is-invalid" : ""}`}
        id={`${formName}-${name}`}
        type={type}
        {...register(name, { maxLength, minLength, required })}
      />
      {required && relatedErrors && relatedErrors.type === "required" && (
        <RequiredValidationMessage />
      )}
      {minLength !== undefined &&
        relatedErrors &&
        relatedErrors.type === "minLength" && (
          <MinLengthValidationMessage minLength={minLength} />
        )}
      {maxLength !== undefined &&
        relatedErrors &&
        relatedErrors.type === "maxLength" && (
          <MaxLengthValidationMessage maxLength={maxLength} />
        )}
    </>
  );
};
