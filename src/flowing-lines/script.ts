import { DeviceOrientationState } from "../sensor/script";

export const setupFlowingLines = (
  parentEl: HTMLElement,
  lineWidth = 200,
  lineHeight: number = 50
) => {
  let speed = 1;
  const createLine = (
    parentEl: HTMLElement,
    x: number,
    y: number,
    lineWidth: number,
    lineHeight: number
  ) => {
    const lineEl = document.createElement("div");
    lineEl.classList.add("tb-flowing-line");
    lineEl.style.width = lineWidth + "px";
    lineEl.style.height = lineHeight + "px";
    lineEl.style.transform = `translate(${x}px, ${y}px) rotate(-45deg)`;
    parentEl.append(lineEl);

    const render = () => {
      if (x <= -lineWidth) {
        x =
          lineWidth *
          Math.trunc((parentEl.offsetWidth + lineWidth) / lineWidth);
      } else {
        x -= speed;
      }

      lineEl.style.transform = `translate(${x}px, ${y}px) rotate(-45deg)`;
      lineEl.dataset._af = requestAnimationFrame(render).toString();
    };

    lineEl.dataset._af = requestAnimationFrame(render).toString();

    return lineEl;
  };
  const lineEls: HTMLElement[] = [];
  for (let y = 0; y <= parentEl.offsetHeight + lineWidth; y += lineWidth) {
    for (let x = 0; x <= parentEl.offsetWidth + lineWidth; x += lineWidth) {
      lineEls.push(createLine(parentEl, x, y, lineWidth, lineHeight));
    }
  }

  const update = (s: DeviceOrientationState) => {
    if (s.gamma < -20) {
      speed = 2;
    } else if (s.gamma > 20) {
      speed = 0.3;
    } else {
      speed = 1;
    }
  };

  const destroy = () => {
    lineEls.forEach((el) => {
      if (el.dataset._af != undefined) {
        cancelAnimationFrame(parseInt(el.dataset._af));
        el.remove();
      }
    });
  };

  return {
    update,
    destroy,
  };
};
