/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "@reach/router";
import { useContext } from "react";

import { FirebaseContext } from "../firebaseContext/firebaseContext";
import Layout from "../components/Layout";
import EncounterList from "../components/EncounterList";
import Button from "../components/Button";
import { ROUTES } from "../constants/routes";
import useEncountersByMonth from "../hooks/useEncountersByMonth";
import typography from "../materials/typography";

const Encounters = () => {
  const styles = {
    titleContainer: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
    `,
    list: css`
      margin: 10px 10px 30px 10px;
    `,
  };

  const { datastore } = useContext(FirebaseContext);
  const {
    todaysEncounters,
    previousEncounters,
    loadPreviousMonth,
  } = useEncountersByMonth(datastore);

  return (
    <Layout hasDefaultPadding={false}>
      <div css={styles.titleContainer}>
        <h1 css={typography.largeTitle}>ENCOUNTERS</h1>
        <Link to={ROUTES.newEncounter}>
          <Button isSmall>+ New</Button>
        </Link>
      </div>
      <div css={styles.list}>
        <EncounterList
          title="Today"
          listOfEncountersByMonth={todaysEncounters}
          isToday
        />
      </div>
      <div css={styles.list}>
        <EncounterList
          title="Previous encounters"
          listOfEncountersByMonth={previousEncounters}
          loadMore={loadPreviousMonth}
        />
      </div>
    </Layout>
  );
};

export default Encounters;
