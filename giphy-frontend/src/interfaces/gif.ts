export interface QuerySearchGif {
  search: string;
  username: string;
  offset: number;
}

export interface SearchHistory {
  createdAt: string;
  id: number;
  search: string;
  username: string;
}
