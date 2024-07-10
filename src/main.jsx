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
import { Home, Login, PagenotFound, Setting, Signup, NoteEditor } from "./pages";
import { Provider } from "react-redux";
import { store } from "./Store/store.js";
import {
  Authenticated,
  Loader,
  UnAuthenticated,
  getAllData,
} from "./components";
const router = createHashRouter(
  createRoutesFromChildren(
    <Route path="/" loader={getAllData} element={<App />}>
      <Route path=""   element={<Home />} />
      <Route
        path="register"
        element={
          <UnAuthenticated>
            <Signup />
          </UnAuthenticated>
        }
      />
      <Route
        path="login"
        element={
          <UnAuthenticated>
            <Login />
          </UnAuthenticated>
        }
      />
      <Route
        path="setting"
        element={
          <Authenticated>
            <Setting />
          </Authenticated>
        }
      />
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
      <Route
        path="*"
        element={
          <PagenotFound />
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider
      fallbackElement={
        <div className="w-screen h-screen bg-black">
          <Loader/>
        </div>
      }
      router={router}
    />
  </Provider>
);
