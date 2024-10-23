import React from "react";
import styled from "@emotion/styled";

type SvgIconProps = {
  name: string;
  size: number;
  iconColor?: string;
};

type IconProps = {
  size: number;
  iconColor: string;
};

const Icon = styled.span<IconProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: inline-block;
  svg {
    width: 100% !important;
    height: 100% !important;
    path {
      fill: ${(props) => props.iconColor};
    }
  }
`;

const SvgIcon: React.FC<SvgIconProps> = ({ name, size, iconColor }) => {
  const [svgContent, setSvgContent] = React.useState<string | null>(null);

  React.useEffect(() => {
    import(`./nessie2-icons/${name}.svg`)
      .then((icon) => {
        const base64 = icon.default.split(",")[1];
        const svg = atob(base64);
        setSvgContent(svg);
      })
      .catch((error) => {
        console.error(`Failed to load icon: ${name}`, error);
      });
  }, [name]);

  if (!svgContent) {
    return null;
  }

  return <Icon size={size} iconColor={iconColor} dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

SvgIcon.defaultProps = {
  iconColor: "#1A192D",
};

export default SvgIcon;
