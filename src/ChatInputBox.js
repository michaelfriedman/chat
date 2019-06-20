import React from 'react'
import { db } from './firebase'

export default function ChatInputBox({ user }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const value = e.target.elements[0].value
        db.collection('channels')
          .doc('random')
          .collection('messages')
          .add({
            user: db.collection('users').doc(user.uid),
            text: value,
            createdAt: new Date()
          })
        e.target.reset()
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
