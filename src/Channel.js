import React from 'react'
import Members from './Members'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import ChatInputBox from './ChatInputBox'

export default function Channel() {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages />
        <ChatInputBox />
      </div>
      <Members />
    </div>
  )
}
