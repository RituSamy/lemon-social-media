import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "../../Stylesheets/Post.css";

const Post = ({ postID, userID, caption, imageURL, comments }) => {
  const [presentComment, setPresentComment] = useState("");
  const [commentDisabled, setCommentDisabled] = useState(true);
  // use firestore
  const firestore = useFirestore();

  // get the uid of the current user using selector
  const { uid } = useSelector((state) => state.firebase.auth);
  const handleChange = ({ currentTarget: { name, value } }) => {
    if (name === "comment") {
      setPresentComment(value);
      if (value.length > 0) {
        setCommentDisabled(false);
      } else {
        setCommentDisabled(true);
      }
    }
  };

  const postComment = () => {
    firestore
      .collection("posts")
      .doc(postID)
      .update({
        comments: [...comments, presentComment],
      });
    setPresentComment("");
    setCommentDisabled(true);
  };

  return (
    <div className="Container">
      <div className="Post">
        <div className="Post-header">
          <div className="Post-header-username">{`User id: ${userID}`}</div>
          <div className="Post-header-caption">{caption}</div>
        </div>
        <div className="Post-image">
          <Image src={imageURL} />
        </div>
      </div>

      <div className="Comments">
        {comments.map((comment) => (
          <Card key={comment}>
            <Card.Text>{comment}</Card.Text>
          </Card>
        ))}
        <input
          name="comment"
          type="text"
          value={presentComment}
          onChange={handleChange}
        />
        <Button disabled={commentDisabled} onClick={postComment}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default Post;
