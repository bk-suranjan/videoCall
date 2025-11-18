import React,{useCallback, useEffect, useState} from 'react'
import { useSocket } from '../context/shocketContext'

function Room() {
  const socket = useSocket();
  const [remoteSocketId,setRemoteSocketId] = useState(null)

   const handleCallback =useCallback(({email,id})=>{
    console.log(email,id)
    setRemoteSocketId(id)
   })
   useEffect(()=>{
    socket.on('user:joined',handleCallback)
    return()=> socket.off('user:joined',handleCallback)
  },[socket,handleCallback])
  return (
    <div>
      <h1>Room</h1>
      {
        remoteSocketId ? <h3>Your are connected</h3> : <h3>watting for other user</h3>
      }
    </div>
  )
}

export default Room