import React, { useContext, useState, useRef, useEffect } from "react";
import { TranslationContext } from "@src/components/translation/TranslationContext";
import {
  SearchIcon,
  BodyText,
  Button,
  Heading,
  ChevronLeftIcon,
  ChevronRightIcon,
  Space,
  theme,
} from "@src/components/nessie-web";
import { Link } from "gatsby";
import { getRelativePath } from "@src/utils/routes";
import { logEvent } from "@src/utils/logClient";
import * as S from "./styles";
import { css } from "@emotion/react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Masonry from "react-responsive-masonry";

interface ActivitiesSectionProps {
  activeTag?: string;
  handleQueryParams: (slug: string) => void;
  language: string;
  tags: {
    id: string;
    slug: string;
  }[];
  activities: {
    id: string;
    title: string;
    description: string;
    previewImage: string;
    slug: string;
    backgroundColor: string;
    tags: {
      slug: string;
    }[];
  }[];
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = (props) => {
  const { translate: t } = useContext(TranslationContext);

  const [activeTag, setActiveTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAtLeft, setIsAtLeft] = useState(true);
  const [isAtRight, setIsAtRight] = useState(false);
  const [displayedActivitiesCount, setDisplayedActivitiesCount] = useState(20);

  const isSearchActive = searchTerm.length >= 3;

  const clearFilters = () => {
    props.handleQueryParams("");
    setActiveTag("");
    setSearchTerm("");
  };

  const handleLoadMore = () => {
    setDisplayedActivitiesCount(props.activities.length);
  };

  const handleTagSelection = (slug: string) => {
    if (activeTag === slug) {
      clearFilters();
    } else {
      setActiveTag(slug);
      props.handleQueryParams(slug);
    }
    logEvent({
      eventName: `web.external.activity_corner.homepage-filter`,
      eventValue: slug,
      metadata: { language: props.language },
    });
  };

  const filteredActivities = props.activities.filter((activity) => {
    // If active tag is set, filter by tag
    if (activeTag) {
      return activity.tags.map(({ slug }) => slug).indexOf(activeTag) > -1;
    }
    // If search term is at least 3 characters long, filter by title or description
    else if (searchTerm.length >= 3) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      // translate the title and description before checking
      const translatedTitle = t(activity.title);
      const translatedDescription = t(activity.description);

      if (typeof translatedTitle === "string" && typeof translatedDescription === "string") {
        return (
          translatedTitle.toLowerCase().includes(lowerCaseSearchTerm) ||
          translatedDescription.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    }
    // If neither is set, don't filter
    else {
      return true;
    }
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollFilterContainer = (scrollAmount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      setIsAtLeft(container.scrollLeft === 0);
      setIsAtRight(Math.ceil(container.scrollLeft) + container.clientWidth >= container.scrollWidth);
    }
  };

  useEffect(() => {
    if (props.activeTag) {
      setActiveTag(props.activeTag);
    }
  }, [props.activeTag]);

  const activitiesToShow = filteredActivities.slice(0, displayedActivitiesCount);
  // Clone the tags array to avoid mutating the props directly
  const tagsWithAdjustedOrder = [...props.tags];

  // Find the tag with slug 'mr-kyle-cohen'
  const kyleCohenTagIndex = tagsWithAdjustedOrder.findIndex((tag) => tag.slug === "mr-kyle-cohen");

  // If found and it's not already in the third position (index 2)
  if (kyleCohenTagIndex !== -1 && kyleCohenTagIndex !== 2) {
    // Remove the tag from its current position
    const [kyleCohenTag] = tagsWithAdjustedOrder.splice(kyleCohenTagIndex, 1);

    // Insert it at the third position (index 2)
    // If there are less than 2 items, it gets added at the end
    tagsWithAdjustedOrder.splice(2, 0, kyleCohenTag);
  }

  // Now use tagsWithAdjustedOrder for mapping
  return (
    <>
      <div css={{ maxWidth: 1100, margin: "auto", textAlign: "center", paddingTop: 24, paddingInline: 24 }}>
        <SearchIcon size="s" css={{ marginRight: -40, transform: "translateY(3px)" }} color="dt_taro30" />
        <S.SearchInput
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value.length >= 3) {
              setActiveTag("");
              props.handleQueryParams("");
            }
          }}
          placeholder="Search..."
        />
      </div>
      <S.FilterContainer ref={scrollRef} onScroll={handleScroll}>
        <S.LeftScrollButton className={!isAtLeft ? "active" : ""}>
          <Button
            css={css({ width: 44 })}
            size="s"
            icon={<ChevronLeftIcon />}
            onClick={() => scrollFilterContainer(-100)}
            disabled={isAtLeft || isSearchActive}
          />
        </S.LeftScrollButton>
        <Button
          key="view-all"
          onClick={clearFilters}
          kind={!isSearchActive && activeTag === "" ? "primary" : "secondary"}
          size="s"
          disabled={isSearchActive}
        >
          {t("dojo_inspo.clear_filters")}
        </Button>

        {tagsWithAdjustedOrder.map(({ id, slug }, index) => {
          if (slug === "" || id === "") {
            return null;
          }
          return (
            <Button
              key={index}
              onClick={() => handleTagSelection(slug)}
              kind={slug === activeTag && !isSearchActive ? "primary" : "secondary"}
              size="s"
              disabled={isSearchActive}
            >
              {t(`directus.dojo_inspo_tags_${id}.label`)}
              {slug === "new" && <S.NewTagBadge></S.NewTagBadge>}
            </Button>
          );
        })}

        <S.RightScrollButton className={!isAtRight ? "active" : ""}>
          <Button
            size="s"
            icon={<ChevronRightIcon />}
            css={css({ width: 44 })}
            onClick={() => scrollFilterContainer(100)}
            disabled={isAtRight || isSearchActive}
          />
        </S.RightScrollButton>
      </S.FilterContainer>
      <S.ActivityColumns columnsCountBreakPoints={{ 768: 1, 992: 3 }}>
        <Masonry gutter={`${theme.space.l}px`}>
          {activitiesToShow.length > 0 ? (
            activitiesToShow.map((activity, index) => (
              <Link
                to={getRelativePath(`/activity-corner/${activity.slug}`)}
                onClick={() => {
                  logEvent({
                    eventName: `web.external.activity_corner.card.touch`,
                    eventValue: activity.slug,
                    metadata: { language: props.language },
                  });
                }}
                key={activity.slug}
                css={css({ breakInside: "avoid-column" })}
              >
                <S.ActivityCard key={index} backgroundColor={activity.backgroundColor}>
                  <img
                    src={`https://static.classdojo.com/uploads/${activity.previewImage.filename_disk}`}
                    alt="activity preview"
                    loading="lazy"
                  />
                  <S.ActivityCardInner>
                    <Heading>{t(activity.title)}</Heading>
                    <Space size="xs" />
                    <BodyText color="taro60" className="description">
                      {t(activity.description)}
                    </BodyText>
                  </S.ActivityCardInner>
                  <S.BadgesContainer>
                    {activity.tags.findIndex(({ slug }) => slug === "featured") > -1 && (
                      <S.NewActivityBadge size="s" kind="plus">
                        {t(`directus.dojo_inspo_tags_1.label`)}
                      </S.NewActivityBadge>
                    )}
                    {activity.tags.findIndex(({ slug }) => slug === "new") > -1 && (
                      <S.NewActivityBadge size="s">{t(`directus.dojo_inspo_tags_28.label`)}</S.NewActivityBadge>
                    )}
                  </S.BadgesContainer>
                </S.ActivityCard>
              </Link>
            ))
          ) : (
            <div>{t("dojo_inspo.not_found")}</div>
          )}
        </Masonry>
      </S.ActivityColumns>
      {filteredActivities.length > displayedActivitiesCount && (
        <Button css={{ margin: "auto", marginBottom: theme.space.l }} onClick={handleLoadMore}>
          {t("dojo_inspo.load_all")}
        </Button>
      )}
    </>
  );
};

export default ActivitiesSection;
