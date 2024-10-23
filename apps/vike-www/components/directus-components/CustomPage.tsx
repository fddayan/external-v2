import React from "react";
import TextNav from "@src/components/directus-components/TextNav";
import QuoteBox from "@src/components/directus-components/QuoteBox";
import FeatureItem from "@src/components/directus-components/FeatureItem";
import Separator from "@src/components/directus-components/Separator";
import HeroTitle from "@src/components/directus-components/HeroTitle";
import CustomSEO, { CustomSEOProps } from "@src/components/directus-components/CustomSEO";
import IconInfoList from "@src/components/directus-components/IconInfoList";
import TextWithHeader from "@src/components/directus-components/TextWithHeader";
import Anchor from "@src/components/directus-components/Anchor";

type Component =
  | "TextNav"
  | "QuoteBox"
  | "FeatureItem"
  | "Separator"
  | "IconInfoList"
  | "Anchor"
  | "Text"
  | "HeroTitle";
interface BaseComponent {
  slug: number;
}
interface ComponentType {
  TextNav: (BaseComponent & {
    links: { text: string; isAnchor: boolean; link: string }[];
  })[];
  QuoteBox: (BaseComponent & {
    author: string;
    color: "orange" | "purple" | "blue";
    text: string;
    container_background: string;
  })[];
  FeatureItem: (BaseComponent & {
    is_picture_left: boolean;
    button_text?: string;
    button_url?: string;
    header: string;
    picture: {
      filename_disk: string;
    };
    text: string;
  })[];
  HeroTitle: (BaseComponent & {
    background_color_desktop: string;
    background_color_mobile: string;
    text: string;
    picture_left?: { filename_disk: string };
    picture_right?: { filename_disk: string };
  })[];
  Separator: (BaseComponent & { margin: string; background_color: string })[];
  IconInfoList: (BaseComponent & {
    text: string;
    icon_infos: {
      image: any;
      title: string;
      text: string;
    }[];
    header: string;
  })[];
  Anchor: (BaseComponent & { name: string })[];
  Text: (BaseComponent & { title: string; text: string })[];
}

type CustomPageProps = {
  pageContext: {
    page: {
      slug: string;
      seo: CustomSEOProps;
      component_ids: Array<{
        component: Component;
        slug: number;
      }>;
    };
    components: ComponentType;
  };
};

const CustomPage: React.FC<CustomPageProps> = ({ pageContext }) => {
  const page = pageContext.page;
  const components = pageContext.components;

  const renderComponent = <T extends keyof ComponentType>(
    component: T,
    slug: number,
    render: (item: ComponentType[T][number]) => JSX.Element | null,
  ) => {
    if (!components[component]) {
      return null;
    }
    const item = [...components[component]].find((item) => item.slug === slug);
    return item ? render(item) : null;
  };

  return (
    <>
      {page.seo && <CustomSEO {...page.seo} />}
      {page.component_ids.map(({ component, slug }, index) => {
        const key = `custom-${index}`;
        switch (component) {
          case "TextNav":
            return renderComponent(component, slug, (item) => <TextNav key={key} links={item.links} />);
          case "QuoteBox":
            return renderComponent(component, slug, (item) => (
              <QuoteBox
                key={key}
                author={item.author}
                color={item.color}
                text={item.text}
                container_background={item.container_background}
              />
            ));
          case "FeatureItem":
            return renderComponent(component, slug, (item) => (
              <FeatureItem
                key={key}
                is_picture_left={item.is_picture_left}
                text={item.text}
                button_text={item.button_text}
                button_url={item.button_url}
                header={item.header}
                picture={item.picture}
              />
            ));
          case "Separator":
            return renderComponent(component, slug, (item) => (
              <Separator key={key} margin={item.margin} background_color={item.background_color} />
            ));
          case "HeroTitle":
            return renderComponent(component, slug, (item) => (
              <HeroTitle
                key={key}
                text={item.text}
                background_color_desktop={item.background_color_desktop}
                background_color_mobile={item.background_color_mobile}
                picture_left={item.picture_left ? item.picture_left : null}
                picture_right={item.picture_right ? item.picture_right : null}
              />
            ));
          case "IconInfoList":
            return renderComponent(component, slug, (item) => (
              <IconInfoList key={key} header={item.header} icon_infos={item.icon_infos} />
            ));
          case "Anchor":
            return renderComponent(component, slug, (item) => <Anchor key={key} name={item.name} />);
          case "Text":
            return renderComponent(component, slug, (item) => (
              <TextWithHeader key={key} title={item.title} text={item.text} />
            ));
          default:
            return null;
        }
      })}
    </>
  );
};

export default CustomPage;
