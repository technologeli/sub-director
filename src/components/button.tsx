type ButtonProps = React.ComponentProps<"button">;
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-8 py-1 rounded text-zinc-200 bg-zinc-900 
      transition-colors hover:bg-zinc-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
