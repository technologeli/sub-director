type WithIconProps = React.ComponentProps<"div"> & { icon: React.ReactNode };
const WithIcon: React.FC<WithIconProps> = ({
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`} {...props}>
      <>
        {icon}
        <span>{children}</span>
      </>
    </div>
  );
};

export default WithIcon;
