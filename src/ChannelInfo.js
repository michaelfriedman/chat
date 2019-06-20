import React from 'react'

export default function ChannelInfo() {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{' '}
        <input type="text" className="TopicInput" value="awesome stuff" />
      </div>
      <div className="ChannelName"># general</div>
    </div>
  )
}
