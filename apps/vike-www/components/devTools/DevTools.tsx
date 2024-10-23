import React from "react";
import { createElement, Fragment, useState, useCallback, useRef, useEffect } from "react";
import Dock from "react-dock";
import NewWindow from "react-new-window";
import { map } from "lodash/fp";
import { Space, OutlinedPill, Pill, Portal, Heading } from "@classdojo/web/nessie";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  CloseIcon,
} from "@classdojo/web/nessie/icons";
import { NessieThemeProvider } from "@classdojo/web/nessie";
import { DevToolsSettings, PANEL_DISPLAY_SIDES } from "./devToolsSettings";
import { EventLogHistorySectionContainer } from "./EventLogHistorySection";
import { FeatureSwitchesSectionContainer } from "./FeatureSwitchesSection";
import * as logClient from "@src/utils/logClient";

type Section = {
  title: string;
  component: () => React.ReactElement;
};

// put the button to open the dev tools on top of main app ui elements
const OPEN_BUTTON_Z_INDEX = 200;
// put the dock on top of the dev tools open button. Need to be careful not to
// hide nessie's popup menus
const DOCK_Z_INDEX = 1000;

/**
 * Defines the dev tools sections that are available when the panel is open
 * `title` will be the text displayed on the section button and `component` is the
 * component used to display the section contents
 */
const DevToolbarSections = {
  EventLogHistory: { title: "Logged Events", component: EventLogHistorySectionContainer },
  FeatureSwitches: { title: "Feature Switches", component: FeatureSwitchesSectionContainer },
};

type DevToolsProps = {
  additionalSections?: Record<string, Section>;
  mobile?: boolean;
};

/**
 * Renders a button to open the dev tools on the bottom right of the app
 * Dev tools are displayed by default in `dev` environment, but can always be
 * toggled using the query param `dev-tools=true` or `dev-tools=false`, even in
 * production environment.
 * Same thing can be done with localStorage, using an entry with `dev-tools=true`
 * or `dev-tools=false`
 */
export const DevTools = (props: DevToolsProps): JSX.Element => {
  // tracks if dev tools should be available or not
  const { isDevToolsEnabled: shouldShowDevTools } = DevToolsSettings.useIsDevToolsEnabled();
  return <NessieThemeProvider>{shouldShowDevTools ? <DevToolsInternal {...props} /> : null}</NessieThemeProvider>;
};

const DevToolsInternal = ({ additionalSections, mobile }: DevToolsProps) => {
  // We have no way of telling if the user closed the new window or just
  // pressed the exit from new window option, since both will end up unloading
  // the new window and calling `closeDevToolbar`. However, if the user selected
  // exit from new window, we don't actually want to close the dev toolbar,
  // we just want to show it docked in the main window again.
  // This ref helps us keep track of the call sequence of the callbacks, so we
  // can do the right thing.
  const isClosingNewWindowRef = useRef(false);

  const incrementDevToolsOpenedMetric = useIncrementDevToolsOpenedMetric();

  // tracks if dev toolbar is open or closed
  const [isOpen, setIsOpen] = useState(false);
  const openDevToolbar = useCallback(() => {
    setIsOpen(true);
    incrementDevToolsOpenedMetric();
  }, [incrementDevToolsOpenedMetric]);
  const closeDevToolbar = useCallback(() => {
    if (isClosingNewWindowRef.current) {
      // user selected exit new window, reset ref so we can close
      // the dev toolbar next time this is called
      isClosingNewWindowRef.current = false;
    } else {
      setIsOpen(false);
    }
  }, []);

  // tracks if dev toolbar should display in a separate window or a side panel
  const { isNewWindow, setIsNewWindow } = DevToolsSettings.useIsNewWindow();
  const openNewWindow = useCallback(() => {
    setIsNewWindow(true);
  }, [setIsNewWindow]);
  const exitNewWindow = useCallback(() => {
    setIsNewWindow(false);
    // set ref value, so we don't close the dev toolbar on the next
    // call to `closeDevToolbar`
    isClosingNewWindowRef.current = true;
  }, [setIsNewWindow]);

  // tracks on which side of the page the dev toolbar panel is displaying
  const { panelDisplaySide, setPanelDisplaySide } = DevToolsSettings.usePanelDisplaySide();

  // The dev tools window loses the connection with the app if the page
  // is reloaded, so we listen for page unload event and close it to
  // prevent confusion with multiple old open dev tools windows
  const [isUnloadingPage, setIsUnloadingPage] = useState(false);
  useWindowUnloadEffect(useCallback(() => setIsUnloadingPage(true), []));

  // TODO: add visual indication that custom values are being used, for example,
  // when a feature switch value is changed in the dev tools
  return (
    <Portal>
      {!isOpen && <OpenDevToolbarButton onClick={openDevToolbar} displaySide={panelDisplaySide} />}
      <DevToolbar
        isOpen={isOpen && !isUnloadingPage}
        closeDevToolbar={closeDevToolbar}
        isNewWindow={isNewWindow}
        openNewWindow={openNewWindow}
        exitNewWindow={exitNewWindow}
        panelDisplaySide={panelDisplaySide}
        setPanelDisplaySide={setPanelDisplaySide}
        additionalSections={additionalSections}
        mobile={mobile}
      />
    </Portal>
  );
};

