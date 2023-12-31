"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
const Feed = ({ data, handleDelete, type, setsearch, other, mode }) => {
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  const [style, setstyle] = useState();
  var o = 0.1;
  const router = useRouter();
  return (
    <div className="feed">
      {data.map((post) => {
        const handleCopyClick = (text) => {
          // Asynchronously call copyTextToClipboard
          copyTextToClipboard(text)
            .then(() => {
              // If successful, update the isCopied state value
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1500);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        o += 0.2;
        return (
          <>
            <motion.div
              key={post._id}
              className="prompt"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ease: "easeIn", type: "spring", delay: o }}
            >
              <div>
                <div className="row-row2">
                  <div className="row">
                    <img
                      src={post?.creator.image}
                      alt=""
                      style={
                        session?.user.id !== post.creator._id &&
                        other !== "others"
                          ? {
                              cursor: "pointer",
                            }
                          : {}
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        session?.user.id !== post.creator._id &&
                          other !== "others" &&
                          router.push(`profile/${post.creator._id}`);
                      }}
                    />

                    <div className="row-row1">
                      <h1
                      // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
                      >
                        {post.creator.username}
                      </h1>
                      <h2
                      // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
                      >
                        {post.creator.email}
                      </h2>
                    </div>
                  </div>
                  {isCopied ? (
                    <i
                      class="fa-solid fa-copy"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleCopyClick(post.prompt);
                      }}
                    ></i>
                  ) : (
                    <motion.i
                      class="fa-solid fa-copy"
                      style={{ margin: "10px", cursor: "pointer" }}
                      onClick={() => {
                        handleCopyClick(post.prompt);
                        setIsCopied(true);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  )}
                </div>
                <h1
                  className="tag1"
                  onClick={() => {
                    other !== "me" && other !== "others" && setsearch(post.tag);
                  }}
                  // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
                >
                  #{post.tag}
                </h1>
                <p
                // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
                >
                  {post.prompt}
                </p>
              </div>
              {type != "profile" && (
                <div className="options">
                  <Link href={`/${post._id}`}>
                    <motion.i
                      class="fa-solid fa-pen-to-square"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  </Link>
                  <motion.i
                    class="fa-solid fa-trash"
                    onClick={() => {
                      handleDelete(post._id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </div>
              )}
            </motion.div>
          </>
        );
      })}
    </div>
  );
};

export default Feed;
