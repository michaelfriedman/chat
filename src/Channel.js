import React from 'react'
import Members from './Members'
import ChannelInfo from './ChannelInfo'
import Messages from './Messages'
import ChatInputBox from './ChatInputBox'

export default function Channel({ user, channelId }) {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo />
        <Messages channelId={channelId} />
        <ChatInputBox channelId={channelId} user={user} />
      </div>
      <Members />
    </div>
  )
}
