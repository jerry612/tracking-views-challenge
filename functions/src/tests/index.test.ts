const axios = require("axios");

it("should test if addUser works correctly.", async () => {
  const response = await axios.post(
    `${process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST}/addUser`,
    { name: "test1" }
  );
  console.log("data: ", response.data);
  expect(response.data.success).toEqual(true);
});

it("should test if addRecording works correctly.", async () => {
  const response = await axios.post(
    `${process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST}/addRecording`,
    { name: "test1", creatorId: "MDYzgm7rvVOghf00MHP1" }
  );
  console.log("data: ", response.data);
  expect(response.data.success).toEqual(true);
});

it("should test if onCallTrackRecordingView works correctly.", async () => {
  const response = await axios.post(
    `${process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST}/onCallTrackRecordingView`,
    { userId: "KzOiN70FDwVzzVMNh6kA", recordingId: "MDYzgm7rvVOghf00MHP1" }
  );
  console.log("data: ", response.data);
  expect(response.data.success).toEqual(true);
});

it("should test if getUserViewCount works correctly.", async () => {
  const response = await axios.get(
    `${process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST}/getUserViewCount?userId=KzOiN70FDwVzzVMNh6kA`
  );
  console.log("data: ", response.data);
  expect(response.data.success).toEqual(true);
});

it("should test if getRecordingViewCount works correctly.", async () => {
  const response = await axios.get(
    `${process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST}/getRecordingViewCount?recordingId=MDYzgm7rvVOghf00MHP1`
  );
  console.log("data: ", response.data);
  expect(response.data.success).toEqual(true);
});
