# Looking Live A User State

We updated the user document inside the firebase well that's just fine but it won't come into action until we load user data again. Another re-render I mean.

Now to do that we need to watch the `snapshot` via the `userRef`.
Here is how I did it.

** in `src/firebase.js` **
```js
export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
+    return firestore.collection('users').doc(uid); // this function now returns the userRef
  } catch (error) {
    console.error('Error in fetching the user', error.message);
  }
}
```

** in `UserProvider.js` **

```js
//Reading data in RealTime
    componentDidMount() {
-        const user = await createUserProfileDocument(userAuth);
-        this.setState({ user });
+        /**
+         * The way reading realtime data in firebase as it seems to me is that
+         * - you make a ref and then you watch it via snapshot
+         * - onAuthStateChanged returns a ref to the user document  */
+        this.unsubscriFromAuth = auth.onAuthStateChanged(async (userAuth) => {
+            // if you dont have a uid Imma make you one
+            if (userAuth) {
+                const userRef = await createUserProfileDocument(userAuth);
+                userRef.onSnapshot(snapshot => this.setState({ user: { uid: snapshot.id, ...snapshot.data() } }))
+            }
+            this.setState({ user: userAuth });
        });
    }
```

All the extra code `+` is just cause we are looking at userDocumentSnapshot now.