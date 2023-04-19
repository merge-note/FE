import axios from "axios";
import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import { searchSearchQueryAtom } from "@/atoms/searchAtoms";
import { searchResourceAtom } from "@/atoms/searchAtoms";

export const [, getSearchResult] = atomsWithInfiniteQuery((get) => {
  const searchQuery = get(searchSearchQueryAtom);
  const searchResource = get(searchResourceAtom);
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const googleCx = process.env.NEXT_PUBLIC_GOOGLE_CX;
  const maxResults = 20;

  return {
    queryKey: ["googleSearch", searchResource, searchQuery],
    queryFn: async ({ pageParam }) => {
      if (searchResource === "google") {
        const res = await axios.get(
          `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${googleCx}&q=${searchQuery}&start=${
            pageParam ?? 1
          }`
        );
        console.log(res.data);
        return res.data;
      } else if (searchResource === "youtube") {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${googleApiKey}&part=snippet&maxResults=${maxResults}&q=${searchQuery}&type=video${
            pageParam ? `&pageToken=${pageParam}` : ""
          }`
        );
        console.log(res.data);
        return res.data;
      } else {
        throw new Error(`Invalid search resource: ${searchResource}`);
      }
    },
    getNextPageParam: (lastPage) => {
      if (
        searchResource === "google" &&
        lastPage.queries &&
        lastPage.queries.nextPage
      ) {
        return lastPage.queries.nextPage[0].startIndex;
      } else if (searchResource === "youtube" && lastPage.nextPageToken) {
        return lastPage.nextPageToken;
      } else {
        return null;
      }
    },
  };
});
