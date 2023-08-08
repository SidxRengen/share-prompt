import React from "react";
import "@styles/global.scss";
import { motion } from "framer-motion";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handlesubmit }) => {
  return (
    <motion.div className="form">
      <motion.h1  initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}}>{type} Post</motion.h1>
      <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>
        <span className="grad3">{type}</span> and <span className="grad3">share</span> amazing prompts with the
        world, and let your imagination run wild with any AI-powered platform
      </motion.p>
      <motion.div className="tag" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>
        <form  onSubmit={handlesubmit}>
          <h3>Your AI Prompt</h3>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
            className="text-prompt"
            placeholder="Write your prompts here..."
            name="prompt"
            id=""
        
          ></textarea>
          <h3>Tag(#product #webdevelopment #idea)</h3>
          <textarea
            value={post.tag}
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
