import React, { useEffect, useState } from 'react'
import { db } from './firebase'

function App() {
  const [channels, setChannels] = useState([])

  useEffect(() => {
    return db.collection('channels').onSnapshot(snapshot => {
      const docs = []
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        })
      })
      setChannels(docs)
    })
  }, [])
  return (
    <div className="App">
      <div className="Nav">
        <div className="User">
          <img
            className="UserImage"
            alt="whatever"
            src="https://placekitten.com/64/64"
          />
          <div>
            <div>Michael David Friedman</div>
            <div>
              <button className="text-button">log out</button>
            </div>
          </div>
        </div>
        <nav className="ChannelNav">
          {channels.map(channel => (
            <a href={`/channel/${channel.id}`}># {channel.id}</a>
          ))}
        </nav>
      </div>
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
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
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Michael Friedman
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
