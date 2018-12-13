import React from "react";
import PropTypes from "prop-types";
import Tray from "../../Tray";
import TrayFooter from "../../TrayFooter";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import GithubIcon from "../../GithubIcon";
import { capitalize } from "../../../utils";
import { patterns } from "@freesewing/patterns";
import svgattrPlugin from "@freesewing/plugin-svgattr";
//import i18nPlugin from "@freesewing/plugin-i18n";
//import validatePlugin from "@freesewing/plugin-validate";
//import debugPlugin from "@freesewing/plugin-debug";

class DraftPreview extends React.Component {
  state = {
    svg: false,
    pattern: false
  };

  //componentDidMount() {
  //  const pattern = new patterns[(capitalize(this.props.pattern))](
  //    this.props.settings
  //  ).with(svgattrPlugin, { class: "fs-draft preview" })
  //  //  .on('preDraft', function() { console.log('pre draft', arguments)});

  //  this.setState({
  //    pattern: pattern
  //  });
  //}

  render() {
    let error = false;
    let settings = this.props.settings;
    const pattern = new patterns[(capitalize(this.props.pattern))]().with(
      svgattrPlugin,
      { class: "fs-draft preview" }
    );
    pattern.mergeSettings(settings);
    try {
      pattern.draft();
    } catch (err) {
      error = err;
    }
    if (!error) {
      return (
        <div
          className="freesewing draft svg w100"
          dangerouslySetInnerHTML={{ __html: pattern.render() }}
        />
      );
    } else
      return (
        <Tray
          className="danger"
          title={<FormattedMessage id="app.weEncounteredAProblem" />}
        >
          <p>
            <FormattedMessage id="app.weEncourageYouToReportThis" />
            {". "}
            <FormattedMessage id="app.pleaseIncludeTheInformationBelow" />
            {":"}
          </p>
          <pre>
            {JSON.stringify(
              {
                error: error,
                pattern: pattern.config.name,
                version: pattern.config.version,
                settings: pattern.settings
              },
              null,
              2
            )}
          </pre>
          <TrayFooter>
            <Button
              variant="outlined"
              color="primary"
              href="https://github.com/freesewing/website/issues/new"
              rel="noopener noreferral"
            >
              <GithubIcon className="mr1" />
              <FormattedMessage id="app.reportThisOnGithub" />
            </Button>
          </TrayFooter>
        </Tray>
      );
  }
}

DraftPreview.propTypes = {
  pattern: PropTypes.string.isRequired,
  model: PropTypes.object.isRequired
};

export default DraftPreview;