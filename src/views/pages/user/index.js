import React, { Component } from "react";
import "isomorphic-fetch";

class UserPage extends Component {
  static getInitialProps(ctx) {
    return fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  constructor(props) {
    super(props);

    let initialData;
    if (typeof window === "undefined") {
      initialData = props.staticContext.initialData;
    } else {
      initialData = window.__PRELOADED_STATE__;
      delete window.__PRELOADED_STATE__;
    }

    this.state = { users: initialData };
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>This is user page</h1>
        <p>Total users: {(users && users.length) || 0}</p>
      </div>
    );
  }
}

export default UserPage;
