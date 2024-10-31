import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { useVideoStore } from '../store/useVideoStore';
import { Phone, Share2, Users } from 'lucide-react';

export const Room: React.FC = () => {
  const { localStream, remoteStream, roomId, participants } = useVideoStore();

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-white text-2xl font-bold">Meeting Room</h1>
            <div className="bg-gray-800 rounded-lg px-3 py-1 flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{participants.length}</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>Share Screen</span>
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localStream && (
            <VideoPlayer
              stream={localStream}
              muted
              isLocal
              username="You"
            />
          )}
          {remoteStream && (
            <VideoPlayer
              stream={remoteStream}
              username="Remote User"
            />
          )}
        </div>

        {roomId && (
          <div className="mt-4 bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-300">
              Room ID: <span className="font-mono text-blue-400">{roomId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};