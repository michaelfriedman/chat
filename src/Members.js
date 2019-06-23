import React from 'react'
import useCollection from './useCollection'

function Members({ channelId }) {
  const members = useCollection('users', undefined, [
    `channels.${channelId}`,
    '==',
    true,
  ])

  return (
    <div className="Members">
      <div>
        {members.sort(sortByName).map(member => (
          <div key={member.id} className="Member">
            <div className="MemberStatus online" />
            {member.displayName}
          </div>
        ))}

        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  )
}

const sortByName = (a, b) =>
  a.displayName > b.displayName ? 1 : a.displayName > b.displayName ? -1 : 0

export default Members
