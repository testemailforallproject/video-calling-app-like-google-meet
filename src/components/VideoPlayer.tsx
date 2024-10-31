import React from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

interface VideoPlayerProps {
  stream: MediaStream;
  muted?: boolean;
  isLocal?: boolean;
  username?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  stream,
  muted = false,
  isLocal = false,
  username = 'User',
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className={`w-full h-full object-cover ${isLocal ? 'mirror' : ''}`}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">{username}</span>
          <div className="flex gap-2">
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
            >
              {isAudioEnabled ? (
                <Mic className="w-5 h-5 text-white" />
              ) : (
                <MicOff className="w-5 h-5 text-red-500" />
              )}
            </button>
            <button
              onClick={toggleVideo}
              className="p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
            >
              {isVideoEnabled ? (
                <Video className="w-5 h-5 text-white" />
              ) : (
                <VideoOff className="w-5 h-5 text-red-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};