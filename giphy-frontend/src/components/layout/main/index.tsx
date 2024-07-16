import { Container } from "./styles.ts";
import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Main;
