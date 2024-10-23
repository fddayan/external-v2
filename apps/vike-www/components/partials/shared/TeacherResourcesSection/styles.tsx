import styled from "@emotion/styled";
import { theme } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";

const {
  colors: { dt_white },
  borders: { dt_border_card },
  shadows: { dt_shadow_shadezies },
  space: { m, l, xl, xxl },
} = theme;

export const TeacherTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: ${xl}px;
  background-color: ${dt_white};
  text-align: center;
  border: ${dt_border_card};
  border-radius: ${l}px;
  box-shadow: ${dt_shadow_shadezies};

  ${mediaQueries[0]} {
    flex-direction: row;
    align-items: flex-start;
    max-width: 100%;
    padding: ${m}px ${xl}px;
  }
`;

export const ImageLink = styled.a`
  width: 100%;
  min-width: 50px;
  padding-right: 0px;
  height: 100%;

  ${mediaQueries[0]} {
    width: 310px;
    min-width: 310px;
    padding-right: ${xxl}px;
  }
`;

export const ContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 100%;

  ${mediaQueries[0]} {
    align-items: flex-start;
  }
`;

export const InnerContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${mediaQueries[0]} {
    flex-direction: row;
  }
`;

export const CenterLeftText = styled.div`
  text-align: center;

  ${mediaQueries[0]} {
    text-align: left;
  }
`;

export const Caret = styled.span`
  display: inline-block !important;
  transform: translateY(-5px);
  width: 0;
  height: 0;
  margin-left: 5px;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`;
