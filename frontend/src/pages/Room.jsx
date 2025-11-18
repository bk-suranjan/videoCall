import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/shocketContext';

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const videoRef = useRef(null);

  const handleCallback = useCallback(({ email, id }) => {
    console.log(email, id);
    setRemoteSocketId(id);
  }, []);

  const handleCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      setMyStream(stream);
    } catch (error) {
      console.error('Error getting media:', error);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && myStream) {
      videoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    socket.on('user:joined', handleCallback);
    return () => socket.off('user:joined', handleCallback);
  }, [socket, handleCallback]);

  return (
    <div>
      <h1>Room</h1>

      {remoteSocketId ? (
        <h3>You are connected</h3>
      ) : (
        <h3>Waiting for other user</h3>
      )}

      {remoteSocketId && <button onClick={handleCall}>Make call</button>}

      {myStream && (
        <video
            style={{ transform: "scaleX(-1)" }}  // FIX MIRROR
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="250"
          height="250"
        />
      )}
    </div>
  );
}

export default Room;
