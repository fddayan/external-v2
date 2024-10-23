import styled from "@emotion/styled";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";

export const DetailText = styled.p`
  font-family: "DojoText";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
  letter-spacing: 0.656px;
  text-transform: uppercase;
  margin-block: 0;
  ${mediaQueriesMax[0]} {
    font-size: 12px;
  }
`;
export const MobileCTAContainer = styled.div`
  display: none;

  ${mediaQueriesMax[0]} {
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    align-items: center;
    position: sticky;
    bottom: 0;
    gap: 6px;
    padding-bottom: 12px;
    background: #8047ff;
    z-index: 30;
  }
`;
export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  zindex: 3;
  margin-top: calc(-100vh + 100px - 90px);
  ${mediaQueriesMax[0]} {
    width: 100%;
  }
  > div {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;
export const Panel = styled.div`
  align-self: flex-end;
  width: 50%;
  min-height: 100vh;
  display: flex;
  text-align: left;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  z-index: 10;
  padding-top: 90px;
  padding-right: 90px;
  button {
    position: static;
  }
  .image-container {
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom center;
    display: none;
    ${mediaQueriesMax[0]} {
      display: flex;
      flex-grow: 6;
    }
  }
  .content-container {
    display: flex;
    flex-direction: column;
    gap: 28px;
    ${mediaQueriesMax[0]} {
      flex-grow: 1;
      gap: 12px;
    }
    @media screen and (max-height: 670px) {
      h2 {
        font-size: 24px;
      }
    }
  }

  ${mediaQueries[1]} {
    &:last-child {
      min-height: 100vh;
    }
  }
  ${mediaQueriesMax[0]} {
    align-items: center;
    padding-top: 100px;
    min-height: inherit;
    height: calc(100vh - 80px);
    text-align: center;
    gap: 12px;
    padding-inline: 20px;
  }
`;
export const PanelCTAContainer = styled.div`
  display: flex;
  gap: 24px;
  ${mediaQueriesMax[0]} {
    display: none;
  }
`;
export const ImageContainer = styled.div`
  position: sticky;
  float: left;
  // width: 50%;
  top: 100px;
  height: calc(100vh - 100px);
  text-align: left;
  z-index: 1;
  margin-top: calc(-100vh + 100px);
  img {
    height: 100%;
    width: 400px;
    position: absolute;
    top: 0;
    transition: opacity 0.5s ease-out;
    max-width: inherit;
    margin-left: 30px;
  }
  ${mediaQueriesMax[0]} {
    display: none;
  }
`;
export const BulletNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;
  align-self: flex-start;
  left: -400px;
  top: 0;
  height: 100vh;
  position: sticky;
  width: 36px;
  padding-top: 90px;
  ${mediaQueriesMax[0]} {
    padding-bottom: 84px;
  }
`;
export const Bullet = styled.div<{ active: boolean }>`
  height: 33px;
  width: 6px;
  transition: width 0.05s;
  &:hover {
    transition: width 0.05s;
    width: 10px;
  }
  border-radius: 5px;
  background: ${(props) =>
    props.active ? props.theme.__new.colors.contentPrimary : props.theme.__new.colors.backgroundAccent};
  margin: 5px 0;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  display: inline-block;
  &:before {
    position: absolute;
    top: 0;
    right: -20px;
    left: -10px;
    bottom: 0;
    content: "";
    background-color: transparent;
    z-index: -1;
  }
`;
