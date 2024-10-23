// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global RadiantMP */
declare const RadiantMP: any;
import React, { Component } from "react";
import waitForGlobal from "@src/utils/waitForGlobal";
import { logEvent as le } from "@src/utils/logClient";

let LICENSE = "Kl8leWM9MDB6ZXFlMnllaT9yb201ZGFzaXMzMGRiMEElXyo=";
if (process.env.GATSBY_ENV === "development") {
  LICENSE = "Kl8leWM9MDB6ZXFlMjd2MDc/cm9tNWRhc2lzMzBkYjBBJV8q";
}

class HLSVideo extends Component<any, any> {
  rmp: typeof RadiantMP;

  componentDidMount() {
    this._forceUpdate();
  }

  componentDidUpdate({ url }: { url: string }) {
    if (url !== this.props.url) {
      this._forceUpdate();
    }
  }

  componentWillUnmount() {
    if (this.rmp) {
      this.rmp.destroy();
    }
  }

  render() {
    return <div id={`rmpPlayer${this.props.index}`} style={this.props.style} />;
  }

  _forceUpdate() {
    if (this.rmp) {
      this.rmp.destroy();
    }

    waitForGlobal("RadiantMP").then(() => {
      const debug = window.location.host !== "ideas.classdojo.com";
      const ideas2 = window.location.host === "ideas2.classdojo.com";

      let url = this.props.url;

      if (ideas2) {
        url = url.replace("ideas-video", "ideas-video2");
      }

      const browserIsIE = false; // TODO needed?
      const idName = `rmpPlayer${this.props.index}`;

      const rmp = new RadiantMP(idName);
      const settings = {
        licenseKey: LICENSE,
        contentMetadata: { title: this.props.title },
        src: {
          hls: url,
        },
        delayToFade: 3000,
        width: 950,
        height: 534,
        skin: "s2",
        skinTintColor: "3E425D",
        poster: this.props.poster,
        autoplay: this.props.autoplay,
        debug,
        crossorigin: "use-credentials",
        pathToRmpFiles: "https://static.classdojo.com/radiant-media-player/",
        flashFirst: browserIsIE,
        flashHlsStartFromLevel: 0.5,
        hlsJSStartLevel: -1,
        ccFiles: undefined,
      };

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      if (this.props.captions && this.props.captions.length > 0 && !isIOS) {
        settings.ccFiles = this.props.captions;
      }

      const rmpContainer = document.getElementById(idName);

      rmpContainer?.addEventListener("play", () => {
        // we can call API methods now and only now
        rmp.setVolume(0.5);
        le({
          eventName: "ideas.lesson.videoPlay",
          eventValue: window.location.href,
        });
      });

      rmpContainer?.addEventListener("ended", () => {
        le({
          eventName: "ideas.lesson.videoEnded",
          eventValue: window.location.href,
        });
      });

      rmp.init(settings);

      (window as any).rmp = rmp;
      this.rmp = rmp;

      if (this.props.onPlayerInit) {
        this.props.onPlayerInit(rmp);
      }
    });
  }
}

export default HLSVideo;
