import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface VideoStore {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  socket: Socket | null;
  roomId: string | null;
  participants: string[];
  setLocalStream: (stream: MediaStream) => void;
  setRemoteStream: (stream: MediaStream) => void;
  setSocket: (socket: Socket) => void;
  setRoomId: (id: string) => void;
  setParticipants: (participants: string[]) => void;
}

export const useVideoStore = create<VideoStore>((set) => ({
  localStream: null,
  remoteStream: null,
  socket: null,
  roomId: null,
  participants: [],
  setLocalStream: (stream) => set({ localStream: stream }),
  setRemoteStream: (stream) => set({ remoteStream: stream }),
  setSocket: (socket) => set({ socket }),
  setRoomId: (id) => set({ roomId: id }),
  setParticipants: (participants) => set({ participants }),
}));