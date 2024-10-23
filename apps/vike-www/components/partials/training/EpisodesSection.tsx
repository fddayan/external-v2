import React from "react";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import { Flex, Box } from "@src/components/Boxes";
import { Text } from "@src/components/Text";
import { PlayIcon, OverflowIcon, LinkIcon, FileIcon } from "@classdojo/web/nessie/icons";
import { theme, BodyText, DeprecatedDetailText, Space, Button } from "@src/components/nessie-web";
import { DropDown, DropDownItem } from "@src/components/Dropdown";
import Container from "@src/components/Container";
import Translate from "@src/components/translation/Translate";

const EpisodeContainer = ({ children }) => (
  <Flex
    justifyContent="space-between"
    padding="12px 0"
    alignItems={["start", "center"]}
    width="100%"
    borderTop="1px solid"
    borderTopColor={theme.colors.taro30}
    flexDirection={["column", "row"]}
  >
    {children}
  </Flex>
);

const SectionTitle = ({ children }) => (
  <Text
    fontSize={["24px", "30px"]}
    fontWeight="700"
    lineHeight={1.2}
    color={theme.colors.taro90}
    textAlign="left"
    padding="12px 0"
  >
    {children}
  </Text>
);

const SectionSubtitle = ({ children }) => (
  <Box textAlign="left" marginBottom="24px">
    <DeprecatedDetailText>{children}</DeprecatedDetailText>
  </Box>
);

const EpisodeTitle = ({ children }) => (
  <Box textAlign="left" marginBottom={["12px", "0"]}>
    <BodyText>{children}</BodyText>
  </Box>
);

const EpisodeImage = ({ imgSrc, children }) => (
  <Box
    marginBottom={["36px", "18px"]}
    borderRadius="12px"
    border="2px solid"
    borderColor={theme.colors.taro30}
    width="340px"
    height="200px !important"
    position="relative"
    style={{
      boxShadow: `0 6px 0 ${theme.colors.taro10}`,
      backgroundImage: `url(${imgSrc})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {children}
  </Box>
);

const WatchButton = ({ data, handleClick, main, href, i18nPrefix }) => {
  if (!data.button_url) return null;

  return (
    <Box position={main ? "absolute" : "static"} bottom="-18px" right="-18px">
      <Button
        onClick={() => handleClick()}
        href={href}
        size={main ? "l" : "s"}
        kind={main ? "primary" : "secondary"}
        icon={data.is_youtube_id ? <PlayIcon size="m" /> : <LinkIcon size="m" />}
      >
        <Translate path={`${i18nPrefix}.button_text_1`} />
      </Button>
    </Box>
  );
};

const LessonWatchButton = ({ handleClick }) => {
  return (
    <Box position="static" bottom="-18px" right="-18px">
      <Button onClick={() => handleClick()} size={"s"} kind={"secondary"} icon={<PlayIcon size="m" />}>
        Watch
      </Button>
    </Box>
  );
};

const MoreButton = () => (
  <Button kind="tertiary" size="s" icon={<OverflowIcon size="m" />}>
    More
  </Button>
);

const EpisodesSection = ({ data, index, i18nPrefix }) => {
  const modalContext = React.useContext(ModalContext);

  function openVideoModal(id) {
    modalContext.showModal(ModalType.VideoModal, { youtubeID: id });
  }

  const actionButtonHandler = () => {
    if (data.is_youtube_id) {
      openVideoModal(data.button_url);
    }
  };

  return (
    <Box margin={["30px 0", "40px 0"]} textAlign="center">
      <Container>
        <SectionTitle>
          <Translate path={`${i18nPrefix}.title_${index}`} subs={data.title} />
        </SectionTitle>
        <SectionSubtitle>
          <Translate path={`${i18nPrefix}.description_${index}`} subs={data.description} />
        </SectionSubtitle>
        <Flex flexDirection={["column", "row"]} css={{ gap: "20px" }}>
          {data.thumb_url && (
            <EpisodeImage imgSrc={data.thumb_url}>
              <WatchButton
                main
                data={data}
                handleClick={actionButtonHandler}
                href={data.is_youtube_id ? null : data.button_url}
                i18nPrefix={i18nPrefix}
              />
            </EpisodeImage>
          )}
          <Flex flexGrow={1} flexDirection="column">
            {data.lessons.map((e, lessonIndex) => {
              const lessonI18nPrefix = `${i18nPrefix}.lessons_${index}`;
              const openLessonVideo = () => openVideoModal(e.youtube_id);
              return (
                <EpisodeContainer key={lessonIndex}>
                  <EpisodeTitle>
                    <Translate path={`${lessonI18nPrefix}.title_${lessonIndex + 1}`} subs={e.title} />
                  </EpisodeTitle>
                  <Flex>
                    {e.youtube_id && <LessonWatchButton handleClick={openLessonVideo} />}
                    {e.items ? (
                      e.items.length > 1 ? (
                        <DropDown
                          Trigger={(props) => (
                            <Box {...props}>
                              <MoreButton />
                            </Box>
                          )}
                        >
                          {e.items.map((item, itemIndex) => {
                            const itemsI18nPrefix = `${lessonI18nPrefix}.items_${lessonIndex + 1}`;
                            return (
                              <DropDownItem key={`item_${itemIndex + 1}`}>
                                <a href={item.url}>
                                  <Flex alignItems="center">
                                    {/* {item.type == "download" ? <FileIcon /> : <LinkIcon />} */}
                                    <Space kind="inline" size="s" />
                                    <Translate path={`${itemsI18nPrefix}.text_${itemIndex + 1}`} subs={item.text} />
                                  </Flex>
                                </a>
                              </DropDownItem>
                            );
                          })}
                        </DropDown>
                      ) : (
                        e.items.map((item, itemIndex) => {
                          const itemsI18nPrefix = `${lessonI18nPrefix}.items_${lessonIndex + 1}`;
                          return (
                            <>
                              <Space size="s" kind="inline" />
                              <Button
                                size="s"
                                kind="secondary"
                                href={item.url}
                                key={itemIndex}
                                icon={item.type == "download" ? <FileIcon /> : <LinkIcon />}
                              >
                                <Translate path={`${itemsI18nPrefix}.text_${itemIndex + 1}`} subs={item.text} />
                              </Button>
                            </>
                          );
                        })
                      )
                    ) : (
                      <Box width={114} />
                    )}
                  </Flex>
                </EpisodeContainer>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default EpisodesSection;
