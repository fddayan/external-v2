import React from "react";
import styled from "@emotion/styled";

const Avatar = styled.img`
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-right: 8px;
`;

const Name = styled.span`
  font-size: 0.9em;
  font-weight: 600;
  color: #505050;
  display: inline-block;
  vertical-align: middle;
  word-break: keep-all;
  white-space: nowrap;
`;
const MenuTrigger = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: transparent;
`;

type IdeasNavbarUserProps = {
  user: { avatarURL: string; title: string; lastName: string } | undefined;
};
const IdeasNavbarUser = ({ user }: IdeasNavbarUserProps) => {
  return (
    <MenuTrigger>
      <Avatar src={user?.avatarURL ?? ""} />
      <Name>
        {user?.title ?? ""} {user?.lastName ?? ""}
      </Name>
    </MenuTrigger>
  );
};

export default IdeasNavbarUser;
