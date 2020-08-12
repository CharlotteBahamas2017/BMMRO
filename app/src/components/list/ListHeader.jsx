/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import colors from "../../materials/colors";

const ListHeader = ({ title, children }) => {
  const styles = {
    listHeader: css`
      background: ${colors.lightTurqoise};
      display: flex;
      align-items: center;
      width: 100%;
      height: 55px;
      padding: 15px 10px;
      margin-top: 20px;
    `,
  };
  return (
    <div css={styles.listHeader}>
      <p>{title}</p>
      {children}
    </div>
  );
};

export default ListHeader;
