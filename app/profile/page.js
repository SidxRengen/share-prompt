"use client";
"use client";
import Feed from "@components/Feed";
// import axios from "axios";
import "@styles/global.scss";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function page() {
  const [search, setsearch] = useState("");
  const [feed, setFeed] = useState([]);
  const handleDelete = async (ID) => {
    const res = await fetch("./api/prompt/deletePrompt", {
      method: "DELETE",
      body: JSON.stringify({
        id: ID,
      }),
    });
    const res1 = await fetch("./api/prompt/allPrompts", {
      method: "GET",
    });
    const data = await res1.json();
    console.log(data);
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
        console.log(data);
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
        console.log(data);
        setFeed(data);
        return data;
      };
      fetchPrompt();
    }
  }, [search]);

  return (
    <div>
      <motion.div
        className="Search"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeIn", type: "spring", delay: 0.4 }}
      >
        <form action="" class="search-bar">
          <input
            type="search"
            name="search"
            pattern=".*\S.*"
            required
            value={search}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <button class="search-btn" type="button">
            <span>Search</span>
          </button>
        </form>
      </motion.div>
      <Feed data={feed} handleDelete={handleDelete} search={search}/>
    </div>
  );
}

export default page;
