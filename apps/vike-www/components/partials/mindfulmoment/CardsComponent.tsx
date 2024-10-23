import React, { useState, useContext } from "react";
import { Flex, Box } from "@src/components/Boxes";
import Container from "@src/components/Container";
import { Text } from "@src/components/Text";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import Translate from "@src/components/translation/Translate";
import { GatsbyImage } from "gatsby-plugin-image";
import { DropDown, DropDownItem } from "@src/components/Dropdown";
import IconDiscussion from "@src/assets/images/mindfulmoment/icon-discussion.svg";
import IconYoutubePlay from "@src/assets/images/mindfulmoment/youtube-icon.svg";
import MindfulMomentModal from "@src/components/partials/mindfulmoment/MindfulMomentModal";
import { mediaQueries } from "@src/styles/theme";
import { TranslationContext } from "@src/components/translation/TranslationContext";

const Background = styled("div")`
  background-color: #f7f8ff;
  padding: 100px 0 80px;
  .bottomText {
    font-size: 18px;
    color: #423e5d;
    text-align: center;
    padding: 15px 0;
    border-top: 1px solid #a1a1a1;
    margin: 0;
    a {
      color: #00bcf2;
      font-weight: 600;
    }
  }
`;

const Card = styled("button")`
  background-color: white;
  border: 1px solid #8878f2;
  color: #423e5d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  border-color: #a1a1a1;
  flex-grow: 1;
  height: 170px;
  position: relative;
  text-align: center;
  max-width: 168px;
  padding: 20px 10px;
  margin: 25px 5px;
  ${mediaQueries[0]} {
    margin: 0;
  }
  &.active {
    background-color: #f6f4ff;
    border: 1px solid #8878f2;
  }
  p {
    font-weight: 600;
    color: #423e5d;
    font-size: 16px;
    margin: 0;
    &.title {
      position: absolute;
      top: -28px;
    }
  }
`;

const TabBox = styled(Flex)`
  background: #fff;
  border: 3px solid #8878f2;
  border-radius: 20px;
  margin-top: 40px;
  .title {
    font-size: 24px;
    color: #423e5d;
    text-align: center;
    font-weight: 600;
  }
  .subtitle {
    font-size: 18px;
    color: #423e5d;
    text-align: center;
  }
`;

const FullWidthImg = styled(GatsbyImage)`
  width: 100%;
`;

const ModalTabs = styled(Flex)`
  padding: 20px 0;
  width: 100%;
  margin-top: 30px;
  justify-content: space-around;
  .box {
    background-color: #fafafa;
    border: 1px solid #d7d7d7;
    border-radius: 20px;
    padding: 20px 0 0px;
    width: 48%;
    position: relative;
    cursor: pointer;
    .step {
      position: absolute;
      font-size: 18px;
      top: -30px;
      color: #777;
    }
    .iconParentY,
    .iconParentD {
      border-radius: 100%;
      color: #fff;
      font-size: 28px;
      height: 66px;
      margin-bottom: 5px;
      padding: 20px 15px;
      width: 66px;
    }
    .iconParentY {
      background-color: #f95173;
    }
    .iconParentD {
      background-color: #ffaf01;
    }
  }
  .fa-youtube-play {
    &:before {
      content: "\f16a";
    }
  }
`;

