import { firebase, FieldValue } from "../libs/firebase";

export async function doesUserEmailExist(email) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", email)
    .get();

  return result.docs.length > 0;
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function changeFirstLogin(docId) {
  // db.collection("users").doc(doc.id).update({foo: "bar"});

  const result = await firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      firstLogin: false,
    });

  return null;
}
