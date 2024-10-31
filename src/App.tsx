import React from 'react';
import { JoinRoom } from './components/JoinRoom';
import { Room } from './components/Room';
import { useVideoStore } from './store/useVideoStore';
import { useVideoCall } from './hooks/useVideoCall';

function App() {
  const { roomId } = useVideoStore();
  const { createRoom, joinRoom } = useVideoCall();

  return (
    <div className="min-h-screen bg-gray-900">
      {!roomId ? (
        <JoinRoom onJoin={joinRoom} onCreate={createRoom} />
      ) : (
        <Room />
      )}
    </div>
  );
}

export default App;