type OpenDevToolbarButtonProps = {
  onClick: VoidFunction;
  displaySide: string;
};

const OpenDevToolbarButton = ({ onClick, displaySide }: OpenDevToolbarButtonProps) => {
  const positionProps = displaySide === PANEL_DISPLAY_SIDES.Left ? { left: "10px" } : { right: "10px" };
  return (
    <div
      id="dev-tools-open"
      style={{
        position: "fixed",
        bottom: "10px",
        zIndex: OPEN_BUTTON_Z_INDEX,
        padding: "6px",
        backgroundColor: "rgb(215, 42, 43)",
        ...positionProps,
      }}
    >
      {displaySide === PANEL_DISPLAY_SIDES.Left ? (
        <ChevronRightIcon cursor="pointer" onClick={onClick} />
      ) : (
        <ChevronLeftIcon cursor="pointer" onClick={onClick} />
      )}
    </div>
  );
};

type DevToolbarProps = {
  isOpen: boolean;
  closeDevToolbar: VoidFunction;
  isNewWindow: boolean;
  openNewWindow: VoidFunction;
  exitNewWindow: VoidFunction;
  panelDisplaySide: string;
  setPanelDisplaySide: (side: "left" | "right") => void;
  additionalSections?: Record<string, Section>;
  mobile?: boolean;
};

