import React from 'react'
import { useCollection } from './useCollection'

export default function Nav() {
  const channels = useCollection('channels')

  return (
    <div className="Nav">
      <div className="User">
        <img
          src="https://placekitten.com/64/64"
          alt="kitten placeholder"
          className="UserImage"
        />
        <div>
          <div>Michael Friedman</div>
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
