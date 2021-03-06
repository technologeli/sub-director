import { FieldValues, UseFormRegister } from "react-hook-form";

type FormProps = React.ComponentProps<"form">;
export const Form: React.FC<FormProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form
      className={`flex flex-col space-y-4 rounded-lg bg-brand-fill px-20 py-10 
      shadow ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

type ErrorProps = React.ComponentProps<"p">;
export const ErrorText: React.FC<ErrorProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={`text-center text-brand-error ${className}`} {...props}>
      {children}
    </p>
  );
};

type TextInputProps = React.ComponentProps<"input"> & {
  label?: string;
  register: UseFormRegister<FieldValues>;
  error?: any;
};
export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-0.5">
      <div className="flex justify-between text-sm">
        {label && <label htmlFor={name}>{label}</label>}
        {error?.message && <ErrorText>{error?.message}</ErrorText>}
      </div>
      <input
        className={`rounded border border-brand-accent bg-brand-muted px-2 
        focus:border-brand-accent focus:bg-brand-muted focus:outline-none
        focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-fill ${className}`}
        type="text"
        {...props}
        {...register(name || "")}
      />
    </div>
  );
};
