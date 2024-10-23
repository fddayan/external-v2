import React from "react";
import s from "@emotion/styled";
import { Subheading, theme } from "@src/components/nessie-web";

const GeoFenceMessage = s(Subheading)`
  background-color: ${theme.colors.taro50};
  color: white;
  padding: 26px;
  border-radius: 18px;
  max-width: 360px;
  text-align: center;
  margin: 0 36px ;
`;

const GeoFence = () => (
  <GeoFenceMessage>
    Due to copyright restrictions, this video is only available within the United States
  </GeoFenceMessage>
);

export default GeoFence;
