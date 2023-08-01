import React from "react";
import "@styles/global.scss";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handlesubmit }) => {
  return (
    <div className="form">
      <h1>{type} Post</h1>
      <p>
        <span>{type}</span> and <span>share</span> amazing prompts with the
        world, and let your imagination run wild with any AI-powered platform
      </p>
      <div className="tag">
        <form  onSubmit={handlesubmit}>
          <h3>Your AI Prompt</h3>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
            placeholder="Write your prompts here..."
            name="prompt"
            id=""
            cols="160"
            rows="10"
          ></textarea>
          <h3>Tag(#product #webdevelopment #idea)</h3>
          <textarea
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
            name="prompt"
            id=""
            cols="160"
            rows="3"
          ></textarea>
          <div className="buttons">
            <Link href="/">Cancel</Link>
            <button type="submit" disabled={submitting}>
              {submitting ? `${type}...` : type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
