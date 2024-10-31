import { useEffect, useCallback } from 'react';
import { useVideoStore } from '@/store/useVideoStore';
import { WebRTCService } from '@/services/webrtc';
import { SocketService } from '@/services/socket';

export function useVideoCall() {
  const {
    setLocalStream,
    setRemoteStream,
    setSocket,
    setRoomId,
    setParticipants,
    localStream,
    socket,
    roomId,
  } = useVideoStore();

  const webRTCService = new WebRTCService();
  const socketService = new SocketService();

  const initializeMedia = useCallback(async () => {
    const stream = await webRTCService.getMediaStream();
    setLocalStream(stream);
  }, []);

  const createRoom = useCallback(async () => {
    if (!localStream) await initializeMedia();
    
    const newSocket = socketService.connect();
    setSocket(newSocket);

    socketService.setupRoomCreation(
      (id: string) => setRoomId(id),
      (userId: string) => {
        setParticipants((prev) => [...prev, userId]);
        webRTCService.initializePeer(true, newSocket, setRemoteStream, id);
      }
    );
  }, [localStream]);

  const joinRoom = useCallback(async (id: string) => {
    if (!localStream) await initializeMedia();
    
    const newSocket = socketService.connect();
    setSocket(newSocket);
    setRoomId(id);

    socketService.setupRoomJoining(id, (participants: string[]) => {
      setParticipants(participants);
      webRTCService.initializePeer(false, newSocket, setRemoteStream, id);
    });
  }, [localStream]);

  useEffect(() => {
    return () => {
      webRTCService.cleanup();
    };
  }, []);

  return {
    createRoom,
    joinRoom,
  };
}