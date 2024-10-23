import React from "react";
import { theme } from "@classdojo/web/nessie";
import { Text } from "@src/components/Text";
import { Box, Flex } from "@src/components/Boxes";
import { useStaticQuery, graphql } from "gatsby";
import SVGLogo from "@src/assets/images/ecards/cardLogo.svg";

const TextBox = ({ children }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    backgroundColor={`${theme.colors.white}`}
    border={`2px solid ${theme.colors.taro30}`}
    borderRadius="42px"
    padding={["40px 20px", "50px 30px"]}
    margin="20px auto"
    maxWidth="720px"
    minWidth={["auto", "400px"]}
  >
    {children}
  </Flex>
);

const Card = ({ children, nodeRef, backgroundOption, preview, showBackground }) => {
  return (
    <Flex
      style={{
        backgroundImage: showBackground ? backgroundOption : "",
        backgroundColor: showBackground ? "white" : "",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      flexDirection="column"
      justifyContent="center"
      boxShadow={preview ? "0 2px 4px rgba(0,0,0,0.3)" : "none"}
      padding={showBackground ? ["40px", "60px"] : "0"}
      borderRadius={showBackground ? "10px" : "0"}
      maxWidth={preview ? "100%" : "unset"}
      marginTop="20px"
      ref={nodeRef}
      zIndex={999}
    >
      {children}
    </Flex>
  );
};

const Title = ({ children }) => (
  <Text textAlign="center" color={theme.colors.taro90} fontWeight="700" fontSize={["28px", "40px"]} lineHeight="1">
    {children}
  </Text>
);

const Description = ({ children }) => (
  <Text
    textAlign="center"
    color={theme.colors.taro90}
    fontWeight="700"
    fontSize="18px"
    lineHeight="22px"
    marginBottom={0}
  >
    {children}
  </Text>
);

const ThanksUrl = () => (
  <a href="https://www.classdojo.com/thanks">
    <Text
      color="white"
      fontSize="20px"
      lineHeight="20px"
      fontWeight="800"
      textAlign="center"
      style={{ textShadow: "1px 2px 6px #545382" }}
    >
      www.classdojo.com/thanks
    </Text>
  </a>
);

type EcardProps = {
  background: any;
  teacherName: string;
  senderName: string;
  text: string;
  toDownload?: boolean;
  nodeRef?: any;
  showBackground?: boolean;
  preview?: true;
};
const Ecard: React.FC = ({
  background,
  teacherName,
  senderName,
  text,
  nodeRef,
  showBackground,
  preview,
}: EcardProps) => {
  const data = useStaticQuery(graphql`
    {
      logo: file(name: { eq: "classdojo_logo_176@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 180, placeholder: NONE, layout: FIXED)
        }
      }
    }
  `);

  const { logo } = data;

  return (
    <Card nodeRef={nodeRef || null} backgroundOption={background} showBackground={showBackground} preview={preview}>
      <Flex justifyContent="center">
        <img src={SVGLogo} alt="" />
      </Flex>
      <TextBox>
        <Title>{teacherName}, thank you.</Title>
        <Description>{text}</Description>
        <Flex justifySelf="flex-end" flexDirection="column" marginTop={12}>
          <Description key="greetings">Yours,</Description>
          <Description key="sender">{senderName}</Description>
        </Flex>
      </TextBox>
      {!preview && <ThanksUrl />}
    </Card>
  );
};

export default Ecard;
