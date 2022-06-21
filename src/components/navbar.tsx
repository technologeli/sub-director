import Link from "next/link";

type LinkProps = React.ComponentProps<typeof Link>;

const NavLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <div className="px-4">
      <Link {...props}>{children}</Link>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 w-60 flex flex-col">
      {/* NavLink for every sub-directory */}
      <NavLink href="sub1">Sub Directory 1</NavLink>
      <NavLink href="sub2">Sub Directory 2</NavLink>
      <NavLink href="sub3">Sub Directory 3</NavLink>
      <NavLink href="sub4">Sub Directory 4</NavLink>
    </nav>
  );
};

export default Navbar;
