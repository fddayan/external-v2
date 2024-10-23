import React from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { theme, BodyText, Button, Space, Title } from "@src/components/nessie-web";
import { mediaQueries } from "@src/styles/theme";
import { FolderIcon } from "@classdojo/web/nessie/icons";
import { navigate } from "gatsby";
import { getRelativePath } from "@src/utils/routes";

const {
  colors: { dt_kiwi20 },
  radii: { dt_radius_l },
} = theme;

const TeacherResourcesContainer = styled.section`
  margin-top: 40px;
`;

const TeachersContentWrapper = styled.div<{ bgImage: string }>`
  background-color: ${dt_kiwi20};
  background-image: url("${(props) => props.bgImage}");
  background-repeat: no-repeat;
  background-position: center bottom -50%;
  background-size: 400px;
  width: 100%;
  border-radius: ${dt_radius_l};
  padding: 30px;
  text-align: center;

  ${mediaQueries[0]} {
    background-position: center bottom -130%;
  }

  ${mediaQueries[1]} {
    padding: 60px;
    text-align: left;
    background-size: 550px;
    background-position: right 150px bottom;
  }
`;

const TeachersContent = styled.div`
  ${mediaQueries[1]} {
    max-width: 440px;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: -6px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  ${mediaQueries[0]} {
    margin-right: 96px;
    margin-bottom: 15px;
  }
`;

type TeacherResourcesProps = {
  teachers_title: string;
  teachers_text: string;
  teachers_button_text: string;
  teachers_button_url: string;
  teachers_background_image_url: string;
};

const TeacherResources: React.FC<TeacherResourcesProps> = ({
  teachers_title,
  teachers_text,
  teachers_button_text,
  teachers_background_image_url,
  teachers_button_url,
}) => {
  return (
    <TeacherResourcesContainer>
      <Container>
        <TeachersContentWrapper bgImage={teachers_background_image_url}>
          <TeachersContent>
            <Title size={1}>{teachers_title}</Title>
            <BodyText>{teachers_text}</BodyText>
            <Space size="s" />
            <ButtonWrapper>
              <Button
                kind="tertiary"
                icon={<FolderIcon />}
                onClick={() => navigate(getRelativePath(teachers_button_url))}
              >
                {teachers_button_text}
              </Button>
            </ButtonWrapper>
          </TeachersContent>
        </TeachersContentWrapper>
      </Container>
    </TeacherResourcesContainer>
  );
};

export default TeacherResources;
