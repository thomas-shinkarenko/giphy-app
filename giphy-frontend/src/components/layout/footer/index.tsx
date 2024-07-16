import React from "react";
import { Container } from "./styles.ts";

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Footer;
