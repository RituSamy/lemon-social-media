import Posts from "../components/posts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

const mapDispatchToProps = {
  // like, add comment, add post
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
