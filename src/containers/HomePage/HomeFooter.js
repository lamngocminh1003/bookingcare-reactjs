import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          &copy; <FormattedMessage id="home-footer.source" />{" "}
        </p>
        <p>
          <FormattedMessage id="home-footer.contact" />
          <a target="_blank" href="https://www.facebook.com/">
            <span style={{ color: `blue` }}>
              &#8594;
              <FormattedMessage id="home-footer.here" />
              &#8592;
            </span>
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
