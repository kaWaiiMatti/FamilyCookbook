const validationMessageClassName = "invalid-feedback";
const visibleStyle = { display: "block" };

export type MaxLengthValidationProps = {
  maxLength: number;
};

export type MinLengthValidationProps = {
  minLength: number;
};

export const MaxLengthValidationMessage = ({
  maxLength,
}: MaxLengthValidationProps) => {
  return (
    <p className={validationMessageClassName} style={visibleStyle}>
      This field must be at most {maxLength} characters long
    </p>
  );
};

export const MinLengthValidationMessage = ({
  minLength,
}: MinLengthValidationProps) => {
  return (
    <p className={validationMessageClassName} style={visibleStyle}>
      This field must be at least {minLength} characters long
    </p>
  );
};

export const RequiredValidationMessage = () => {
  return (
    <p className={validationMessageClassName} style={visibleStyle}>
      This field is required
    </p>
  );
};
