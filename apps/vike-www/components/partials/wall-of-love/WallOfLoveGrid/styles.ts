import { theme } from "@src/components/nessie-web";
import styled from "@emotion/styled";

export const {
  colors: { dt_taro10, dt_aqua50, dt_taro50 },
} = theme;

export const WallOfLoveBackground = styled.div`
  background-color: ${dt_taro10};
  padding-top: 64px;
  padding-bottom: 64px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
`;

export const ControlSection = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;
