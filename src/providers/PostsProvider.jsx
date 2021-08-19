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