// ##### Transitions #####
export const runTransition = (
  el: HTMLElement,
  direction: "in" | "out",
  name: string,
  onEnd: () => void
) => {
  const classNameInit = `tb-${name}-${direction}-init`;
  const className = `tb-${name}-${direction}`;

  const callback = () => {
    el.removeEventListener("transitionend", callback);
    el.classList.remove(classNameInit, className);
    onEnd();
  };

  requestAnimationFrame(() => {
    el.classList.add(classNameInit);
    el.dataset._tb_tr = "1";
    requestAnimationFrame(() => {
      el.classList.add(className);
      el.addEventListener("transitionend", (e) => {
        const target = e.target as HTMLElement;
        if (target.dataset._tb_tr == "1") {
          target.dataset._tb_tr == undefined;
          callback();
        }
      });
    });
  });
};
