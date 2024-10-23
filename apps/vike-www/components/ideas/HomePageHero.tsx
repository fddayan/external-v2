import React from "react";
import styled from "@emotion/styled";
import { theme, Space, Heading, Button } from "@src/components/nessie-web";
import { logEvent } from "@src/utils/logClient";
import { Flex } from "@src/components/Boxes";
import { mediaQueries, mediaQueriesMax } from "@src/styles/theme";
import { getRelativePath } from "@src/utils/routes";

const {
  colors: { dt_taro50 },
} = theme;

const clouds =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUzMyIgaGVpZ2h0PSI0OTUiIHZpZXdCb3g9IjAgMCAxNTMzIDQ5NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN0eWxlPgogICNjbG91ZDEgewogICAgYW5pbWF0aW9uOiBjbG91ZDFhbmltYXRpb24gODBzIGVhc2UgaW5maW5pdGU7CiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTMwMHB4KTsKICB9CiAgQGtleWZyYW1lcyBjbG91ZDFhbmltYXRpb24gewogICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zMDBweCl9CiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMDBweCl9CiAgfQogICNjbG91ZDIgewogICAgYW5pbWF0aW9uOiBjbG91ZDJhbmltYXRpb24gNjVzIGVhc2UgaW5maW5pdGU7CiAgICBhbmltYXRpb24tZGVsYXk6IDQ1czsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMzAwcHgpOwoKICB9CiAgQGtleWZyYW1lcyBjbG91ZDJhbmltYXRpb24gewogICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zMDBweCl9CiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMDBweCl9CiAgfQogICNjbG91ZDMgewogICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zMDBweCk7CiAgICBhbmltYXRpb246IGNsb3VkM2FuaW1hdGlvbiA0MHMgZWFzZSBpbmZpbml0ZTsKICB9CiAgQGtleWZyYW1lcyBjbG91ZDNhbmltYXRpb24gewogICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0zMDBweCl9CiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKDIwMDBweCl9CiAgfQogICNjbG91ZDQgewogICAgYW5pbWF0aW9uOiBjbG91ZDRhbmltYXRpb24gNDVzIGVhc2UgaW5maW5pdGU7CiAgICBhbmltYXRpb24tZGVsYXk6IDcwczsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMzAwcHgpOwogIH0KICBAa2V5ZnJhbWVzIGNsb3VkNGFuaW1hdGlvbiB7CiAgICBmcm9tIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTMwMHB4KX0KICAgIHRvIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjAwMHB4KX0KICB9Cjwvc3R5bGU+CjwhLS0gPHJlY3Qgd2lkdGg9IjE1MzMiIGhlaWdodD0iNDk1IiBmaWxsPSJyZWQiLz4gLS0+CjxwYXRoIGlkPSJjbG91ZDEiIG9wYWNpdHk9IjAuNSIgZD0iTTE5NS41NzUgNjEuNDczN0MxOTUuNTc1IDYxLjQ3MzcgMTgzLjQxNyAzOS43NjMyIDE2MC4yMDUgNDUuMzY4NEMxMzYuOTkzIDUwLjk3MzcgMTUwLjg4OSA5My4yMTA1IDIwMi42ODEgOTkuNjg0MkMyNjAuMDc4IDEwNi43ODkgMjg1LjgxNiA3My4yMzY4IDI3MC44MTYgNjAuMjEwNUMyNTUuODE1IDQ3LjE4NDIgMjM1Ljk5OCA2NS4xODQyIDIzNS45OTggNjUuMTg0MkMyMzUuOTk4IDY1LjE4NDIgMjM5LjA3NyAzMy4zNjg0IDIxNy45OTcgMzAuODQyMUMxOTYuOTE3IDI4LjMxNTggMTk1LjU3NSA2MS40NzM3IDE5NS41NzUgNjEuNDczN1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGlkPSJjbG91ZDIiIG9wYWNpdHk9IjAuNSIgZD0iTTYwLjc4MzMgNjEuNzY4OUM2MC43ODMzIDYxLjc2ODkgNDguNjI0OCA0MC4wNTg0IDI1LjQxMzIgNDUuNjYzN0MyLjIwMTUxIDUxLjI2ODkgMTYuMDk2OSA5My41MDU4IDY3Ljg4ODkgOTkuOTc5NUMxMjUuMjg3IDEwNy4wODUgMTUxLjAyNSA3My41MzIxIDEzNi4wMjQgNjAuNTA1OEMxMjEuMDIzIDQ3LjQ3OTUgMTAxLjIwNiA2NS40Nzk1IDEwMS4yMDYgNjUuNDc5NUMxMDEuMjA2IDY1LjQ3OTUgMTA0LjI4NSAzMy42NjM3IDgzLjIwNTUgMzEuMTM3NEM2Mi4xMjU1IDI4LjYxMSA2MC43ODMzIDYxLjc2ODkgNjAuNzgzMyA2MS43Njg5WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggaWQ9ImNsb3VkMyIgb3BhY2l0eT0iMC45NCIgZD0iTTE4OC40MTEgMTQ4LjI5NUMxODguNDExIDE0OC4yOTUgMTcxLjc1MyAxMjUuMzIyIDE0Ni4yNTEgMTM0Ljc5NUMxMjAuNzUgMTQ0LjI2OSAxNDIuMDY3IDE5MC4yMTYgMjAxLjU5NiAxOTAuNjExQzI2Ny41MiAxOTEuMDA2IDI5Mi4xNTMgMTQ5LjU1OCAyNzMuNDQyIDEzNi44NDhDMjU0LjczIDEyNC4xMzcgMjM0LjY3NyAxNDcuMTkgMjM0LjY3NyAxNDcuMTlDMjM0LjY3NyAxNDcuMTkgMjMzLjg4NyAxMTAuNzE2IDIwOS43MjggMTEwLjcxNkMxODUuNDkgMTEwLjU1OCAxODguNDExIDE0OC4yOTUgMTg4LjQxMSAxNDguMjk1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggaWQ9ImNsb3VkNCIgb3BhY2l0eT0iMC45NCIgZD0iTTUyLjgxODQgMTI1LjQwMUM1Mi44MTg0IDEyNS40MDEgMzYuMTU5NyAxMDIuNDI3IDEwLjY1ODQgMTExLjkwMUMtMTQuODQyOCAxMjEuMzc0IDYuNDc0MDIgMTY3LjMyMiA2Ni4wMDMzIDE2Ny43MTZDMTMxLjkyOCAxNjguMTExIDE1Ni41NiAxMjYuNjY0IDEzNy44NDkgMTEzLjk1M0MxMTkuMTM3IDEwMS4yNDMgOTkuMDgzOCAxMjQuMjk1IDk5LjA4MzggMTI0LjI5NUM5OS4wODM4IDEyNC4yOTUgOTguMjk0MyA4Ny44MjE2IDc0LjEzNTIgODcuODIxNkM0OS45NzYyIDg3LjgyMTYgNTIuODE4NCAxMjUuNDAxIDUyLjgxODQgMTI1LjQwMVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";

