import React, { useContext, useEffect, useState } from "react";
import ComposeArea from "@src/components/ideas/ComposeArea";
import HLSVideo from "@src/components/ideas/HLSVideo";
import { navigate } from "gatsby";
import window from "global/window";
import ShareToClassStory from "@src/components/ideas/ShareToClassStory";
import { AppDataContext } from "@src/components/AppDataContext";
import { ModalContext, ModalType } from "@src/components/modals/ModalController";
import {
  BruceDiscuss,
  BruceDiscussBalloon,
  discussion,
  isFirst,
  IsHtml,
  isNext,
  isPrev,
  IsShare,
  IsVideo,
  isVideo16per9,
  KatieDiscuss,
  KatieDiscussBalloon,
  LessonSS,
  LessonSSBody,
  LessonSSClose,
  LessonSSContainer,
  LessonSSCrumbs,
  LessonSSHeader,
  LessonSSHeaderContainer,
  LessonSSHtmlSlideContent,
  LessonSSNav,
  LessonSSShareSlideContent,
  LessonSSSlideCompose,
  LessonSSSlideTitle,
  LessonSSTitle,
  MaterialIconArrowBack,
  MaterialIconArrowForward,
  MaterialIconCheck,
  MaterialIconClose,
  video,
  GeoFenceContainer,
} from "@src/components/ideas/LessonSlideShowStyles";
import { css } from "@emotion/react";
import Button from "@src/components/Button";
import _get from "lodash/get";
import GeoFence from "../partials/GeoFence";
import { getRelativePath } from "@src/utils/routes";
import T from "../translation/Translate";

const OUTER_PROP = "slides";
const INNER_PROP = "slides";

const INITIAL_STATE = {
  outerIndex: 0,
  innerIndex: 0,
  firstView: true,
};

const IconArrowLeft = () => <MaterialIconArrowBack />;
const IconArrowRight = () => <MaterialIconArrowForward />;
const IconCheck = () => <MaterialIconCheck />;
const IconClose = () => <MaterialIconClose />;
const IconDiscussKatie = () => <KatieDiscuss />;
const IconDiscussKatieBalloon = () => <KatieDiscussBalloon />;
const IconDiscussBruce = () => <BruceDiscuss />;
const IconDiscussBruceBalloon = () => <BruceDiscussBalloon />;

type Lesson = {
  us_only: boolean;
  slug: string;
  title: string;
  discussion_guide_label: string;
  discussion_guide_link: string;
  share_body: string;
  share_hero: { filename_disk: string };
  url_slug: string;
};
type SlideData = {
  subtitle: string;
  title: string;
  slides: Slide[];
};
type SlideType =
  | { slide_type: "html"; html_content: string }
  | { slide_type: "discuss"; html_content: string }
  | { slide_type: "share" }
  | { slide_type: "activity"; activity_id: string }
  | VideoSlideType;
