"use client";

import Form from "@components/Form";
import Nav from "@components/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  // const [user, setuser] = useState({});
  // useEffect(() => {
  //   const getUser = async () => {
  //     const res = await fetch("./api/mode", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         id: session?.user.id,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log(data?.mode);
  //     setuser(data);
  //   };
  //   getUser();
  // }, []);

  // const [mode, setmode] = useState(false);
  // const style2 = { background: "#040D12", marginTop: "8vh", minHeight: "92vh" };
  // const style1 = {
  //   background: "white",
  //   minHeight: "92vh",
  // };
  return (
    <>
      {/* <Nav setmode={setmode} /> */}
      <div 
      // style={mode ? style1 : style2}
      >
        <Form
          type="Create"
          // mode={mode}
          post={Post}
          setPost={setPost}
          submitting={submitting}
          handlesubmit={createPrompt}
        />
      </div>
    </>
  );
}

export default CraetePrompt;
