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
        className={`rounded px-4 py-1 text-left transition hover:z-10 
        hover:bg-zinc-200 hover:shadow-md active:bg-zinc-50 
        ${highlight && "z-10 bg-zinc-200 shadow-md"}`}
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
    <nav className="flex w-60 flex-col bg-zinc-300 px-4 py-1">
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
