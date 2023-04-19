import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { searchExcutedAtom } from "@/atoms/searchAtoms";

const Nav = () => {
  const setSearchExcuted = useSetAtom(searchExcutedAtom);
  const router = useRouter();
  const { pathname } = router;

  const handleGoSearchMain = () => {
    setSearchExcuted(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("toggleState");
    sessionStorage.removeItem("picture");
    sessionStorage.removeItem("name");
  };

  const isIconClicked = (path: string) => {
    return pathname === path ? "text-yellow-500" : "text-neutral-800";
  };

  return (
    <nav className="bg-white h-[4rem] lg:min-w-[4rem] lg:h-full py-8 flex lg:flex-col flex-row items-center lg:justify-between justify-center">
      <div className="flex lg:flex-col flex-row lg:gap-y-6 gap-x-6">
        <Link href="/search" onClick={handleGoSearchMain}>
          <HomeRoundedIcon className={isIconClicked("/search")} />
        </Link>
        <Link href="/news">
          <NewspaperRoundedIcon className={isIconClicked("/news")} />
        </Link>
      </div>
      <div className="ml-6 lg:ml-0">
        <Link href="/" onClick={handleLogout}>
          <LogoutIcon className="text-neutral-800" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
