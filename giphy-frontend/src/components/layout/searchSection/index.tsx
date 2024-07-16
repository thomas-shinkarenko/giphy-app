import React, { useState } from "react";
import {
  Container,
  ModalContent,
  ModalOverlay,
  StyledButton,
  StyledInput,
} from "./styles.ts";
import { QuerySearchGif, SearchHistory } from "../../../interfaces/gif.ts";
import axios from "axios";

const SearchSection = ({
  query,
  setQuery,
}: {
  query: QuerySearchGif;
  setQuery: React.Dispatch<React.SetStateAction<QuerySearchGif>>;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [historyData, setHistoryData] = useState<SearchHistory[]>([]);
  const [clearHistory, setClearHistory] = useState(false);

  const handleGetHistory = async () => {
    const response = await axios.get("http://localhost:3333/search/history", {
      params: {
        username: query.username,
      },
    });
    setHistoryData(response.data);
    setOpenModal(true);
  };

  const handleClearHistory = async () => {
    setClearHistory(true);
    await axios.delete(
      `http://localhost:3333/search/history/${query.username}`,
    );
  };

  return (
    <Container>
      <StyledInput
        type="text"
        value={query.search}
        placeholder="your favorite gif here :D"
        onChange={(e) =>
          setQuery({
            ...query,
            search: e.target.value,
          })
        }
        onClick={() => setClearHistory(false)}
      />
      <StyledButton onClick={handleGetHistory}>History</StyledButton>
      <StyledButton onClick={handleClearHistory}>Clear history</StyledButton>
      {clearHistory && <div>History cleared! Go search something :D</div>}
      {openModal && (
        <ModalOverlay onClick={() => setOpenModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {historyData.length > 0
              ? historyData.map((item: SearchHistory) => (
                  <div key={item.id}>{item.search}</div>
                ))
              : "Seems that you have no search history :("}
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SearchSection;
