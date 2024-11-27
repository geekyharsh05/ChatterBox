import ChatBase from '@/components/chat/chat-base'
import React from 'react'

const chat = ({ params }: { params: { id: string } }) => {
  console.log("The groupd id is", params.id)

  return (
    <div>
      <h1>Hello from chat</h1>
      <ChatBase groupdId={params.id}/>
    </div>
  )
}

export default chat