type MainProps = React.ComponentProps<"main">;

const Main: React.FC<MainProps> = ({ children, className, ...props }) => {
  return (
    <main {...props} className={`flex h-screen w-screen flex-col ${className}`}>
      {children}
    </main>
  );
};

export default Main;
