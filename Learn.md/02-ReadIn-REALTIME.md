# Reading Data in Real Time

```js
  unsubscribe = null;
  //Reading data in RealTime
  componentDidMount() {
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
```

`unsubscribe` is just a property on our class component.
`onSnapshot()` doesn't returns a promise it always take a callback.

Realtime update being pushed on to all the windows or all the apps that have subscribed to our database and now we don't even have to add that to our state manually.

## Adding and removing posts

```js
// add a post
handleCreate = async (post) => {
  // to add new post
  firestore.collection("posts").doc(post.id).set(post);
  //   await firestore.collection("posts").add(post); // older version of api
  console.log("post added :)");
};

// delete a post
handleRemove = async (id) => {
  await firestore.doc(`posts/${id}`).delete();
  console.log("post removed :)");
};
```

Because now we don't have to worry about state no more. There is no point in passing `handleCreate` and `handleRemove`. We can just declare them any ware and use them

## Final state of Application.jsx [#](../src/Components/Application.jsx) after doing that

All that boils down to this.

```js
import React, { Component } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;
  //Reading data in RealTime
  componentDidMount() {
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
```
