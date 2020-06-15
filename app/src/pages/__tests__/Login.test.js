import React from "react";
import { act, render, cleanup, wait } from "@testing-library/react/pure";
import user from "@testing-library/user-event";
import firebase from "firebase";
import { navigate } from "@reach/router";
import { FirebaseContext } from "../../firebaseContext/firebaseContext";
import Login from "../Login";
import {
  buildFirebaseAuthMock,
  buildFirestoreMock,
} from "../../testUtils/firebase";

jest.mock("@reach/router", () => ({
  navigate: jest.fn(),
}));

describe("Login page", () => {
  beforeEach(() => {
    buildFirestoreMock();
  });

  afterEach(cleanup);

  it("redirects to landing page when user successfully logs in", async () => {
    const signInResult = {
      signInWithEmailAndPassword: jest
        .fn()
        .mockResolvedValue("result of signInWithEmailAndPassword"),
    };
    buildFirebaseAuthMock(signInResult);

    let loginPage;
    await act(
      async () =>
        (loginPage = render(
          <FirebaseContext.Provider value={{ datastore: "some-datastore" }}>
            <Login />
          </FirebaseContext.Provider>
        ))
    );

    expect(loginPage.queryByTestId("login-page")).toBeInTheDocument();

    user.click(loginPage.queryByTestId("email"));
    await user.type(loginPage.queryByTestId("email"), "test@test.com");
    user.click(loginPage.queryByTestId("password"));
    await user.type(loginPage.queryByTestId("password"), "123");
    user.click(loginPage.queryByTestId("submit"));

    await wait(() => {
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows an error message when user fails to login", async () => {
    const signInResult = {
      signInWithEmailAndPassword: jest
        .fn()
        .mockRejectedValue(new Error("some error")),
    };
    buildFirebaseAuthMock(signInResult);

    let loginPage;
    await act(
      async () =>
        (loginPage = render(
          <FirebaseContext.Provider value={{ datastore: "some-datastore" }}>
            <Login />
          </FirebaseContext.Provider>
        ))
    );

    expect(loginPage.queryByTestId("login-page")).toBeInTheDocument();

    user.click(loginPage.queryByTestId("submit"));

    await wait(() =>
      expect(loginPage.queryByTestId("login-error")).toBeInTheDocument()
    );
  });
});