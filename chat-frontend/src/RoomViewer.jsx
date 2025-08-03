import { useEffect, useRef } from 'react'
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

export const RoomViewer = ({onjoinroom}) => {
  return (
    <>
      <div class="col-container">
        <RoomEntry name="hello"     onjoinroom={onjoinroom}/>
        <RoomEntry name="hello 538" onjoinroom={onjoinroom}/>
        <RoomEntry name="hello"     onjoinroom={onjoinroom}/>
        <RoomEntry name="hello"     onjoinroom={onjoinroom}/>
        <RoomEntry name="hello"     onjoinroom={onjoinroom}/>
      </div>
    </>
  );
};
