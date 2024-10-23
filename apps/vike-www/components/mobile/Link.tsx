import styled from "@emotion/styled";
import { Link } from "gatsby";

const MobileLink = styled.a`
  background-color: transparent;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  outline: none;
  font-family: ProximaNova, "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: rgb(0, 174, 239);
  padding-top: 10px;
  width: fit-content;

  :hover {
    color: #33bef2;
    cursor: pointer;
    outline: 0;
    text-decoration: none;
  }
`;

const MobileLinkGatsby = MobileLink.withComponent(Link);

export default MobileLink;
export { MobileLinkGatsby };