const HomeBanner = styled("div")`
  max-height: 532px;
  height: 42vw;
  background-image: url(https://static.classdojo.com/img/ideas_platform/brandassets/bottom-curve.svg),
    url(https://static.classdojo.com/img/ideas_platform/brandassets/mojo-binoculars.svg),
    url(https://static.classdojo.com/img/ideas_platform/brandassets/others-binoculars.svg), url(${clouds}),
    linear-gradient(0deg, #e3f8fe -8.95%, #8fd9fb 105.17%);
  background-position: center calc(100% + 5px), calc(50% - 570px) 90px, calc(50% + 580px) 140px, center, center;
  background-size: contain, auto, auto, cover, cover;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat;

  ${mediaQueriesMax[0]} {
    min-height: 358px;
    background-image: url(https://static.classdojo.com/img/ideas_platform/brandassets/bottom-curve.svg), url(${clouds}),
      linear-gradient(0deg, #e3f8fe -8.95%, #8fd9fb 105.17%);
    background-position: bottom center, center, center;
    background-size: 100%, cover, cover;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, repeat;
    min-height: 450px;
  }
`;

const HomeBannerTitle = styled("h1")`
  font-weight: 700;
  color: #0092e5;
  text-shadow: 0 1px 2px rgba(#000, 0.12);
  line-height: 1.2;
  margin: 0;
  font-size: 36px;

  ${mediaQueries[1]} {
    font-size: 52px;
  }
`;

const HomePageHero = ({
  heading,
  subheading,
  cta_label,
  cta_url,
}: {
  heading: string;
  subheading: string;
  cta_label: string;
  cta_url: string;
}) => {
  const cta_href = cta_url && cta_url.indexOf("http") > -1 ? cta_url : getRelativePath(cta_url);
  return (
    <HomeBanner>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        maxWidth="768px"
        margin="auto"
        textAlign="center"
        paddingTop="78px"
        paddingX={24}
        paddingBottom={120}
      >
        <HomeBannerTitle>{heading}</HomeBannerTitle>
        <Space size="m" />
        <Heading color={dt_taro50}>{subheading}</Heading>
        <Space size="m" />
        <Button
          size="l"
          href={cta_href}
          onClick={() => {
            logEvent({
              eventName: "ideas.homeBannerButtonClick",
              eventValue: { cta_href },
            });
          }}
        >
          {cta_label}
        </Button>
      </Flex>
    </HomeBanner>
  );
};

export default HomePageHero;
