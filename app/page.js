"use client";
import Feed from "@components/Feed";
// import axios from "axios";
import "@styles/global.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [feed, setFeed] = useState([]);
  const {data : session} = useSession();
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch("./api/prompt/allPrompts", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      setFeed(data);
    };
    fetchPrompt();
    // return res
  }, []);
  return (
    <div>
      <div className="title flex flex-row flex-wrap justify-center mt-2">
        <h1>
          <span>Discover and Share</span>
          <br />
          <span className="grad1 flex justify-center">AI-Powered</span>
          <br />
          <span className="grad1 flex justify-center">Prompts</span>
        </h1>
      </div>
      <div className="discription flex flex-row justify-center mt-3">
        <p>
          <span className="grad1">Prompto</span> is an open source AI prompting
          tool for modern world to
          <span className="grad1"> Discover, Create, Save</span> and
          <span className="grad1"> Share creative prompts</span>
        </p>
      </div>
      {
        session?.user&&
      <Feed data={feed} />
      }
    </div>
  );
}
