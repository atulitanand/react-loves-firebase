import React, { Component } from "react";
import { auth, createUserProfileDocument, firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import Posts from "./Posts";
import Authentication from "./Authentication";
class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscriFromFirestore = null;
  unsubscriFromAuth = auth;

  //Reading data in RealTime
  componentDidMount() {
    this.unsubscriFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectIdsAndDocs);
        this.setState({ posts });
      });
    this.unsubscriFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserProfileDocument(userAuth);
      this.setState({ user });
    });
  }
  componentWillUnmount() {
    this.unsubscriFromFirestore();
  }

  render() {
    const { posts, user } = this.state;
    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
