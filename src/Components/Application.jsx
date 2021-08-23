import React, { Component } from "react";
import { auth, createUserProfileDocument, firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";
import Posts from "./Posts";
import Authentication from "./Authentication";
import { Route, Switch } from "react-router";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import PostPage from "./PostPage";

class Application extends Component {

  render() {
    return (
      <main className="Application">
        <Link to='/'><h1>Think Piece</h1></Link>
        <Authentication />
        <Switch>
          <Route exact path='/' component={Posts} />
          <Route exact path='/profile' component={UserProfile} />
          <Route exact path='/post/:id' component={PostPage} />
        </Switch>
      </main>
    );
  }
}

export default Application;
