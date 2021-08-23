import React from 'react';
import { withRouter } from 'react-router';
import { collectIdsAndDocs } from '../utilities';
import Comments from './Comments'
import Post from './Post';
import { firestore } from '../firebase';
import withUser from './withUser';

/**
 * What are we doing here
 * 1. with the help of with router component of react-router we fetched the postId
 * 2. then i am going to get the post ref from the firebase and hold onto that for changes
 * 3. then with that post ref i will fetch the comments ref and hold onto that
 */

class PostPage extends React.Component {
    state = { post: null, comments: [] };
    get postId() { return this.props.match.params.id; }
    get postRef() { return firestore.doc(`posts/${this.postId}`); }
    get commentsRef() { return this.postRef.collection('comments'); }

    unsubscribeFromPost = null;
    unsubscribeFromComments = null;

    componentDidMount = async () => {
        // subscribe to both post and component
        // we have comments and post in the state now
        this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
            const post = collectIdsAndDocs(snapshot);
            this.setState({ post });
        })
        this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ comments });
        })
    }
    componentWillUnmount = () => {
        this.unsubscribeFromPost();
        this.unsubscribeFromComments();
    }
    createComment = comment => {
        const { user } = this.props
        this.commentsRef.add({
            ...comment,
            user
        });
    }

    render() {
        const { post, comments } = this.state;
        console.log(post)
        return (
            <section>
                {post && <Post {...post} />}
                <Comments
                    comments={comments}
                    onCreate={this.createComment}
                />
            </section>
        );
    }
}

// withRouter is a higher order component that pass in all the url data as props
export default withRouter(withUser(PostPage));