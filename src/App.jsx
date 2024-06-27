import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { Container } from "./components";
import { Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import auth from "./app write services/auth.service";
import { useEffect } from "react";
import { login, logout } from "./Store/features/authSlice";
import { addNote } from "./Store/features/notesSlice";
import database from "./app write services/database.service";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.authReducer.status);
  useEffect(() => {
    if (!status) {
      auth
        .getCurrentUser()
        .then((user) => {
          if (user) {
            dispatch(login(user));
            database.getAllNotes(user).then((data) => {
              if (data) {
                dispatch(addNote(data.documents));
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(logout());
          navigate("/");
        });
    }
  }, []);
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
