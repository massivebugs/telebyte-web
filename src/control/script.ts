import "../flowing-lines/style.css";
import { runTransition } from "../util";

export const setupControl = (
  parentEl: HTMLElement,
  classNames: string[],
  transitionIn: string
) => {
  const controlEl = document.createElement("div");
  controlEl.classList.add("tb-command", ...classNames);
  controlEl.textContent = "asfdasfdsafasfdasfasfsadsaf";
  parentEl.append(controlEl);

  runTransition(controlEl, "in", transitionIn, () => {});

  const destroy = () => {
    controlEl.remove();
  };

  return {
    destroy,
  };
};
