import React from "react";
import BaseLayout from "../layouts/Base";
import backend from "../../apis/backend";
import UserProfile from "../UserProfile";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";

class Profile extends React.Component {
  state = {
    profile: false
  };

  componentDidMount() {
    let user = this.props.location.pathname.substring(
      this.props.pageContext.matchPath.length - 1
    );
    backend
      .profile(user)
      .then(res => {
        if (res.status === 200) this.setState({ profile: res.data.profile });
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  }

  via = [{ link: "/users", label: "app.users" }];

  render() {
    return (
      <BaseLayout>
        <section className="wrap">
          <Breadcrumbs
            via={this.via}
            language={this.props.pageContext.langauge}
          >
            {this.state.profile.username}
          </Breadcrumbs>
          <h1>
            <FormattedMessage id="app.profile" />
          </h1>
          {this.state.profile ? (
            <UserProfile user={this.state.profile} />
          ) : (
            <p>FIXME: Loading...</p>
          )}
        </section>
      </BaseLayout>
    );
  }
}

export default Profile;
