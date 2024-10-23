import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Container from "@src/components/Container";
import { BodyText, DetailHeading } from "@src/components/nessie-web";
import { graphql, useStaticQuery } from "gatsby";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import Marquee from "react-fast-marquee";
import { Display3 } from "./styles";
import { ChevronLeftIcon, ChevronRightIcon } from "@src/components/nessie-web";

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
  photo: { publicURL: string };
  illustration: { publicURL: string };
  photoAlt?: { publicURL: string };
  illustrationAlt?: { publicURL: string };
  className?: string;
  colorScheme: string;
}

const TestimonialCardComponent: React.FC<TestimonialCardProps> = ({
  name,
  title,
  quote,
  photo,
  illustration,
  className,
  colorScheme,
  photoAlt,
  illustrationAlt,
}) => {
  return (
    <TestimonialCard className={className ? className : null}>
      <div css={{ backgroundImage: `url(${photo.publicURL})` }} className="area-a" />
      <div css={{ backgroundImage: `url(${illustration.publicURL})` }} className="area-b" />
      <div className={`area-c ${colorScheme}`}>
        <h3>{name}</h3>
        <span>{title}</span>
        <p>{quote}</p>
      </div>
      {illustrationAlt && <div css={{ backgroundImage: `url(${illustrationAlt.publicURL})` }} className="area-e" />}
      {photoAlt && <div css={{ backgroundImage: `url(${photoAlt.publicURL})` }} className="area-d" />}
    </TestimonialCard>
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
    gap: 12px;
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

export const NavButtons = styled.button`
  width: 50px;
  height: 50px;
  border: solid 1px #8047ff;
  box-shadow: 0px -1px 1px 0px rgba(0, 0, 0, 0.1) inset;
  filter: drop-shadow(0px 3px 3px rgba(83, 88, 135, 0.3)) drop-shadow(0px 1px 0px #ebebeb);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 50px;
  cursor: pointer;
  svg {
    fill: #8047ff;
  }
  &:disabled {
    border: solid 1px #d3d7ec;
    svg {
      fill: #d3d7ec;
    }
  }
`;

const TestimonialCard = styled.div`
  display: grid;
  min-width: 720px;
  grid-template-columns: 1fr 2.5fr;
  grid-template-rows: auto auto;
  gap: 12px;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  margin-right: 12px;
  grid-template-areas:
    "a c"
    "b c";

  &.odd {
    grid-template-areas:
      "b c"
      "a c";
  }

  ${mediaQueriesMax[1]} {
    min-width: 80%;
    display: flex;
    .area-a,
    .area-b,
    .area-d,
    .area-e {
      display: none !important;
    }
  }
  .area-a {
    grid-area: a;
  }

  .area-b {
    grid-area: b;
  }

  .area-c {
    grid-area: c;
    border-radius: 30px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .area-a,
  .area-b,
  .area-d,
  .area-e {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 30px;
  }

  h3 {
    color: inherit;
    font-family: DojoDisplay !important;
    margin: 0;
    font-size: 35px;
    font-style: normal;
    font-weight: 800;
    line-height: 120%;
    letter-spacing: -0.3px;
  }

  span {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
  }

  p {
    font-size: 21px;
    font-style: normal;
    font-weight: 500;
    line-height: 27px;
  }

  .yellow {
    background-color: #fff7b2;
    color: #673305;
  }

  .red {
    background-color: #ffd6ee;
    color: #64104a;
  }

  .green {
    background-color: #9cf2ce;
    color: #07430b;
  }

  .blue {
    background-color: #e1f8ff;
    color: #0c4689;
  }
`;

const Testimonials = styled("div")`
  // padding-block: 100px;
  margin-bottom: 80px;

  .only-desktop {
    ${mediaQueriesMax[1]} {
      display: none !important;
    }
  }
  .only-mobile {
    ${mediaQueries[1]} {
      display: none;
    }
  }
`;

const DistrictTestimonials = () => {
  const data = useStaticQuery(graphql`
    {
      heart: file(relativePath: { eq: "districts/illustration-heart.png" }) {
        publicURL
      }
      heartSmall: file(relativePath: { eq: "districts/illustration-heart-small.png" }) {
        publicURL
      }
      illustration1: file(relativePath: { eq: "districts/testimonial-illustration1.png" }) {
        publicURL
      }
      illustration2: file(relativePath: { eq: "districts/testimonial-illustration2.png" }) {
        publicURL
      }
      illustration3: file(relativePath: { eq: "districts/testimonial-illustration3.png" }) {
        publicURL
      }
      illustration4: file(relativePath: { eq: "districts/testimonial-illustration4.png" }) {
        publicURL
      }
      illustration5: file(relativePath: { eq: "districts/testimonial-illustration5.png" }) {
        publicURL
      }
      illustration6: file(relativePath: { eq: "districts/testimonial-illustration5.png" }) {
        publicURL
      }
      photo1: file(relativePath: { eq: "districts/testimonial-photo1.jpg" }) {
        publicURL
      }
      photo2: file(relativePath: { eq: "districts/testimonial-photo2.jpg" }) {
        publicURL
      }
      photo3: file(relativePath: { eq: "districts/testimonial-photo3.jpg" }) {
        publicURL
      }
    }
  `);

  const {
    heart,
    heartSmall,
    illustration1,
    illustration2,
    illustration3,
    illustration4,
    illustration5,
    illustration6,
    photo1,
    photo2,
    photo3,
  } = data;

  const TestimonialData = [
    {
      name: "Shane Strubhart",
      title: "Chief of Communications, Spring Independent School District",
      quote:
        "“ClassDojo is a central piece of our district’s approach to both family engagement and positive school culture. ClassDojo makes it possible for thousands of families to communicate in their preferred language. It’s a win-win for our district: teachers love how engaging it is for kids, and families love how easy it is to communicate on ClassDojo. As a district partner with ClassDojo, we can now understand the engagement happening throughout our whole district and both support and celebrate our schools.”",
      photo: photo1,
      illustration: illustration1,
      colorScheme: "blue",
    },
    {
      name: "Daniel Mateo",
      title: "Assistant Superintendent in Miami-Dade County Public Schools",
      quote:
        "“The evidence is clear: consistent two-way engagement between school and families has a tremendous impact on every child’s success. That’s why we chose ClassDojo—it’s the preferred way for our elementary and middle school families and teachers to communicate and build community.”",
      photo: photo2,
      illustration: illustration2,
      colorScheme: "red",
    },
    {
      name: "Dr. Mike McGowan",
      title: "Technology Coordinator in Sunnybrook School District 171",
      quote:
        "“ClassDojo is our winning communication solution. We get more responses, view counts, read rates, and participation from parents on things we post on ClassDojo than any other platform we have—which includes robot calls, email blasts, social media posts, you name it!”",
      photo: photo3,
      illustration: illustration3,
      colorScheme: "green",
    },
    {
      name: "Lauren P",
      title: "educator in NYCDOE",
      quote:
        "Since using ClassDojo, my relationships with parents have flourished and my relationship with students have flourished too. When my students realize that I have a great relationship with their family, they trust me as well. And strong, high-trust relationships lead to academic improvement.”",
      photo: photo1,
      illustration: illustration4,
      colorScheme: "yellow",
    },
    {
      name: "Kim M.",
      title: "principal in California",
      quote:
        "The fact that ClassDojo can translate anything we send into other languages is amazing and it has been such a powerful tool for our families. Our non-English speaking parents are now able to get the exact same information as everyone else. They’re so excited to be involved in their kids’ education.",
      photo: photo2,
      illustration: illustration2,
      colorScheme: "green",
    },
    {
      name: "Kayla K.",
      title: "educator in Palm Beach County",
      quote:
        "ClassDojo is one app with multiple uses. ClassDojo is our easiest way to access all parents. Plus, ClassDojo supports our behavioral reward and incentive system. With ClassDojo, everyone in our school can be on the same page, but teachers can still individualize the system in their classroom.",
      photo: photo3,
      illustration: illustration3,
      colorScheme: "red",
    },
    {
      name: "Laura F.",
      title: "administrator in Norwalk-La Mirada Unified School District",
      quote:
        "As an administrator, ClassDojo makes it simple and fun to inform our parents about school events! I simply add our school event, create a message, and send it! Parents can view the message from anywhere at a time that works for their busy lives.",
      photo: photo1,
      illustration: illustration4,
      colorScheme: "yellow",
    },
    {
      name: "Crystal L.",
      title: "educator in Duval County",
      quote:
        "ClassDojo helps our full staff, including our principal, build strong & positive relationships with families through the School Story and Class Story. We went from having about 10 parents to 40-50 parents in attendance. The reminders on ClassDojo make it easier for parents to remember Events.",
      photo: photo2,
      illustration: illustration5,
      colorScheme: "blue",
    },
    {
      name: "Amy B.",
      title: "educator in Racine Wisconsin",
      quote:
        "ClassDojo brings a sense of community. It makes parents feel like they're truly a part of the classroom. You wouldn't believe how many compliments we get from parents about ClassDojo!",
      photo: photo3,
      illustration: illustration6,
      colorScheme: "green",
    },
  ];

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

  useEffect(() => {
    checkScrollButtons();
    const container = testimonialContainerRef.current;
    container.addEventListener("scroll", checkScrollButtons, { passive: true });
    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
    };
  }, []);

  const TitleContainer = styled(Container)`
    background-image: url(${heart.publicURL});
    background-position: right center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-block: 60px;
    ${mediaQueriesMax[1]} {
      background-image: url(${heartSmall.publicURL});
      background-size: 70px;
      background-position: right top;
    }
    h2 {
      max-width: 600px;
    }
  `;

  return (
    <Testimonials>
      <TitleContainer>
        <Display3>See why everyone loves ClassDojo for Districts</Display3>
      </TitleContainer>
      <TestimonialContainer ref={testimonialContainerRef}>
        {TestimonialData.map((testimonial, index) => (
          <TestimonialCardComponent
            key={index}
            colorScheme={testimonial.colorScheme}
            className={index % 2 === 0 ? "even" : "odd"}
            name={testimonial.name}
            title={testimonial.title}
            quote={testimonial.quote}
            photo={testimonial.photo}
            illustration={testimonial.illustration}
          />
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
    </Testimonials>
  );
};

export default DistrictTestimonials;
