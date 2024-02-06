import "normalize.css";
import { setupDeviceOrientation } from "./sensor/script";
import { setupSplash } from "./splash/script";
import { setupDebug } from "./debug/script";
import { setupControl } from "./control/script";
import { getJSON } from "./util";
import "./style.css";
import "./debug/style.css";
import "./splash/style.css";
import "./control/style.css";

document.addEventListener("DOMContentLoaded", async function () {
  const agentToken = await getJSON("/host-token.json");

  const onStart = () => {
    debug.destroy();
    splash.destroy();
    setupControl(appEl, ["tb-screen"], "swipe", agentToken.token);
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
