type MainProps = React.ComponentProps<"main">;

const Main: React.FC<MainProps> = ({ children, className, ...props }) => {
  return (
    <main
      {...props}
      className={`bg-zinc-50 h-screen w-screen flex flex-col ${className}`}
    >
      {children}
    </main>
  );
};

export default Main;
