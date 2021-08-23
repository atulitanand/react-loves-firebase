# Adding Comments

I did following things to add comments support

## Making comments available to the `PostPage.js`

```js
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

// since we are looking at their snapshot we don't have to worry about updating the state explicity

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
        // A thing that i you might wanna see here is that we are making just one call to the firebase via `userContext` and every other component is using is
        this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
            const post = collectIdsAndDocs(snapshot);
            this.setState({ post });
        })
        this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ comments });
        })
    }

    // just to clean up the call we made
    componentWillUnmount = () => {
        this.unsubscribeFromPost();
        this.unsubscribeFromComments();
    }

    // we are padding this function down to the add comment button inside the <Comment/> component
    createComment = comment => {
        const { user } = this.props
        this.commentsRef.add({
            ...comment,
            user
        });
    }

    render() {
        // this is just the UI shit
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
```

## Creating a higher order component `withUser` to get user data for the comment

```js
import React from 'react'
import { UserContext } from '../providers/UserProvider'

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const withUser = Component => {
    const WrappedComponent = props => {
        return (
            <UserContext.Consumer>
                {user => <Component user={user} {...props} />}
            </UserContext.Consumer>
        )
    }
    // since wrapped component is inside the withUser it will not get a proper name, this is just so react-developer-tools can name it a certain way
    WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`

    return WrappedComponent;
}

export default withUser;
```
