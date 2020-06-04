/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import colors from "../materials/colors";
import { FormErrorType } from "../forms/constants";

const ErrorMessage = ({ error, testId, isInline = false }) => {
  const message = {
    [FormErrorType.EMPTY]: "Required",
    [FormErrorType.MIN_VALUE]: `Value must be greater than or equal to ${error.rule}`,
    [FormErrorType.MAX_VALUE]: `Value must be less than or equal to ${error.rule}`,
    [FormErrorType.MAX_DATE]: "Date cannot be in the future",
    [FormErrorType.INVALID_DATE_FORMAT]: `Date must be in the following format ${error.rule}`,
    [FormErrorType.MAX_TIME]: "Time cannot be in the future",
    [FormErrorType.INVALID_TIME_FORMAT]: `Time must be in the following format ${error.rule}`,
    [FormErrorType.START_TIME_AFTER_END_TIME]:
      "End time cannot be before start time",
  };

  const styles = {
    error: css`
      display: ${isInline ? "inline" : "block"};
      color: ${colors.red};
      font-size: 13px;
    `,
  };

  return (
    <div data-testid={testId} css={styles.error}>
      {message[error.type]}
    </div>
  );
};

export default ErrorMessage;
