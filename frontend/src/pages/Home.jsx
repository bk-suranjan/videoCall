import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Number } from '../context/numberContext'
import { useSocket } from '../context/shocketContext'
import { useNavigate } from 'react-router'



function Home() {

    const navigation = useNavigate()
    // const number = useContext(Number)
    // console.log(number)
    const [email,setEmail] = useState('')
    const [room,setroom] = useState('')
    const socket = useSocket()
    const handleOnSubmit  = (e) =>{
        e.preventDefault();
        socket.emit('room:join',{email,room})
    }

    const handleJoinRoom = (data) =>{
     const {email,room} = data
    //  console.log(email,room)
      navigation(`/room/${room}`)
    }
    useEffect(()=>{
        // socket.on('room:join',(data)=>{
        //     console.log(`data form backend ${data}`)
        // })
        socket.on('room:join',handleJoinRoom)

        return () =>{
            socket.off('room:join',handleJoinRoom)
        }
    },[socket])
  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor='email'>Email</label>
            <input type="email" room='email' onChange={(e)=>setEmail(e.target.value )} value={email}/>
               <br /><br />
            <label htmlFor="Connection_room">Connection room</label>
            <input type="text" room='Connection_room' onChange={(e)=>setroom(e.target.value)} value={room} />
            <br /><br />
            <input type="submit" />

        </form>
    </div>
  )
}

export default Home