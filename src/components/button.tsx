type ButtonProps = React.ComponentProps<"button">;
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`rounded bg-brand-button-fill px-8 py-1 text-brand-button-text
      transition-colors hover:bg-opacity-90
        focus:outline-none focus:ring-2
        focus:ring-brand-primary focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
