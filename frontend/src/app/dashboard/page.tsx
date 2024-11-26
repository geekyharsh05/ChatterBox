import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import DashNav from '@/components/chat/dash-nav';
import CreateChat from '@/components/chatgroup/create-chat';
import { fetchChatGroups } from '@/fetch/group-fetch';

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

    </div>
  );
}