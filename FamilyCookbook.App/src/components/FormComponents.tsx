import { useFormContext } from "react-hook-form";
import {
  MaxLengthValidationMessage,
  MinLengthValidationMessage,
  RequiredValidationMessage,
} from "./validation/Validation";

const labelClassName = "form-label";
const inputClassName = "form-control";

type CommonInputProps = {
  formName: string;
  label: string;
  name: string;
};

export type InputProps = CommonInputProps & {
  maxLength?: number;
  minLength?: number;
  type: "text" | "date";
  required?: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type RadioSelectProps = CommonInputProps & {
  options: SelectOption[];
};

export type SelectProps = CommonInputProps & {
  options: SelectOption[];
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

export const RadioSelect = ({
  formName,
  label,
  name,
  options,
}: RadioSelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const relatedErrors = errors[name];

  return (
    <>
      <label className={labelClassName}>{label}</label>
      {options.map((option) => (
        <div className="form-check" key={option.value}>
          <input
            className={`form-check-input ${relatedErrors ? "is-invalid" : ""}`}
            type="radio"
            id={`${formName}-${name}-${option.value}`}
            {...register(name, { required: true })}
          />
          <label
            className="form-check-label"
            htmlFor={`${formName}-${name}-${option.value}`}
            style={{ color: "var(--bs-body-color)" }}
          >
            {option.label}
          </label>
        </div>
      ))}
      {relatedErrors && relatedErrors.type === "required" && (
        <RequiredValidationMessage />
      )}
    </>
  );
};

export const Select = ({ formName, label, name, options }: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const relatedErrors = errors[name];

  return (
    <>
      <label className={labelClassName} htmlFor={`${formName}-${name}`}>
        {label}
      </label>
      <select
        className={`${inputClassName} ${relatedErrors ? "is-invalid" : ""}`}
        id={`${formName}-${name}`}
        {...register(name, { required: true })}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {relatedErrors && relatedErrors.type === "required" && (
        <RequiredValidationMessage />
      )}
    </>
  );
};
