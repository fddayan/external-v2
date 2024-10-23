import styled from "@emotion/styled";
import { GatsbyImage } from "gatsby-plugin-image";
import { TextField } from "@src/components/nessie-web";

export const Backdrop = styled.div`
  padding: 36px;
  flex-direction: column;
  height: 100vh;
  max-height: 700px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
  text-align: center;
`;

export const Image = styled(GatsbyImage)`
  width: 250px;
`;

export const Input = styled(TextField)``;
