import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import { Home, Login, Setting, Signup } from "./pages";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import { Authenticated, NoteEditor } from "./components";
const router = createHashRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
            <Home />
        }
      />
      <Route path="register" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="setting" element = {<Authenticated><Setting /></Authenticated>} />
      <Route
        path="new"
        element={
          <Authenticated>
            <NoteEditor />
          </Authenticated>
        }
      />
      <Route
        path="edit-note/:url"
        element={
          <Authenticated>
            <NoteEditor />
          </Authenticated>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
