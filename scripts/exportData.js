const firebase = require("firebase");
const checkMissingConfig = require("./src/checkMissingConfig");
const parseArgs = require("./src/parseArgs");
const queryDataByTimeInterval = require("./src/queryDataByTimeInterval");
const transformJsonToCsv = require("./src/transformJsonToCsv");
const generateFilename = require("./src/generateFilename");
const signIn = require("./src/signIn");
const Status = require("./src/helpers/Status");
const collectionName = "habitatUse";
const timestampFieldName = "timestamp";

const exportData = async (
  projectId,
  apiKey,
  authDomain,
  email,
  password,
  startDateString,
  endDateString
) => {
  const configStatus = checkMissingConfig(
    projectId,
    apiKey,
    authDomain,
    email,
    password
  );
  if (!configStatus.isSuccessful()) return configStatus;

  const argsStatus = parseArgs(["bla", "bla", startDateString, endDateString]);
  if (!argsStatus.isSuccessful()) return argsStatus;
  const { startDate, endDate } = argsStatus.value;

  firebase.initializeApp({ projectId, apiKey, authDomain });
  const signInResult = await signIn(email, password);
  if (!signInResult.isSuccessful()) return signInResult;

  const timeRangeDataStatus = await queryDataByTimeInterval(
    startDate,
    endDate,
    timestampFieldName,
    firebase.firestore(),
    collectionName
  );
  if (!timeRangeDataStatus.isSuccessful()) return timeRangeDataStatus;

  const csvData = transformJsonToCsv(timeRangeDataStatus.value);
  const filename = generateFilename(startDate, endDate);

  return new Status("SUCCESS", {
    data: csvData,
    filename,
  });
};

module.exports = exportData;
