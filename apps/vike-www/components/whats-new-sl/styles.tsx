import React from "react";
import styled from "@emotion/styled";
import { GQLImage } from "./context";
import { Flex } from "../Boxes";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { Button } from "../nessie-web";

// export const VStack = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "10px",
//   margin: "10px",
//   border: "1px solid black",
// });

// export const HStack = styled("div")({
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "10px",
//   margin: "10px",
//   border: "1px solid black",
// });

export const Heading = styled.h2`
  // color: ${(props) => props.theme.__new.colors.contentPrimary};
  color: #2c2a50;
  /* Marketing/Display/Display 0 ExtraBold */
  font-family: DojoDisplay !important;
  font-size: 72px;
  font-style: normal;
  font-weight: 800;
  line-height: 76px; /* 105.556% */
  letter-spacing: -1px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%; /* 42px */
    letter-spacing: -0.3px;
  }
`;

export const SubText = styled.p`
  // color: ${(props) => props.theme.__new.colors.contentPrimary};
  color: #2C2A50;
  font-family: "DojoText";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 32.137px; /* 123.605% */
  letter-spacing: -0.26px;
  margin: 0;
  ${mediaQueriesMax[1]} {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 21.6px */
    letter-spacing: 0;
`;

export const FlexContainer = styled(Flex)`
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
  ${mediaQueries[0]} {
    gap: 60px;
    flex-direction: row;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #f5ebff;
  &:hover {
    background-color: #f0d9ff;
  }
  span {
    color: #7d40ff;
  }
`;

export const Panel = styled(Flex)`
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 42px;
  border-radius: 24px;
  ${mediaQueriesMax[1]} {
    padding: 30px;
  }
`;

export const PanelHeading = styled("h3")<{ color?: string }>`
  color: ${(props) => props.color || props.theme.__new.colors.grape90};
  font-family: "DojoDisplay";
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px; /* 111.111% */
  letter-spacing: -0.36px;
  margin: 0;
  font-feature-settings: "ss04";
`;

export const PanelParagraph = styled("p")<{ color?: string }>`
  color: ${(p) => p.theme.__new.colors.grape90};
  font-family: "DojoText";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 133.333% */
  letter-spacing: -0.18px;
  margin: 0;
`;

export const HideMobile = styled.div`
  display: none;
  ${mediaQueries[0]} {
    display: block;
  }
`;

export interface GImageProps {
  img: GQLImage;
  alt: string;
}

