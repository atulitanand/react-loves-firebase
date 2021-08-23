# Create Read Delete

## create/subscribe to a collection in firebase

```js
componentDidMount = async () => {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map(collectIdsAndDocs);
  this.setState({ posts });
};
```

Load all the posts everytime component mounts.

`collectIdsAndDocs` is just a little helper method that we created.

```js
export const collectIdsAndDocs = (doc) => ({ id: doc.id, ...doc.data() });
```

## add a post

```js
handleCreate = async (post) => {
  const { posts } = this.state;

  // add returns a promise that resolves into document refernce in the database
  const docref = await firestore.collection("posts").add(post);
  // we can also use id from docref to get the post back but we instead use .get() method which is a common method to fetch one post from the database
  const doc = await docref.get();
  console.log("Document CREATED:", docref.id);
  const newPost = collectIdsAndDocs(doc);

  this.setState({ posts: [newPost, ...posts] });
};
```

Need to explicitly tell to add the post in `this.state`

## delete a post

```js
handleRemove = async (id) => {
  const allPosts = this.state.posts;

  // shorthand
  await firestore.doc(`posts/${id}`).delete();

  console.log("Document DELETED:", id);

  const posts = allPosts.filter((post) => post.id !== id);
  this.setState({ posts });
};
```

We'll pass this function to the delete button via prop drilling.
