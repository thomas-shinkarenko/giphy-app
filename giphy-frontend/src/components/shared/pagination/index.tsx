import { Arrow, Container } from "./styles.ts";
import { QuerySearchGif } from "../../../interfaces/gif.ts";
import React from "react";

const Pagination = ({
  query,
  setQuery,
}: {
  query: QuerySearchGif;
  setQuery: React.Dispatch<React.SetStateAction<QuerySearchGif>>;
}) => {
  return (
    <Container>
      <Arrow
        onClick={() => {
          setQuery({
            ...query,
            offset: query.offset === 0 ? 0 : query.offset - 10,
          });
        }}
      >
        {"<"}
      </Arrow>
      <Arrow
        onClick={() => {
          setQuery({
            ...query,
            offset: query.offset + 10,
          });
        }}
      >
        {">"}
      </Arrow>
    </Container>
  );
};

export default Pagination;
