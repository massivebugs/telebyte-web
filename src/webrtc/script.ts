import {
  P2PRoom,
  RemoteAudioStream,
  RemoteVideoStream,
  SkyWayContext,
  SkyWayRoom,
} from "@skyway-sdk/room";
import { getLocalStreams } from "./util";

export const MemberType = {
  Host: "host",
  Agent: "agent",
};

export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export const setupP2PWebRTC = async (
  memberType: MemberType,
  remoteVideoEl: HTMLVideoElement,
  token: string
) => {
  const streams = await getLocalStreams();

  const context = await SkyWayContext.Create(token);

  let room: P2PRoom;
  if (memberType === MemberType.Host) {
    room = await SkyWayRoom.FindOrCreate(context, {
      type: "p2p",
      name: "default",
    });
  } else {
    room = await SkyWayRoom.Find(
      context,
      {
        name: "default",
      },
      "p2p"
    );
  }

  const me = await room.join({ name: memberType });
  const audioPub = await me.publish(streams.audio);
  const videoPub = await me.publish(streams.video);

  if (memberType === MemberType.Host) {
    const checkForAgent = async () => {
      const remoteMember = room.members.find(
        (member) => member.name === MemberType.Agent
      );

      if (remoteMember) {
        await remoteMember.subscribe(audioPub.id);
        await remoteMember.subscribe(videoPub.id);
        remoteMember.publications.forEach(async (publication) => {
          if (publication.publisher.id === me.id) return;

          const { stream } = await me.subscribe<RemoteVideoStream>(
            publication.id
          );

          stream.attach(remoteVideoEl);
        });
      }
    };

    room.onMemberJoined.add(async () => {
      checkForAgent();
    });

    checkForAgent();
  } else {
    me.onPublicationSubscribed.add(({ stream }) => {
      if (stream instanceof RemoteVideoStream) {
        stream.attach(remoteVideoEl);
      } else if (stream instanceof RemoteAudioStream) {
        stream.attach(remoteVideoEl);
      }
    });
  }
};
