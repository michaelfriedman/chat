import React from 'react'
import { useCollection } from './useCollection'

export default function Nav({ user }) {
  const channels = useCollection('channels')

  return (
    <div className="Nav">
      <div className="User">
        <img
          src={user.photoUrl}
          alt="kitten placeholder"
          className="UserImage"
        />
        <div>
          <div>{user.displayName}</div>
          <div>
            <button className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <a key={channel.id} href={`/channel/${channel.id}`}>
            # {channel.id}
          </a>
        ))}
      </nav>
    </div>
  )
}
