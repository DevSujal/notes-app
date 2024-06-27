import auth from "../app write services/auth.service";
import database from "../app write services/database.service";

export const getAllData = async () => {
  const user = await auth.getCurrentUser();

  if (!user) {
    return null;
  }
  const notes = await database.getAllNotes(user);

  return { user, notes: notes?.documents };
};
