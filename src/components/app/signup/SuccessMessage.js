import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import successGif from "./success.gif";

const SuccessMessage = ({ language }) => {
  return (
    <div className="txt-center">
      <h4>
        <FormattedMessage id="app.yay" />
        &nbsp;
        <FormattedMessage id="app.goodJob" />
      </h4>
      <h5 className="mb20">
        <FormattedMessage id="app.checkInboxClickLinkInConfirmationEmail" />
      </h5>
      <img src={successGif} alt="Yay!" />
      <h5>
        <FormattedMessage id="app.goAheadWeWillWait" />
      </h5>
    </div>
  );
};

SuccessMessage.propTypes = {
  language: PropTypes.string.isRequired
};

export default SuccessMessage;
