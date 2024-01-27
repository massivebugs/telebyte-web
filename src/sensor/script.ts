export interface DeviceOrientationState {
  alpha: number;
  beta: number;
  gamma: number;
  initial: {
    alpha: number;
    beta: number;
    gamma: number;
  };
}

export const setupDeviceOrientation = (
  onDeviceOrientation: (state: DeviceOrientationState) => void
) => {
  let initialized = false;
  const state: DeviceOrientationState = {
    alpha: 0,
    beta: 0,
    gamma: 0,
    initial: <DeviceOrientationState>{
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  };

  const updateState = (ev: DeviceOrientationEvent) => {
    if (!initialized) {
      state.initial.alpha = ev.alpha ?? 0;
      state.initial.beta = ev.beta ?? 0;
      state.initial.gamma = ev.gamma ?? 0;
      initialized = true;
    }
    state.alpha = ev.alpha ?? 0;
    state.beta = ev.beta ?? 0;
    state.gamma = ev.gamma ?? 0;

    onDeviceOrientation(state);
  };

  window.addEventListener("deviceorientation", updateState, true);

  const destroy = () => {
    window.removeEventListener("deviceorientation", updateState);
  };

  return {
    destroy,
  };
};
