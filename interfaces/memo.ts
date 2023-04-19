export interface Memo extends MemoBody {
  id: number;
  userId: number;
  created_at: string;
}

export interface MemoBody {
  title: string;
  content: string;
}

export interface MemoListWithCount {
  memos: Memo[];
  pageCount: number;
  totalCount: number;
}

export type MemoMode = "add" | "edit" | "view";
