import { Outlet } from "react-router-dom";
import "./App.css";
import { Container } from "./components";

function App() {

  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default App;
