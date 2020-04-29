import { Datastore } from "../datastore";

jest.mock("firebase");

describe("Datastore with firestore", () => {
  it("should add expected data to habitat use collection", () => {
    const firestoreMock = {
      collection: jest
        .fn()
        .mockReturnValue({
          add: jest.fn().mockResolvedValue({ id: "abc123" }),
        }),
    };

    const datastore = new Datastore(firestoreMock);

    datastore.createHabitatUse({ value1: "123" });

    expect(firestoreMock.collection).toHaveBeenCalledTimes(1);
    expect(firestoreMock.collection().add).toHaveBeenCalledWith({ value1: "123" });
  });
});