type ButtonProps = React.ComponentProps<"button">;
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`rounded bg-zinc-900 px-8 py-1 text-zinc-200
      transition-colors hover:bg-zinc-800 
        focus:outline-none focus:ring-2
        focus:ring-amber-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
