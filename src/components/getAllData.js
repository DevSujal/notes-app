import auth from "../app write services/auth.service";
import database from "../app write services/database.service";
import { store } from "../Store/store";

export const getAllData = async () => {
  try {
    const { authReducer } = store.getState();
    if (!authReducer.status) {
      const user = await auth.getCurrentUser();

      if (!user) {
        return null;
      }
      const notes = await database.getAllNotes(user);

      return { user, notes: notes?.documents };
    } else return null;
  } catch (error) {
    console.log(error);
    return null
  }
};
