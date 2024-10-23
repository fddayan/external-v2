import styled from "@emotion/styled";
import { mediaQueries } from "@src/styles/theme";
import BackgroundImage from "gatsby-background-image";
export const Title = styled("h1")`
  color: #fff;
  font-size: 31px;
  font-weight: 400;
  line-height: 1.1;
  margin: 0;
  text-shadow: none;
  text-align: center;
  ${mediaQueries[0]} {
    font-size: 52.8px;
    font-weight: 800;
  }
`;
export const Well = styled("div")`
  background: #fff;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(201, 201, 201, 0.5);
  padding: 50px;
  margin-left: 60px;
  margin-right: 60px;
`;
export const LearnMoreSectionStyled = styled(BackgroundImage)`
  background-color: #f5f5f3;

  width: 100%;
  background-repeat: no-repeat;
  background-position: center bottom;
  padding-bottom: 130px;
  background-size: 90%;

  @media (min-width: 768px) {
    background-size: 657px 115px !important;
    &:before,
    &:after {
      background-size: 657px 115px !important;
    }
  }
`;
export const SectionHeader = styled.h2`
  color: #344955;
  font-size: 24px;
  font-weight: 800;
  line-height: 35px;
  margin-bottom: 17px;
  margin-top: 76px;
`;
export const TeacherTweetWrapper = styled("div")`
  width: 100%;
  padding: 0 15px;
  min-height: auto;
  ${mediaQueries[0]} {
    width: 33%;
    min-height: 214px;
  }
`;
export const TeacherTweet = styled("div")`
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: rgba(201, 201, 201, 0.5) 0 2px 4px;
  margin: 0 auto 30px;
  padding: 20px;
  max-width: 392px;
`;
export const TweetImg = styled("img")`
  width: 36px;
  min-width: 36px;
  height: 36px;
  min-height: 36px;
  margin-right: 15px;
  border-radius: 50%;
`;
const Link = styled("a")`
  color: #00bcf2;
  font-weight: 600;

  :hover {
    color: #00a8d9;
    outline: 0;
  }
`;
export const TeacherImg = styled("img")`
  width: 182px;
  min-width: 182px;
  height: 182px;
  min-height: 182px;
  border-radius: 50%;
`;
export const TeacherWell = styled("div")`
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: none;
  margin-bottom: 20px;
  min-height: 20px;
  padding: 50px;
  width: 100%;
`;
