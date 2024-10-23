import styled from "@emotion/styled";
import { Flex } from "@src/components/Boxes";
import { mediaQueries } from "@src/styles/theme";
import { css } from "@emotion/react";
export const DataContentStyled = styled("div")`
  .header-img {
    border: 0 none currentcolor;
    border-image: none 100% 1 0 stretch;
    box-sizing: border-box;
    display: block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
  .lead {
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0 0 22px;
  }

  //small icons in top right
  .data-title-bar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .small-badge-container {
    height: 22px;
    width: 22px;
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
    margin-left: 3px;
  }
  .teacher-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/teacher_badge.png);
    display: inline-block;
  }
  .parent-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/parent_badge.png);
    display: inline-block;
  }
  .student-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/student_badge.png);
    display: inline-block;
  }
  .school_leader-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/school_leader_badge.png);
    display: inline-block;
  }
  .logged_out-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/logged-out_badge.png);
    display: inline-block;
  }
  .outside_user-small-badge {
    background-image: url(https://static.classdojo.com/img/icons/outside_user.png);
    display: inline-block;
  }
`;
export const SelectorBadgeImg = styled("img")`
  width: 60px;
  min-width: 60px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
  ${mediaQueries[0]} {
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    min-width: 100px;
  }
`;
type SelectorBadgeProps = {
  selected: boolean;
  onClick: () => void;
};
export const SelectorBadge = styled(Flex)<SelectorBadgeProps>(
  css`
    margin: 5px;
    color: #2c2a50;
    background-color: rgba(239, 239, 239, 0.3);
    border-radius: 5px;
    border: 1px solid #dadada;
    transition: box-shadow 0.2s;
    padding: 10px 3px;
    font-weight: 600;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    font-size: 20px;
    line-height: 67px;
    text-align: center;

    flex-direction: row;
    align-items: center;
    width: 100%;

    ${mediaQueries[0]} {
      flex-direction: column;
      width: 16.5%;
      font-size: 16px;
      line-height: 22px;
      font-weight: 700;
    }
  `,
  (props) => {
    return props.selected
      ? css`
          background-color: #02aeef;
          color: #fff;
          border: 0;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
          transition: all 0.2s ease;
        `
      : css`
          &:hover {
            box-shadow: 0 8px 0 rgba(37, 61, 229, 0.05);
          }
        `;
  },
);
