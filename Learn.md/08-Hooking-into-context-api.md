# Hooking Into Context API

First we will create a context which will automatically take snapshots of data from the firebase.
[src/PostsProvider](src/../../src/providers/PostsProvider.jsx)
```js
import { createContext } from 'react';
import React from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities'

export const PostsContext = createContext();

class PostsProvider extends React.Component {
    state = { posts: [] }

    unsubscriFromFirestore = null;

    componentDidMount() {
        this.unsubscriFromFirestore = firestore
            .collection("posts")
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map(collectIdsAndDocs);
                this.setState({ posts });
            });
    }
    componentWillUnmount() {
        this.unsubscriFromFirestore();
    }
    render() {
        const { posts } = this.state;
        const { children } = this.props;
        return (
            <PostsContext.Provider value={posts}>
                {children}
            </PostsContext.Provider>
        )
    }
}

export default PostsProvider;
```

Any component inside the `PostContext.Consumer` can hook into the passed on `value` equals to `posts` as follows.

![Using render props method to hook into PostsContext](/screenshots/posts-using-context-api-renderprop.png)

Same thing can be done for the UserContext.