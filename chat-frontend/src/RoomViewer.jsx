import { useEffect, useRef, useState } from 'react'
import './RoomViewer.css'

const RoomEntry = ({name, onjoinroom}) => {
  const buttonref = useRef(null);
  useEffect(() => {
    buttonref.current.onclick = () => onjoinroom(name); 
  }, []);
  return (
    <>
      <div class="room-entry">
        <p>{name}</p>
        <button ref={buttonref}>Join</button>
      </div>
    </>
  );
}

export const RoomViewer = ({onjoinroom, rooms, joinedRoom}) => {
  return (
    <>
      <div class="col-container">
        <p>{joinedRoom}</p>
      {
        rooms.map((r, i) => (
          <RoomEntry key={i} name={r.name} onjoinroom={onjoinroom}/>
        ))
      }
      </div>
    </>
  );
};
