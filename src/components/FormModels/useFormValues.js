import { useContext, useEffect, useState } from "react";

import UserContext from "../../context/user";
import FirebaseContext from "../../context/firebase";

export default function useFormValues(userId) {
  const [userFormData, setUserFormData] = useState("");
  const [isLoading, setIsLoading] = useState("true");

  // const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    async function doesDataExist(userId) {
      let query = firebase.firestore().collection("profiles");
      query = query.where("userId", "==", userId);
      const result = await query.get();
      const myData = result.docs.map((l) => ({
        ...l.data(),
        docId: l.id,
      }));

      setUserFormData(myData[0]);
      setIsLoading(false);
    }

    if (userId) {
      doesDataExist(userId);
    }
  }, [firebase, userId]);

  console.log("userForm", userFormData);

  return { userFormData, setUserFormData, isLoading };
}
