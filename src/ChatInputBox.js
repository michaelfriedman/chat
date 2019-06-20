import React from 'react'
import { db } from './firebase'

export default function ChatInputBox() {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const value = e.target.elements[0].value
        db.collection('channels')
          .doc('general')
          .collection('messages')
          .add({
            text: value,
            createdAt: new Date()
          })
      }}
      className="ChatInputBox"
    >
      <input
        type="text"
        placeholder="message # general"
        className="ChatInput"
      />
    </form>
  )
}
