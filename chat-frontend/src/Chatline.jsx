import { useEffect, useRef } from 'react'
import './Chatline.css'

export class ChatlineData {
  constructor(content) {
    this.content = content;
  }
}

export const Chatline = ({index, content}) => {
  return (
    <>
      <div>
        <p class="user">Username goes here</p>
        <p class="content">{content}</p>
      </div>
    </>
  );
}

export default Chatline;
