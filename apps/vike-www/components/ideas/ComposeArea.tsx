import React, { useState } from "react";
import { Box, Flex } from "@src/components/Boxes";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import DiscussionGuideLink from "@src/components/ideas/DiscussionGuideLink";

type activityProps = {
  isActivity: boolean;
};

const ComposeAreaStyled = styled.div`
  position: relative;
  border: 1px solid rgb(0, 174, 239);
  border-radius: 0.5rem;
  background-color: white;
  overflow: visible;
`;

const AvatarContainer = styled.div`
  flex: 0 0 auto;
  align-self: flex-start;
  padding-right: 6px;
`;

type AvatarType = { avatarURL: string };
const Avatar = styled.div<AvatarType>`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 50%;
  background-color: rgb(235, 219, 203);
  outline: none;
  width: 4.4rem;
  height: 4.4rem;
  background-image: url(${(props) => (props.avatarURL ? props.avatarURL : "/public/avatar_ideas_default.png")});
`;

const ContentContainer = styled.div`
  flex: 1 0 0;
  align-self: flex-start;
`;

const TextContainer = styled.div`
  position: relative;
  border: 0;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  font-family: proxima-nova, serif;
  color: #363636;
  width: 100%;
`;

const TextInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  resize: none;
  margin: 0;
  outline: 0;
  border: 0;
  padding: 0 10px;
  background: transparent;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  word-break: break-word;
  max-height: none;

  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
`;

const Pre = styled.pre`
  display: block;
  visibility: hidden;
  max-height: none;
  margin: 0;
  outline: 0;
  border: 0;
  padding: 0 10px;
  background: transparent;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
  word-break: break-word;

  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0;
  text-shadow: none;
`;

const AttachmentContainer = styled.div<activityProps>`
  height: ${(props) => (props.isActivity ? 244 : 132)}px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px inset;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin-left: 1rem;
  ${mediaQueriesMax[0]} {
    margin-left: 0;
    height: 132px !important;
  }
`;

const Attachment = styled.img<activityProps>`
  height: ${(props) => (props.isActivity ? 244 : 132)}px !important;
  min-width: ${(props) => (props.isActivity ? 244 : 132)}px;
  max-width: 100%;
  border-radius: 0.5rem;
  background-color: rgb(218, 218, 218);
  width: auto;
  border: 0 none;
  ${mediaQueriesMax[0]} {
    height: 132px !important;
  }
`;

const ActionContainer = styled.div`
  border-top: 1px solid rgb(218, 218, 218);
  opacity: 1;
  transition: opacity 0.3s ease-in-out 0s;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 1.2rem 0 0;
  margin: 2.4rem 0 0;
  ${mediaQueriesMax[0]} {
    flex-direction: column;
  }
`;

const ButtonSpacer = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 0;
  padding: 0;
  flex: 1 1 0;
`;

type ComposeAreaType = {
  avatarURL: string;
  initialText: string;
  attachment: { type: string; path: string | null };
  submitComponent: any;
  onTextChange: (e: string) => void;
  isActivity: boolean;
  activityDownload: {
    label: string;
    link: string;
  };
};
const ComposeArea: React.FC<ComposeAreaType> = ({
  avatarURL,
  initialText,
  attachment,
  submitComponent,
  onTextChange,
  isActivity,
  activityDownload,
}) => {
  const [text, setText] = useState(initialText);

  return (
    <ComposeAreaStyled>
      <Box pt="16px" px="16px" pb="12px">
        <Flex flexDirection={["column", "row"]} flexWrap="nowrap" justifyContent="flex-start">
          {!isActivity && (
            <AvatarContainer>
              <Avatar avatarURL={avatarURL} />
            </AvatarContainer>
          )}
          <ContentContainer>
            <Box>
              {!isActivity && (
                <Flex justifyContent="start" flexDirection="row" flexWrap="nowrap" minHeight="4.4rem">
                  <TextContainer>
                    <Pre>{text}</Pre>
                    <TextInput
                      onChange={(event) => {
                        const newText = event.target.value;
                        setText(newText);
                        onTextChange(newText);
                      }}
                    >
                      {text}
                    </TextInput>
                  </TextContainer>
                </Flex>
              )}
              <Box marginTop="8px">
                <AttachmentContainer isActivity={isActivity}>
                  <Attachment isActivity={isActivity} src={attachment.path ?? ""} />
                </AttachmentContainer>
              </Box>
            </Box>
          </ContentContainer>
        </Flex>
        <ActionContainer>
          <Box margin={["-26px -38px 20px -20px", "-20px 0 0 -36px"]}>
            {activityDownload.link && <DiscussionGuideLink {...activityDownload} />}
          </Box>
          <ButtonSpacer />
          <Box>{submitComponent}</Box>
        </ActionContainer>
      </Box>
    </ComposeAreaStyled>
  );
};

export default ComposeArea;