const DevToolbar = ({
  isOpen,
  closeDevToolbar,
  isNewWindow,
  openNewWindow,
  exitNewWindow,
  panelDisplaySide,
  setPanelDisplaySide,
  additionalSections,
  mobile,
}: DevToolbarProps) => {
  const [selectedSection, setSelectedSection] = useState(DevToolbarSections.EventLogHistory);

  // TODO: for now, since we are using a `window.prompt()` to accept custom values for
  // feature switches, we are keeping track of a window ref to use when we open
  // the dev toolbar in a new window, so that the prompt dialog opens on top of
  // the correct window.
  // If we change it to use something else, we probably don't need this anymore.
  const newWindowRef = useRef<Window>(window);
  const setNewWindowRef = useCallback((newWindow: Window) => {
    newWindowRef.current = newWindow;
  }, []);
  const allSections = { ...DevToolbarSections, ...additionalSections };

  return (
    <DevToolbarWrapper
      isNewWindow={isNewWindow}
      isOpen={isOpen}
      closeDevToolbar={closeDevToolbar}
      panelDisplaySide={panelDisplaySide}
      setNewWindowRef={setNewWindowRef}
    >
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "12px",
            paddingLeft: "18px",
            paddingRight: "18px",
            backgroundColor: "dt_taro30",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <Heading> ClassDojo Dev Toolbar</Heading>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "relative" }}>
            {!isNewWindow &&
              (panelDisplaySide === PANEL_DISPLAY_SIDES.Left ? (
                <ArrowRightIcon cursor="pointer" onClick={() => setPanelDisplaySide(PANEL_DISPLAY_SIDES.Right)} />
              ) : (
                <ArrowLeftIcon cursor="pointer" onClick={() => setPanelDisplaySide(PANEL_DISPLAY_SIDES.Left)} />
              ))}
            {isNewWindow ? (
              <FullscreenExitIcon cursor="pointer" onClick={exitNewWindow} size="l" />
            ) : (
              <FullscreenIcon cursor="pointer" onClick={openNewWindow} size="l" />
            )}
            <Space kind="inline" size="xs" />
            <CloseIcon cursor="pointer" onClick={closeDevToolbar} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "18px",
            paddingLeft: "18px",
            paddingRight: "18px",
            marginRight: "18px",
            position: "relative",
          }}
        >
          {map((section: Section) => {
            return (
              <Fragment key={section.title}>
                <div style={{ marginRight: "6px", marginLeft: "6px", marginBottom: "3px", position: "relative" }}>
                  {selectedSection.title === section.title ? (
                    <Pill backgroundColor="capri">
                      <div>{section.title}</div>
                    </Pill>
                  ) : (
                    <OutlinedPill color="daylight">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedSection(section)}
                        onKeyDown={() => null}
                        role="button"
                        tabIndex={-2}
                      >
                        {section.title}
                      </div>
                    </OutlinedPill>
                  )}
                </div>
              </Fragment>
            );
          }, allSections)}
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            padding: "12px",
            paddingLeft: "18px",
            paddingRight: "18px",
            position: "relative",
          }}
        >
          {createElement(selectedSection.component, {
            // pass down the window object to use to the section component as props
            windowObject: isNewWindow ? newWindowRef.current : window,
            mobile,
          })}
        </div>
      </div>
    </DevToolbarWrapper>
  );
};

type DevToolbarWrapperProps = {
  isNewWindow: boolean;
  isOpen: boolean;
  closeDevToolbar: VoidFunction;
  panelDisplaySide: string;
  setNewWindowRef: (window: Window) => void;
};

const DevToolbarWrapper = ({
  isNewWindow,
  isOpen,
  closeDevToolbar,
  panelDisplaySide,
  setNewWindowRef,
  children,
}: React.PropsWithChildren<DevToolbarWrapperProps>) => {
  // only render panel contents if the Dock is visible to avoid unnecessary rendering
  // when the panel is not being shown
  if (!document) {
    return null;
  }
  return isNewWindow && isOpen ? (
    <NewWindow
      onOpen={(newWindow: Window) => setNewWindowRef(newWindow)}
      onUnload={closeDevToolbar}
      title="ClassDojo Dev Toolbar"
    >
      {children}
    </NewWindow>
  ) : (
    <Dock
      position={panelDisplaySide === PANEL_DISPLAY_SIDES.Left ? "left" : "right"}
      fluid
      isVisible={isOpen}
      dimMode="none"
      zIndex={DOCK_Z_INDEX}
    >
      {children}
    </Dock>
  );
};

// helper hook for calling an event handler when the page unloads
const useWindowUnloadEffect = (handler: VoidFunction) => {
  const cb = useRef(handler);

  useEffect(() => {
    const handler = () => cb.current();
    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [cb]);
};

//
// Dev Toolbar metrics
//
const DEV_TOOLS_OPENED_METRIC = "web.devtools.opened";
const useIncrementDevToolsOpenedMetric = () => {
  const [hasSentMetric, setHasSentMetric] = useState(false);

  const sendMetric = useCallback(() => {
    if (!hasSentMetric) {
      setHasSentMetric(true);
      logClient.sendMetrics([
        {
          type: "increment",
          value: 1,
          metricName: DEV_TOOLS_OPENED_METRIC,
        },
      ]);
    }
  }, [hasSentMetric]);

  return sendMetric;
};
