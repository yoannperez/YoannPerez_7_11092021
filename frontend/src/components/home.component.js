import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content: (error.response && error.response.data) || error.message || error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="logo">
        {/* <img src="./img/logo192.png" alt="logo" /> */}
        <img src="./img/icon-left-font.svg" alt="logo" />
        <h3>GroupoMerdia </h3>
        <h3> - Le réseau d'entreprise</h3>
      </div>
      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header>
      // </div>
    );
  }
}
