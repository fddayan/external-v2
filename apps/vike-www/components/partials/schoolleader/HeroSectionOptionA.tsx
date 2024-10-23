import React, {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import Container from "@src/components/Container";
import { Button, theme } from "@src/components/nessie-web";
import {
  Display1,
  Display3,
  Headline3,
  BlackButton,
  BlackButtonLink,
  PlayIcon,
} from "./styles";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import {
  ModalContext,
  ModalType,
} from "@src/components/modals/ModalController";
import styled from "@emotion/styled";
import { logEvent } from "@src/utils/logClient";
import { useStaticQuery, graphql } from "gatsby";
import { mediaQueriesMax } from "@src/styles/theme";
import RiveComponent from "@rive-app/react-canvas";
import { BodyText } from "@src/components/new-nessie";

const {
  colors: { dt_taro40, dt_taro50 },
} = theme;

const HeroContainer = styled(Container)`
  text-align: center;
  padding-top: 20;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 78px;
  .heading, .text{
    max-width: 750px;
    margin: auto;
  }
  ${mediaQueriesMax[0]} {
    .rive {
      height: 150px;
      order: 1;
    }
    .heading {
      order: 2;
    }
    .text {
      order: 5;
    }
    .cta {
      order: 3;
      width: 100%;
    }
    .video-container {
      order 4;
    }
    .video-heading {
      display: none;
    }
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin: auto;
  ${mediaQueriesMax[0]} {
    flex-direction: column;
  }
`;

const StyledInput = styled.input`
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition:
    border-color ease-in-out 0.15s,
    box-shadow ease-in-out 0.15s;
  height: 60px;
  padding: 10px 16px;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.33;
  border-radius: 5px;
  margin: 1px;
  border-radius: 15px;
  flex-grow: 1;
`;

const PlayVideoContainer = styled.div`
  position: relative;
  &::before {
    display: block;
    content: "";
    width: 100%;
    padding-top: 56.16%; // Calculated as (height / width) * 100%
  }
  ${mediaQueriesMax[0]} {
    order: 3;
  }
  img {
    opacity: 0.9;
    filter: brightness(80%);
    border-radius: 46px;
    ${mediaQueriesMax[0]} {
      border-radius: 16px;
    }
  }
  iframe,
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    border: none;
    cursor: pointer;
    &:hover {
      svg path {
        fill: #d3d7ec;
      }
    }
    ${mediaQueriesMax[0]} {
      svg {
        transform: scale(0.7);
      }
    }
  }
`;

const SchoolsHeroSectionOptionA = ({ videoId, openCalendly, showForm }) => {
  const data = useStaticQuery(graphql`
    query {
      heroIllustration: file(
        relativePath: { eq: "schoolleader/hero-illustration@2x.png" }
      ) {
        publicURL
      }
    }
  `);
  const modalContext = useContext(ModalContext);
  const [showVideo, setShowVideo] = useState(false);

  const t = useContext(TranslationContext);
  const radical = showForm ? "naesp" : "classdojo_school";
  function openSignupModal() {
    logEvent({
      eventName: `teacher.${radical}.open_signup.hero`,
    });
    modalContext.showModal(ModalType.Signup);
  }

  const [pardotFormData, setPardotFormData] = useState({
    email: "",
  });

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    logEvent({
      eventName: "web.external.naesp.submit_form",
    });
    const form = ev.target as HTMLFormElement;
    form.submit();
  }

  function handleInputChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.preventDefault();
    setPardotFormData({
      ...pardotFormData,
      [ev.target.name]: ev.target.value,
    });
  }

  return (
    <HeroContainer>
      <RiveComponent
        src="https://static.classdojo.com/img/2024/03/website_school_graphic4.riv"
        className="rive"
        css={{ width: 200, height: 120, marginInline: "auto", marginTop: 30 }}
      />
      <Display1 className="heading">
        {t.translate("directus.page_schoolleader_2024.Hero_heading")}
      </Display1>
      <Headline3 className="text" css={{ color: "#5D5D8F" }}>
        {t.translate("directus.page_schoolleader_2024.Hero_text")}
      </Headline3>

      {showForm ? (
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
          className="cta"
        >
          <form
            action="https://learn.classdojo.com/l/1046033/2024-05-16/918n"
            method="post"
            onSubmit={handleSubmit}
            css={{
              display: "flex",
              flexWrap: "wrap",
              backgroundColor: "#D5BFFF",
              gap: 16,
              padding: 24,
              borderRadius: 24,
              maxWidth: 600,
              margin: "auto",
              justifyContent: "center",
            }}
          >
            <BodyText css={{ marginBottom: 0 }}>
              {t.translate("directus.page_schoolleader_2024.Form_heading")}
            </BodyText>
            <StyledInput
              id="email"
              name="email"
              type="email"
              value={pardotFormData.email}
              onChange={handleInputChange}
              placeholder={t
                .translate("directus.page_schoolleader_2024.Field_placeholder")
                .toString()}
              required
            />
            <Button kind="plus" type="submit">
              {t.translate("directus.page_schoolleader_2024.CTA_button")}
            </Button>
          </form>
          <BlackButtonLink kind="tertiary" onClick={openSignupModal}>
            {t.translate("directus.page_schoolleader_2024.CTA_link")}
          </BlackButtonLink>
        </div>
      ) : (
        <CTAContainer className="cta">
          <BlackButton onClick={openSignupModal}>
            {t.translate("directus.page_schoolleader_2024.experiment_main_cta")}
          </BlackButton>
          <BlackButtonLink
            kind="tertiary"
            onClick={() => openCalendly("experiment_var1")}
          >
            {t.translate(
              "directus.page_schoolleader_2024.experiment_secondary_cta"
            )}
          </BlackButtonLink>
        </CTAContainer>
      )}

      <Display3
        className="video-heading"
        css={{ color: "#2C2A50", textAlign: "center", marginBlock: 12 }}
      >
        {t.translate("directus.page_schoolleader_2024.video_heading")}
      </Display3>
      <PlayVideoContainer className="video-container">
        {showVideo ? (
          <iframe
            width="100%"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <button onClick={() => setShowVideo(true)}>
              <PlayIcon />
            </button>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              css={{ borderRadius: 46 }}
              alt=""
            />
          </>
        )}
      </PlayVideoContainer>
    </HeroContainer>
  );
};

export default SchoolsHeroSectionOptionA;
