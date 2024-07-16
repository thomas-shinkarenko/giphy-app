import { Container } from "./styles.ts";
import { GifsResult } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { QuerySearchGif } from "../../../interfaces/gif.ts";

const Content = ({
  query,
  getGifs,
  debouncedSearch,
}: {
  query: QuerySearchGif;
  debouncedSearch: string;
  getGifs: (offset: number) => Promise<GifsResult>;
}) => {
  return (
    <Container>
      {(debouncedSearch || query.offset > 0) && (
        <Grid
          width={800}
          columns={5}
          fetchGifs={getGifs}
          key={`${debouncedSearch}-${query.offset}`}
        />
      )}
    </Container>
  );
};

export default Content;
