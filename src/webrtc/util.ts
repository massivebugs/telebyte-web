import { SkyWayStreamFactory } from "@skyway-sdk/room";

export const getLocalStreams = async () => {
  const { audio, video } =
    await SkyWayStreamFactory.createMicrophoneAudioAndCameraStream({
      video: {
        width: 1920,
        height: 1080,
      },
    });

  return { audio, video };
};
