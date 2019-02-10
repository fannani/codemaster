import React, { Component } from "react";

import classnames from "classnames";
import styled from "styled-components";

class Friends extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <main
            className="col-12 main-container"
            style={{ maxWidth: '1100px' }}
          >
            <div className="row">

            </div>
          </main>
        </div>
      </div>
    );
  }
}

const Card = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 10px !important;
  border: 0 !important;
  margin-left: 20px;
  margin-right: 13px;
`;

export default Friends;