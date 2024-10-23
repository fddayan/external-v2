import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";

export const DojoTextFontFamily = `DojoText,"Helvetica Neue",Helvetica,Arial,sans-serif`;
export const DojoDisplayFontFamily = `DojoDisplay,"Helvetica Neue",Helvetica,Arial,sans-serif`;
const cloud90 = "#1A192D";
const cloud70 = "#403F6C";

const displayCss = `
  font-family: ${DojoDisplayFontFamily};
  color: ${cloud90};
  font-weight: 800;
`;

const textCss = `
  font-family: ${DojoTextFontFamily};
  color: ${cloud90};
`;

export const Title = styled.h1`
  font-size: 52px;
  line-height: 1.1;
  ${displayCss}
  ${mediaQueriesMax[1]} {
    font-size: 32px;
  }
`;

export const Heading = styled.h2`
  font-size: 36px;
  line-height: 1.2;
  ${displayCss};
  ${mediaQueriesMax[1]} {
    font-size: 24px;
  }
`;

export const Subheading = styled.h3`
  font-size: 24px;
  line-height: 1.4;
  ${displayCss};
  ${mediaQueriesMax[1]} {
    font-size: 20px;
  }
`;

export const DetailHeading = styled.p`
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
  font-family: ${DojoTextFontFamily};
  color: ${cloud70};
  ${mediaQueriesMax[1]} {
    font-size: 18px;
  }
`;

export const BodyText = styled.p`
  font-weight: 500;
  font-size: 20px;
  line-height: 1.4;
  ${textCss};
  ${mediaQueriesMax[1]} {
    font-size: 18px;
  }
`;
