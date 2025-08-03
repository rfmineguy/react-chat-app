import { useEffect, useState, useRef, createElement } from 'react'
import reactLogo from './assets/react.svg'
import { Chatbar } from './Chatbar.jsx'
import { Chatline, ChatlineData } from './Chatline.jsx'
import { RoomViewer } from './RoomViewer.jsx'
import './App.css'

function App() {
  const [chatlines, setChatlines] = useState([]);

  const submit = (content) => {
    setChatlines(chatlines => [...chatlines, new ChatlineData(content)]);
  };

  const onjoinroom = (room) => {
    console.log(`joining room ${room}`)
  };

  return (
    <>
      <div class="main">
        <div class="header">Chat App</div>
        <div class="col-container">
          <div class="row-container">
            <RoomViewer onjoinroom={onjoinroom}></RoomViewer>
            <hr/>
            <div class="expand scrollable-div">
              <div class="chatlines">
                {chatlines.map((c, i) => (
                  <Chatline key={i} index={i} content={c.content}/>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Chatbar class="chatbar" onsubmit={submit}></Chatbar>
      </div>
    </>
  )
}

export default App
