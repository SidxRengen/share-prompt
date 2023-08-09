"use client";
import Feed from "@components/Feed";
// import axios from "axios";
import "@styles/global.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchData } from "next-auth/client/_utils";
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
    if (search.length === 0) {
      setFeed([])
      const fetchPrompt = async () => {
        const res = await fetch(`./api/prompt/allPrompts`, {
          method: "GET",
        });
        const data = await res.json();
        setFeed(data);
        return data;
      };
      fetchPrompt();
    } else {
      const fetchPrompt = async () => {
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
  return (
    <div>
      <div className="title flex flex-row flex-wrap justify-center mt-2">
        <h1>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Discover and Share{" "}
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
          <span className="grad3">Prompto</span> is an open source AI prompting
          tool for modern world to
          <span className="grad3"> Discover, Create, Save</span> and
          <span className="grad3"> Share creative prompts</span>
        </motion.p>
      </div>
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
      {session?.user && (
        <Feed
          data={feed}
          handleDelete={handleDelete}
          type="profile"
          setsearch={setsearch}
        />
      )}
    </div>
  );
}
