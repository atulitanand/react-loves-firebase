import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./Components/Application";
import "./index.css";
import PostsProvider from "./providers/PostsProvider";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <UserProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
