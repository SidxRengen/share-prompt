"use client";
"use client";
import Feed from "@components/Feed";
import Nav from "@components/Nav";
// import axios from "axios";
import "@styles/global.scss";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function page() {
  const { data: session } = useSession();
  const [search, setsearch] = useState("");
  const [feed, setFeed] = useState([]);
  const handleDelete = async (ID) => {
    const res = await fetch("./api/prompt/deletePrompt", {
      method: "DELETE",
      body: JSON.stringify({
        id: ID,
      }),
    });
    const res1 = await fetch(`./api/prompt/Prompts`, {
      method: "POST",
      body: JSON.stringify({
        search: session?.user.id,
      }),
    });
    const data = await res1.json();
    setFeed(data);
    if (res.ok) {
      console.log("send to delete");
    }
  };
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch(`./api/prompt/Prompts`, {
        method: "POST",
        body: JSON.stringify({
          search: session?.user.id,
        }),
      });
      const data = await res.json();

      setFeed(data);
      return data;
    };
    fetchPrompt();
  }, []);
  // const [mode, setmode] = useState(true);
  // const style2 = { background: "#040D12", marginTop: "8vh", minHeight: "92vh" };
  // const style1 = {
  //   background: "transparent",
  //   minHeight: "92vh",
  //   marginTop: "8vh",
  // };
  return (
    <>
      {/* <Nav setmode={setmode} /> */}
      {feed.length !== 0 && (
        <div
          style={{ paddingTop: "9vh" }}
          // style={mode ? style1 : style2}
        >
          <Feed
            data={feed}
            handleDelete={handleDelete}
            setsearch={setsearch}
            // mode={mode}
            other="me"
          />
        </div>
      )}
    </>
  );
}

export default page;
