import { useEffect, useRef } from 'react'
import './Chatbar.css'

export const Chatbar = ({onsubmit}) => {
  const content = useRef(null);
  const keydown = (event) => {
    if (event.key == 'Enter') {
      event.preventDefault();
      onsubmit(content.current.innerText);
      content.current.innerText = '';
    }
  };
  useEffect(() => {
    console.log('setup chatbar')
    document.getElementById('content').removeEventListener('keydown', keydown);
    document.getElementById('content').addEventListener('keydown', keydown);
  }, []);

  return (
    <>
      <div id="content" ref={content} class="contentbar" contentEditable="true"></div>
    </>
  )
}

export default Chatbar
