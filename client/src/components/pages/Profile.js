import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import { get } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      catHappiness: 0,
      myStringHTML: "",
    };
    this.picRef = React.createRef();
  }

  componentDidMount() {
    document.title = "Profile Page";
    get(`/api/user`, { userid: this.props.userId }).then((user) => this.setState({ user: user }));
  }

  incrementCatHappiness = () => {
    this.hearts();
    this.setState({
      catHappiness: this.state.catHappiness + 1,
    });
  };

  hearts = () => {
    var heartcount = (this.picRef.current.clientWidth / 50) * 5;
    for (var i = 0; i <= heartcount; i++) {
      var size = this.random(60, 120) / 10;
      this.setState({
        myStringHTML:
          '<span class="particle" style="top:' +
          this.random(10, 30) +
          "%; left:" +
          this.random(40, 50) +
          "%;width:" +
          size +
          "px; height:" +
          size +
          "px;animation-delay: " +
          this.random(0, 30) / 10 +
          's;"></span>',
      });
    }
  };

  random = (m, n) => {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor(Math.random() * (n - m + 1)) + m;
  };

  render() {
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    return (
      <div>
        <div
          className="Profile-avatarContainer"
          onClick={() => {
            this.incrementCatHappiness();
          }}
        >
          <div className="Profile-avatar" ref={this.picRef} />
          <div dangerouslySetInnerHTML={{ __html: this.state.myStringHTML }} />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About Me</h4>
            <div id="profile-description">
              Hello, I am Geetha. I am web developer, exploring new front-end technology.
            </div>
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Cat Happiness</h4>
            <CatHappiness catHappiness={this.state.catHappiness} />
          </div>
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
            <div id="favorite-cat">corgi</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
