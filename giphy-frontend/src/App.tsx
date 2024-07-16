import "./App.css";
import { useEffect, useState } from "react";
import Main from "./components/layout/main";
import Content from "./components/layout/content";
import Footer from "./components/layout/footer";
import SearchSection from "./components/layout/searchSection";
import { useDebounce } from "use-debounce";
import { v4 as uuidv4 } from "uuid";
import { QuerySearchGif } from "./interfaces/gif.ts";
import { GifsResult, ResultMeta, ResultPagination } from "@giphy/js-fetch-api";
import axios from "axios";
import IGif from "@giphy/js-types/dist/gif";
import Pagination from "./components/shared/pagination";

const LOCAL_GIPHY_USERNAME = "local_giphy_username";

const QUERY_SEARCH_GIF_INIT_STATE: QuerySearchGif = {
  search: "",
  username: "",
  offset: 0,
};

function App() {
  const [query, setQuery] = useState<QuerySearchGif>(
    QUERY_SEARCH_GIF_INIT_STATE,
  );
  const [debouncedSearch] = useDebounce(query.search, 300);

  const initializeLocalUser = () => {
    let foundLocalUser = localStorage.getItem(LOCAL_GIPHY_USERNAME);

    if (!foundLocalUser) {
      const randomUuid = uuidv4();
      foundLocalUser = `${LOCAL_GIPHY_USERNAME}_${randomUuid}`;
      localStorage.setItem(
        LOCAL_GIPHY_USERNAME,
        `${LOCAL_GIPHY_USERNAME}_${randomUuid}`,
      );
    }

    setQuery({
      ...query,
      username: foundLocalUser as string,
    });
  };

  const getGifs = async (offset: number): Promise<GifsResult> => {
    const response = await axios.get("http://localhost:3333/search", {
      params: {
        search: debouncedSearch,
        username: query.username,
        offset: offset ?? 0,
      },
    });

    return {
      data: response.data as IGif[],
      meta: response.data as ResultMeta,
      pagination: response.data as ResultPagination,
    };
  };

  useEffect(() => {
    setQuery({
      ...query,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  useEffect(() => {
    initializeLocalUser();
  }, []);

  return (
    <Main>
      <SearchSection query={query} setQuery={setQuery} />
      <Content
        query={query}
        getGifs={() => getGifs(query.offset)}
        debouncedSearch={debouncedSearch}
      />
      <Footer>
        {debouncedSearch && <Pagination query={query} setQuery={setQuery} />}
      </Footer>
    </Main>
  );
}

export default App;
