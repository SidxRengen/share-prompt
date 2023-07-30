"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
function CraetePrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setsubmitting] = useState(false);
  const [Post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);
    try {
      const res = await fetch("./api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userID: session?.user.id,
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
        type="Create"
        post={Post}
        setPost={setPost}
        submitting={submitting}
        handlesubmit={createPrompt}
      />
    </div>
  );
}

export default CraetePrompt;
