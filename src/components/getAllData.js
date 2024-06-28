import auth from "../app write services/auth.service";
import database from "../app write services/database.service";
import { login } from "../Store/features/authSlice";
import { addNote } from "../Store/features/notesSlice";
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

      store.dispatch(login(user))
      store.dispatch(addNote(notes))

      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false
  }
};
