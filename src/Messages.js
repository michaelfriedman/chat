import React from 'react'
import { useCollection } from './useCollection'

function Messages() {
  const messages = useCollection('channels/random/messages', 'createdAt')
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        return index === 0 ? (
          <div key={index}>
            <div className="Day">
              <div className="DayLine" />
              <div className="DayText">12/6/2018</div>
              <div className="DayLine" />
            </div>
            <div className="Message with-avatar">
              <div className="Avatar" />
              <div className="Author">
                <div>
                  <span className="UserName">Michael Friedman </span>
                  <span className="TimeStamp">3:37 PM</span>
                </div>
                <div className="MessageContent">{message.text}</div>
              </div>
            </div>
          </div>
        ) : (
          <div key={index}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Messages
