"use client";
import Feed from "@components/Feed";
// import axios from "axios";
import "@styles/global.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchData } from "next-auth/client/_utils";
import Nav from "@components/Nav";
export default function Home() {
  const [feed, setFeed] = useState([]);
  const { data: session } = useSession();
  const [search, setsearch] = useState("");
  const handleDelete = async (ID) => {
    const res = await fetch("./api/prompt/deletePrompt", {
      method: "DELETE",
      body: JSON.stringify({
        id: ID,
      }),
    });
    const res1 = await fetch(`./api/prompt/searchPrompt`, {
      method: "POST",
      body: JSON.stringify({
        search: search,
      }),
    });
    const data = await res1.json();
    setFeed(data);
    if (res.ok) {
      console.log("send to delete");
    }
  };
  useEffect(() => {
    if (search.length === 0 || search === "") {
      setFeed([]);
      const fetchPrompt = async () => {
        const res = await fetch(`./api/prompt/allPrompts`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setFeed(data);
        return data;
      };
      fetchPrompt();
    } else {
      const fetchPrompt = async () => {
        setFeed([]);
        const res = await fetch(`./api/prompt/searchPrompt`, {
          method: "POST",
          body: JSON.stringify({
            search: search,
          }),
        });
        const data = await res.json();
        setFeed(data);
        return data;
      };
      fetchPrompt();
    }
  }, [search]);
  // const [mode, setmode] = useState(z);
  // const style2 = { background: "#040D12", marginTop: "8vh", minHeight: "92vh" };
  // const style1 = {
  //   background: "transparent",
  //   marginTop: "8vh",
  //   minHeight: "92vh",
  // };
  return (
    <>
      {/* <Nav setmode={setmode} /> */}
      <div
        //  style={mode ? style1 : style2}
        className="mob-body"
      >
        <div className="title flex flex-row flex-wrap justify-center mt-2">
          <h1>
            <motion.span
              // style={  { color: "black" } : { color: "white" }}
              className="body-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grad3 flex justify-center"
            >
              AI-Powered{" "}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grad3 flex justify-center"
            >
              Prompts
            </motion.span>
          </h1>
        </div>
        <div className="discription flex flex-row justify-center mt-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="grad3">Prompto </span>
            <span
            //  style={mode ? { color: "black" } : { color: "white" }}
            >
              is an open source AI prompting tool for modern world to
            </span>
            <span className="grad3"> Discover, Create, Save </span>
            <span
            // style={mode ? { color: "black" } : { color: "white" }}
            >
              and
            </span>
            <span className="grad3"> Share creative prompts </span>
          </motion.p>
        </div>
        {session?.user && (
          <motion.div
            className="Search"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ease: "easeIn", type: "spring", delay: 0.4 }}
          >
            <form class="search-bar">
              <input
                type="search"
                name="search"
                pattern=".*\S.*"
                required
                value={search}
                placeholder="Search Prompts..."
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
              />
              <button class="search-btn" type="button">
                <span>Search</span>
              </button>
            </form>
          </motion.div>
        )}
        {session?.user && feed.length !== 0 && (
          <Feed
            // mode={mode}
            data={feed}
            handleDelete={handleDelete}
            type="profile"
            setsearch={setsearch}
          />
        )}
      </div>
    </>
  );
}
