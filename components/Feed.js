import { useSession } from "next-auth/react";
import React from "react";

const Feed = ({ data }) => {

  return (
    <div className="feed">
      {data.map((post) => {
        return (
          <div key={post._id} className="prompt">
            <div className="row">
              <img src={post.creator.image} alt="" />
              <h2>{post.creator.email}</h2>
              <i class="fa-solid fa-copy"></i>
            </div>
            <h1>{post.tag}</h1>
            <p>{post.prompt}</p>
            <div className="options">
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-solid fa-trash"></i>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Feed;
