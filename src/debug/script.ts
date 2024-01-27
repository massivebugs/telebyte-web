import { DeviceOrientationState } from "../sensor/script";

export type DebugUpdateInfo = {
  deviceOrientationState?: DeviceOrientationState;
};

export const setupDebug = (parentEl: HTMLElement, info: string[]) => {
  let af: number | null = null;
  const state = {
    deviceOrientation: "",
  };

  const debugEl = document.createElement("div");
  debugEl.classList.add("tb-debug");
  parentEl.append(debugEl);

  const render = () => {
    debugEl.textContent = [
      new Date().toISOString(),
      ...info,
      ...Object.values(state),
    ].join("\n");

    af = requestAnimationFrame(render);
  };

  af = requestAnimationFrame(render);

  const update = (info: DebugUpdateInfo) => {
    if ("deviceOrientationState" in info) {
      state.deviceOrientation = `
      // --- DeviceOrientation -- //
      alpha: ${info.deviceOrientationState!.alpha.toFixed(2)} 
      beta: ${info.deviceOrientationState!.beta.toFixed(2)} 
      gamma: ${info.deviceOrientationState!.gamma.toFixed(2)}`;
    }
  };

  const destroy = () => {
    if (af) {
      cancelAnimationFrame(af);
    }
    debugEl.remove();
  };

  return {
    update,
    destroy,
  };
};
