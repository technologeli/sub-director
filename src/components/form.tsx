import { FieldValues, UseFormRegister } from "react-hook-form";

type FormProps = React.ComponentProps<"form">;
export const Form: React.FC<FormProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <form
      className={`flex flex-col space-y-4 shadow px-20 py-10 rounded-lg bg-zinc-50 ${className}`}
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
    <p className={`text-red-500 text-center ${className}`} {...props}>
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
        className={`border border-zinc-300 bg-zinc-100 focus:bg-zinc-100 rounded px-2 ${className}`}
        type="text"
        {...props}
        {...register(name || "")}
      />
    </div>
  );
};
