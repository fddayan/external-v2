import React, { useContext } from "react";
import { theme, Button, Title, BodyText, Subheading, MessagesIcon, MailIcon, Space } from "@src/components/nessie-web";
import * as S from "./styles";
import FacebookIcon from "../FacebookIcon";
import TwitterIcon from "../TwitterIcon";
import WhatsappIcon from "../WhatsappIcon";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import { css } from "@emotion/react";
import { logEvent } from "@src/utils/logClient";
import CopyToClipboardButton from "../CopyToClipboardButton";
import { graphql, useStaticQuery } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface AssetShareSectionProps {
  title: string;
  description: string;
  slug: string;
  language: string;
  testimonials: {
    avatar: string;
    name: string;
    state: string;
    position: string;
    image: string;
    text: string;
  }[];
}

const AssetShareSection: React.FC<AssetShareSectionProps> = (props) => {
  const {
    directus: {
      page_resources_hub_content: { teacher_content_button_url },
    },
  } = useStaticQuery(graphql`
    {
      directus {
        page_resources_hub_content {
          teacher_content_button_url
        }
      }
    }
  `);
  const { translate: t } = useContext(TranslationContext);
  const url = typeof window !== "undefined" ? location.href : "";

  const shareData = {
    title: encodeURI(t(props.title).toString()),
    description: encodeURI(t(`dojo_inspo.share_activity`, { activity_name: t(props.title).toString() }).toString()),
    url: encodeURI(url),
  };

  return (
    <S.Background>
      <S.Container splitView={props.testimonials.length > 0}>
        <div>
          <S.ShareContent>
            <Title>{t("dojo_inspo.teacher_content_title", { title: t(props.title).toString() })}</Title>
            <BodyText color="taro60" className="show-desktop">
              {t("directus.dojo_inspo.teacher_content_tagline")}
            </BodyText>
            <Button
              className="show-desktop"
              icon={<MessagesIcon />}
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.open-feedback-modal`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
              href={teacher_content_button_url}
              target="_blank"
              rel="noreferrer"
            >
              {t("directus.dojo_inspo.teacher_content_button_label")}
            </Button>
            <S.ShareSocialMedia>
              <Subheading color="taro60">{t("directus.dojo_inspo.teacher_content_share_heading")}</Subheading>
              <S.ShareButtons center={props.testimonials.length === 0}>
                <Button
                  size="s"
                  kind="tertiary"
                  icon={<MailIcon />}
                  href={`mailto:?subject=${shareData.description}&body=${shareData.description}%0A${shareData.url}`}
                  onClick={() =>
                    logEvent({
                      eventName: `web.external.activity_corner.share.mail`,
                      eventValue: props.slug,
                      metadata: { language: props.language },
                    })
                  }
                  target="_blank"
                  css={css({ width: "46px" })}
                />
                <Button
                  size="s"
                  kind="tertiary"
                  icon={<FacebookIcon />}
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&quote=${shareData.description}`}
                  rel="nofollow"
                  onClick={() =>
                    logEvent({
                      eventName: `web.external.activity_corner.share.facebook`,
                      eventValue: props.slug,
                      metadata: { language: props.language },
                    })
                  }
                  target="_blank"
                  title="Share to Facebook"
                  css={css({ width: "46px" })}
                />
                <Button
                  size="s"
                  kind="tertiary"
                  icon={<TwitterIcon />}
                  href={`https://twitter.com/intent/tweet?text=${shareData.description}&url=${shareData.url}`}
                  target="_blank"
                  rel="nofollow"
                  onClick={() =>
                    logEvent({
                      eventName: `web.external.activity_corner.share.twitter`,
                      eventValue: props.slug,
                      metadata: { language: props.language },
                    })
                  }
                  title="Share to Twitter"
                  css={css({ width: "46px" })}
                />
                <Button
                  size="s"
                  kind="tertiary"
                  icon={<WhatsappIcon />}
                  href={`https://api.whatsapp.com/send?text=${shareData.description}%0A${shareData.url}`}
                  target="_blank"
                  rel="nofollow"
                  onClick={() =>
                    logEvent({
                      eventName: `web.external.activity_corner.activity.share.whatsapp`,
                      eventValue: props.slug,
                      metadata: { language: props.language },
                    })
                  }
                  title="Share to WhatsApp"
                  css={css({ width: "46px" })}
                />
                <CopyToClipboardButton
                  dataToBeCopied={url}
                  title={t(props.title).toString()}
                  event={{
                    eventName: `web.external.activity_corner.activity.share.copy_to_clipboard`,
                    eventValue: props.slug,
                    metadata: { language: props.language },
                  }}
                />
              </S.ShareButtons>
            </S.ShareSocialMedia>
          </S.ShareContent>
        </div>
        <S.TeacherCardsContainer>
          {props.testimonials.map((testimonial, index) => {
            return (
              <S.TeacherCard key={index}>
                <S.TeacherCardHeader>
                  <S.TeacherAvatar src={testimonial.avatar} alt="Teacher Avatar" loading="lazy" />
                  <div>
                    <Subheading>{testimonial.name}</Subheading>
                    <BodyText color="taro40">{t(testimonial.position)}</BodyText>
                  </div>
                </S.TeacherCardHeader>
                <S.CardImage src={testimonial.image} alt="Activity Preview" loading="lazy" />
                <div style={{ padding: theme.space.l }}>
                  <BodyText>{t(testimonial.text)}</BodyText>
                </div>
              </S.TeacherCard>
            );
          })}
        </S.TeacherCardsContainer>
        <S.ShareSocialMediaMobile>
          <Subheading color="taro60">{t("directus.dojo_inspo.teacher_content_share_heading")}</Subheading>
          <S.ShareButtons center={props.testimonials.length === 0}>
            <Button
              size="s"
              kind="tertiary"
              icon={<MailIcon />}
              href={`mailto:?subject=${shareData.description}&body=${shareData.description}%0A${shareData.url}`}
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.activity.share.mail`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
              target="_blank"
              css={css({ width: "46px" })}
            />
            <Button
              size="s"
              kind="tertiary"
              icon={<FacebookIcon />}
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareData.url}&quote=${shareData.description}`}
              rel="nofollow"
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.activity.share.facebook`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
              target="_blank"
              title="Share to Facebook"
              css={css({ width: "46px" })}
            />
            <Button
              size="s"
              kind="tertiary"
              icon={<TwitterIcon />}
              href={`https://twitter.com/intent/tweet?text=${shareData.description}&url=${shareData.url}`}
              target="_blank"
              rel="nofollow"
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.activity.share.twitter`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
              title="Share to Twitter"
              css={css({ width: "46px" })}
            />
            <Button
              size="s"
              kind="tertiary"
              icon={<WhatsappIcon />}
              href={`https://api.whatsapp.com/send?text=${shareData.description}%0A${shareData.url}`}
              target="_blank"
              rel="nofollow"
              onClick={() =>
                logEvent({
                  eventName: `web.external.activity_corner.share.whatsapp`,
                  eventValue: props.slug,
                  metadata: { language: props.language },
                })
              }
              title="Share to WhatsApp"
              css={css({ width: "46px" })}
            />
            <CopyToClipboardButton dataToBeCopied={url} title={t(props.title).toString()} />
          </S.ShareButtons>
        </S.ShareSocialMediaMobile>
        <S.MobileShareCta>
          <BodyText color="white">{t("directus.dojo_inspo.teacher_content_tagline")}</BodyText>
          <Space size="s" />
          <Button
            icon={<MessagesIcon />}
            kind="tertiary"
            onClick={() =>
              logEvent({
                eventName: `web.external.activity_corner.open-feedback-modal`,
                eventValue: props.slug,
                metadata: { language: props.language },
              })
            }
            href={teacher_content_button_url}
            target="_blank"
            rel="noreferrer"
          >
            {t("directus.dojo_inspo.teacher_content_button_label")}
          </Button>
        </S.MobileShareCta>
      </S.Container>
    </S.Background>
  );
};

export default AssetShareSection;
