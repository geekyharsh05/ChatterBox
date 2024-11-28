import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DashNav from '@/components/chat/dash-nav';
import CreateChat from '@/components/chatgroup/create-chat';
import { fetchChatGroups } from '@/fetch/group-fetch';
import GroupChatCard from '@/components/chatgroup/group-chat-card';

export default async function dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const groups: Array<GroupChatType> | [] = await fetchChatGroups(session?.user?.token!)
  
  return (
    <div>
      <DashNav
        name={session?.user?.name!}
        image={session?.user?.image ?? undefined}
      />

     
      <div className='container'>
        <div className='flex justify-end mt-10'>
          <CreateChat user={session?.user!}/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
      </div>
      

    </div>
  );
}