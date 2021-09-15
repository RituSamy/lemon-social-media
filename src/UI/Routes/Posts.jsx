import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import "../../Stylesheets/Posts.css";

const Posts = () => {
  useFirestoreConnect({
    collection: "posts",
    storeAs: "posts",
  });
  const posts = useSelector((state) => state.firestore.data.posts);

  return (
    <div className="Posts">
      <CreatePost />
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {posts &&
          Object.values(posts).map((post) => (
            <li key={post.postID + "li"}>
              <Post
                key={post.postID}
                postID={post.postID}
                userID={post.userID}
                caption={post.caption}
                imageURL={post.imageURL}
                comments={post.comments}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Posts;
