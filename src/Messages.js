import React from 'react'
import useCollection from './useCollection'
import useDocWithCache from './useDocWithCache'

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, 'createdAt')
  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>
      {messages.map((message, index) => {
        const previous = messages[index - 1]
        const showAvatar = !previous || message.user.id !== previous.user.id
        const showDay = false

        return showAvatar ? (
          <FirstMessageFromUser
            key={message.id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FirstMessageFromUser({ message, showDay }) {
  const author = useDocWithCache(message.user.path)
  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">12/6/2018</div>
          <div className="DayLine" />
        </div>
      )}

      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url(${author.photoUrl})` : ''
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName} </span>
            <span className="TimeStamp">
              {new Date(message.createdAt.seconds * 1000).toLocaleTimeString()}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  )
}

export default Messages