const Caret = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0;
  vertical-align: middle;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`;

const MenuTriggerButton = styled.button<{ textAlign: string }>`
  border: 0;
  background: transparent;
  color: #00bcf2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const CardsComponent: React.FC = () => {
  const data = useStaticQuery(graphql`
    {
      card1: file(name: { eq: "small-mindful" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card2: file(name: { eq: "small-breathing" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card3: file(name: { eq: "small-feet-focus2" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card4: file(name: { eq: "small-listening2" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card5: file(name: { eq: "small-bodyscan2" }) {
        childImageSharp {
          gatsbyImageData(width: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card6: file(name: { eq: "small-countdown2" }) {
        childImageSharp {
          gatsbyImageData(height: 88, quality: 90, placeholder: NONE, layout: FIXED)
        }
      }
      card1Big: file(name: { eq: "mindful" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      card2Big: file(name: { eq: "mindful-breathing" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      card3Big: file(name: { eq: "focused-feet" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      card4Big: file(name: { eq: "mindful-listening" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      card5Big: file(name: { eq: "body-scan" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
      card6Big: file(name: { eq: "mindful-countdown" }) {
        childImageSharp {
          gatsbyImageData(width: 340, quality: 90, placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  const momentsDetails = [
    {
      name: "mindfulMoment",
      bigImage: data.card1Big.childImageSharp.gatsbyImageData,
      title: "Mindful Moment 😊",
      description:
        "Your journey to mindfulness starts here! A 15-minute lesson to learn the basics of breathing and becoming mindful.",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["es", "Spanish"],
        ["tr", "Turkish"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["ar", "Arabic"],
      ],
    },
    {
      name: "mindfulBreathing",
      bigImage: data.card2Big.childImageSharp.gatsbyImageData,
      title: "Mindful Breathing 🌬️",
      description:
        "Mojo feels some powerful emotions when Bruce takes the last slice of pizza in the school cafeteria. Can mindful breathing help?",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["tr", "Turkish"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["ar", "Arabic"],
        ["es", "Spanish"],
      ],
    },
    {
      name: "focusedFeet",
      bigImage: data.card3Big.childImageSharp.gatsbyImageData,
      title: "Focused Feet 👣",
      description: "Bruce’s nerves are about to make him strike out in a baseball game. Can focusing on his feet help?",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["tr", "Turkish"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["es", "Spanish"],
        ["ar", "Arabic"],
      ],
    },
    {
      name: "mindfulListening",
      bigImage: data.card4Big.childImageSharp.gatsbyImageData,
      title: "Mindful Listening 👂",
      description:
        "Mojo wants his class to win the schoolwide read-a-thon but his mind keeps wandering. Can mindful listening help?",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["tr", "Turkish"],
        ["es", "Spanish"],
      ],
    },
    {
      name: "bodyScan",
      bigImage: data.card5Big.childImageSharp.gatsbyImageData,
      title: "Body Scan 😊",
      description:
        "Katie knows all the answers to a quiz, but her nerves are making her forget. Can a mindful body scan help?",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["ar", "Arabic"],
        ["es", "Spanish"],
        ["tr", "Turkish"],
      ],
    },
    {
      name: "mindfulCountdown",
      active: "true",
      bigImage: data.card6Big.childImageSharp.gatsbyImageData,
      title: "Mindful Countdown 🐑",
      description:
        "Mojo has been asked to read the morning announcements, but his heart is pounding from worry. Can a mindful countdown help?",
      languages: [
        ["en", "English"],
        ["fr", "French"],
        ["ko", "Korean"],
        ["vi", "Vietnamese"],
        ["tr", "Turkish"],
      ] as const,
    },
  ] as const;
  const cardItems = [
    {
      date: "pages.mindfulmoment.dates.card_1.date",
      subtitle: "pages.mindfulmoment.dates.card_1.title",
      text: "",
      image: data.card1.childImageSharp.gatsbyImageData,
    },
    {
      date: "pages.mindfulmoment.dates.card_2.date",
      subtitle: "pages.mindfulmoment.dates.card_2.title",
      image: data.card2.childImageSharp.gatsbyImageData,
    },
    {
      date: "pages.mindfulmoment.dates.card_3.date",
      subtitle: "pages.mindfulmoment.dates.card_3.title",
      image: data.card3.childImageSharp.gatsbyImageData,
    },
    {
      date: "pages.mindfulmoment.dates.card_4.date",
      subtitle: "pages.mindfulmoment.dates.card_4.title",
      image: data.card4.childImageSharp.gatsbyImageData,
    },
    {
      date: "pages.mindfulmoment.dates.card_5.date",
      subtitle: "pages.mindfulmoment.dates.card_5.title",
      image: data.card5.childImageSharp.gatsbyImageData,
    },
    {
      date: "pages.mindfulmoment.dates.card_6.date",
      subtitle: "pages.mindfulmoment.dates.card_6.title",
      image: data.card6.childImageSharp.gatsbyImageData,
    },
  ];

  const t = useContext(TranslationContext);
  const [activeCard, setActiveCard] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLang, setModalLang] = useState<{
    value: "tr" | "type" | "en" | "fr" | "vi" | "ko" | "es" | "ar";
    label: string;
  }>({
    value: "en",
    label: "English",
  });
  const [slideKind, setSlideKind] = useState("video");

  const currentTab = momentsDetails[activeCard];
  const changeLesson = (i: number) => {
    setModalLang({ value: "en", label: "English" });
    setActiveCard(i);
  };

  const openModal = (slide: string) => {
    setSlideKind(slide);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const CardItemsComponent = cardItems.map((item, index) => (
    <Card
      key={index}
      onClick={() => changeLesson(index)}
      className={index === activeCard ? "active" : ""}
      aria-pressed={index === activeCard}
      aria-label={t.translate(item.subtitle) as string}
    >
      <GatsbyImage image={item.image} alt="Card icon" />
      <p>
        <Translate path={item.subtitle} />
      </p>
    </Card>
  ));

  return (
    <Background>
      <Container>
        <Flex justifyContent="space-around" width="100%" flexWrap={["wrap", "nowrap"]} id="episodes">
          {CardItemsComponent}
        </Flex>
        <TabBox flexDirection="column">
          <Flex padding={["15px", "15px 25px"]} flexDirection={["column", "row"]} alignItems="center">
            <Box maxWidth="340px" width="100%">
              <FullWidthImg image={currentTab.bigImage} alt={`${currentTab.title} image`} />
            </Box>
            <Flex flexDirection="column" alignItems="center" padding={["20px 0 0", "60px 15px 0"]} width="100%">
              <Text className="title">{currentTab.title}</Text>
              <Flex alignSelf={["center", "flex-end"]}>
                <DropDown
                  Trigger={(props) => (
                    <MenuTriggerButton
                      textAlign="right"
                      {...props}
                      aria-label={`Selected language is ${modalLang.label}, click to select language`}
                    >
                      <span>
                        {modalLang.label} <Caret />
                      </span>
                    </MenuTriggerButton>
                  )}
                >
                  {currentTab.languages.map((lang) => {
                    return (
                      <DropDownItem
                        role="menuitem"
                        aria-label={lang[1]}
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setModalLang({ value: lang[0], label: lang[1] })}
                        onClick={() => setModalLang({ value: lang[0], label: lang[1] })}
                        key={lang[0]}
                      >
                        <span>{lang[1]}</span>
                      </DropDownItem>
                    );
                  })}
                </DropDown>
              </Flex>
              <ModalTabs>
                <button className="box" onClick={() => openModal("video")}>
                  <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Text className="step">Step 1</Text>
                    <Flex className="iconParentY" flexDirection="column" justifyContent="center" alignItems="center">
                      <img src={IconYoutubePlay} alt="" />
                    </Flex>
                    <Text marginBottom="0" fontWeight="600">
                      Play Lesson
                    </Text>
                    <Text>Video</Text>
                  </Flex>
                </button>
                <button className="box" onClick={() => openModal("discuss")}>
                  <Flex flexDirection="column" justifyContent="center" alignItems="center">
                    <Text className="step">Step 2</Text>
                    <Flex className="iconParentD" flexDirection="column" justifyContent="center" alignItems="center">
                      <img src={IconDiscussion} alt="" />
                    </Flex>
                    <Text marginBottom="0" fontWeight="600">
                      Discuss Questions
                    </Text>
                    <Text>Pop up</Text>
                  </Flex>
                </button>
              </ModalTabs>
            </Flex>
          </Flex>
          <Text className="bottomText">
            Find extra mindfulness resources at our
            <a href="https://ideas.classdojo.com/b/mindfulness"> Big Ideas page!</a>
          </Text>
        </TabBox>
      </Container>
      <MindfulMomentModal
        isOpen={isModalOpen}
        lesson={currentTab.name}
        lang={modalLang.value}
        discussSlide={slideKind == "discuss"}
        closeFunction={closeModal}
      />
    </Background>
  );
};

export default CardsComponent;
