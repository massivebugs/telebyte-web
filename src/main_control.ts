import "normalize.css";
import { setupDeviceOrientation } from "./sensor/script";
import { setupSplash } from "./splash/script";
import { setupDebug } from "./debug/script";
import { setupControl } from "./control/script";
import "./style.css";
import "./debug/style.css";
import "./splash/style.css";
import "./control/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const onStart = () => {
    debug.destroy();
    splash.destroy();
    setupControl(appEl, ["tb-screen"], "swipe");
  };

  const appEl = document.querySelector<HTMLElement>("#app")!;
  const splash = setupSplash(
    appEl,
    "Boot up TELEBYTE",
    ["tb-screen"],
    "swipe",
    onStart
  );

  const debug = setupDebug(appEl, ["Control"]);

  setupDeviceOrientation((state) => {
    splash.update(state);
    debug.update({ deviceOrientationState: state });
  });
});
