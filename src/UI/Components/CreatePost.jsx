import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

const CreatePost = (props) => {
  // a post has a caption, imgURL, and comments.
  const [presentCaption, setPresentCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(true);
  // use firestore
  const firestore = useFirestore();
  const firebase = useFirebase();
  // get the uid using selector
  const { uid } = useSelector((state) => state.firebase.auth);
  // handle change
  const handleChange = (event) => {
    switch (event.currentTarget.name) {
      case "caption":
        setPresentCaption(event.currentTarget.value);
        break;
      case "image":
        if (event.target.files[0]) {
          setImage(event.target.files[0]);
          setUploadDisabled(false);
        }
        break;
      default:
        break;
    }
  };

  const handleUpload = () => {
    const uploadTask = firebase
      .storage()
      .ref(`images/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => {
        console.log(err.message);
      },
      () => {
        firebase
          .storage()
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImageURL(url);
          });
      }
    );
  };
  // add new post
  const createPost = (post) => {
    /* 
    how to structure?
    posts collection and users collection, SEPARATELY because everyone sees the same feed.
    */
    firestore
      .collection("posts")
      .add({
        userID: uid,
        caption: post.caption,
        imageURL: post.imageURL,
        comments: [],
      })
      .then((docRef) => {
        docRef.update({
          postID: docRef.id,
        });
      });
    setPresentCaption("");
    setImage(null);
    setImageURL("");
    setUploadDisabled(true);
  };
  // render the create post template.
  return (
    <div>
      <h1>Create a New Post</h1>
      <Form>
        <Form.Label>Caption</Form.Label>
        <Form.Control
          type="text"
          name="caption"
          value={props.caption}
          onChange={handleChange}
        />
        <Form.Label>Image</Form.Label>
        <Form.File name="image" onChange={handleChange} />
        <Button disabled={uploadDisabled} onClick={handleUpload}>
          Upload
        </Button>
      </Form>
      <Button
        disabled={props.postDisabled}
        onClick={() => {
          createPost({
            caption: presentCaption,
            imageURL,
          });
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default CreatePost;
