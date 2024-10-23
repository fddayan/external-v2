import React from "react";
import { useState, useEffect } from "react";
import { reverse } from "lodash/fp";
import moment from "moment";
import { BodyText, Caption, Subheading, Text } from "@classdojo/web/nessie";
import { XCircleIcon, ChevronDownIcon, ChevronUpIcon, HelpIcon } from "@classdojo/web/nessie/icons";
import { addOnEventsChangeHandler, Event, flush } from "./eventRecorder";

import { RAW_cssValue } from "@classdojo/web/nessie/stylingLib";

const EventLogHistorySectionContainer = (): JSX.Element => {
  const [eventsLog, setEventsLog] = useState<Event[]>([]);

  // register on mount to update the events list whenever the app sends a new event
  useEffect(() => {
    return addOnEventsChangeHandler((events) => setEventsLog(reverse(events)));
  }, []);

  return <EventLogHistorySection eventsLog={eventsLog} clearEvents={flush} />;
};

type EventLogHistorySectionProps = {
  eventsLog: Event[];
  clearEvents: VoidFunction;
};

const EventLogHistorySection = ({ eventsLog, clearEvents }: EventLogHistorySectionProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: RAW_cssValue("12px"),
          position: "relative",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <Subheading>Logged Events</Subheading>
        </div>
        <div style={{ position: "relative" }}>
          <XCircleIcon cursor="pointer" onClick={clearEvents} />
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        {eventsLog.map((event: Event) => {
          // highlight events logged in the last 5 seconds before this rendering cycle,
          // this will only update when the list gets re-rendered, so events will stay highlighted
          // for longer than 5 seconds, but that should be good enough for now
          const isRecentEvent = new Date().getTime() - event.timestamp.getTime() < 5000;
          return <EventLogHistoryItem key={event._id} event={event} isRecentEvent={isRecentEvent} />;
        })}
      </div>
      <div
        style={{
          marginTop: RAW_cssValue("18px"),
          padding: RAW_cssValue("6px"),
          boxShadow: RAW_cssValue("rgb(45 64 150 / 6%) 0px 6px 0px"),
          border: "normal",
          display: "flex",
          flexDirection: "row",
          color: RAW_cssValue("rgb(170, 176, 216)"),
          position: "relative",
        }}
      >
        <HelpIcon />
        <div style={{ marginLeft: RAW_cssValue("6px"), position: "relative" }}>
          <Text>
            Toolkit runs inside an iframe, therefore we don't have access to logged events. If you need to see Toolkit
            events, open the network tab of your developer toolbar.
          </Text>
        </div>
      </div>
    </div>
  );
};

type EventLogHistoryItemProps = {
  event: Event;
  isRecentEvent?: boolean;
};

const EventLogHistoryItem = ({ event, isRecentEvent }: EventLogHistoryItemProps) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  return (
    <div
      style={{
        paddingTop: RAW_cssValue("12px"),
        paddingBottom: RAW_cssValue("12px"),
        borderBottom: "1px solid",
        borderColor: RAW_cssValue(isRecentEvent ? "rgb(88, 188, 0)" : "rgb(211, 215, 236)"),
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flexDirection: "row", position: "relative" }}>
        <div
          onKeyDown={() => null}
          onClick={() => setIsShowingDetails((value) => !value)}
          style={{ flex: 1, cursor: "pointer", position: "relative" }}
          role="button"
          tabIndex={-1}
        >
          <Caption color="basalt">{moment(event.timestamp).from(moment.now())}</Caption>
          <BodyText>{event.details.eventName}</BodyText>
          {event.details.eventValue ? (
            <div style={{ display: "flex", flexDirection: "row", position: "relative" }}>
              <div style={{ marginRight: RAW_cssValue("6px"), position: "relative" }}>
                <Caption color="basalt">value:</Caption>
              </div>
              <div style={{ position: "relative" }}>
                <Caption color="capri">{event.details.eventValue}</Caption>
              </div>
            </div>
          ) : null}
        </div>
        <div style={{ marginLeft: RAW_cssValue(RAW_cssValue("12px")), position: "relative" }}>
          <div style={{ marginLeft: RAW_cssValue("12px"), position: "relative" }}>
            {isShowingDetails ? <ChevronUpIcon size="s" /> : <ChevronDownIcon size="s" />}
          </div>
        </div>
      </div>
      {isShowingDetails ? (
        <div
          style={{
            marginTop: RAW_cssValue("12px"),
            paddingLeft: RAW_cssValue("12px"),
            paddingRight: RAW_cssValue("12px"),
            backgroundColor: RAW_cssValue("rgb(211, 215, 236)"),
            border: "normal",
            borderRadius: RAW_cssValue("10px"),
            fontSize: RAW_cssValue("12px"),
            position: "relative",
          }}
        >
          <pre>{JSON.stringify(event.details, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};

export { EventLogHistorySectionContainer };
