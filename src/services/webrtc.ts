import SimplePeer from 'simple-peer';
import { Socket } from 'socket.io-client';

export class WebRTCService {
  private peer: SimplePeer.Instance | null = null;
  private stream: MediaStream | null = null;
  private socket: Socket | null = null;

  async getMediaStream(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.stream = stream;
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  initializePeer(
    isInitiator: boolean,
    socket: Socket,
    onStream: (stream: MediaStream) => void,
    roomId: string
  ): void {
    if (!this.stream) throw new Error('Media stream not initialized');

    this.socket = socket;
    this.peer = new SimplePeer({
      initiator: isInitiator,
      stream: this.stream,
      trickle: false,
    });

    this.peer.on('signal', (data) => {
      socket.emit('signal', { signal: data, roomId });
    });

    this.peer.on('stream', (remoteStream) => {
      onStream(remoteStream);
    });

    socket.on('signal', (data: SimplePeer.SignalData) => {
      this.peer?.signal(data);
    });
  }

  cleanup(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.peer?.destroy();
    this.socket?.disconnect();
  }
}