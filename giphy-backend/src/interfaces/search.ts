export interface RequestSearch {
  search: string;
  createdAt: string;
  username: string;
  limit: number;
  offset: number;
}

export interface RequestHistory {
  username: string;
}
