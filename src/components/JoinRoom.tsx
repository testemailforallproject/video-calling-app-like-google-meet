import React from 'react';
import { Video } from 'lucide-react';

interface JoinRoomProps {
  onJoin: (roomId: string) => void;
  onCreate: () => void;
}

export const JoinRoom: React.FC<JoinRoomProps> = ({ onJoin, onCreate }) => {
  const [roomId, setRoomId] = React.useState('');

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Video className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Join a Meeting
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter a room code or create a new meeting
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="room-id" className="sr-only">
                Room ID
              </label>
              <input
                id="room-id"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Room ID"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onJoin(roomId)}
                disabled={!roomId}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Meeting
              </button>
              <button
                onClick={onCreate}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};