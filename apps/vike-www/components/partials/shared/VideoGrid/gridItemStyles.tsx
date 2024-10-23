import styled from "@emotion/styled";
import { Flex, Box } from "@src/components/Boxes";
import { theme } from "@src/components/nessie-web";

export const Poster = styled.img``;

export const Tag = styled.span`
  display: block;
  padding: 8px;
  border-radius: 16px;
  background-color: ${theme.colors.aqua50};
  color: ${theme.colors.white};
  font-size: 18px;
  font-weight: 700;
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 100;
`;

export const TitleWrapper = styled(Box)`
  padding: 12px;
`;

export const Card = styled(Flex)<{ isActive: boolean; index: number; disabled: boolean }>`
  cursor: pointer;
  position: relative;
  ${(props) => ({
    opacity: props.disabled ? ".7" : "1",
  })}
`;

Card.defaultProps = { width: "100%" };

export const ActiveChevron = styled.div`
  border-top: 15px solid ${theme.colors.taro90};
  border-right: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid transparent;
  width: 0;
  margin: 0 auto;
`;
