import ChatBase from '@/components/chat/chat-base'
import { fetchChats } from '@/fetch/chats-fetch'
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/group-fetch'
import { notFound } from 'next/navigation'
import React from 'react'

const chat = async ({ params }: { params: { id: string } }) => {
  if (params.id.length != 36) {
    return notFound()
  }

  const group: GroupChatType | null = await fetchChatGroup(params.id);

  if (group === null) {
    return notFound()
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatGroupUsers(params.id)
  const chats: Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <div>
      <ChatBase oldMessages={chats} users={users} group={group} />
    </div>
  )
}

export default chat