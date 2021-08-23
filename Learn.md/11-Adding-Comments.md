# Adding Comments

```js
import React, { Component } from 'react';

import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';


import { withRouter } from 'react-router-dom';
import withUser from './withUser';

class PostPage extends Component {
    state = { post: null, comments: [] };

    /**
     * Here at first I will subscribe to postRef and commentsRef
     * Then I will use snapshot to look for the changes in their state inside the database
     * and will update the UI accordingly
     */

    get postId() {
        return this.props.match.params.id;
    }

    get postRef() {
        return firestore.doc(`posts/${this.postId}`);
    }

    get commentsRef() {
        return this.postRef.collection('comments');
    }

    unsubscribeFromPost = null;
    unsubscribeFromComments = null;
    /**
     * Here I am looking at the firebase as i said before and initializing state with new values if state of these documents inside the firebase changes
     */
    componentDidMount = async () => {
        this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
            const post = collectIdsAndDocs(snapshot);
            this.setState({ post });
        });

        this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ comments });
        });
    };

    // same'ol cleanup
    componentWillUnmount = () => {
        this.unsubscribeFromPost();
        this.unsubscribeFromComments();
    };

    createComment = comment => {
        const { user } = this.props;
        this.commentsRef.add({
            ...comment,
            user
        });
    };

    render() {
        const { post, comments } = this.state;
        console.log(this.props);
        return (
            <section>
                {post && <Post {...post} />}
                <Comments comments={comments} onCreate={this.createComment} />
            </section>
        );
    }
}

export default withRouter(withUser((PostPage)));
```

## Creating another higher order component that will pass in the userDate of the current user

There are two things worth mentioning here

- `userContext` just make on API call and fetches data just once and all the component shares is. So this automatically does caching for us
- The other strange thing that i did here was `getDisplayName`. That one is just so react-developer-tools can name it in a certain way. Because `<WrappedComponent>` component is inside the other component and you can't see it in dev-tools unless you do this

```js
import React from 'react';
import { UserContext } from '../providers/UserProvider';

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withUser = Component => {
    const WrappedComponent = props => {
        return (
            <UserContext.Consumer>
                {user => <Component user={user} {...props} />}
            </UserContext.Consumer>
        );
    };

    WrappedComponent.displayName = `WithUser(${getDisplayName(
        WrappedComponent,
    )})`;

    return WrappedComponent;
};

export default withUser;
```
