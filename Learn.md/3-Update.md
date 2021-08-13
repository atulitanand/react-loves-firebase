# Updating posts

There are two ways to do that

- `.set()` : Totally wipes out document clear and we writes everything.
- `.update()`: Only changes that property.

`stars` from [Post.jsx](../src/Components/Post.jsx)

```js
const postRef = firestore.doc(`posts/${id}`);
const updateStars = async () => {
  await postRef.update({ stars: stars + 1 });
};
```

Since state of application is based upon the data that is in the firebase database we can make direct api calls.
