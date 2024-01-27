import { Quaternion } from "quaternion";
import { DeviceOrientationState } from "../sensor/script";

export const setupOrientationBox = (parentEl: HTMLElement) => {
  const boxEl = document.createElement("div");
  boxEl.classList.add("tb-orientation-box");
  parentEl.append(boxEl);

  const state = {
    boxTransform: "",
  };

  const rad = Math.PI / 180;
  const update = (s: DeviceOrientationState) => {
    // @ts-ignore
    const q = Quaternion.fromEulerLogical(
      s.alpha * rad,
      s.beta * rad,
      -s.gamma * rad,
      "ZXY"
    );

    state.boxTransform = q.toCSSTransform() + `rotateY(-${s.initial.beta}deg) `;

    return state;
  };

  let rotateZ = 45;
  let af: number | null = null;
  const render = () => {
    if (rotateZ == 360) {
      rotateZ = 0;
    }
    rotateZ++;

    boxEl.style.transform = state.boxTransform + `rotateZ(-${rotateZ}deg)`;
    af = requestAnimationFrame(render);
  };

  af = requestAnimationFrame(render);

  const destroy = () => {
    if (af != null) {
      cancelAnimationFrame(af);
    }
    boxEl.remove();
  };

  return {
    update,
    destroy,
  };
};
