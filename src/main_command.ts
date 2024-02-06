import "normalize.css";
import { setupDeviceOrientation } from "./sensor/script";
import { setupSplash } from "./splash/script";
import { setupDebug } from "./debug/script";
import { setupCommand } from "./command/script";
import { getJSON } from "./util";
import "./style.css";
import "./debug/style.css";
import "./splash/style.css";
import "./command/style.css";

document.addEventListener("DOMContentLoaded", async function () {
  const hostToken = await getJSON("/agent-token.json");

  const onStart = () => {
    debug.destroy();
    splash.destroy();
    setupCommand(appEl, ["tb-screen"], "swipe", hostToken.token);
  };

  const appEl = document.querySelector<HTMLElement>("#app")!;
  const splash = setupSplash(
    appEl,
    "Connect to TELEBYTE",
    ["tb-screen"],
    "swipe",
    onStart
  );

  const debug = setupDebug(appEl, ["Command"]);

  setupDeviceOrientation((state) => {
    splash.update(state);
    debug.update({ deviceOrientationState: state });
  });
});
