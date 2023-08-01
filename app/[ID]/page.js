"use client";

import Form from "@components/Form";
import { json } from "body-parser";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const router = useRouter();
  const params  = useParams();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch("./api/prompt/editPrompt", {
        method: "POST",
        body:JSON.stringify({
          id:params.ID
        })
      });
      const data = await res.json();
      // console.log(data)
      setPost({...Post,prompt:data.prompt,tag:data.tag});
      return data;
    };
    fetchPrompt();
  }, []);
  
  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const res = await fetch(`./api/prompt/editPrompt`, {
        method: "PUT",
        body: JSON.stringify({
          ID: params.ID,
          prompt: Post.prompt,
          tag: Post.tag,
        }),
      });
      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Edit"
        post={Post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={updatePrompt}
      />
    </div>
  );
}

export default page;
