import React, { useState, useEffect } from 'react'
import { db } from './firebase'

function useCollection(path, orderBy) {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    return db
      .collection(path)
      .orderBy(orderBy)
      .onSnapshot(snapshot => {
        const docs = []
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id
          })
        })
        setDocs(docs)
      })
  }, [])
  return docs
}

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
