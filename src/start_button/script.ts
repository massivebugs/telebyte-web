export const setupStartButton = (
  parentEl: HTMLElement,
  text: string,
  onClick: () => void
) => {
  const buttonEl = document.createElement("button");
  buttonEl.textContent = text;
  buttonEl.classList.add("tb-start-btn");
  parentEl.append(buttonEl);
  const callback = () => {
    buttonEl.removeEventListener("click", callback);
    setTimeout(onClick, 400);
  };

  buttonEl.addEventListener("click", callback);

  const destroy = () => {
    buttonEl.remove();
  };

  return {
    destroy,
  };
};
