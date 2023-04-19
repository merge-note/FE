import { useEffect, useRef, ChangeEvent } from "react";
import { useAtom, useAtomValue } from "jotai";
import { getSearchResult } from "@/apis/SearchPage";
import styles from "@/styles/searchStyle.module.scss";
import Searchbar from "../common/Searchbar";
import YoutubeResult from "./YoutubeResultItem";
import GoogleResult from "./GoogleResultItem";
import {
  searchSearchQueryAtom,
  searchResourceAtom,
  searchTempQueryAtom,
} from "@/atoms/searchAtoms";

const SearchResult = () => {
  const googleOptionRef = useRef<HTMLButtonElement>(null);
  const youtubeOptionRef = useRef<HTMLButtonElement>(null);

  const [searchPageSearchQuery, setSearchPageSearchQuery] = useAtom(
    searchSearchQueryAtom
  );
  const [searchTempQuery, setSearchTempQuery] = useAtom(searchTempQueryAtom);

  const [searchOptiont, setSearchOption] = useAtom(searchResourceAtom);

  const [item, dispatch] = useAtom(getSearchResult);
  const handleFetchNextPage = () => dispatch({ type: "fetchNextPage" });

  const { data, hasNextPage, isLoading } = useAtomValue(getSearchResult);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            handleFetchNextPage();
          }
        },
        { threshold: 0.8 }
      );
      observer.observe(observerRef.current);

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }
  }, [observerRef, handleFetchNextPage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      setSearchPageSearchQuery(target.value);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTempQuery(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-3">
      <div className="h-full bg-white drop-shadow-sm lg:drop-shadow-xl flex flex-col justify-center items-center px-3">
        <div className="w-full h-24 flex items-center justify-center">
          <div className="w-1/2 relative gro">
            <Searchbar
              handleKeyDown={handleKeyDown}
              value={searchTempQuery}
              handleChange={handleInputChange}
            />
          </div>
        </div>

        {/* Option Button */}
        <div className="w-full h-10 flex flex-col justify-center items-center">
          <div className="h-10 w-fit border-b border-slate-400 ">
            <button
              className={`h-full px-3 font-semibold border-b-2 ${
                searchOptiont === "google"
                  ? "border-slate-500"
                  : "border-transparent"
              }  focus:outline-none`}
              value={"google"}
              ref={googleOptionRef}
              onClick={() => {
                setSearchOption("google");
              }}
            >
              Google
            </button>
            <button
              className={`h-full px-3 font-semibold border-b-2 ${
                searchOptiont === "youtube"
                  ? "border-slate-500"
                  : "border-transparent"
              } focus:outline-none`}
              value={"youtube"}
              ref={youtubeOptionRef}
              onClick={() => {
                setSearchOption("youtube");
              }}
            >
              Youtube
            </button>
          </div>
        </div>
        <div className={`${styles["hide-scrollbar"]} h-full overflow-y-scroll`}>
          <div
            className={
              (isLoading && searchOptiont === "youtube") ||
              (data?.pages &&
                data.pages[0]?.items &&
                searchOptiont === "youtube")
                ? "grid grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-center"
                : "grid grid-rows-10 gap-1"
            }
          >
            {isLoading
              ? searchOptiont === "youtube"
                ? Array.from({ length: 20 }).map((_, index) => (
                    <YoutubeResult
                      key={index}
                      etag=""
                      videoId=""
                      channelTitle=""
                      title=""
                      description=""
                      thumbnail=""
                      isLoading={true}
                    />
                  ))
                : Array.from({ length: 10 }).map((_, index) => (
                    <GoogleResult
                      key={index}
                      title=""
                      snippet=""
                      link=""
                      formattedUrl=""
                      isLoading={true}
                    />
                  ))
              : data?.pages
                  ?.flatMap((page) => page.items)
                  ?.map((item) =>
                    searchOptiont === "youtube" ? (
                      <YoutubeResult
                        key={item.etag}
                        etag={item.etag}
                        videoId={item.id.videoId}
                        channelTitle={item.snippet.channelTitle}
                        title={item.snippet.title}
                        description={item.snippet.description}
                        thumbnail={item.snippet.thumbnails.high.url}
                        pageInfo={data?.pages[0]?.pageInfo}
                      />
                    ) : (
                      <GoogleResult
                        key={item.id}
                        title={item.title}
                        snippet={item.snippet}
                        link={item.link}
                        formattedUrl={item.formattedUrl}
                        isLoading={false}
                      />
                    )
                  )}
          </div>
          <div className="h-5" ref={observerRef} />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
