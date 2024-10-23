import * as logClient from "@src/utils/logClient";
import { ProductEvent } from "@classdojo/log-client/lib/client/client";
import { uniqueId } from "lodash/fp";

export type Event = {
  _id: string;
  timestamp: Date;
  details: ProductEvent;
};

type EventsChangeHandler = (events: Event[]) => void;

// list of logged events
let events: Event[] = [];

// list of event handlers registered to get called when a new event is logged
let onEventsChangeHandlers: EventsChangeHandler[] = [];

/**
 * Registers an event handler function to be called whenever a new event is logged in the app.
 *
 * @param {Function} handler - function of type `(eventsList) => void`
 *                             that gets called whenever an event is logged
 * @returns {Function} - function that will unregister the handler,
 *                       in case you don't want it to be called anymore.
 */
export function addOnEventsChangeHandler(handler: EventsChangeHandler) {
  onEventsChangeHandlers = [...onEventsChangeHandlers, handler];

  // call each registered event handler immediately so they get
  // the current list of logged events
  notifyEventsChange();

  return () => {
    onEventsChangeHandlers = onEventsChangeHandlers.filter((h) => h !== handler);
  };
}

function notifyEventsChange() {
  onEventsChangeHandlers.forEach((handler) => handler(events));
}

/**
 * Clears the list of logged events
 */
export function flush() {
  events = [];

  // call each registered event handler to notify of events list changes
  notifyEventsChange();
}

// Starts listening for app logged events
// this MUST be called after logClient.init()
export function start() {
  logClient.setOnEvent((event) => {
    // add a new event to the logged events list
    events.push({
      _id: uniqueId("event"),
      timestamp: new Date(),
      details: event,
    });

    // call each registered event handler to notify of events list changes
    notifyEventsChange();
  });

  const eventsOccurredInOrder = (eventNames: string[]) => {
    let names = events.map((e) => e.details.eventName);
    for (const e of eventNames) {
      const idx = names.indexOf(e);
      if (idx === -1) return false;
      names = names.slice(idx + 1);
    }
    return true;
  };

  const eventNames = () => {
    console.group("event names:");
    events.map((e) => console.log(e.details.eventName));
    console.groupEnd();
    return null;
  };

  const getEventNames = () => {
    return events.map((e) => e.details.eventName);
  };

  // setup timer to prune event list every hour so it doesn't grow forever
  setInterval(() => {
    if (events.length > 100) {
      // keep last 100 entries only
      events = events.slice(-100);
      notifyEventsChange();
    }
  }, 60 * 60 * 1000);

  global.logs = {
    flush,
    eventsOccurredInOrder,
    eventNames,
    getEventNames,
  };
}