export type Slide = SlideType & SlideData;
function Slide(props: {
  discuss: boolean;
  firstView: boolean;
  index: number;
  slide: Slide;
  lesson: Lesson;
  user: { avatarURL: string };
  share: ShareType | false;
  activity_id?: string;
}) {
  const [country, setCountry] = useState("");
  const { us_only } = props.lesson;

  useEffect(() => {
    fetch("/api/country", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((json) => setCountry(json.country));
  }, []);

  if (props.slide.slide_type === "html") return <HtmlSlide slide={props.slide} discuss={props.discuss} />;
  if (props.slide.slide_type === "discuss") return <HtmlSlide slide={props.slide} discuss />;
  if (props.slide.slide_type === "share") return <ShareSlide {...props} />;
  if (props.slide.slide_type === "activity") return <ShareSlide {...props} activity_id={props.slide.activity_id} />;

  return !us_only || (us_only && country === "US") ? (
    <VideoSlide
      slide={props.slide}
      firstView={props.firstView}
      slug={props.lesson.slug}
      index={props.index}
      title={props.lesson.title}
    />
  ) : (
    <GeoFenceContainer>
      <GeoFence />
    </GeoFenceContainer>
  );
}

function HtmlSlide({ slide, discuss }: { slide: { html_content: string }; discuss: boolean }) {
  let content = slide.html_content;
  if (content) {
    content = content.replace(/\\n/g, "");
    content = content.replace(/\\t/g, "");
  }
  return (
    <IsHtml>
      <LessonSSHtmlSlideContent
        data-test-name="lessonSlideContent"
        css={discuss ? discussion : css``}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {discuss ? <IconDiscussKatie /> : null}
      {discuss ? <IconDiscussKatieBalloon /> : null}
      {discuss ? <IconDiscussBruce /> : null}
      {discuss ? <IconDiscussBruceBalloon /> : null}
    </IsHtml>
  );
}

type ShareStatus = Record<string, "pending" | "done" | "error">;
type ShareType = {
  image?: string | null;
  activityId?: string;
  shareStatus: ShareStatus;
};
function ShareSlide(props: {
  lesson: Lesson;
  user: { avatarURL: string };
  share: ShareType | false;
  activity_id?: string;
  slide: Slide;
}) {
  const appData = useContext(AppDataContext);
  const [shareText, setShareText] = useState(props.lesson.share_body);
  const canWatch = !!props.user; /*|| !props.lesson.require_auth*/
  const isActivity = props.slide.slide_type == "activity";
  const image = props.lesson.share_hero;
  const imagePath = image ? `https://static.classdojo.com/uploads/${image.filename_disk}` : null;
  const attachment = { type: "photo", path: imagePath };
  let shareButton = null;

  const modalContext = useContext(ModalContext);

  function openLoginModal() {
    modalContext.showModal(ModalType.TeacherLogin, { form: { noRedirect: true } });
  }

  if (_get(appData, "data.userData.type") === "teacher") {
    shareButton =
      canWatch && props.share ? (
        <ShareToClassStory
          {...props.share}
          activityId={props.activity_id}
          image={imagePath}
          body={shareText}
          classes={appData.data.classes}
        />
      ) : (
        <ShareBlocker />
      );
  } else {
    shareButton = (
      <Button onClick={openLoginModal}>
        <T path="ideas.teacher_login" />
      </Button>
    );
  }

  return (
    <IsShare>
      <LessonSSSlideTitle>{props.slide.subtitle}</LessonSSSlideTitle>
      <LessonSSShareSlideContent>
        <LessonSSSlideCompose>
          <ComposeArea
            isActivity={isActivity}
            avatarURL={props.user ? props.user.avatarURL : ""}
            initialText={shareText}
            attachment={attachment}
            submitComponent={shareButton}
            onTextChange={setShareText}
            activityDownload={{ label: props.lesson.discussion_guide_label, link: props.lesson.discussion_guide_link }}
          />
        </LessonSSSlideCompose>
      </LessonSSShareSlideContent>
    </IsShare>
  );
}

const ShareBlocker = () => {
  const modals = useContext(ModalContext);
  return (
    <div>
      <Button onClick={() => modals.showModal(ModalType.TeacherLogin, { form: { noRedirect: true } })}>
        Share on Class Story
      </Button>
    </div>
  );
};

type VideoSlideType =
  | { slide_type: "hls"; hls_url: string; hls_poster_url: string; hls_captions: boolean }
  | ({ slide_type: "vidly" | "other" } & PlayerProps);
function VideoSlide({
  slide,
  firstView,
  slug,
  index,
  title,
}: {
  slide: VideoSlideType;
  firstView: boolean;
  slug: string;
  index: number;
  title: string;
}) {
  let player = null;
  if (slide.slide_type === "hls") {
    player = <VideoPlayerHLS {...slide} slug={slug} index={index} title={title} />;
  } else if (slide.slide_type === "vidly") {
    player = <VideoPlayer {...slide} firstView={firstView} />;
  } else {
    player = <AltPlayer {...slide} firstView={firstView} />;
  }

  return <IsVideo id={`${index}-${slug}`}>{player}</IsVideo>;
}

const jwSrc = (url: string, firstView: boolean) => {
  return `https://content.jwplatform.com/players/${url}.html?hlshtml=true&autoplay=${firstView}`;
};

function VideoPlayerHLS(props: {
  hls_url: string;
  hls_poster_url: string;
  hls_captions: boolean;
  slug: string;
  index: number;
  title?: string;
}) {
  return (
    <div data-test-name="videoPlayerHLS" className="is-video-inner">
      <div css={css(video, isVideo16per9)}>
        <HLSVideo
          url={props.hls_url}
          poster={props.hls_poster_url}
          captions={props.hls_captions}
          autoplay={false}
          slug={props.slug}
          index={props.index}
          title={props?.title}
        />
      </div>
    </div>
  );
}

type PlayerProps = { video_id: string; firstView: boolean };
function VideoPlayer(props: PlayerProps) {
  return (
    <div className="is-video-inner">
      <div css={css(video, isVideo16per9)}>
        <iframe
          title="Video for slide show"
          frameBorder="0"
          allowFullScreen
          name="video-frame"
          src={jwSrc(props.video_id, props.firstView)}
        />
      </div>
    </div>
  );
}

const youTubeSrc = (url: string, firstView: boolean) => {
  return `https://www.youtube.com/embed/${url}?rel=0&showinfo=0&autoplay=${firstView ? 1 : 0}`;
};

function AltPlayer(props: PlayerProps) {
  return (
    <div className="is-video-inner">
      <div css={css(video, isVideo16per9)}>
        <iframe
          title="Video for slide show"
          frameBorder="0"
          allowFullScreen
          name="video-frame"
          src={youTubeSrc(props.video_id, props.firstView)}
        />
      </div>
    </div>
  );
}

// small helper functions
function outerPropMaxIndex(data: { slides: unknown[] }) {
  return data[OUTER_PROP].length - 1;
}

function innerPropMaxIndex(data: LessonData, outerIndex: number) {
  return data[OUTER_PROP][outerIndex][INNER_PROP].length - 1;
}

// just a sanity check while developing, to make sure we didn't screw something up
function checkValid(
  state: Partial<LessonSlideShowState> & { outerIndex: number; innerIndex: number },
  data: LessonData,
) {
  if (data[OUTER_PROP][state.outerIndex][INNER_PROP][state.innerIndex] == null) {
    throw new Error("Invalid indexes into data!");
  }
}

// adds boolean flags that tell if we're at the start or end
// helps keep the code in the component from knowing too much about how this
// all works
function addBoundaryFlags(
  state: { outerIndex: number; innerIndex: number },
  data: LessonData,
): Partial<LessonSlideShowState> {
  // sanity check
  checkValid(state, data);

  // check if it's only one section and one slide
  if (outerPropMaxIndex(data) === 0 && innerPropMaxIndex(data, 0) === 0) {
    return { ...state, atStart: true, atEnd: true };
  }
  // check if we're at very start, and add special `atStart` flag
  if (state.outerIndex === 0 && state.innerIndex === 0) {
    return { ...state, atStart: true, atEnd: false };
  }
  // check if we're at very end, and add special `atEnd` flag
  if (outerPropMaxIndex(data) === state.outerIndex && innerPropMaxIndex(data, state.outerIndex) === state.innerIndex) {
    return { ...state, atStart: false, atEnd: true };
  }

  return { ...state, atStart: false, atEnd: false };
}

function forward(
  state: LessonSlideShowState,
  data: LessonData,
  logEvent: ({ eventName, eventValue }: { eventName: string; eventValue: string }) => void,
): Partial<LessonSlideShowState> {
  if (state.atEnd) {
    logEvent({ eventName: "ideas.activityEnd", eventValue: data.url_slug });
    return state;
  }

  // we have room to advance the inner index by 1 without moving the outer index
  if (state.innerIndex < innerPropMaxIndex(data, state.outerIndex)) {
    return addBoundaryFlags({ outerIndex: state.outerIndex, innerIndex: state.innerIndex + 1 }, data);
  }
  // we have to move the outer index forward 1, and set the inner index to 0
  const outerIndex = state.outerIndex + 1;
  const innerIndex = 0;
  logEvent({
    eventName: `ideas.slideshowViewSection${outerIndex}${data.slides[outerIndex].title}`,
    eventValue: data.url_slug,
  });
  // this shouldn't happen, because state.atEnd should catch it
  // but while developing this tricky thing, let's catch it early
  if (outerIndex > outerPropMaxIndex(data)) {
    throw new Error(
      `Outer index greater than max; old: ${JSON.stringify(state)}, new: ${JSON.stringify({
        outerIndex,
        innerIndex,
      })}`,
    );
  }

  return addBoundaryFlags({ outerIndex, innerIndex }, data);
}

function back(
  state: { outerIndex: number; innerIndex: number; atEnd: boolean; atStart: boolean },
  data: LessonData,
  logEvent: ({ eventName, eventValue }: { eventName: string; eventValue: string }) => void,
) {
  if (state.atStart) return state;
  // we have room to move the inner index back by 1 without moving the outer index
  if (state.innerIndex > 0) {
    return addBoundaryFlags({ outerIndex: state.outerIndex, innerIndex: state.innerIndex - 1 }, data);
  }
  // we need to move the outer index back 1, and set the inner index to max
  const outerIndex = state.outerIndex - 1;
  const innerIndex = innerPropMaxIndex(data, outerIndex);
  logEvent({
    eventName: `ideas.slideshowViewSection${outerIndex}${data.slides[outerIndex].title}`,
    eventValue: data.url_slug,
  });
  // this shouldn't happen, because state.atStart should catch it
  // but while developing this tricky thing, let's catch it early
  if (outerIndex < 0) {
    throw new Error(
      `Outer index less than 0; old: ${JSON.stringify(state)}, new: ${JSON.stringify({
        outerIndex,
        innerIndex,
      })}`,
    );
  }
  return addBoundaryFlags({ outerIndex, innerIndex }, data);
}

function goTo(newState: { outerIndex: number; innerIndex: number }, data: LessonData) {
  const outerIndex = newState.outerIndex;
  const innerIndex = newState.innerIndex;
  return addBoundaryFlags({ outerIndex, innerIndex }, data);
}
type LessonData = Lesson & { slides: Slide[] };
type LessonSlideShowProps = {
  params: {
    iframed?: boolean;
    watched?: boolean;
  };
  shareToClassStory: (classId: string, body: string, image: string) => void;
  classes: { name: string; _id: string }[];
  user: { role: "parent" | "teacher" | "student"; avatarURL: string };
  tab: string;
  lesson: LessonData;
  shareStatus: ShareStatus;
  logEvent: ({ eventName, eventValue }: { eventName: string; eventValue: string }) => void;
};

type LessonSlideShowState = {
  shareBody?: string | undefined;
  atStart: boolean;
  atEnd: boolean;
  firstView: boolean;
  outerIndex: number;
  innerIndex: number;
};
class LessonSlideShow extends React.Component<LessonSlideShowProps, LessonSlideShowState> {
  constructor(props: LessonSlideShowProps) {
    super(props);

    const isShare = this.props.tab === "share";
    const isNumber = /^\d+$/.test(this.props.tab);

    if (isShare) {
      INITIAL_STATE.outerIndex = this.props.lesson.slides.length - 1;
      INITIAL_STATE.innerIndex = 0;
    } else if (
      isNumber &&
      parseInt(this.props.tab) >= 0 &&
      parseInt(this.props.tab) < this.props.lesson.slides.length
    ) {
      INITIAL_STATE.outerIndex = parseInt(this.props.tab);
      INITIAL_STATE.innerIndex = 0;
    } else {
      INITIAL_STATE.outerIndex = 0;
      INITIAL_STATE.innerIndex = 0;
    }

    this.state = Object.assign(addBoundaryFlags(INITIAL_STATE, this.props.lesson));
  }

  componentDidMount() {
    window.addEventListener("keyup", this._handleKeyUp);
  }

  UNSAFE_componentWillReceiveProps(nextProps: LessonSlideShowProps) {
    if (!!this.props.lesson && !!this.props.lesson.slides && this.props.lesson !== nextProps.lesson) {
      this.setState((state) => ({ ...state, ...addBoundaryFlags(INITIAL_STATE, nextProps.lesson) }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this._handleKeyUp);
  }

  render() {
    const { lesson, user } = this.props;
    const { outerIndex, innerIndex } = this.state;
    const currentSection = lesson[OUTER_PROP][outerIndex];
    const currentSlide = currentSection[INNER_PROP][innerIndex];
    const isIframe = Object.keys(this.props.params).indexOf("iframed") > -1;
    const isWatch = Object.keys(this.props.params).indexOf("watch") > -1;

    const share =
      this.props.user && this.props.user.role !== "parent" && this.props.user.role !== "student"
        ? {
            classes: this.props.classes,
            slug: this.props.lesson.slug,
            onShare: this.props.shareToClassStory,
            shareStatus: this.props.shareStatus,
            shareBodyChanged: (e: { target: { value: string } }) => this.setState({ shareBody: e.target.value }),
          }
        : false;

    const crumbs = lesson.slides.map((section, i) => {
      let className = "lesson-ss__crumbs__item";
      className += i === outerIndex ? " is-active" : "";
      const slideCrumbs = this._slideCrumbs(i === outerIndex, currentSection, innerIndex);
      const hasSlideCrumbs = !!slideCrumbs;
      className += hasSlideCrumbs ? " has-multiple-slides" : "";
      return (
        <li key={i} className={className}>
          <button
            aria-current={i === outerIndex}
            onClick={() => this.handleSectionClick(section.title, i, lesson.slug)}
          >
            <div className="lesson-ss__crumbs__item__title">{section.title}</div>
            <div className="lesson-ss__crumbs__item__slides">{slideCrumbs}</div>
          </button>
        </li>
      );
    });

    const isSingleSlide = this.props.lesson.slides.length === 1 || isWatch;
    const isLastSlide =
      this.props.lesson.slides.length - 1 === outerIndex && currentSection.slides.length - 1 === innerIndex;
    const navPrevClassName = [isPrev];
    if (outerIndex === 0 && innerIndex === 0) {
      navPrevClassName.push(isFirst);
    }
    const navNextClassName = [isNext];
    const isDiscussion = currentSection.title === "Discuss";

    const headerStyle = isSingleSlide ? { height: 100 } : {};

    const goForwardText = isLastSlide ? "Finish activity slides" : `Go to the to the next slide in the activity`;
    const goBackText =
      this.state.atStart || this.state.outerIndex > 0
        ? "Go back to activity description"
        : `Go back to the previous slide in the activity`;

    return (
      <LessonSS>
        <LessonSSContainer>
          {!isIframe && (
            <LessonSSClose
              aria-label="This link will close the slide show"
              to={getRelativePath(`/i/${lesson.slug}`)}
              data-test-name="lessonClose"
            >
              <IconClose />
            </LessonSSClose>
          )}
          <LessonSSHeader style={headerStyle}>
            <LessonSSHeaderContainer>
              <LessonSSTitle>{lesson.title}</LessonSSTitle>
              {!isSingleSlide && (
                <LessonSSCrumbs>
                  <ul>{crumbs}</ul>
                </LessonSSCrumbs>
              )}
            </LessonSSHeaderContainer>
          </LessonSSHeader>
          <LessonSSBody>
            <Slide
              key={outerIndex * 100 + innerIndex}
              index={outerIndex * 100 + innerIndex}
              slide={currentSlide}
              firstView={this.state.firstView ?? false}
              lesson={lesson}
              user={user}
              share={share ? Object.assign({}, share, { shareBody: this.props.lesson.share_body }) : false}
              discuss={isDiscussion}
            />
            {!isSingleSlide && (
              <LessonSSNav>
                <button
                  aria-label={goBackText}
                  css={css(navPrevClassName)}
                  onClick={() => this._back()}
                  onKeyDown={(e) => e.key === "Enter" && this._back()}
                >
                  <IconArrowLeft />
                </button>
                <button
                  aria-label={goForwardText}
                  css={css(navNextClassName)}
                  onClick={() => this._forward()}
                  onKeyDown={(e) => e.key === "Enter" && this._forward()}
                >
                  {isLastSlide ? <IconCheck /> : <IconArrowRight />}
                </button>
              </LessonSSNav>
            )}
          </LessonSSBody>
        </LessonSSContainer>
      </LessonSS>
    );
  }

  handleSectionClick = (sectionName: string, sectionIndex: number, lessonSlug: string) => {
    this._goTo(sectionIndex, 0);
    this.props.logEvent({
      eventName: `ideas.slideshowViewSection${sectionIndex}${sectionName}`,
      eventValue: lessonSlug,
    });
  };

  _checkFirst = (newState: Partial<LessonSlideShowState>) => {
    return this.state.firstView ? Object.assign({}, { firstView: false }, newState) : newState;
  };

  _forward = () => {
    this.state.atEnd
      ? this._goToLessonInfo()
      : this.setState((state) => ({
          ...state,
          ...this._checkFirst(forward(this.state, this.props.lesson, this.props.logEvent)),
        }));
  };

  _back = () => {
    this.state.atStart
      ? this._goToLessonInfo()
      : this.setState((state) => ({
          ...state,
          ...this._checkFirst(back(this.state, this.props.lesson, this.props.logEvent)),
        }));
  };

  _goTo = (outerIndex: number, innerIndex: number) => {
    this.setState((state) => ({ ...state, ...this._checkFirst(goTo({ outerIndex, innerIndex }, this.props.lesson)) }));
  };

  _handleKeyUp = (e: { keyCode: number }) => {
    if (e.keyCode === 27) {
      this._goToLessonInfo();
    } else if (e.keyCode === 37) {
      this._back();
    } else if (e.keyCode === 39) {
      this._forward();
    }
  };

  _goToLessonInfo = () => {
    navigate(getRelativePath(`/i/${this.props.lesson.slug}`));
  };

  _slideCrumbs = (active: boolean, currentSection: Slide, innerIndex: number) => {
    if (!active || (currentSection.slides && currentSection.slides.length < 2)) return null;
    const crumbs = currentSection.slides.map((_, i) => (
      <li key={i} className={i === innerIndex ? "is-active" : undefined} />
    ));
    return <ul className="lesson-ss__crumbs__item__list">{crumbs}</ul>;
  };
}

export default LessonSlideShow;
