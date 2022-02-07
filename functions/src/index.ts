import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const USERS_COLLECTION = "users";
const RECORDINGS_COLLECTION = "recordings";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

/*
 * This function adds a user to the 'users' collection.
 * Method: POST
 * body: { name: string }
 */
export const addUser = functions.https.onRequest(async (request, response) => {
  console.log("request body:", request.body);

  try {
    const docRef = await db.collection(USERS_COLLECTION).add({
      name: request.body.name,
    });

    response.send({ success: true, userId: docRef.id });
  } catch (error) {
    console.log("Error: ", error);
    response.send({ success: false });
  }
});

/*
 * This function adds a recording to the 'recordings' collection.
 * Method: POST
 * body: { name: string, creatorId: string }
 */
export const addRecording = functions.https.onRequest(
  async (request, response) => {
    console.log("request body:", request.body);

    try {
      const docRef = await db.collection(RECORDINGS_COLLECTION).add({
        name: request.body.name,
        creatorId: request.body.creatorId,
      });
      response.send({ success: true, recordingId: docRef.id });
    } catch (error) {
      console.log("Error: ", error);
      response.send({ success: false });
    }
  }
);

/*
 * This function adds a view to the 'users' and 'recordings' collections.
 * Method: POST
 * body: { userId: string, recordingId: string }
 */
export const onCallTrackRecordingView = functions.https.onRequest(
  async (request, response) => {
    console.log("request body:", request.body);

    try {
      const { userId, recordingId } = request.body;

      const recordingViewRef = db
        .collection(RECORDINGS_COLLECTION)
        .doc(recordingId)
        .collection("views");

      const userViewRef = db
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection("views");

      const existingRecordingView = await recordingViewRef
        .where("userId", "==", userId)
        .get();
      const existingUserView = await userViewRef
        .where("recordingId", "==", recordingId)
        .get();

      console.log(
        "existingRecordingView: ",
        JSON.stringify(existingRecordingView.docs)
      );
      console.log("existingUserView: ", JSON.stringify(existingUserView.docs));

      if (existingRecordingView.docs.length > 0) {
        console.log("The view is already registered!");
      } else {
        await recordingViewRef.add({
          userId: userId,
        });
      }

      if (existingUserView.docs.length > 0) {
        console.log("The view is already registered!");
      } else {
        await userViewRef.add({
          recordingId: recordingId,
        });
      }

      response.send({ success: true });
    } catch (error) {
      response.send({ success: false });
    }
  }
);

/*
 * This function gets the view count of the user.
 * Method: GET
 * query: { userId: string }
 */
export const getUserViewCount = functions.https.onRequest(
  async (request, response) => {
    try {
      const { userId } = request.query;

      const userViewRef = db
        .collection(USERS_COLLECTION)
        .doc(userId as string)
        .collection("views");

      const views = await userViewRef.get();
      response.send({ success: true, count: views.docs.length });
    } catch (error) {
      response.send({ success: false });
    }
  }
);

/*
 * This function gets the view count of the recording.
 * Method: GET
 * query: { recordingId: string }
 */
export const getRecordingViewCount = functions.https.onRequest(
  async (request, response) => {
    try {
      const { recordingId } = request.query;

      const recordingViewRef = db
        .collection(RECORDINGS_COLLECTION)
        .doc(recordingId as string)
        .collection("views");

      const views = await recordingViewRef.get();
      response.send({ success: true, count: views.docs.length });
    } catch (error) {
      response.send({ success: false });
    }
  }
);
