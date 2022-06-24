import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsPlusLg, BsFolderFill } from "react-icons/bs";
import WithIcon from "./withicon";

type LinkProps = React.ComponentProps<typeof Link> & { highlight?: boolean };

const NavLink: React.FC<LinkProps> = ({ children, highlight, ...props }) => {
  return (
    <Link {...props}>
      <button
        className={`px-4 py-1 rounded text-left
        transition hover:shadow-md hover:bg-zinc-200 hover:z-10 
        active:bg-zinc-50
        ${highlight && "bg-zinc-200 z-10 shadow-md"}`}
      >
        {children}
      </button>
    </Link>
  );
};

const Navbar = () => {
  const { data: subDirs } = trpc.useQuery(["sub.list"]);
  const router = useRouter();
  const { name } = router.query;
  return (
    <nav className="px-4 py-1 bg-zinc-300 w-60 flex flex-col">
      <WithIcon icon={<BsFolderFill />}>
        <h2 className="py-2 text-lg">Your Subdirectories</h2>
      </WithIcon>

      {subDirs?.subDirectories.map((subDir) => (
        <NavLink
          key={subDir.id}
          href={`/sub/${subDir.name}`}
          highlight={name === subDir.name}
        >
          {subDir.name}
        </NavLink>
      ))}

      <NavLink href="/newsub" highlight={router.pathname === "/newsub"}>
        <div className="flex flex-col items-center py-1">
          <BsPlusLg />
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
