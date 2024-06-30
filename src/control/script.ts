import { runTransition } from "../util";
import { MemberType, setupP2PWebRTC } from "../webrtc/script";
import { setupRemoteVideo } from "../remote_video/script";
import { setupLoadingSpinner } from "../loading-spinner/script";
import "../remote_video/style.css";

export const setupControl = (
  parentEl: HTMLElement,
  classNames: string[],
  transitionIn: string,
  skywayToken: string
) => {
  const commandEl = document.createElement("div");
  commandEl.classList.add("tb-control", ...classNames);
  const remoteVideo = setupRemoteVideo(commandEl);
  parentEl.append(commandEl);

  // TODO: a return type for components?
  let loadingSpinner: any | null = null;

  runTransition(commandEl, "in", transitionIn, () => {});

  // Webrtc process
  setupP2PWebRTC(
    MemberType.Host,
    remoteVideo.el,
    skywayToken,
    () => {
      loadingSpinner = setupLoadingSpinner(commandEl, "#fff", 50);
    },
    () => {
      loadingSpinner?.destroy();
    }
  );

  const destroy = () => {
    commandEl.remove();
  };

  return {
    destroy,
  };
};
