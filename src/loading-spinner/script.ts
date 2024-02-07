export const setupLoadingSpinner = (
  parentEl: HTMLElement,
  cssColor: string = "#fff",
  sizePx: number = 24
) => {
  const el = document.createElement("div");

  const halfSize = sizePx / 2;
  const marginSize = halfSize / 4;
  const pulseSize = marginSize * 0.666;
  const boxSize = halfSize - marginSize;
  const boxPulseSize = boxSize + pulseSize;

  const adjustPosWhenSmall = marginSize / 2;
  const adjustPosWhenBig = marginSize / 6;

  el.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${sizePx}" height="${sizePx}" viewBox="0 0 ${sizePx} ${sizePx}">
    <style>
      .spinner_topleft {
        fill: ${cssColor};
        animation: spinner_anim_pulse 1.2s linear infinite, spinner_topleft_adjust 1.2s linear infinite
      }

      .spinner_topright {
        fill: ${cssColor};
        animation: spinner_anim_pulse 1.2s linear infinite, spinner_topright_adjust 1.2s linear infinite;
        animation-delay: .15s
      }

      .spinner_bottomright {
        fill: ${cssColor};
        animation: spinner_anim_pulse 1.2s linear infinite, spinner_bottomright_adjust 1.2s linear infinite;
        animation-delay: .3s
      }

      .spinner_bottomleft {
        fill: ${cssColor};
        animation: spinner_anim_pulse 1.2s linear infinite, spinner_bottomleft_adjust 1.2s linear infinite;
        animation-delay: .45s
      }

      @keyframes spinner_anim_pulse {
        0%,
        50% {
          width: ${boxSize}px;
          height: ${boxSize}px
        }

        10% {
          width: ${boxPulseSize}px;
          height: ${boxPulseSize}px
        }
      }

      @keyframes spinner_topleft_adjust {
        0%,
        50% {
          x: ${adjustPosWhenSmall}px;
          y: ${adjustPosWhenSmall}px
        }

        10% {
          x: ${adjustPosWhenBig}px;
          y: ${adjustPosWhenBig}px
        }
      }

      @keyframes spinner_topright_adjust {
        0%,
        50% {
          x: ${halfSize + adjustPosWhenSmall}px;
          y: ${adjustPosWhenSmall}px
        }

        10% {
          x: ${halfSize + adjustPosWhenBig}px;
          y: ${adjustPosWhenBig}px
        }
      }

      @keyframes spinner_bottomright_adjust {
        0%,
        50% {
          x: ${halfSize + adjustPosWhenSmall}px;
          y: ${halfSize + adjustPosWhenSmall}px
        }

        10% {
          x: ${halfSize + adjustPosWhenBig}px;
          y: ${halfSize + adjustPosWhenBig}px
        }
      }

      @keyframes spinner_bottomleft_adjust {
        0%,
        50% {
          x: ${adjustPosWhenSmall}px;
          y: ${halfSize + adjustPosWhenSmall}px
        }

        10% {
          x: ${adjustPosWhenBig}px;
          y: ${halfSize + adjustPosWhenBig}px
        }
      }
    </style>
    <rect 
      class="spinner_topleft" 
      x="${adjustPosWhenSmall}" 
      y="${adjustPosWhenSmall}" 
      rx="1" 
      width="${boxSize}" 
      height="${boxSize}" 
    />
    <rect 
      class="spinner_topright" 
      x="${halfSize + adjustPosWhenSmall}" 
      y="${adjustPosWhenSmall}" 
      rx="1" 
      width="${boxSize}" 
      height="${boxSize}" 
    />
    <rect 
      class="spinner_bottomright" 
      x="${halfSize + adjustPosWhenSmall}" 
      y="${halfSize + adjustPosWhenSmall}" 
      rx="1"
      width="${boxSize}" 
      height="${boxSize}" 
    />
    <rect 
      class="spinner_bottomleft" 
      x="${adjustPosWhenSmall}" 
      y="${halfSize + adjustPosWhenSmall}" 
      rx="1" 
      width="${boxSize}" 
      height="${boxSize}" 
    />
  </svg>
`;
  el.classList.add("tb-loading-spinner");
  parentEl.append(el);

  const destroy = () => {
    el.remove();
  };

  return {
    destroy,
  };
};
