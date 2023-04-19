import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import {
  searchExcutedAtom,
  searchSearchQueryAtom,
  searchTempQueryAtom,
} from "@/atoms/searchAtoms";
import { getFormattedDate, getGreeting } from "@/utils/timeUtils";
import { userNameAtom, userPictureAtom } from "@/atoms/userAtoms";
import { deleteAccount } from "@/apis/User";
import { useRouter } from "next/router";
import Searchbar from "../common/Searchbar";

const SearchMain = () => {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [userPicture, setUserPicture] = useAtom(userPictureAtom);
  const userImage = userPicture || "/images/user.png";

  const setSearchPageSearchQuery = useSetAtom(searchSearchQueryAtom);
  const setSearchTempQuery = useSetAtom(searchTempQueryAtom);
  const setSearchExcuted = useSetAtom(searchExcutedAtom);

  const route = useRouter();

  const date = getFormattedDate();
  const greeting = getGreeting();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setSearchPageSearchQuery(target.value);
      setSearchTempQuery(target.value);
      setSearchExcuted(true);
    }
  };

  const deleteAccountMutation = deleteAccount();

  const handleDeleteAccount = async () => {
    deleteAccountMutation.mutate(null, {
      onSuccess: () => {
        route.push("/");
      },
      onError: (error) => {
        console.error("Error signing in:", error);
      },
    });
  };

  useEffect(() => {
    const storeName = sessionStorage.getItem("name");
    if (storeName) {
      setUserName(storeName);
    }
    const storePicture = sessionStorage.getItem("picture");
    if (storePicture) {
      setUserPicture(storePicture);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-3 w-full">
      {/* Image */}
      <div className="bg-white drop-shadow-sm flex flex-col items-center justify-center lg:drop-shadow-xl h-full">
        <div
          className="bg-bottom bg-cover flex justify-between h-32 px-5 py-3 saturate-50 w-full"
          style={{ backgroundImage: "url('/images/SearchMain.jpg')" }}
        >
          <div>
            <p className="font-semibold lg:text-4xl text-2xl">
              {greeting}, {userName}!
            </p>
            <p className="lg:mt-2 lg:text-lg text-sm">{date}</p>
          </div>
          <div className="cursor-pointer group h-12 relative rounded-full w-12 p-2">
            <img
              src="/images/User.png"
              alt="User Profile Picture"
              className="object-cover rounded-full"
            />
            <button
              className="absolute bg-white hover:bg-gray-100 hover:text-gray-900 invisible group-hover:visible p-2 right-5 text-center text-gray-500 text-sm top-8 w-32"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center h-[calc(100%_-_8rem)] px-3 w-full">
          <div className="flex flex-col items-center justify-center md:h-1/2 md:w-4/5 py-4">
            <div className="h-fit w-full">
              <h1 className="font-semibold mb-3 text-2xl">Search</h1>
              <Searchbar
                bgColor="bg-zinc-200"
                handleKeyDown={handleKeyDown}
                placeholder="Search on Google, Youtube"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
