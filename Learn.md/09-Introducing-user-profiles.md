# Introducing User Profiles

## Important points:
- To save the image data you need to use a `ref` like so

```js
import React, { useContext } from 'react';
import { auth, firestore } from '../firebase';

class UserProfile extends React.Component {
    state = { displayName: '' }
    imageInput = null;
    get uid() { return auth.currentUser.uid }
    get userRef() { return firestore.doc(`users/${this.uid}`) }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { displayName } = this.state;
        if (displayName) {
            this.userRef.update({ displayName });
        }
    }

    render() {
        const { displayName } = this.state;
        return (
            <section className="UserProfile">
                <form onSubmit={this.handleSubmit}>
                    <input.../>
                    <input type="file" ref={ref => this.imageInput = ref} />
                    <input.../>
                </form>
            </section>
        );
    }
}

export default UserProfile;
```

- Rest of the code is just to make a form in react