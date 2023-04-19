import { useAtomValue } from "jotai";
import { searchExcutedAtom, searchSearchQueryAtom } from "@/atoms/searchAtoms";
import SearchResult from "./SearchResult";
import SearchMain from "./SearchMain";

const SearchContainer = () => {
  const searchExcuted = useAtomValue(searchExcutedAtom);

  return (
    <div className="w-full h-full flex flex-col">
      {searchExcuted ? <SearchResult /> : <SearchMain />}
    </div>
  );
};

export default SearchContainer;
