import { io, Socket } from 'socket.io-client';

const SIGNALING_SERVER = import.meta.env.VITE_SIGNALING_SERVER || 'https://your-signaling-server.com';

export class SocketService {
  private socket: Socket | null = null;

  connect(): Socket {
    this.socket = io(SIGNALING_SERVER);
    return this.socket;
  }

  setupRoomCreation(onRoomCreated: (id: string) => void, onUserJoined: (userId: string) => void): void {
    if (!this.socket) throw new Error('Socket not initialized');

    this.socket.on('room-created', onRoomCreated);
    this.socket.on('user-joined', onUserJoined);
    this.socket.emit('create-room');
  }

  setupRoomJoining(roomId: string, onRoomJoined: (participants: string[]) => void): void {
    if (!this.socket) throw new Error('Socket not initialized');

    this.socket.on('room-joined', onRoomJoined);
    this.socket.emit('join-room', roomId);
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}