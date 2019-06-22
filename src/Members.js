import React from 'react'
import useCollection from './useCollection'

function Members({ channelId }) {
  const members = useCollection('users', /*'displayName'*/ undefined, [
    `channels.${channelId}`,
    '==',
    true
  ])
  console.log(members)
  return (
    <div className="Members">
      <div>
        {members.map(member => (
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

export default Members
