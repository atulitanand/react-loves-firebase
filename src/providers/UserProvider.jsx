import React, { createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {
    state = { user: null };

    state = {
        user: null,
    };

    unsubscriFromAuth = auth;

    //Reading data in RealTime
    componentDidMount() {
        this.unsubscriFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            this.unsubscriFromAuth = auth.onAuthStateChanged(async (userAuth) => {
                // if you dont have a uid Imma make you one
                if (userAuth) {
                    const userRef = await createUserProfileDocument(userAuth);
                    userRef.onSnapshot(snapshot => this.setState({ user: { uid: snapshot.id, ...snapshot.data() } }))
                }
                this.setState({ user: userAuth });
            });
        });
    }
    componentWillUnmount() {
        this.unsubscriFromFirestore();
    }


    render() {
        const { user } = this.state;
        const { children } = this.props;
        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;