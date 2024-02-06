export const setupRemoteVideo = (parentEl: HTMLElement) => {
  const videoEl = document.createElement("video");
  videoEl.classList.add("tb-video");
  videoEl.autoplay = true;
  parentEl.append(videoEl);

  const destroy = () => {
    videoEl.remove();
  };

  return {
    el: videoEl,
    destroy,
  };
};
