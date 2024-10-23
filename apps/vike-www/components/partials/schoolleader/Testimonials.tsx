import React, { useRef, useState, useEffect } from "react";
import Container from "@src/components/Container";
import { Caption, Display4, NavButtons, Body1, Overline, Icon, Card, CardContainer, Display1 } from "./styles";
import { Button } from "@src/components/nessie-web";
import Translate from "@src/components/translation/Translate";
import styled from "@emotion/styled";
import { mediaQueriesMax } from "@src/styles/theme";
import { ChevronRightIcon, ChevronLeftIcon } from "@src/components/nessie-web";

const Testimonial = styled.div`
  background-color: #f1f3f8;
  padding: 48px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: calc(33% - 18px);
  flex-shrink: 0;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  gap: 12px;
  ${mediaQueriesMax[0]} {
    width: 80%;
  }
  img {
    border-radius: 50%;
    position: absolute;
    top: -70px;
  }
`;

const MyTestimonial = ({ card }) => {
  return (
    <Testimonial>
      {/* <img src={`https://static.classdojo.com/uploads/${card.thumb.filename_disk}`} width={135} alt="" /> */}
      <Body1 css={{ color: "var(--Blueberry-80, #1F2995)", flexGrow: 1 }}>{card.quote}</Body1>
      <Display4 css={{ color: "var(--Blueberry-80, #1F2995)" }}>{card.author}</Display4>
      <Overline css={{ color: "var(--Blueberry-80, #1F2995)" }}>{card.location}</Overline>
    </Testimonial>
  );
};

const TestimonialContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-direction: row;
  gap: 34px;
  scroll-snap-type: x mandatory;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  padding-inline: calc((100vw / 2) - (1170px / 2) + 15px);
  margin-bottom: 40px;
  ${mediaQueriesMax[2]} {
    padding-left: 30px;
    > div:last-child {
      margin-right: 30px;
    }
  }
  ${mediaQueriesMax[1]} {
    padding-left: 15px;
    > div:last-child {
      margin-right: 15px;
    }
  }
`;

const Testimonials = ({ cards }) => {
  const testimonialContainerRef = useRef(null);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const checkScrollButtons = () => {
    const { scrollLeft, scrollWidth, clientWidth } = testimonialContainerRef.current;
    setIsLeftButtonDisabled(scrollLeft <= 0);
    setIsRightButtonDisabled(scrollLeft >= scrollWidth - clientWidth);
  };

  const scrollTestimonials = (direction) => {
    if (testimonialContainerRef.current) {
      const { clientWidth } = testimonialContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      testimonialContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Check the state of scroll buttons initially and after each scroll event
  useEffect(() => {
    checkScrollButtons();
    // Add event listener for scroll event
    const container = testimonialContainerRef.current;
    container.addEventListener("scroll", checkScrollButtons, { passive: true });
    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);

  const simplifiedCards = cards.map((card) => card.testimonials_id);
  return (
    <>
      <Container>
        <Display1 css={{ maxWidth: 800, textAlign: "center", margin: "auto", marginBottom: 78 }}>
          Hear from school leaders who love us
          <Translate path="directus.page_schoolleader_2024.get_started_hesading" />
        </Display1>
      </Container>
      <TestimonialContainer ref={testimonialContainerRef}>
        {simplifiedCards.map((card, index) => (
          <MyTestimonial key={index} card={card} />
        ))}
      </TestimonialContainer>
      <Container css={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 16, marginBottom: 60 }}>
        <NavButtons disabled={isLeftButtonDisabled} onClick={() => scrollTestimonials("left")}>
          <ChevronLeftIcon />
        </NavButtons>
        <NavButtons disabled={isRightButtonDisabled} onClick={() => scrollTestimonials("right")}>
          <ChevronRightIcon />
        </NavButtons>
      </Container>
    </>
  );
};

export default Testimonials;
