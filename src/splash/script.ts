import { DeviceOrientationState } from "../sensor/script";
import { setupFlowingLines } from "../flowing-lines/script";
import { setupOrientationBox } from "../orientation-box/script";
import { setupStartButton } from "../start_button/script";
import "../flowing-lines/style.css";
import "../orientation-box/style.css";
import "../start_button/style.css";
import { runTransition } from "../util";

export const setupSplash = (
  parentEl: HTMLElement,
  buttonText: string,
  classNames: string[],
  transitionOut: string,
  onClickStart: () => void
) => {
  const splashEl = document.createElement("div");
  splashEl.classList.add("tb-splash", ...classNames);
  parentEl.append(splashEl);

  const flowingLines = setupFlowingLines(splashEl);
  const orientationBox = setupOrientationBox(splashEl);
  const startButton = setupStartButton(splashEl, buttonText, onClickStart);

  const update = (s: DeviceOrientationState) => {
    flowingLines.update(s);
    orientationBox.update(s);
  };

  const destroy = () => {
    runTransition(splashEl, "out", transitionOut, () => {
      flowingLines.destroy();
      orientationBox.destroy();
      startButton.destroy();
      splashEl.remove();
    });
  };

  return {
    update,
    destroy,
  };
};
