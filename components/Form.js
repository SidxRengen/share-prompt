import React from "react";
import "@styles/global.scss";
import { motion } from "framer-motion";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handlesubmit, mode }) => {
  return (
    <motion.div className="form">
      <motion.h1
        // style={mode ? { color: "black" } : { color: "white" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {type} Post
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="grad3">{type}</span>{" "}
        <span
        // style={mode ? { color: "black" } : { color: "white" }}
        >
          and{" "}
        </span>
        <span className="grad3">share </span>
        <span
        // style={mode ? { color: "black" } : { color: "white" }}
        >
          prompts with the world, and let your imagination run wild with any
          AI-powered platform amazing
        </span>
      </motion.p>
      <motion.div
        className="tag"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handlesubmit}>
          <h3
          // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
          >
            Your AI Prompt
          </h3>
          <textarea
            value={post.prompt}
            // style={mode ? {} : { background: "#373636", color: "#d6d6d6" }}
            onChange={(e) =>
              setPost({ ...post, [e.target.name]: e.target.value })
            }
            className="text-prompt"
            placeholder="Write your prompts here..."
            name="prompt"
            id=""
          ></textarea>
          <h3
          // style={mode ? { color: "black" } : { color: "#d6d6d6" }}
          >
            Tag(#product #webdevelopment #idea)
          </h3>
          <textarea
            value={post.tag}
            // style={mode ? {} : { background: "#373636", color: "#d6d6d6" }}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            className="text-tag"
            placeholder="#tag"
            name="prompt"
            id=""
          ></textarea>
          <div className="buttons">
            <Link href="/">Cancel</Link>
            <button type="submit" disabled={submitting}>
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Form;
