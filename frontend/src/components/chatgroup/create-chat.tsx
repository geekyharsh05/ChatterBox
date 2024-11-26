"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createChatSchema, createChatSchemaType } from '@/validations/group-chat-validation'
import { Input } from '../ui/input'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { AxiosError } from 'axios'
import axios from 'axios'
import { API_ENDPOINTS } from '@/lib/api-auth-routes'
import { toast } from 'sonner'

const CreateChat = ( { user }: { user: CustomUser } ) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<createChatSchemaType>({
        resolver: zodResolver(createChatSchema),
      });

    const onSubmit = async (payload: createChatSchemaType) => {
        try {
          setLoading(true);
          const { data } = await axios.post(API_ENDPOINTS.CHAT_GROUP, payload, {
            headers: {
              Authorization: user.token,
            },
          });
    
          if (data?.message) {
            setLoading(false)
            setOpen(false);
            toast.success(data?.message);
            // clearCache("dashboard");
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          if (error instanceof AxiosError) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong, please try again!");
          }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Group</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}> 
                <DialogHeader>
                    <DialogTitle>Create Your New Chat Group</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <Input placeholder="Enter chat title" {...register("title")} />
                        <span className="text-red-400 text-sm">{errors.title?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Input placeholder="Enter passcode" {...register("passcode")} />
                        <span className="text-red-400 text-sm">{errors.passcode?.message}</span>
                    </div>
                    <div className="mt-4">
                        <Button className="w-full" disabled={loading}>
                        {loading ? "Processing.." : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChat;
