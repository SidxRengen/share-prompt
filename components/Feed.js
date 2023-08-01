"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
const Feed = ({ data, handleDelete }) => {
  const [isCopied, setIsCopied] = useState(false);
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
        return (
          <div key={post._id} className="prompt">
            <div className="row">
              <img src={post.creator.image} alt="" />
              <h2>{post.creator.email}</h2>
              {isCopied ? (
                <i
                  class="fa-solid fa-copy"
                  onClick={() => {
                    handleCopyClick(post.prompt);
                  }}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-copy"
                  onClick={() => {
                    handleCopyClick(post.prompt);
                    setIsCopied(true);
                  }}
                ></i>
              )}
            </div>
            <h1>{post.tag}</h1>
            <p>{post.prompt}</p>
            <div className="options">
              <Link href={`/${post._id}`} >
                <i class="fa-solid fa-pen-to-square" />
              </Link>
              <i
                class="fa-solid fa-trash"
                onClick={() => {
                  handleDelete(post._id);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
