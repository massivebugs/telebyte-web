import "../flowing-lines/style.css";
import { runTransition } from "../util";

export const setupCommand = (
  parentEl: HTMLElement,
  classNames: string[],
  transitionIn: string
) => {
  const commandEl = document.createElement("div");
  commandEl.classList.add("tb-command", ...classNames);

  const videoEl = document.createElement("video");
  videoEl.classList.add("tb-video");
  videoEl.autoplay = true;
  commandEl.append(videoEl);

  parentEl.append(commandEl);

  runTransition(commandEl, "in", transitionIn, () => {});

  const destroy = () => {
    commandEl.remove();
  };

  return {
    destroy,
  };
};
