import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { Container } from "./components";
import { Header } from "./components";

function App() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
