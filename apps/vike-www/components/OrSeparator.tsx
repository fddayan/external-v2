import React from "react";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";

const Separator = styled.div`
  overflow: "hidden";
  text-align: "center";
  font-weight: 300;
  &:before {
    content: "";
    display: inline-block;
    width: 48%;
    vertical-align: middle;
    border-bottom: 1px solid;
    color: #8689b8;
    margin: 0 0.5em 0 0;
  }
  &:after {
    content: "";
    display: inline-block;
    width: 45%;
    vertical-align: middle;
    border-bottom: 1px solid;
    color: #8689b8;
    margin: 0 -50% 0 0.5em;
  }
`;

const MinutiaeText = styled.div`
  font-family: ProximaNova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: inline;
  width: 20px;
  color: #8689b8;
`;

export const OrSeparator = () => {
  return (
    <Separator>
      <MinutiaeText>
        <Translate path="header.ie8_info.error.or" />
      </MinutiaeText>
    </Separator>
  );
};