const Sparkles = () => {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.02705 1.27762C1.75821 0.905309 1.6368 0.376119 1.58352 0.0424478C1.58352 0.0331325 1.57961 0.0241993 1.57264 0.0176124C1.56567 0.0110256 1.55622 0.00732422 1.54636 0.00732422C1.5365 0.00732422 1.52705 0.0110256 1.52008 0.0176124C1.51311 0.0241993 1.50919 0.0331325 1.50919 0.0424478C1.45592 0.376119 1.33451 0.905309 1.06567 1.27762C0.774534 1.68153 0.295086 1.8431 0.0287263 1.90515C0.0204994 1.90717 0.0132143 1.91172 0.00801524 1.91808C0.00281614 1.92443 0 1.93224 0 1.94027C0 1.94831 0.00281614 1.95611 0.00801524 1.96247C0.0132143 1.96883 0.0204994 1.97337 0.0287263 1.9754C0.443213 2.0594 0.811535 2.2823 1.06567 2.60293C1.33451 2.97524 1.45592 3.50443 1.50919 3.8381C1.50919 3.84741 1.51311 3.85635 1.52008 3.86293C1.52705 3.86952 1.5365 3.87322 1.54636 3.87322C1.55622 3.87322 1.56567 3.86952 1.57264 3.86293C1.57961 3.85635 1.58352 3.84741 1.58352 3.8381C1.6368 3.50443 1.75821 2.97524 2.02705 2.60293C2.28118 2.2823 2.64951 2.0594 3.064 1.9754C3.07223 1.97337 3.0795 1.96883 3.0847 1.96247C3.0899 1.95611 3.09272 1.94831 3.09272 1.94027C3.09272 1.93224 3.0899 1.92443 3.0847 1.91808C3.0795 1.91172 3.07223 1.90717 3.064 1.90515C2.79764 1.8431 2.31818 1.68153 2.02705 1.27762Z"
        fill="white"
      />
      <path
        d="M10.1733 3.61983C9.45077 2.56105 9.12448 1.05612 8.98131 0.10721C8.98131 0.0807191 8.9708 0.0553144 8.95206 0.0365823C8.93333 0.0178503 8.90792 0.00732422 8.88143 0.00732422C8.85494 0.00732422 8.82954 0.0178503 8.81081 0.0365823C8.79208 0.0553144 8.78155 0.0807191 8.78155 0.10721C8.63838 1.05612 8.31208 2.56105 7.58958 3.61983C6.80715 4.76851 5.51863 5.22798 4.80279 5.40445C4.78068 5.4102 4.7611 5.42313 4.74713 5.44121C4.73315 5.45929 4.72559 5.48148 4.72559 5.50433C4.72559 5.52717 4.73315 5.54938 4.74713 5.56745C4.7611 5.58553 4.78068 5.59846 4.80279 5.60421C5.91672 5.8431 6.90659 6.477 7.58958 7.38883C8.31208 8.44761 8.63838 9.95254 8.78155 10.9015C8.78155 10.9279 8.79208 10.9533 8.81081 10.9721C8.82954 10.9908 8.85494 11.0013 8.88143 11.0013C8.90792 11.0013 8.93333 10.9908 8.95206 10.9721C8.9708 10.9533 8.98131 10.9279 8.98131 10.9015C9.12448 9.95254 9.45077 8.44761 10.1733 7.38883C10.8563 6.477 11.8462 5.8431 12.9601 5.60421C12.9822 5.59846 13.0018 5.58553 13.0157 5.56745C13.0297 5.54938 13.0373 5.52717 13.0373 5.50433C13.0373 5.48148 13.0297 5.45929 13.0157 5.44121C13.0018 5.42313 12.9822 5.4102 12.9601 5.40445C12.2442 5.22798 10.9557 4.76851 10.1733 3.61983Z"
        fill="white"
      />
      <path
        d="M2.48055 12.6464C2.15156 12.1643 2.00299 11.479 1.9378 11.0469C1.9378 11.0349 1.93301 11.0233 1.92448 11.0148C1.91595 11.0063 1.90438 11.0015 1.89232 11.0015C1.88026 11.0015 1.86869 11.0063 1.86016 11.0148C1.85163 11.0233 1.84684 11.0349 1.84684 11.0469C1.78165 11.479 1.63307 12.1643 1.30409 12.6464C0.947817 13.1694 0.361105 13.3786 0.0351531 13.459C0.0250857 13.4616 0.0161707 13.4675 0.00980845 13.4757C0.00344619 13.484 0 13.4941 0 13.5045C0 13.5149 0.00344619 13.525 0.00980845 13.5332C0.0161707 13.5414 0.0250857 13.5473 0.0351531 13.55C0.542371 13.6587 0.993096 13.9474 1.30409 14.3626C1.63307 14.8447 1.78165 15.5299 1.84684 15.962C1.84684 15.9741 1.85163 15.9856 1.86016 15.9942C1.86869 16.0027 1.88026 16.0075 1.89232 16.0075C1.90438 16.0075 1.91595 16.0027 1.92448 15.9942C1.93301 15.9856 1.9378 15.9741 1.9378 15.962C2.00299 15.5299 2.15156 14.8447 2.48055 14.3626C2.79154 13.9474 3.24228 13.6587 3.74949 13.55C3.75956 13.5473 3.76847 13.5414 3.77483 13.5332C3.78119 13.525 3.78464 13.5149 3.78464 13.5045C3.78464 13.4941 3.78119 13.484 3.77483 13.4757C3.76847 13.4675 3.75956 13.4616 3.74949 13.459C3.42354 13.3786 2.83682 13.1694 2.48055 12.6464Z"
        fill="white"
      />
    </svg>
  );
};

const ChevronRight = () => {
  return (
    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.763693 12.1233C0.549943 12.368 0.451505 12.6915 0.488067 13.0121C0.52463 13.3327 0.699006 13.6252 0.966193 13.8137C1.15463 13.9487 1.37682 14.0133 1.60182 14.0133C1.93932 14.0133 2.28244 13.8671 2.52432 13.5915L6.96244 8.50366C7.70494 7.65428 7.70494 6.37178 6.96244 5.5224L2.49057 0.395213C2.27401 0.144901 1.95901 0.00146484 1.62713 0.00146484C1.37119 0.00146484 1.11807 0.0886537 0.915568 0.248966C0.682131 0.434591 0.53588 0.710216 0.507755 1.0224C0.476817 1.3599 0.586506 1.6974 0.805881 1.95053L5.12869 6.90616C5.18213 6.96803 5.18213 7.06084 5.12869 7.1199L0.763693 12.1233Z"
        fill="white"
      />
    </svg>
  );
};

const StyledLink = styled.a<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-direction: row;

  span {
    margin: 0 8px;
    font-family: "DojoText";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px; /* 127.778% */
  }
  &:hover span {
    text-decoration: underline;
  }
  svg path {
    fill: ${({ color }) => color};
  }
`;

interface TryItOutProps {
  href: string;
  color: string;
}
export const TryItOut = ({ href, color }: TryItOutProps) => {
  return (
    <StyledLink href={href} color={color}>
      <Sparkles />
      <span>Try it out</span>
      <ChevronRight />
    </StyledLink>
  );
};
