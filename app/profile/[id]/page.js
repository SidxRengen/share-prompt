"use client";

import Feed from "@components/Feed";
// import axios from "axios";
import "@styles/global.scss";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const params = useParams();
  const { data: session } = useSession();
  const [search, setsearch] = useState("");
  const [feed, setFeed] = useState([]);
  const handleDelete = async (ID) => {
    const res = await fetch("../api/prompt/deletePrompt", {
      method: "DELETE",
      body: JSON.stringify({
        id: ID,
      }),
    });
    const res1 = await fetch(`../api/prompt/Prompts`, {
      method: "POST",
      body: JSON.stringify({
        search: params.id,
      }),
    });
    const data = await res1.json();
    setFeed(data);
    if (res.ok) {
      console.log("send to delete");
    }
  };
  useEffect(() => {
    if (search.length === 0|| search === "") {
      setFeed([]);
      const fetchPrompt = async () => {
        const res = await fetch(`../api/prompt/Prompts`, {
          method: "POST",
          body: JSON.stringify({
            search: params.id,
          }),
        });
        const data = await res.json();
        setFeed(data);
        return data;
      };
      fetchPrompt();
    } else {
      const fetchPrompt = async () => {
        setFeed([]);
        const res = await fetch(`../api/prompt/searchours`, {
          method: "POST",
          body: JSON.stringify({
            search: search,
            id: params.id,
          }),
        });
        const data = await res.json();
        setFeed(data);
        console.log(data);
        return data;
      };
      fetchPrompt();
    }
  }, [search]);

  return (
    <div style={{paddingTop:"4vh"}}>
      {/* <motion.div
        style={{ marginTop: "4vh" }}
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
            placeholder="Search Prompts..."
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
          <button class="search-btn" type="button">
            <span>Search</span>
          </button>
        </form>
      </motion.div> */}
      <Feed data={feed} handleDelete={handleDelete} setsearch={setsearch} type="profile" other="others"/>
    </div>
  );
}

export default page;
