import axiosConfig from "./axiosConfig";
import {
  currentPageNumberAtom,
  memoSearchQueryAtom,
  selectedMemoIdAtom,
} from "@/atoms/quickMemoAtoms";
import { atomsWithQuery } from "jotai-tanstack-query";
import { MemoListWithCount, MemoBody, Memo } from "@/interfaces/memo";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const [, getMemos] = atomsWithQuery((get) => {
  const currentPageNumber = get(currentPageNumberAtom);
  const searchQuery = get(memoSearchQueryAtom);

  const url =
    searchQuery.length > 0
      ? `/memos/search?keyword=${searchQuery}&page=${currentPageNumber}`
      : `/memos?page=${currentPageNumber}`;

  return {
    queryKey: ["memos", currentPageNumber, searchQuery],
    queryFn: async () => {
      try {
        const res = await axiosConfig.get<MemoListWithCount>(url);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching data");
      }
    },
  };
});

export const [, getMemoById] = atomsWithQuery((get) => {
  const selectedMemoId = get(selectedMemoIdAtom);

  return {
    queryKey: ["memos", selectedMemoId],
    queryFn: async () => {
      try {
        const url = `/memos/${selectedMemoId}`;
        const res = await axiosConfig.get<Memo>(url);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching memo by id");
      }
    },
  };
});

export const addMemo = () => {
  const [currentPageNumber, setCurrentPageNumber] = useAtom(
    currentPageNumberAtom
  );
  const [searchQuery, setSearchQuery] = useAtom(memoSearchQueryAtom);
  const queryClient = useQueryClient();

  return useMutation(
    async (memo: MemoBody) => {
      try {
        const url = "/memos";
        const res = await axiosConfig.post<MemoListWithCount>(url, memo);
        return res.data;
      } catch (error) {
        throw new Error("Error adding memo");
      }
    },
    {
      onSuccess: () => {
        setCurrentPageNumber(1);
        setSearchQuery("");

        queryClient.invalidateQueries([
          "memos",
          currentPageNumber,
          searchQuery,
        ]);
      },
    }
  );
};

export const deleteMemo = () => {
  const [currentPageNumber] = useAtom(currentPageNumberAtom);
  const [searchQuery] = useAtom(memoSearchQueryAtom);
  const queryClient = useQueryClient();

  return useMutation(
    async (memoId: number) => {
      try {
        const url = "/memos";
        const res = await axiosConfig.delete(`${url}/${memoId}`);
        return res.data;
      } catch (error) {
        throw new Error("Error deleting memo");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "memos",
          currentPageNumber,
          searchQuery,
        ]);
      },
    }
  );
};

export const editMemo = () => {
  const [currentPageNumber] = useAtom(currentPageNumberAtom);
  const [searchQuery] = useAtom(memoSearchQueryAtom);
  const [selectedMemoId] = useAtom(selectedMemoIdAtom);
  const queryClient = useQueryClient();

  return useMutation(
    async (memo: MemoBody) => {
      try {
        const url = `/memos/${selectedMemoId}`;
        const res = await axiosConfig.put<MemoBody>(url, memo);
        return res.data;
      } catch (error) {
        throw new Error("Failed to edit memo");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "memos",
          currentPageNumber,
          searchQuery,
        ]);
        queryClient.invalidateQueries(["memo", selectedMemoId]);
      },
      onError: (error) => {
        throw new Error("Failed to edit memo");
      },
    }
  );
};
