"use client";

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function CraetePrompt() {
    const [submitting, setsubmitting] = useState(false);
    const [Post, setPost] = useState({
       prompt:"", 
       tag:"" 
    })
    const createPrompt = async (e) =>{

    } 
  return (
    <div><Form
        type="Create"
        post={Post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createPrompt}
    /></div>
  )
}

export default CraetePrompt