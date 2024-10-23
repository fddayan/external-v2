import React from "react";
import { Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";

const ErrorBox = styled(Flex)`
  margin: 10px 0;
  padding: 20px;
  border-radius: 0.5rem;
  text-shadow: rgba(255, 255, 255, 0.5) 0 1px;
  font-weight: bold;
  border-width: 0.1rem;
  border-style: solid;
  background-color: rgba(242, 92, 84, 0.15);
  border-color: rgba(242, 92, 84, 0.35);
  color: #f25c54;
`;

export default ErrorBox;
